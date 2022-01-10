---
emoji: 🧢
title: [프로그래머스] 네트워크 풀이
date: '2022-01-10 21:18:00'
author: 얌얌냥이
tags: 알고리즘 프로그래머스 네트워크 dfs bfs 자바스크립트 
categories: All algorithm
---


## ✏️ 문제
---
네트워크란 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태를 의미합니다. 예를 들어, 컴퓨터 A와 컴퓨터 B가 직접적으로 연결되어있고, 컴퓨터 B와 컴퓨터 C가 직접적으로 연결되어 있을 때 컴퓨터 A와 컴퓨터 C도 간접적으로 연결되어 정보를 교환할 수 있습니다. 따라서 컴퓨터 A, B, C는 모두 같은 네트워크 상에 있다고 할 수 있습니다.

컴퓨터의 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때, 네트워크의 개수를 return 하도록 solution 함수를 작성하시오.

### 🚨 제한 사항
- 컴퓨터의 개수 n은 1 이상 200 이하인 자연수입니다.
- 각 컴퓨터는 0부터 n-1인 정수로 표현합니다.
- i번 컴퓨터와 j번 컴퓨터가 연결되어 있으면 computers[i][j]를 1로 표현합니다.
- computer[i][i]는 항상 1입니다.

## 🤔 풀이
---
### ✨ 1번 풀이

```javascript
function solution(n, computers) {
    let answer = 0;
    
    let visited = Array.from({length : n}, ()=>false);
    // 방문 여부를 체크하기 위한 배열입니다.
    
    function dfs(k){ 
        visited[k] = true; // k번째 노드에 대해서 방문 체크를 해줍니다. 
        for(let i = 0; i < n; i++){
            if(computers[k][i] === 1 && !visited[i]){ 
                // k번째 노드와 인접하는데 방문하지 않은 노드가 있으면 탐색합니다. 
                dfs(i); 
            }
        }  
        return;
    }
    
    for(let k = 0; k < n; k++){ 
      // 처음 시작한 0번째 노드만 체크하는 것이 아니라, 모든 노드에 대해서 연결 여부를 따져야 합니다. 
        if(!visited[k]){ // 방문하지 않았다면 이 노드에 대한 경로를 찾고, answer를 1 증가시켜줍니다. 
            dfs(k);
            answer++;
        }
    }    
    
    return answer;
}
```

먼저, DFS로 푼 풀이입니다. DFS는 깊이 우선 탐색으로 깊은 부분을 우선적으로 탐색하는 알고리즘입니다. 스택 또는 재귀함수를 사용해서 구현할 수 있습니다. 

DFS로 구현하기 위해서 방문 여부를 체크하기 위한 크기가 n인 배열을 만들어주었습니다. 자바스크립트에서는 `Array.from()` 을 사용하면 원하는 배열을 쉽게 만들 수 있습니다. 
방문한 노드에 대해서 먼저 방문 체크를 해주고, 그 노드에 인접한 아직 방문하지 않은 노드에 대해서 탐색을 합니다.
`computers` 배열에서 인접 여부를 알 수 있습니다. 
이 과정을 모든 노드에 대해서 방문하지 않은 노드를 대상으로 반복하면 총 네트워크 개수를 알 수 있습니다. 

### ✨ 2번 풀이

```javascript
function solution(n, computers) {
    let answer = 0;
    let visited = Array.from({length : n}, ()=>false); // 방문 여부 체크 배열
    
    for(let node = 0; node < n; node++){
        if(!visited[node]){ // 방문하지 않았다면
            let queue = [node]; // 큐에 추가하고 
            visited[node] = true; // 방문 처리하고 
            while(queue.length){ // 큐가 빌때까지 
                let q = queue.shift(); // 큐 맨앞 원소를 꺼내서 
                for(let i = 0; i < n; i++){
                    if(computers[q][i] === 1 && !visited[i]){ //인접하면서 방문하지 않은 노드이면 큐에 넣어주고, 방문처리 
                        queue.push(i);
                        visited[i] = true;
                    }
                }

            }
            answer++; 
        }   
    }
    return answer;
}


```

BFS를 사용한 풀이입니다. BFS는 너비 우선 탐색이며 가까운 노드부터 우선적으로 탐색하는 알고리즘입니다. 큐 자료구조를 사용하면 됩니다.

방문하지 않은 노드를 대상으로 bfs를 실시하면 모든 네트워크의 수를 얻을 수 있습니다. 
자바스크립트에서 큐 자료구조를 사용하고 싶으면 배열에서 큐에 넣는 동작은 `push`로, 큐에서 원소를 빼는 동작은 `shift`함수를 사용하면 됩니다. 


```toc

```