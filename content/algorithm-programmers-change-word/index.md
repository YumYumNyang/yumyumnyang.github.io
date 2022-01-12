---
emoji: 🤔
title: "[프로그래머스] H-Index 풀이"
date: "2022-01-12 21:11:00"
author: 얌얌냥이
tags: 알고리즘 프로그래머스 정렬 풀이 h-index 자바스크립트 
categories: algorithm
---


## ✏️ 문제
---
두 개의 단어 begin, target과 단어의 집합 words가 있습니다. 아래와 같은 규칙을 이용하여 begin에서 target으로 변환하는 가장 짧은 변환 과정을 찾으려고 합니다.

1. 한 번에 한 개의 알파벳만 바꿀 수 있습니다.
2. words에 있는 단어로만 변환할 수 있습니다.
예를 들어 begin이 "hit", target가 "cog", words가 ["hot","dot","dog","lot","log","cog"]라면 "hit" -> "hot" -> "dot" -> "dog" -> "cog"와 같이 4단계를 거쳐 변환할 수 있습니다.

두 개의 단어 begin, target과 단어의 집합 words가 매개변수로 주어질 때, 최소 몇 단계의 과정을 거쳐 begin을 target으로 변환할 수 있는지 return 하도록 solution 함수를 작성해주세요.

### 🚨 제한 사항
- 각 단어는 알파벳 소문자로만 이루어져 있습니다.
- 각 단어의 길이는 3 이상 10 이하이며 모든 단어의 길이는 같습니다.
- words에는 3개 이상 50개 이하의 단어가 있으며 중복되는 단어는 없습니다.
- begin과 target은 같지 않습니다.
- 변환할 수 없는 경우에는 0를 return 합니다.

## **🤔** 풀이 코드
---

```javascript
function solution(begin, target, words) {
    let answer = 0;
    
    let adj = Array.from({length: words.length + 1}, () => Array.from({length: words.length + 1}, () => 0))
    let visited = Array.from({length: words.length+1}, () => false);
    let isExist = 0;
    words.forEach((aWord, i) => {
        if(oneWordDiff(begin, aWord)){
            adj[0][i+1] = 1;
            adj[i+1][0] = 1;
        }
        words.forEach((bWord, j) => {
            if(oneWordDiff(aWord, bWord)){
                adj[i+1][j+1] = 1;
                adj[j+1][i+1] = 1;
            }
        })
        if(aWord === target) isExist = i+1;
    })
    
    if(isExist === 0) return 0;
    
    let cnt = 0;
    answer = words.length;
    function dfs(n){
        visited[n] = true;
        if(words[n-1] === target){
            answer = answer > cnt ? cnt : answer;
            return; 
        }
        
        for(let i = 0; i < words.length+1; i++){
            if(adj[n][i] === 1 && !visited[i]){
                cnt++;
                dfs(i)
                visited[i] = false;
                cnt--;
            }
        }
       
        return; 
    }
    
    dfs(0);
    
    return answer;
}
function oneWordDiff(a, b){
    let cnt = 0;
    for(let i = 0; i < a.length; i++){
        if(a[i] !== b[i]) cnt++;
    }
    return cnt === 1; 
}
```
## 😼 나의 풀이과정 
---
먼저, 글자들을 하나의 노드로 보고, 한글자씩 다른 글자들이 연결되어있는 그래프 형태로 생각하였습니다. 그래서 먼저 `oneWordDiff`라는 함수를 작성하여 한 글자만 다른지 확인하였고, `words` 배열을 돌면서 인접 여부를 `adj` 2차원 배열에 1로 표시하였습니다. 만약 `target`이 `words`에 없으면 바로 0을 답으로 리턴하도록 처리를 해주었습니다. 
`begin`과 `words`를 포함하는 인접 2차원 배열과, 방문 여부 1차원 배열을 만들어주었습니다.
그래서 `begin`부터 탐색을 시작하는데 인접하고 방문하지 않으면 그 노드에 대해 탐색을 합니다. 이때, 카운트를 `dfs`함수에 들어가기 전에 1 더해주고 탐색이 끝나면 1을 빼주는 식으로 경로의 길이를 체크해줍니다. 탐색을 하다가 `target`과 같은 노드가 나오면 그때의 길이와 이전에 저장해두었던 길이를 비교해서 짧은 것으로 갱신을 해줍니다. 
그러면 최소 몇 단계를 거쳐서 `target`으로 바뀔 수 있는지 알 수 있습니다. 

## ✨ 알게된 점
---

- 모든 경로를 다 찾아보고 싶으면 dfs 재귀함수가 끝난 후에 방문 여부를 리셋해줍니다. 



```toc

```
