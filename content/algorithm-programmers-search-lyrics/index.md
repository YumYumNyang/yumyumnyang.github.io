---
emoji: 🎼
title: "[프로그래머스] 가사검색 풀이"
date: "2022-01-14 00:12:00"
author: 얌얌냥이
tags: 알고리즘 프로그래머스 trie 자료구조 가사검색 자바스크립트 트라이 문자열탐색
categories: algorithm
---


## **✏️** 문제

---

**[본 문제는 정확성과 효율성 테스트 각각 점수가 있는 문제입니다.]**

친구들로부터 천재 프로그래머로 불리는 **"프로도"**는 음악을 하는 친구로부터 자신이 좋아하는 노래 가사에 사용된 단어들 중에 특정 키워드가 몇 개 포함되어 있는지 궁금하니 프로그램으로 개발해 달라는 제안을 받았습니다.그 제안 사항 중, 키워드는 와일드카드 문자중 하나인 '?'가 포함된 패턴 형태의 문자열을 뜻합니다. 와일드카드 문자인 '?'는 글자 하나를 의미하며, 어떤 문자에도 매치된다고 가정합니다. 예를 들어 `"fro??"`는 `"frodo"`, `"front"`, `"frost"` 등에 매치되지만 `"frame"`, `"frozen"`에는 매치되지 않습니다.

가사에 사용된 모든 단어들이 담긴 배열 `words`와 찾고자 하는 키워드가 담긴 배열 `queries`가 주어질 때, 각 키워드 별로 매치된 단어가 몇 개인지 **순서대로** 배열에 담아 반환하도록 `solution` 함수를 완성해 주세요.

### **🚨  가사 단어** 제한사항

- `words`의 길이(가사 단어의 개수)는 2 이상 100,000 이하입니다.
- 각 가사 단어의 길이는 1 이상 10,000 이하로 빈 문자열인 경우는 없습니다.
- 전체 가사 단어 길이의 합은 2 이상 1,000,000 이하입니다.
- 가사에 동일 단어가 여러 번 나올 경우 중복을 제거하고 `words`에는 하나로만 제공됩니다.
- 각 가사 단어는 오직 알파벳 소문자로만 구성되어 있으며, 특수문자나 숫자는 포함하지 않는 것으로 가정합니다.

### **🚨 검색 키워드 제한사항**

- `queries`의 길이(검색 키워드 개수)는 2 이상 100,000 이하입니다.
- 각 검색 키워드의 길이는 1 이상 10,000 이하로 빈 문자열인 경우는 없습니다.
- 전체 검색 키워드 길이의 합은 2 이상 1,000,000 이하입니다.
- 검색 키워드는 중복될 수도 있습니다.
- 각 검색 키워드는 오직 알파벳 소문자와 와일드카드 문자인 `'?'` 로만 구성되어 있으며, 특수문자나 숫자는 포함하지 않는 것으로 가정합니다.
- 검색 키워드는 와일드카드 문자인 `'?'`가 하나 이상 포함돼 있으며, `'?'`는 각 검색 키워드의 접두사 아니면 접미사 중 하나로만 주어집니다.
    - 예를 들어 `"??odo"`, `"fro??"`, `"?????"`는 가능한 키워드입니다.
    - 반면에 `"frodo"`(`'?'`가 없음), `"fr?do"`(`'?'`가 중간에 있음), `"?ro??"`(`'?'`가 양쪽에 있음)는 불가능한 키워드입니다.

## 📌 입출력 예시

---

| words | queries | result |
| --- | --- | --- |
| ["frodo", "front", "frost", "frozen", "frame", "kakao"] | ["fro??", "????o", "fr???", "fro???", "pro?"] | [3, 2, 4, 1, 0] |

## **🤔** 풀이 코드

---

```jsx
function solution(words, queries) {
    var answer = [];

    
    let trie = new Trie();
    queries.forEach(query => {
        trie.insert(query);
    })
    
    let ans = {};
    words.forEach(word => {
        let result = trie.find(word);
        result.forEach(res => {
            ans[res] = ans[res] ? ans[res]+1 : 1;
        });
    })

    answer = queries.map(query => ans[query] ? ans[query] : 0);
    
    return answer;
}

function TrieNode(key, index){
        this.key = key;
        this.parent = null;
        this.children = {};
        this.index = index;
        this.end = null;
}
function Trie(){
    this.root = new TrieNode(null, 0);
}
    
Trie.prototype.insert = function(word){
    let node = this.root;
        
    for(let i = 0; i < word.length; i++){
        if(!node.children[word[i]]){
            node.children[word[i]] = new TrieNode(word[i], i+1);
            node.children[word[i]].parent = node;
        }
        node = node.children[word[i]];
            
        if(i === word.length-1){
            node.end = word;
        }
    }
};
    
Trie.prototype.find = function(word){
    
    let stack = [this.root];
    let queries = [];
        
    while(stack.length){
        let node = stack.pop();
        let w = word[node.index];
        // console.log(word, node.key, node.index, w,stack.length);
        
        if(node.children['?']){
            stack.push(node.children['?']);
        }
        if(node.children[w]){
            stack.push(node.children[w]);
        }
        
        if(node.index === word.length && node.end){
            queries.push(node.end)
        }
       
    }
    
    return queries;
}
```

