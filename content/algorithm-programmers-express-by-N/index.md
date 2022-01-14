---
emoji: 🤔
title: "[프로그래머스] N으로 표현 풀이"
date: "2022-01-14 11:01:00"
author: 얌얌냥이
tags: 알고리즘 프로그래머스 N으로 표현 풀이 DP 다이나믹프로그래밍 자바스크립트 
categories: algorithm
---


## **✏️** 문제

---

아래와 같이 5와 사칙연산만으로 12를 표현할 수 있습니다.

12 = 5 + 5 + (5 / 5) + (5 / 5)12 = 55 / 5 + 5 / 512 = (55 + 5) / 5

5를 사용한 횟수는 각각 6,5,4 입니다. 그리고 이중 가장 작은 경우는 4입니다.이처럼 숫자 N과 number가 주어질 때, N과 사칙연산만 사용해서 표현 할 수 있는 방법 중 N 사용횟수의 최솟값을 return 하도록 solution 함수를 작성하세요.

### **🚨** 제한사항

- N은 1 이상 9 이하입니다.
- number는 1 이상 32,000 이하입니다.
- 수식에는 괄호와 사칙연산만 가능하며 나누기 연산에서 나머지는 무시합니다.
- 최솟값이 8보다 크면 -1을 return 합니다.

### 📌 입출력 예시

| N | number | return |
| --- | --- | --- |
| 5 | 12 | 4 |
| 2 | 11 | 3 |

## **🤔** 풀이 코드

---

```jsx
function solution(N, number) {
    let answer = 0;
    
    
    if(N === number) return 1;
    
    let poss = Array.from({length : 8}, () => new Set());
    poss[0].add(0);
    poss[1].add(N);
    
    for(let n = 2; n <= 8; n++){
        let newposs = new Set();
        newposs.add(makeNumber(N, n));
        for(let i = n-1; i >= 1; i--){
            poss[i].forEach(left => {
                poss[n-i].forEach(right => {
                    newposs.add(left + right);
                    newposs.add(left - right);
                    newposs.add(Math.floor(left/right));
                    newposs.add(left*right);
                })
            })
        }
        if(newposs.has(number)) return n;
        poss[n] = newposs;
    }
    return -1;
}
function makeNumber(N,i){
    let newNum = 0;
    for(let k = 0; k < i; k++){
        newNum += N*(Math.pow(10, k));
    }
    return newNum;
}
```

## 😼 나의 풀이과정

---

이 문제는 다이나믹 프로그래밍으로 풀어야하는 문제입니다. 

다이나믹 프로그래밍으로 풀어야 하는 유형은 다음과 같은 조건을 만족할 때입니다.

1. 최적 부분 구조 (Optimal Substructure)
    
    큰 문제를 작은 문제로 나눌 수 있으며 작은 문제의 답을 모아서 큰 문제 해결 
    
2. 중복되는 부분 문제 (Overlapping Subproblem)
    
    동일한 작은 문제를 반복적으로 해결
    

이 문제에서 먼저 어떻게 풀어야하는지 파악을 했습니다. 2개로 표현할 수 있는 숫자는 1개로 표현할 수 있는 숫자들과 1개로 표현할 수 있는 숫자들의 사칙연산 값과 N이 2번 붙여져 있는 `NN`입니다. 3개로 표현할 수 있는 숫자는 2개로 표현할 수 있는 숫자와 1개로 표현할 수 있는 숫자들의 사칙연산 값과 `NNN`임을 알 수 있습니다. 이를 통해 `number`를 만들기 위해서 최소 `n`개의 `N`이 필요하다면 `i`을 `n-1부터 1까지` 반복하면서 `i`개로 만들 수 있는 수, `n-i`로 만들 수 있는 수를 조합해서 중복이 없도록 `Set`에 추가를 해주었습니다. 이 과정이 끝난 뒤에 새로 만들어진 숫자 중에 `number`가 있으면 그 때의 `n`값을 리턴하도록 합니다. 이 과정을 `n`이 `8`일 때까지 반복하고, 그 전에 리턴이 되지 않았다면 8번보다 많이 사용해야한다는 의미이므로 `-1`을 리턴합니다. 

## ✨ 알게된 점

---

- 8보다 크면 -1을 리턴하라는 말은 8까지는 확인해보아야 한다는 말. (착각하지 않기)
- 다이나믹 프로그래밍으로 문제를 풀려고 하면 먼저 점화식을 생각해보기.

```toc

```
