# 家庭記帳本
此專案需註冊登入後，提供新增、修改支出

## 功能介紹
 - 有註冊、登入頁面，需登入才可使用功能
 - 可用FACEBOOK登入
 - 統計所有支出金額
 - 可瀏覽每筆支出
 - 可新增一筆支出
 - 可修改一筆支出
 - 可刪除一筆支出
 - 依照類別搜尋，總金額依類別統計
 - 可按登出鍵登出

## 專案畫面

![首頁](https://github.com/stu96534/expense-tracker/blob/main/public/首頁.png)

## 安裝
1.開啟終端機(Terminal)cd 到存放專案本機位置並執行:

```
git clone https://github.com/stu96534/expense-tracker.git
```

2.cd 至本專案資料夾:

```
cd expense-tracker
```

3.下載套件:

```
npm install
```

4.下載種子資料:

```
npm run seed
```

5.啟動程式:

```
npm run dev
```
## 開發工具
### window 10
 - Visual Studio Code - 開發環境
 - Node.js 版本 16.15.0- 伺服器
 - express 版本 4.16.4- 開發框架
 - express-handlebars 版本 3.0.0 - 樣板引擎
 - express-session 版本 1.17.1- 驗證機制
 - mongoose 版本 5.9.7 -資料庫
 - passport 版本 0.4.1 - 使用者認證
 - passport-local 版本 1.0.0 - 本地策略
 - passport-facebook 版本 3.0.0 - FACEBOOK策略
 - bcrypt 版本 2.4.3 - 雜湊演算法
 - connect-flash 版本 0.0.1 - 使用者提示
 - dotenv 版本 8.2.0 - 
 
 ## 新增功能
 ### 註冊(可使用facebook註冊)
 ![註冊](https://github.com/stu96534/expense-tracker/blob/main/public/註冊.png)
 ### 登入(可使用facebook登入)
 ![登入](https://github.com/stu96534/expense-tracker/blob/main/public/登入.png)
 ### 新增一筆支出
 ![新增](https://github.com/stu96534/expense-tracker/blob/main/public/新增.png)
 ### 修改一筆支出
 ![修改](https://github.com/stu96534/expense-tracker/blob/main/public/修改.png)
 ### 可按Delete，刪除一筆支出
 ![刪除](https://github.com/stu96534/expense-tracker/blob/main/public/刪除.png)
 ### 可按選單，依類別篩選支出
 ![選單](https://github.com/stu96534/expense-tracker/blob/main/public/選單.png)
