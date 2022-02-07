---
emoji: 😈
title: "[프로그래머스] 가장 긴 팰린드롬 풀이"
date: "2022-02-07 15:00:00"
author: 얌얌냥이
tags: 알고리즘 프로그래머스 가장 긴 팰린드롬 javascript
categories: algorithm
---


## **✏️** 문제

---

앞뒤를 뒤집어도 똑같은 문자열을 팰린드롬(palindrome)이라고 합니다.문자열 s가 주어질 때, s의 부분문자열(Substring)중 가장 긴 팰린드롬의 길이를 return 하는 solution 함수를 완성해 주세요.

예를들면, 문자열 s가 "abcdcba"이면 7을 return하고 "abacde"이면 3을 return합니다.

### **🚨** 제한사항

- 문자열 s의 길이 : 2,500 이하의 자연수
- 문자열 s는 알파벳 소문자로만 구성

### 📌 입출력 예시

---

| s | answer |
| --- | --- |
| "abcdcba" | 7 |
| "abacde" | 3 |

## **🤔** 풀이 코드

---

```jsx
function solution(s)
{
    var answer = 0;
    
    for(let i = 0; i < s.length; i++){
        let left = i;
        let right = i;
        while(left >= 0 && right < s.length && s[left] === s[right]){
            left--;
            right++;
        }
        answer = answer > right-left-1 ? answer : right-left-1;
        left = i;
        right = i+1;
        
        while(left >=0 && right < s.length && s[left] === s[right]){
            left--;
            right++;
        }
        answer = answer > right-left-1 ? answer : right-left-1;
    }
    
    return answer;
}
```

## 😼 나의 풀이과정

---

먼저 팰린드롬이 되는 경우는 팰린드롬이 홀수개의 문자로 이루어진 경우와, 짝수개의 경우로 이루어진 경우가 있습니다. 두 경우를 나누어서 찾았습니다. 문자열 하나하나를 중간 문자로 만들어서 그 인덱스부터 왼쪽 오른쪽을 각각 빼고 더하면서 검사해나가도록 했습니다. 

## ✨ 알게된 점

---

다른 방법은 없는지 생각해보기! DP로도 풀 수 있다.
```toc

```
