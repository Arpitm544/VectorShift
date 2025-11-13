import React from "react";
import BaseNode from "./BaseNode";

export default function LoggerNode({ id, data }) {
  return (
    <BaseNode
      id={id}
      title="Logger Node"
      inputs={[{ id: "input" }]}
      color="#e0f2fe"
    >
      <div className="text-xs text-gray-700">Logs data to console</div>
    </BaseNode>
  );
}