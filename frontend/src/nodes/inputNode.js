import React from "react";
import BaseNode from "./BaseNode";
import { useStore } from "../store";

export default function InputNode({ id, data }) {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode id={id} title="Input Node" outputs={[{ id: "out" }]}>
      <input
        className="w-full border rounded p-1 text-sm"
        value={data?.value || ""}
        onChange={(e) => updateNodeField(id, "value", e.target.value)}
        placeholder="Enter value"
      />
    </BaseNode>
  );
}