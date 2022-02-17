---
emoji: 🗺
title: "[프로그래머스] 게임 맵 최단거리"
date: "2022-02-17 14:11:00"
author: 얌얌냥이
tags: 알고리즘 프로그래머스 게임맵 최단거리 bfs dp 자바스크립트 
categories: algorithm
---


## **✏️** 문제

---

ROR 게임은 두 팀으로 나누어서 진행하며, 상대 팀 진영을 먼저 파괴하면 이기는 게임입니다. 따라서, 각 팀은 상대 팀 진영에 최대한 빨리 도착하는 것이 유리합니다.

지금부터 당신은 한 팀의 팀원이 되어 게임을 진행하려고 합니다. 다음은 5 x 5 크기의 맵에, 당신의 캐릭터가 (행: 1, 열: 1) 위치에 있고, 상대 팀 진영은 (행: 5, 열: 5) 위치에 있는 경우의 예시입니다.

![https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/dc3a1b49-13d3-4047-b6f8-6cc40b2702a7/%E1%84%8E%E1%85%AC%E1%84%83%E1%85%A1%E1%86%AB%E1%84%80%E1%85%A5%E1%84%85%E1%85%B51_sxuruo.png](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/dc3a1b49-13d3-4047-b6f8-6cc40b2702a7/%E1%84%8E%E1%85%AC%E1%84%83%E1%85%A1%E1%86%AB%E1%84%80%E1%85%A5%E1%84%85%E1%85%B51_sxuruo.png)

위 그림에서 검은색 부분은 벽으로 막혀있어 갈 수 없는 길이며, 흰색 부분은 갈 수 있는 길입니다. 캐릭터가 움직일 때는 동, 서, 남, 북 방향으로 한 칸씩 이동하며, 게임 맵을 벗어난 길은 갈 수 없습니다.아래 예시는 캐릭터가 상대 팀 진영으로 가는 두 가지 방법을 나타내고 있습니다.

- 첫 번째 방법은 11개의 칸을 지나서 상대 팀 진영에 도착했습니다.

![https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/9d909e5a-ca95-4088-9df9-d84cb804b2b0/%E1%84%8E%E1%85%AC%E1%84%83%E1%85%A1%E1%86%AB%E1%84%80%E1%85%A5%E1%84%85%E1%85%B52_hnjd3b.png](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/9d909e5a-ca95-4088-9df9-d84cb804b2b0/%E1%84%8E%E1%85%AC%E1%84%83%E1%85%A1%E1%86%AB%E1%84%80%E1%85%A5%E1%84%85%E1%85%B52_hnjd3b.png)

- 두 번째 방법은 15개의 칸을 지나서 상대팀 진영에 도착했습니다.

![https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/4b7cd629-a3c2-4e02-b748-a707211131de/%E1%84%8E%E1%85%AC%E1%84%83%E1%85%A1%E1%86%AB%E1%84%80%E1%85%A5%E1%84%85%E1%85%B53_ntxygd.png](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/4b7cd629-a3c2-4e02-b748-a707211131de/%E1%84%8E%E1%85%AC%E1%84%83%E1%85%A1%E1%86%AB%E1%84%80%E1%85%A5%E1%84%85%E1%85%B53_ntxygd.png)

위 예시에서는 첫 번째 방법보다 더 빠르게 상대팀 진영에 도착하는 방법은 없으므로, 이 방법이 상대 팀 진영으로 가는 가장 빠른 방법입니다.

만약, 상대 팀이 자신의 팀 진영 주위에 벽을 세워두었다면 상대 팀 진영에 도착하지 못할 수도 있습니다. 예를 들어, 다음과 같은 경우에 당신의 캐릭터는 상대 팀 진영에 도착할 수 없습니다.

