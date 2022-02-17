---
emoji: 🚕
title: "[프로그래머스] 합승 택시 요금"
date: "2022-02-10 14:09:00"
author: 얌얌냥이
tags: 알고리즘 프로그래머스 최소경로 벨만포드 다익스트라 우선순위큐 javascript
categories: algorithm
---


## **✏️** 문제

---

**[본 문제는 정확성과 효율성 테스트 각각 점수가 있는 문제입니다.]**

밤늦게 귀가할 때 안전을 위해 항상 택시를 이용하던 `무지`는 최근 야근이 잦아져 택시를 더 많이 이용하게 되어 택시비를 아낄 수 있는 방법을 고민하고 있습니다. "무지"는 자신이 택시를 이용할 때 동료인 `어피치` 역시 자신과 비슷한 방향으로 가는 택시를 종종 이용하는 것을 알게 되었습니다. "무지"는 "어피치"와 귀가 방향이 비슷하여 택시 합승을 적절히 이용하면 택시요금을 얼마나 아낄 수 있을 지 계산해 보고 "어피치"에게 합승을 제안해 보려고 합니다.

![https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/715ff493-d1a0-44d8-9273-a785280b3f1e/2021_kakao_taxi_01.png](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/715ff493-d1a0-44d8-9273-a785280b3f1e/2021_kakao_taxi_01.png)

위 예시 그림은 택시가 이동 가능한 반경에 있는 6개 지점 사이의 이동 가능한 택시노선과 예상요금을 보여주고 있습니다.그림에서 `A`와 `B` 두 사람은 출발지점인 4번 지점에서 출발해서 택시를 타고 귀가하려고 합니다. `A`의 집은 6번 지점에 있으며 `B`의 집은 2번 지점에 있고 두 사람이 모두 귀가하는 데 소요되는 예상 최저 택시요금이 얼마인 지 계산하려고 합니다.

- 그림의 원은 지점을 나타내며 원 안의 숫자는 지점 번호를 나타냅니다.
    - 지점이 n개일 때, 지점 번호는 1부터 n까지 사용됩니다.
- 지점 간에 택시가 이동할 수 있는 경로를 간선이라 하며, 간선에 표시된 숫자는 두 지점 사이의 예상 택시요금을 나타냅니다.
    - 간선은 편의 상 직선으로 표시되어 있습니다.
    - 위 그림 예시에서, 4번 지점에서 1번 지점으로(4→1) 가거나, 1번 지점에서 4번 지점으로(1→4) 갈 때 예상 택시요금은 `10`원으로 동일하며 이동 방향에 따라 달라지지 않습니다.
- 예상되는 최저 택시요금은 다음과 같이 계산됩니다.
    - 4→1→5 : `A`, `B`가 합승하여 택시를 이용합니다. 예상 택시요금은 `10 + 24 = 34`원 입니다.
    - 5→6 : `A`가 혼자 택시를 이용합니다. 예상 택시요금은 `2`원 입니다.
    - 5→3→2 : `B`가 혼자 택시를 이용합니다. 예상 택시요금은 `24 + 22 = 46`원 입니다.
    - `A`, `B` 모두 귀가 완료까지 예상되는 최저 택시요금은 `34 + 2 + 46 = 82`원 입니다.

지점의 개수 n, 출발지점을 나타내는 s, `A`의 도착지점을 나타내는 a, `B`의 도착지점을 나타내는 b, 지점 사이의 예상 택시요금을 나타내는 fares가 매개변수로 주어집니다. 이때, `A`, `B` 두 사람이 s에서 출발해서 각각의 도착 지점까지 택시를 타고 간다고 가정할 때, 최저 예상 택시요금을 계산해서 return 하도록 solution 함수를 완성해 주세요.만약, 아예 합승을 하지 않고 각자 이동하는 경우의 예상 택시요금이 더 낮다면, 합승을 하지 않아도 됩니다.

### **🚨** 제한사항

- 지점갯수 n은 3 이상 200 이하인 자연수입니다.
- 지점 s, a, b는 1 이상 n 이하인 자연수이며, 각기 서로 다른 값입니다.
    - 즉, 출발지점, `A`의 도착지점, `B`의 도착지점은 서로 겹치지 않습니다.
