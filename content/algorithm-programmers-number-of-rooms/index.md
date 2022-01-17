---
emoji: 🤔
title: "[프로그래머스] 방의 개수 풀이"
date: "2022-01-17 16:03:00"
author: 얌얌냥이
tags: 알고리즘 프로그래머스 그래프 풀이 방의 개수 자바스크립트 
categories: algorithm
---

## **✏️** 문제

---

원점(0,0)에서 시작해서 아래처럼 숫자가 적힌 방향으로 이동하며 선을 긋습니다.

![https://grepp-programmers.s3.amazonaws.com/files/ybm/ec8f232bf0/a47a6c2e-ec84-4bfb-9d4b-ff3ba589b42a.png](https://grepp-programmers.s3.amazonaws.com/files/ybm/ec8f232bf0/a47a6c2e-ec84-4bfb-9d4b-ff3ba589b42a.png)

ex) 1일때는 `오른쪽 위`로 이동

그림을 그릴 때, 사방이 막히면 방하나로 샙니다.이동하는 방향이 담긴 배열 arrows가 매개변수로 주어질 때, 방의 갯수를 return 하도록 solution 함수를 작성하세요.

### **🚨** 제한사항

- 배열 arrows의 크기는 1 이상 100,000 이하 입니다.
- arrows의 원소는 0 이상 7 이하 입니다.
- 방은 다른 방으로 둘러 싸여질 수 있습니다.

### 📌 입출력 예시

---

| arrows | return |
| --- | --- |
| [6, 6, 6, 4, 4, 4, 2, 2, 2, 0, 0, 0, 1, 6, 5, 5, 3, 6, 0] | 3 |

## **🤔** 풀이 코드

---

```jsx
const move = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];
function solution(arrows) {
  let answer = 0;
  let index = [0, 0];

  let visit = {}; // 정점 방문 표시
  let edgeVisit = {}; // 간선 방문 표시

  visit[`${index[0]}-${index[1]}`] = true; // 먼저 0,0에 대한 방문 표시

  arrows.forEach((arrow) => {
    for (let i = 0; i < 2; i++) {
      // 모래시계 모양

      let next = [index[0] + move[arrow][0], index[1] + move[arrow][1]];
      if (
        visit[`${next[0]}-${next[1]}`] === true &&
        !edgeVisit[`${index[0]}-${index[1]}:${next[0]}-${next[1]}`]
      ) {
        // 방문할 노드가 이미 방문한 적이 있고, 그때의 간선이 지난 적이 없으면 새로운 사이클을 발견한 것.
        answer++; // 답에 1 더하기
      } else {
        visit[`${next[0]}-${next[1]}`] = true; // 다음 방문 노드를 방문했다고 체크
      }
      edgeVisit[`${index[0]}-${index[1]}:${next[0]}-${next[1]}`] = true; // 간선 방문 표시
      edgeVisit[`${next[0]}-${next[1]}:${index[0]}-${index[1]}`] = true; // 무방향이므로 양방향으로 체크
      index[0] = next[0];
      index[1] = next[1];
    }
  });

  return answer;
}
```

## 😼 나의 풀이과정

---

처음에 다 그래프를 설정해준다음에 해야하나 생각을 했는데, 생각해보니 arrow를 하나하나 처리하면서 방문했던 정점에 다시 오면 사이클이 생긴다고 생각을 하였습니다. 그래서 arrow를 반복하면서 방문할 노드가 이미 방문한 적이 있고,  간선을 지난 적이 없다면 답에 1을 더해주었고, 방문한 적이 없으면 방문했다고 체크를 해줍니다. 그리고 무방향이기 때문에 양쪽을 번갈아서 간선 방문을 했다고 체크해주고 현재 노드값을 갱신해줍니다. 그런데 문제가 있었습니다. 주어진 move를 더해주기만 하면 모래시계 모양에서 X자로 2개의 사이클이 생기는 경우를 알아내지 못하는  경우가 있었습니다. 그래서 move를 두번 더해주는 방식으로 진행하였습니다. 

## ✨ 알게된 점

---

- 자바스크립트 객체 키 잘 사용하기
- 예외 상황에서 어떻게 풀어야할지 잘 생각해보기

```toc

```
