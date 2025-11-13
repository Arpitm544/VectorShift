import React from "react";
import BaseNode from "./BaseNode";

export default function MathNode({ id, data }) {
  return (
    <BaseNode
      id={id}
      title="Math Node"
      inputs={[{ id: "a" }, { id: "b" }]}
      outputs={[{ id: "result" }]}
      color="#ecfccb"
    >
      <select
        className="w-full border rounded p-1 text-sm"
        value={data?.op || "add"}
        onChange={(e) => data.updateNode?.({ op: e.target.value })}
      >
        <option value="add">Add</option>
        <option value="sub">Subtract</option>
        <option value="mul">Multiply</option>
      </select>
    </BaseNode>
  );
}