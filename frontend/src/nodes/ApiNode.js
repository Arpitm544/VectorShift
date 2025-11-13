import React from "react";
import BaseNode from "./BaseNode";

export default function ApiNode({ id, data }) {
  return (
    <BaseNode
      id={id}
      title="API Node"
      inputs={[{ id: "request" }]}
      outputs={[{ id: "response" }]}
      color="#dbeafe"
    >
      <input
        className="w-full border rounded p-1 text-sm"
        placeholder="https://api.example.com"
        value={data?.url || ""}
        onChange={(e) => data.onChange?.(e.target.value)}
      />
    </BaseNode>
  );
}