![https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/d963b4bd-12e5-45da-9ca7-549e453d58a9/%E1%84%8E%E1%85%AC%E1%84%83%E1%85%A1%E1%86%AB%E1%84%80%E1%85%A5%E1%84%85%E1%85%B54_of9xfg.png](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/d963b4bd-12e5-45da-9ca7-549e453d58a9/%E1%84%8E%E1%85%AC%E1%84%83%E1%85%A1%E1%86%AB%E1%84%80%E1%85%A5%E1%84%85%E1%85%B54_of9xfg.png)

게임 맵의 상태 maps가 매개변수로 주어질 때, 캐릭터가 상대 팀 진영에 도착하기 위해서 지나가야 하는 칸의 개수의 **최솟값**을 return 하도록 solution 함수를 완성해주세요. 단, 상대 팀 진영에 도착할 수 없을 때는 -1을 return 해주세요.

### **🚨** 제한사항

- maps는 n x m 크기의 게임 맵의 상태가 들어있는 2차원 배열로, n과 m은 각각 1 이상 100 이하의 자연수입니다.
    - n과 m은 서로 같을 수도, 다를 수도 있지만, n과 m이 모두 1인 경우는 입력으로 주어지지 않습니다.
- maps는 0과 1로만 이루어져 있으며, 0은 벽이 있는 자리, 1은 벽이 없는 자리를 나타냅니다.
- 처음에 캐릭터는 게임 맵의 좌측 상단인 (1, 1) 위치에 있으며, 상대방 진영은 게임 맵의 우측 하단인 (n, m) 위치에 있습니다.

### 📌 입출력 예시

---

| maps | answer |
| --- | --- |
| [[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]] | 11 |
| [[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,0],[0,0,0,0,1]] | -1 |

## **🤔** 풀이 코드

---

```jsx
function solution(maps) {
    var answer = Infinity;
    let dp = Array.from({length: maps.length},  () => Array.from({length: maps[0].length}, () => Infinity));
    
    
    dp[0][0] = 1;
    function isValid(a,b){
        if(a>=0 && a>=0 && a < maps.length && b < maps[0].length) return true;
        return false;
    }
    let queue = [[0,0]];
    
    while(queue.length){
        let [i, j]  = queue.shift();
        if(i=== maps.length-1 && j === maps[0].length-1){
            answer  = answer < dp[i][j] ? answer: dp[i][j];
        }
        //하
        if(isValid(i+1,j)&& maps[i+1][j] && dp[i][j]+1 < dp[i+1][j]){
            dp[i+1][j] = dp[i][j]+1;
            queue.push([i+1, j]);
        }//우
        if(isValid(i, j+1)&& maps[i][j+1] && dp[i][j]+1< dp[i][j+1]){
            dp[i][j+1] = dp[i][j]+1;
            queue.push([i, j+1]);
        }//상
        if(isValid(i-1, j)&& maps[i-1][j] && dp[i][j]+1 < dp[i-1][j]){
            dp[i-1][j] = dp[i][j]+1;
            queue.push([i-1, j]);
        }//좌
        if(isValid(i, j-1)&& maps[i][j-1] && dp[i][j]+1 < dp[i][j-1]){
            dp[i][j-1] = dp[i][j]+1
            queue.push([i, j-1]);
        }
    }
  
    return answer === Infinity ? -1 : answer;
}
```

## 😼 나의 풀이과정

---

이전에 풀었던 경주로 문제와 비슷하지만 그것보다는 쉬운 문제였습니다. 방향을 고려하지 않아도 되기 때문입니다.

큐에서 뺀 장소에서 bfs를 사용해서 갈 수 있는 곳의 인덱스를 큐에 넣어주는 식으로 큐가 빌때까지 반복한다. 지금 장소에서 1더한 것이 갈 곳에 저장된 최소 경로보다 적으면 이동하도록 하였습니다.

## ✨ 알게된 점

---

- 처음에 정사각형 배열인줄 알았습니다. 문제를 좀 더 주의해서 볼것.
- 최단 경로를 구할 때 bfs가 적합

```toc

```
