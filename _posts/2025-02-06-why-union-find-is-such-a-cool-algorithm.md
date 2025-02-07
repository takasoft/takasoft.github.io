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

Let's say we are asked to check if two nodes u and v are within the same disjoint set, for example u = 1 and v = 3. How can we check this efficiently?

One way is to run BFS or DFS from u to v. This approach should be fine if we only need to check one pair. But what if we need to check a large number of pairs?

Let's say there are `V` nodes and `E` edges, where `V and E = 5 * 10^6 = 5 million`. We are also given `k` number of queries, where `k = 5 * 10^6 = 5 million`. For this scale, we need a really efficient algorithm to find the connection.

Let's think about using the typical BFS/DFS approach again. We can come up with an algorithm which will keep track of visited nodes to efficiently traverse the entire graph. Then the algorithm can return the following mapping.

Here, `parent` is any node that every node in the disjoint set can reach to. We can also call this the representative of the disjoint set.  

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

We can construct this mapping in `O(V)` time complexity because we will only visit each node once. We can then just check if the two nodes have the same parent for each query. The time complexity will be `O(V + k)`, which is duable. 

However, a problem arrises when we want to continue to actively connect disjoint sets. Let's say we want to connect the nodes 2 and 5. The graph will look like the following.

```
0---1---2
|       |
3   4---5---6
```

We have to first look at the `node -> parent` mapping and check if those two nodes have the same parent. If they are different, then we need to update the parents so that all nodes in those connected sets have the same parent. In this case, I picked 0. As a result, the mapping changes as follows. 

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

This operation can take `O(V)` because, in the worst case, we have to update almost every node. Now, if we add another requirement that a new connection gets added every time we run a query, our current approach becomes unfeasible. The time complexity will be `O(V + V * k) = O(V * k)`. With a rough calculation, assuming we have a computer that can handle 10^8 operations per second, then we will need `(5 * 10^6) * (5 * 10^6) / 10^8 ~= 69.4 hours` just to calculate this. 

Is it possible to make it more efficient? It turns out there's an algorithm to handle this graph update in nearly constant time, more specifically, in `O(α(n))` time complexity, where `α(n)` is the inverse Ackermann function, which for most of the use cases, we can consider as constant. So effectively, we can solve the problem nearly in `O(k)` time complexity.

Below is the complete code for the union find algorithm. 

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
