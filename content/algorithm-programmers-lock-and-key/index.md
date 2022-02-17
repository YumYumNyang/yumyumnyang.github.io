---
emoji: 🔐
title: "[프로그래머스] 자물쇠와 열쇠 풀이"
date: "2022-01-11 21:09:00"
author: 얌얌냥이
tags: 알고리즘 프로그래머스 자물쇠와 열쇠 풀이 배열 자바스크립트 
categories: algorithm
---


## **✏️** 문제
---
고고학자인 **튜브**는 고대 유적지에서 보물과 유적이 가득할 것으로 추정되는 비밀의 문을 발견하였습니다. 그런데 문을 열려고 살펴보니 특이한 형태의 **자물쇠**로 잠겨 있었고 문 앞에는 특이한 형태의 **열쇠**와 함께 자물쇠를 푸는 방법에 대해 다음과 같이 설명해 주는 종이가 발견되었습니다.

잠겨있는 자물쇠는 격자 한 칸의 크기가 `1 x 1`인 `N x N` 크기의 정사각 격자 형태이고 특이한 모양의 열쇠는 `M x M` 크기인 정사각 격자 형태로 되어 있습니다.

자물쇠에는 홈이 파여 있고 열쇠 또한 홈과 돌기 부분이 있습니다. 열쇠는 회전과 이동이 가능하며 열쇠의 돌기 부분을 자물쇠의 홈 부분에 딱 맞게 채우면 자물쇠가 열리게 되는 구조입니다. 자물쇠 영역을 벗어난 부분에 있는 열쇠의 홈과 돌기는 자물쇠를 여는 데 영향을 주지 않지만, 자물쇠 영역 내에서는 열쇠의 돌기 부분과 자물쇠의 홈 부분이 정확히 일치해야 하며 열쇠의 돌기와 자물쇠의 돌기가 만나서는 안됩니다. 또한 자물쇠의 모든 홈을 채워 비어있는 곳이 없어야 자물쇠를 열 수 있습니다.

열쇠를 나타내는 2차원 배열 key와 자물쇠를 나타내는 2차원 배열 lock이 매개변수로 주어질 때, 열쇠로 자물쇠를 열수 있으면 true를, 열 수 없으면 false를 return 하도록 solution 함수를 완성해주세요.

### **🚨** 제한사항

- key는 M x M(3 ≤ M ≤ 20, M은 자연수)크기 2차원 배열입니다.
- lock은 N x N(3 ≤ N ≤ 20, N은 자연수)크기 2차원 배열입니다.
- M은 항상 N 이하입니다.
- key와 lock의 원소는 0 또는 1로 이루어져 있습니다.
    - 0은 홈 부분, 1은 돌기 부분을 나타냅니다.

### 📌 입출력 예시

| key | lock | result |
| --- | --- | --- |
| [[0, 0, 0], [1, 0, 0], [0, 1, 1]] | [[1, 1, 1], [1, 1, 0], [1, 0, 1]] | true |

## **🤔** 풀이 코드
---

```jsx
function solution(key, lock) {
    let answer = true;
    let newLockLength = 2*key.length-2 + lock.length; 
    let newLock = Array.from({length: newLockLength}, () => Array.from({length: newLockLength}, () => -1));
    let padding = key.length-1;
    let cnt = 0;

    for(let i = 0; i < newLockLength; i++){
        for(let j = 0; j < newLockLength; j++){
            if(i >= padding && i < newLockLength-padding && j >= padding && j < newLockLength-padding){
                newLock[i][j] = lock[i-padding][j-padding];
                if(lock[i-padding][j-padding] === 0) cnt++;
            }
        }
    }
    
    if(cnt === 0) return true; 
    
    for(let i = 0; i < newLockLength-key.length; i++){
        for(let j = 0; j < newLockLength-key.length; j++){
            let check = cnt;
            for(let row = 0; row < key.length; row++){
                for(let col = 0; col < key.length; col++){
                    if(key[row][col] + newLock[i+row][j+col] === 2) break;
                    if(key[row][col] === 1 && newLock[i+row][j+col] === 0) check--;
                }
            } 
            if(check === 0) return true;
            
            check = cnt;
            for(let row = 0; row < key.length; row++){
                for(let col = 0; col < key.length; col++){
                    if(key[key.length-col-1][row] + newLock[i+row][j+col] === 2) break;
                    if(key[key.length-col-1][row] === 1 && newLock[i+row][j+col] === 0) check--;
                }
            }
            if(check === 0) return true;
            
            check = cnt;
            for(let row = 0; row < key.length; row++){
                for(let col = 0; col < key.length; col++){
                    if(key[key.length-row-1][key.length-col-1] + newLock[i+row][j+col] === 2) break;
                    if(key[key.length-row-1][key.length-col-1] === 1 && newLock[i+row][j+col] === 0) check--;
                }
            }
            if(check === 0) return true;
            
            
            check = cnt;
            for(let row = 0; row < key.length; row++){
                for(let col = 0; col < key.length; col++){
                    if(key[col][key.length-row-1] + newLock[i+row][j+col] === 2) break;
                    if(key[col][key.length-row-1] === 1 && newLock[i+row][j+col] === 0) check--;
                }
            }
            if(check === 0) return true;
        }
    }
    
    
    
    return false;
}
```