- fares는 2차원 정수 배열입니다.
- fares 배열의 크기는 2 이상 `n x (n-1) / 2` 이하입니다.
    - 예를들어, n = 6이라면 fares 배열의 크기는 2 이상 15 이하입니다. (`6 x 5 / 2 = 15`)
    - fares 배열의 각 행은 [c, d, f] 형태입니다.
    - c지점과 d지점 사이의 예상 택시요금이 `f`원이라는 뜻입니다.
    - 지점 c, d는 1 이상 n 이하인 자연수이며, 각기 서로 다른 값입니다.
    - 요금 f는 1 이상 100,000 이하인 자연수입니다.
    - fares 배열에 두 지점 간 예상 택시요금은 1개만 주어집니다. 즉, [c, d, f]가 있다면 [d, c, f]는 주어지지 않습니다.
- 출발지점 s에서 도착지점 a와 b로 가는 경로가 존재하는 경우만 입력으로 주어집니다.

### 📌 입출력 예시

---

| n | s | a | b | fares | result |
| --- | --- | --- | --- | --- | --- |
| 6 | 4 | 6 | 2 | [[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]] | 82 |
| 7 | 3 | 4 | 1 | [[5, 7, 9], [4, 6, 4], [3, 6, 1], [3, 2, 3], [2, 1, 6]] | 14 |
| 6 | 4 | 5 | 6 | [[2,6,6], [6,3,7], [4,6,7], [6,5,11], [2,5,12], [5,3,20], [2,4,8], [4,3,9]] | 18 |

## **🤔** 풀이 코드

---

```jsx
function solution(n, s, a, b, fares) {
  let answer = Infinity;
  let minPath = [];
  for (let i = 0; i <= n; i++) {
    minPath.push([]);
    for (let j = 0; j <= n; j++) {
      if (i === j) minPath[i].push(0);
      else minPath[i].push(Infinity);
    }
  }
  const graph = {};
  fares.forEach(([from, to, weight]) => {
    if (!graph[from]) {
      graph[from] = { [to]: weight };
    } else {
      graph[from][to] = weight;
    }
    if (!graph[to]) {
      graph[to] = { [from]: weight };
    } else {
      graph[to][from] = weight;
    }
  });

  let startDst = dijkstra(s, n, graph);
  let aDst = dijkstra(a, n, graph);
  let bDst = dijkstra(b, n, graph);

  for (let i = 1; i <= n; i++) {
    let dist = startDst[i] + aDst[i] + bDst[i];
    answer = answer < dist ? answer : dist;
  }
  return answer;
}

function Node(key, priority) {
  this.key = key;
  this.priority = priority;
}

function PriorityQueue() {
  this.data = [];
}

PriorityQueue.prototype.push = function push(key, priority) {
  const node = new Node(key, priority);
  this.data.push(node);
  let index = this.data.length - 1;
  while (index > 0) {
    // 큐의 맨뒤에 넣고 맞는 자리에 올때까지 부모와 자리를 바꾼다.
    const parentIndex = Math.floor((index - 1) / 2);
    const parent = this.data[parentIndex];
    if (node.priority < parent.priority) {
      swap(this.data, index, parentIndex);
      index = parentIndex;
    } else {
      break;
    }
  }
};

PriorityQueue.prototype.shift = function shift() {
  const minNode = this.data[0] || {}; // 맨위에 있는 것이 min이다.
  const lastNode = this.data.pop(); // 제일 뒤에 있는 것을 꺼낸후 다시 재 정렬해준다.
  if (this.data.length < 1) {
    return minNode;
  }
  this.data[0] = lastNode;
  let index = 0;
  while (index < this.data.length) {
    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;
    const leftNode = this.data[leftIndex] || {};
    const rightNode = this.data[rightIndex] || {};
    let smallerIndex;
    if (leftNode.priority < lastNode.priority) {
      smallerIndex = leftIndex;
    } // 왼쪽 노드가 적으면 왼쪽 자식 노드 가리킴
    if (!smallerIndex && rightNode.priority < lastNode.priority) {
      smallerIndex = rightIndex;
    } // 왼쪽 자식 노드 없, 또는 우선순위 낮 => 오른쪽 자식 노드가 우선순위가 높으면 오른쪽 자식 노드 가르킴
    if (smallerIndex && rightNode.priority < leftNode.priority) {
      smallerIndex = rightIndex;
    } // 오른쪽 자식노드가 왼쪽보다 우선순위 높 -> 오른쪽으로 바꿔줌
    if (!smallerIndex) {
      break;
    } // !왼쪽, 오른쪽 자식
    swap(this.data, smallerIndex, index);
    index = smallerIndex;
  }
  return minNode;
};

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

function dijkstra(start, n, graph) {
  let distance = Array.from({ length: n + 1 }, () => Infinity);
  distance[start] = 0;
  const pq = new PriorityQueue();
  pq.push(start, 0);
  let cnt = 0;
  while (pq.data.length > 0) {
    const node = pq.shift();
    if (distance[node.key] < node.priority) {
      continue;
    }
    const neighbors = graph[node.key] || {}; // 인접 노드 탐색

    Object.keys(neighbors).forEach((neighborKey) => {
      const alt = distance[node.key] + neighbors[neighborKey]; //시작 -> 노드 + 노드 -> 인접노드
      if (alt < distance[neighborKey]) {
        distance[neighborKey] = alt;
        pq.push(neighborKey, alt);
      }
    });
  }
  return distance;
}
```

