import axios from "axios";
import { useStore } from "./store";

export const submitPipeline = async () => {
  const { nodes, edges } = useStore.getState();   // ⭐ this is key

  try {
    const response = await axios.post("http://localhost:8000/pipelines/parse", {
      nodes,
      edges,
    });

    const { num_nodes, num_edges, is_dag } = response.data;

    alert(
      `Nodes: ${num_nodes}\nEdges: ${num_edges}\nDAG: ${is_dag ? "Yes" : "No"}`
    );
  } catch (err) {
    console.error(err);
    alert("Error submitting pipeline.");
  }
};