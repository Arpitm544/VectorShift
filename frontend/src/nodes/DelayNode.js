import React from "react";
import BaseNode from "./BaseNode";

export default function DelayNode({ id, data }) {
  return (
    <BaseNode
      id={id}
      title="Delay Node"
      inputs={[{ id: "input" }]}
      outputs={[{ id: "output" }]}
      color="#fce7f3"
    >
      <input
        type="number"
        className="w-full border rounded p-1 text-sm"
        value={data?.delay || 1000}
        onChange={(e) => data.onChange?.(e.target.value)}
      />
    </BaseNode>
  );
}