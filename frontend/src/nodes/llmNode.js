import React from "react";
import BaseNode from "./BaseNode";

export default function LLMNode({ id, data }) {
  return (
    <BaseNode
      id={id}
      title="LLM Node"
      inputs={[{ id: "prompt" }]}
      outputs={[{ id: "response" }]}
      color="#fef9c3"
    >
      <label className="block text-sm mb-1">Model</label>
      <select
        className="w-full border rounded p-1 text-sm"
        value={data?.model || "gpt-4"}
        onChange={(e) => data.onChange?.(e.target.value)}
      >
        <option value="gpt-4">GPT-4</option>
        <option value="gpt-3.5">GPT-3.5</option>
      </select>
    </BaseNode>
  );
}