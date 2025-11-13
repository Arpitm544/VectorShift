import React from "react";
import BaseNode from "./BaseNode";

export default function ConditionalNode({ id, data }) {
  return (
    <BaseNode
      id={id}
      title="Conditional Node"
      inputs={[{ id: "condition" }, { id: "ifTrue" }, { id: "ifFalse" }]}
      outputs={[{ id: "result" }]}
      color="#fef2f2"
    >
      <div className="text-xs text-gray-700">Outputs based on condition</div>
    </BaseNode>
  );
}