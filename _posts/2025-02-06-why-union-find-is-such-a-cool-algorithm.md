---
layout: post
title: Why union find is such a cool algorithm
---

Note: This post is still work in progress

One of my favorite algorithms in graph theory is Union Find. It is a beautiful algorithm to group disjoint sets. A disjoint set is a set of nodes in an undirected graph that contains itself, and is not connected to other sets.

Suppose we have the following graph. Disjoint sets are `{0, 1, 2, 3}` and `{4, 5}`. As you can see, they are disconnected from each other.

```
0---1---2
|
3   4---5---6
```

Let's say we are asked to check if two nodes u and v are within the same disjoint set. How can we check this efficiently?

One way is to run BFS or DFS for that pair. This approach should be fine if we only need to check one pair. But what if we need to check a large number of pairs?

Let's say there are V nodes and E edges, where V and E = 10^6 = 1 million. We are also given x number of queries, where x = 100. For this scale, we need a really efficient algorithm to find the connection.

Let's think about using the BFS/DFS approach again. It's trivial to come up with an algorithm which will keep track of visited nodes to efficiently traverse the entire graph. Then the algorithm can return the following mappings.

Here, parent is any node that each of the node in the disjoint set can reach to. We can also call this the representative of the disjoint set. 

```
node -> parent
0 -> 0
1 -> 0
2 -> 0
3 -> 0
4 -> 4
5 -> 4
6 -> 4
```

```
parent -> disjoint sets
0 -> {0, 1, 2, 3}
4 -> {4, 5, 6}
```

We can construct these mappings in `O(V` time because we will only visit each node once. However, a problem arrises when we want to continue to actively connect disjoint sets. Let's say we want to connect 2 and 5. The graph will look like the following.

```
0---1---2
|       |
3   4---5---6
```

We have to first look at the `node -> parent` mapping and check if those two nodes have the same parent. If they are different, then look at the `parent - disjoint sets` mapping, and merge the disjoint sets. As a result, we will get the following mappings.

```
node -> parent
0 -> 0
1 -> 0
2 -> 0
3 -> 0
4 -> 0
5 -> 0
6 -> 0
```

```
parent -> disjoint sets
0 -> {0, 1, 2, 3, 4, 5, 6}
```

This operation can take `O(V)` because, in the worst case, we have to update/merge every node. Is it possible to make it more efficient? It turns out there's an algorithm to handle this update in nearly constant time, more specifically, in `O(α(n))`, where `α(n)` is the inverse Ackermann function, which for most of the use cases, we can consider it as constant.

Below is the code for the union find algorithm. 

```python3
class UnionFind:
    def __init__(self, size):
        self.parent = [i for i in range(size)]
        self.rank = [1] * size

    def find(self, u):
        if self.parent[u] == u:
            return u
        self.parent[u] = self.find(self.parent[u])
        return self.parent[u]

    def union(self, u, v):
        u = self.find(u)
        v = self.find(v)
        if u == v:
            return
        if self.rank[u] < self.rank[v]:
            self.parent[u] = v
            self.rank[v] += self.rank[u]
        else:
            self.parent[v] = u
            self.rank[u] += self.rank[v]
```
