# 蓋瑞選課系統

## Demo
### [https://gary60405.github.io/course/](https://gary60405.github.io/course/)
![](https://imgur.com/fDxZEuL.png)
![](https://i.imgur.com/Rz06hsj.png)

## Introduction
---
以取代學校現行使用的系統為目標，用Material Design的精神，讓原本難看且不人性化的操作介面變得方便簡單。

## Tech Stack
---
* ### 前端：Angular5
* ### 後端：Django REST framework API、Firebase Authentication
* ### UI框架：Angular Material、Bootstrap4

## Usage
---
本系統可分為學生端以及行政端：<br>學生端能夠自由選課、查看自身的選課資料，並提出退選申請。<br>行政端能夠新增、刪除與修改課程資料，並審核學生提出的退選申請，也能檢視每位老師的學生修課狀況，由於後臺涉及資料更動的權限問題，因此下方提供的帳戶無法針對資料庫的資料進行修改。
* ### 帳號：admin001@gmail.com
* ### 密碼：1234567890

## Run
---
將整個專案Clone下來
``` git
git clone https://github.com/gary60405/course.git
``` 
進入目錄
``` 
cd course
```
安裝相依套件
``` yarn
yarn install
```

開啟本地端網頁
``` angular
ng serve --open
```
