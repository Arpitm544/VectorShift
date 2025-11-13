import React from "react";
import BaseNode from "./BaseNode";

export default function OutputNode({ id, data }) {
  return (
    <BaseNode id={id} title="Output Node" inputs={[{ id: "in" }]}>
      <div className="text-sm text-gray-700">
        Output: <b>{data?.value || "—"}</b>
      </div>
    </BaseNode>
  );
}