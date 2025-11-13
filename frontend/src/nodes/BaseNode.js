// src/nodes/BaseNode.js
import React from "react";
import { Handle, Position } from "reactflow";

/**
 * BaseNode: reusable abstraction for all node types.
 * Handles shared layout, handles, and styling.
 */
export default function BaseNode({
  id,
  title,
  color = "#ffffff",
  inputs = [],
  outputs = [],
  children,
}) {
  return (
    <div
      className="rounded-lg shadow-md border border-gray-200 p-3 bg-white"
      style={{ background: color, minWidth: 180 }}
    >
      {/* Title */}
      <div className="font-semibold text-gray-800 mb-2">{title}</div>

      {/* Input Handles */}
      {inputs.map((inp, i) => (
        <Handle
          key={`in-${i}`}
          type="target"
          position={Position.Left}
          id={inp.id || `in-${i}`}
          style={{
            top: 40 + i * 20,
            background: "#555",
          }}
        />
      ))}

      {/* Node Content */}
      <div>{children}</div>

      {/* Output Handles */}
      {outputs.map((out, i) => (
        <Handle
          key={`out-${i}`}
          type="source"
          position={Position.Right}
          id={out.id || `out-${i}`}
          style={{
            top: 40 + i * 20,
            background: "#111",
          }}
        />
      ))}
    </div>
  );
}