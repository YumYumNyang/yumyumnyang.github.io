---
emoji: 🤔
title: "[프로그래머스] 단어변환 풀이"
date: "2022-01-10 21:45:00"
author: 얌얌냥이
tags: 알고리즘 프로그래머스 단어변환 풀이 dfs bfs 자바스크립트 
categories: algorithm
---

## **✏️** 문제
---
H-Index는 과학자의 생산성과 영향력을 나타내는 지표입니다. 어느 과학자의 H-Index를 나타내는 값인 h를 구하려고 합니다. 위키백과[1](https://programmers.co.kr/learn/courses/30/lessons/42747#fn1)에 따르면, H-Index는 다음과 같이 구합니다.

어떤 과학자가 발표한 논문 `n`편 중, `h`번 이상 인용된 논문이 `h`편 이상이고 나머지 논문이 h번 이하 인용되었다면 `h`의 최댓값이 이 과학자의 H-Index입니다.

어떤 과학자가 발표한 논문의 인용 횟수를 담은 배열 citations가 매개변수로 주어질 때, 이 과학자의 H-Index를 return 하도록 solution 함수를 작성해주세요.

## **🚨** 제한사항

- 과학자가 발표한 논문의 수는 1편 이상 1,000편 이하입니다.
- 논문별 인용 횟수는 0회 이상 10,000회 이하입니다.

## 📌 입출력 예시

| citations | return |
| --- | --- |
| [3, 0, 6, 1, 5] | 3 |

## **🤔** 풀이 코드
---

```jsx
function solution(citations) {
    citations.sort((a,b) => b-a); 
    let answer = 0;
    while(answer + 1 <= citations[answer]){
         answer++;
    }
     return answer;
    // for(let i = 0; i < citations.length; i++){
    //     if(i+1 > citations[i]){
    //         return i;
    //     }
    //     if(i+1 === citations[i]){
    //         answer = i+1 ;
    //     }
    // }
    // return answer === 0 ? citations.length : answer;
}
```

## 😼 나의 풀이과정
---

먼저 인용 횟수를 내림차순으로 정렬하였습니다. 그리고 `h` 를 0부터 더해나가면서, citation 배열에서 h번 인덱스가 가리키고 있는 값보다 (인용 횟수) 보다  그 citation 횟수이상 논문의 수가 작거나 같을 때까지 반복합니다. 반복이 멈추게 되는 시점은 citation[i]보다 i+1이 커지는 시점입니다.

처음에 풀때 정렬 후에 citation[i]보다 갯수가 크면 멈추고, citation[i]와 갯수가 같으면 i+1을 넣어주도록 했으며, answer가 0인 경우에 H-index가 최대로 citation의 길이만큼 가질 수 있다는 것으로 생각하였습니다.

이렇게 풀지않고 while문을 사용해서 반복하면 좀 더 명확하게 구할 수 있음을 알게되었습니다. 

## ✨ 알게된 점
---

- 조건과 반복을 잘 생각해보기


```toc

```
