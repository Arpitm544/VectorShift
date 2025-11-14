// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';

import InputNode from './nodes/inputNode';
import LLMNode from './nodes/llmNode';
import OutputNode from './nodes/outputNode';
import TextNode from './nodes/textNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector);

  // Basic data for each node
  const getInitNodeData = (nodeID, type) => {
    return {
      id: nodeID,
      nodeType: type,
      value: "",
      text: "",
      model: "gpt-4",
    };
  };

  // ⭐ This is the MOST IMPORTANT function ⭐
  // It injects updateNode() into each new node
  const addNodeWithUpdate = (node) => {
    const nodeID = node.id;

    node.data = {
      ...node.data,

      updateNode: (newFields) => {
        const { nodes, onNodesChange } = useStore.getState();

        const existing = nodes.find((n) => n.id === nodeID)?.data || {};

        const updatedData = {
          ...existing,
          ...newFields,
        };

        onNodesChange([
          {
            id: nodeID,
            type: "update",
            data: updatedData,
          },
        ]);
      },
    };

    addNode(node);
  };

  // Drop Handler ----------------------------------------------------
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData('application/reactflow');

      if (!data) return;

      const appData = JSON.parse(data);
      const type = appData.nodeType;

      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);

      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      };

      // ⭐ Use the special add function with updateNode
      addNodeWithUpdate(newNode);
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100vw', height: '70vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
      >
        <Background color="#ddd" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};