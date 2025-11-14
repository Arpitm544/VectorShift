import axios from "axios";
import { useStore } from "./store";

export const submitPipeline = async () => {
  const { nodes, edges } = useStore.getState();

  try {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
    const response = await axios.post(`${backendUrl}/pipelines/parse`, {
      nodes,
      edges,
    });

    const data = response.data || {};
    // replace store nodes with backend nodes if provided
    if (Array.isArray(data.nodes)) {
      // zustand: set state directly
      useStore.setState({ nodes: data.nodes });
    }

    const msg = `Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag}`;
    window.alert(msg);
  } catch (err) {
    window.alert("Error submitting pipeline: " + (err.response?.data || err.message || err));
  }
};