---
emoji: 🅚
title: "[프로그래머스] k진수로 소수 개수 구하기"
date: "2022-03-21 20:05:00"
author: 얌얌냥이
tags: 알고리즘 프로그래머스 자바스크립트 소수 k진수
categories: algorithm
---


## **✏️** 문제

---

### 문제 설명

양의 정수 `n`이 주어집니다. 이 숫자를 `k`진수로 바꿨을 때, 변환된 수 안에 아래 조건에 맞는 소수(Prime number)가 몇 개인지 알아보려 합니다.

- `0P0`처럼 소수 양쪽에 0이 있는 경우
- `P0`처럼 소수 오른쪽에만 0이 있고 왼쪽에는 아무것도 없는 경우
- `0P`처럼 소수 왼쪽에만 0이 있고 오른쪽에는 아무것도 없는 경우
- `P`처럼 소수 양쪽에 아무것도 없는 경우
- 단, `P`는 각 자릿수에 0을 포함하지 않는 소수입니다.
    - 예를 들어, 101은 `P`가 될 수 없습니다.

예를 들어, 437674을 3진수로 바꾸면 `211`0`2`01010`11`입니다. 여기서 찾을 수 있는 조건에 맞는 소수는 왼쪽부터 순서대로 211, 2, 11이 있으며, 총 3개입니다. (211, 2, 11을 `k`진법으로 보았을 때가 아닌, 10진법으로 보았을 때 소수여야 한다는 점에 주의합니다.) 211은 `P0` 형태에서 찾을 수 있으며, 2는 `0P0`에서, 11은 `0P`에서 찾을 수 있습니다.

정수 `n`과 `k`가 매개변수로 주어집니다. `n`을 `k`진수로 바꿨을 때, 변환된 수 안에서 찾을 수 있는 **위 조건에 맞는 소수**의 개수를 return 하도록 solution 함수를 완성해 주세요.

### **🚨** 제한사항

- 1 ≤ `n` ≤ 1,000,000
- 3 ≤ `k` ≤ 10

### 📌 입출력 예시

---

| n | k | result |
| --- | --- | --- |
| 437674 | 3 | 3 |
| 110011 | 10 | 2 |

## **🤔** 풀이 코드

---

```jsx
function solution(n, k) {
    let answer = 0;
    let numStr = ""
    let str = ""
    while(n/k > 0){
        let divide = parseInt(n%k);
        n = parseInt(n/k);
        if(divide === 0 || n/k <= 0){
            if(n/k <= 0) numStr = numStr + divide.toString(); 
            if(numStr !== "" && checkPrimeNumber(parseInt(numStr.split("").reverse().join("")))) answer++;
            numStr = "";
        }else{
            numStr = numStr + divide.toString();   
        }
        str = str + divide.toString(); 
    }
    
    
    return answer;
}

function checkPrimeNumber(num){
    if(num <= 1) return false;
    if(num === 2) return true;
    for(let i = 2; i <= parseInt(Math.sqrt(num)); i++){
        if(num%i === 0) return false;
    }
    return true;
}
```

## 😼 나의 풀이과정

---

먼저 n을 k진수로 어떻게 바꿀 수 있을까 생각해보았다. n을 k로 나눈 것이 0이 되기 전까지 반복하면서 n을 k로 나눈 나머지를 합치고, n은 n을 k로 나눈 몫으로 바꾸어 준다. 나중에 나머지를 모두 차례대로 합친 것을 뒤집어주면 변환된 수를 구할 수 있다. 문제에서 원하는 대로 0으로 막혀있는 수를 구해서 소수인지 확인하고 소수이면 답에 1을 더해주었다. 이때, 1번 테스트 케이스에서 시간 초과가 발생했는데, 소수를 체크해주는 함수에서 범위를 숫자에 루트를 씌운 값을 정수로 만든 수까지만 검사해서 불필요한 검사들을 제거함으로써 1번 테스트 케이스를 풀 수 있었다. 

## ✨ 알게된 점

---

- 소수 판별시, 범위를 루트를 씌운 것까지 확인하면 된다.
- k진수로 표현하는 방법

```toc

```