## 😼 나의 풀이과정
---

처음에는 `lock`의 비어있는 부분을 센다음 `key`와 `lock`을 겹쳐가면서 `key`가 1이고 `lock`이 0이면 줄여가서 카운트가 결국 0이 되면 자물쇠가 열린다고 생각을 했는데, 인덱스를 잘못생각해서 `key`배열이 `lock` 왼쪽으로 넘어서는 경우를 생각하지 못했습니다. 

그래서 어떻게 풀까 또 고민을 해보았는데, `key` 배열이 `lock`을 넘어서는 것을 구현하기가 까다롭다고 생각이 들었습니다. 그러면 그만큼 빈 공간을 또 만들어주면 쉽게 겹침을 확인할 수 있지 않을까? 라고 생각해서 `key`의 길이보다 1작은 패딩을 배열의 상하좌우로 붙여주었습니다. 그리고 늘어난 공간을 처음에는 1로 설정을 했었는데, 그러면 `key`가 겹쳐서 넘어서는 부분이 틀렸다고 나오게 된다. 또한 만약에 0으로 설정하면 `key`가 튀어나와있고 `newLock`이 들어가있는 답이 되는 경우와 혼동됩니다. 그래서 `-1`로 설정을 해주었습니다. `key`가 튀어나와있고(key가 1) 자물쇠도 튀어나와있으면 답이 될 수 없기 때문에 확인하는 `key` 원소 값과 새로 만들어진 `newLock`의 값이 더했을 때 2이면 반복문을 빠져나오게 했다. `key`가 튀어나와있고, `newLock`이 패딩의 부분이 아니면서 1이 아닌 0의 경우에 카운트를 하나씩 줄여주었습니다. 그렇게 경우를 확인하다가 카운트가 0이 되면 자물쇠가 열리므로 `true`를 리턴하도록 하였습니다. 

하지만 몇몇 테스트케이스에서 틀렸습니다. 그래서 어디가 틀렸는지 다시 찬찬히 생각해보았는데, 생각해보니 확인하는 `key`의 인덱스를 잘못 설정해준 탓이었습니다. 회전이 아니라 반전으로 인덱스를 설정해준 것입니다. 그래서 경우를 다시 따져 보아서 그대로일때는 `key[row][col]`, 시계반대로 90도 회전이면 `key[key.length-col-1][row]`, 시계 반대 방향으로 180도 회전인 경우는 `key[key.length-row-1][key.length-col-1]`, 270도 회전은 `key[col][key.length-row-1]` 인 경우로 수정해주었습니다. 

예시의 경우, 첫 줄을 순회하는 인덱스를 찬찬히 살펴보면 (0,0) (0,1) (0,2) 가 그대로인 경우이고, 90도 회전은 (2,0) (1,0) (0,0) 이고, 180도 회전은 (2,2) (2,1) (2,0)이고, 270도 회전은 (0,2) (1,2) (2,2)이다. 이 경우를 보면 이해가 될 것입니다.

## ✨ 알게된 점
---

- 배열을 잘 다룰 수 있어야 하는 것 같습니다.
- 회전과 반전은 다른 것이며. 어림짐작해서 풀지 않을 것.



```toc

```