## 😼 나의 풀이과정

---

우선순위 큐를 활용한 다익스트라알고리즘을 사용하여 문제를 풀었습니다.

최단 경로를 찾아내는 알고리즘에는 다익스트라 알고리즘, 플로이드 워셜, 벨만 포드가 있습니다. 

다익스트라는 하나의 정점으로부터 다른 모든 정점까지의 최단 경로를 찾아내는 알고리즘으로, BFS를 기본으로 합니다. 음수 가중치가 있는 경우에 사용할 수 없습니다. 다익스트라 알고리즘에는 시작 정점에서 다른 정점으로 가는 최단 거리를 기록하는 배열이 있어야 하고, 무한대로 초기화 합니다.  매 단계에서 방문하지 않은 정점들 중에서 가장 거리가 짧은 정점을 방문합니다. 새로운 정점이 추가되면 다른 정점들의 거리 값이 변경이 됩니다. 더 짧은 거리가 나타나거나 무한대에서 직접 경로가 생겼을 때 거리를 갱신해줍니다. 

다익스트라에서 우선순위 큐를 사용하면 더 빠르게 최소 경로를 찾아낼 수 있습니다. 우선순위 큐에서 최소값을 뽑아내서 검사하므로 갱신횟수가 일반 큐를 사용하는 것보다 현저히 적어집니다. 우선순위 큐를 사용하면 O(ElogV)의 시간복잡도를 가지게 됩니다. 우선순위 큐를 사용하면 방문 처리를 따로 해주지 않아도 됩니다. 기존에 기록한 최단 거리보다 크다면 이미 방문했던 노드이므로 그냥 무시하고 넘어갈 수 있습니다. 

이렇게 다익스트라를 사용해서 먼저 시작 위치부터 다른 위치들까지의 최소 경로를 저장하고, A부터 다른 위치들까지의 최소 경로, B부터 다른 위치들까지의 최소경로를 저장해서, A와 B가 시작점부터 합승할 위치를 1부터 N까지 경우를 생각해서 시작점부터 합승이 끝나는 위치까지의 비용, A가 내리고 혼자가는 비용, B가 내려서 혼자가는 비용을 다 더한 것이 작은 경우를 찾아냅니다. 

## ✨ 알게된 점

---

- 최소 경로 알고리즘에 대해 더 자세히 공부하고, 효율성을 생각해서 자바스크립트에는 따로 존재하지 않는 우선순위를 직접 구현해볼 수 있었음
- 왜 우선순위 큐를 사용하면 다익스트라 알고리즘을 더 빠르게 할 수 있는지 공부해볼 수 있었음
- 이외에도 벨만 포드 알고리즘을 사용해서 모든 노드부터 다른 모든 노드들까지의 거리를 계산해서 할 수 도있지만 시간이 훨씬 오래걸릴 것으로 예상됨 ⇒ 확인을 해보니 평균적으로 우선순위 큐를 활용한 방법이 더 적게 걸리는 것을 확인할 수 있었음
```toc

```
