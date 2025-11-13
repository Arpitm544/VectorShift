import React from "react";
import BaseNode from "./BaseNode";
import { useStore } from "../store";

export default function TextNode({ id, data }) {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="Text Node"
      inputs={[{ id: "in" }]}
      outputs={[{ id: "out" }]}
    >
      <textarea
        className="w-full border rounded p-1 text-sm"
        rows={3}
        placeholder="Enter text"
        value={data?.text || ""}
        onChange={(e) => updateNodeField(id, "text", e.target.value)}
      />
    </BaseNode>
  );
}