## 😼 나의 풀이과정

---

처음엔 그냥 선형적으로 탐색했습니다. 하지만 그렇게 하면 1~3번의 효율성 테스트를 통과할 수 없었습니다. 그 이후로도 정말 여러가지 방법을 시도해보았습니다. 정규식을 사용해보기도하고, 바이너리 서치를 사용해서 ?이 아닌 부분만 확인하는 방법도 시도했지만 풀 수 없었습니다. 내가 모르는 것이 있나보다 생각해서 질문하기에 나와있는 질문들을 통해 `trie` 자료구조를 사용하면 풀 수 있다고 하였습니다. 처음 들어보는 자료구조라서 먼저 공부를 하고 이를 적용해보도록 하였습니다. `trie` 자료구조로 쿼리의 트리를 만든 다음에, 단어를 하나하나 확인하면서 매칭될 수 있는 쿼리의 배열을 만들어 쿼리마다 몇번 나왔는지 세어 답을 알아내었습니다. 이때, 트리를 순회하면서 분기점이 생깁니다. 단어의 글자와 쿼리의 글자가 일치하는 경우도 있을 수 있고, 또는 쿼리의 글자가 ‘?’인 경우도 있을 수 있습니다. 그래서 저는 이 안에서도 `dfs`를 사용하였습니다. 스택을 사용하여 방문해야하는 노드를 넣어주면서 스택이 빌때까지 반복하였습니다. `find`의 결과로써 받은 배열은 쿼리를 `key`로 가지고 매칭 횟수를 `value`로 가지게끔해서 해쉬구조로 만들었습니다. 이렇게 했을 때의 장점은 쿼리가 중복된 경우에 한번 더 찾지 않아도 된다는 장점이 있습니다. 

## ✨ 알게된 점

---

### 트라이 자료구조

문자열의 집합을 표현하는 트리자료 구조

트라이는 문자열에 특화된 자료구조로, 문자열을 빠르게 탐색할 수 있다. Prefix Tree, digital search Tre, retrieval tree라고도 불린다. 노드를 탐색하기에는 효율적이지만 저장공간이 크다는 단점이 있다. 

시간 복잡도는 제일 긴 문자열의 길이가 `L`이고 총 문자열들의 수를 `M`이라 할 때 생성시 `O(M*L)`이 걸린다. 탐색에는 `O(L)` 만큼 걸린다. 

### 트라이 작동원리

[https://www.geeksforgeeks.org/pattern-searching-using-trie-suffixes/](https://www.geeksforgeeks.org/pattern-searching-using-trie-suffixes/)

### 트라이 자바스크립트로 구현

```jsx
function TrieNode(key){
	this.key = key;
	this.parent = null;
	this.children = {};
	this.end = false;
}

TrieNode.prototype.getWord = function(){
	let output = [];
	let node = this;

	while(node !== null){
		output.unshift(node.key);
		node = node.parent;
	}
	
	return output.join('');
}

function Trie(){
	this.root = new TrieNode(null);
}

Trie.prototype.insert = function(word){
	let node = this.root;
	for(let i = 0; i < word.length; i++){
		if(!node.children[word[i]]){
			node.children[word[i]] = new TrieNode(word[i]);
			node.children[word[i]].parent = node;
		}
		node = node.children[word[i]];
		
		if(i === word.length-1){
			node.end = true;
		}
	}
};

Trie.prototype.contains =function(word){
	let node = this.root;

	for(let i = 0; i < word.length; i++){
		if(node.children[word[i]]){
			node = node.children[word[i]];
		}else{
			return false;
		}
	}
	return node.end;
}

Trie.prototype.find = function(prefix){
	let node = this.root;
	let output = [];
	for(let i = 0; i < prefix.length; i++){
		if(node.children[prefix[i]]){
			node = node.children[prefix[i]];
		}else{
			return output;
		}
	}
	findAllWords(node, output);

	return output;
}

function findAllWords(node, arr){
	if(node.end){
		arr.unshift(node.getWord());
	}
	node.children.forEach(child => {
		findAllWords(node.children[child], arr);
	})
}

let trie = new Trie();

```


```toc

```
