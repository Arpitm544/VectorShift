from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from collections import deque
from typing import Dict, List, Set

app = FastAPI()

# CORS for frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for quick dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"ping": "pong"}

@app.post("/pipelines/parse")
def parse_pipeline(payload: Dict = Body(...)):
    # payload expected to contain 'nodes' (list of dicts) and 'edges' (list of dicts)
    nodes = payload.get("nodes", []) or []
    edges = payload.get("edges", []) or []

    # collect node ids (string) from nodes and edges
    node_ids: Set[str] = set()
    for n in nodes:
        if isinstance(n, dict):
            nid = n.get("id")
            if nid is not None:
                node_ids.add(str(nid))

    for e in edges:
        if isinstance(e, dict):
            s = e.get("source")
            t = e.get("target")
            if s is not None:
                node_ids.add(str(s))
            if t is not None:
                node_ids.add(str(t))

    num_nodes = len(node_ids)
    # count only edges that have both source and target defined
    num_edges = sum(
        1
        for e in edges
        if isinstance(e, dict) and e.get("source") is not None and e.get("target") is not None
    )

    # build adjacency list and indegree map keyed by node id (string)
    adj: Dict[str, List[str]] = {nid: [] for nid in node_ids}
    indegree: Dict[str, int] = {nid: 0 for nid in node_ids}

    for e in edges:
        if not isinstance(e, dict):
            continue
        s = e.get("source")
        t = e.get("target")
        if s is None or t is None:
            continue
        s = str(s)
        t = str(t)
        if s not in adj:
            adj[s] = []
            indegree.setdefault(s, 0)
        if t not in adj:
            adj[t] = []
            indegree.setdefault(t, 0)
        adj[s].append(t)
        indegree[t] = indegree.get(t, 0) + 1

    # Kahn's algorithm to detect cycles (DAG check)
    q = deque([nid for nid, deg in indegree.items() if deg == 0])
    visited = 0
    while q:
        u = q.popleft()
        visited += 1
        for v in adj.get(u, []):
            indegree[v] -= 1
            if indegree[v] == 0:
                q.append(v)

    is_dag = visited == len(adj)

    return {"num_nodes": num_nodes, "num_edges": num_edges, "is_dag": is_dag}