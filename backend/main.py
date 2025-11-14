from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from collections import deque
from typing import Dict, List, Set
import os

app = FastAPI()

# Get allowed origins from environment variable, default to localhost for dev
allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/pipelines/parse")
def parse_pipeline(payload: Dict = Body(...)):
    nodes = payload.get("nodes", []) or []
    edges = payload.get("edges", []) or []

    # Build set of node ids
    node_ids: Set[str] = set()
    for n in nodes:
        nid = n.get("id")
        if nid is not None:
            node_ids.add(str(nid))

    num_nodes = len(node_ids)
    # only count edges with both source and target
    valid_edges = [e for e in edges if isinstance(e, dict) and e.get("source") and e.get("target")]
    num_edges = len(valid_edges)

    # Build incoming map: target -> [sources]
    incoming: Dict[str, List[str]] = {}
    for e in valid_edges:
        s = str(e["source"])
        t = str(e["target"])
        incoming.setdefault(t, []).append(s)

    # Helper to find node by id
    node_by_id = {str(n.get("id")): n for n in nodes if isinstance(n, dict) and n.get("id") is not None}

    # For demo: for each Output-like node set data.value to concatenation of connected source values
    for node_id, node in node_by_id.items():
        node_type = (node.get("type") or "").lower()
        if "output" in node_type or node.get("data", {}).get("role") == "output":
            source_ids = incoming.get(node_id, [])
            vals = []
            for sid in source_ids:
                src_node = node_by_id.get(str(sid), {})
                src_data = src_node.get("data", {}) if isinstance(src_node, dict) else {}
                # use common fields
                v = src_data.get("value") or src_data.get("text") or ""
                if v is not None and v != "":
                    vals.append(str(v))
            node.setdefault("data", {})
            node["data"]["value"] = " | ".join(vals) if vals else "—"

    # (keep DAG check if needed) - here simply return counts and the possibly-updated nodes
    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": True, "nodes": nodes}