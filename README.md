我的餐廳清單
===========

![GITHUB]( ./public/image/Screenshot-4-1.png )
*首頁功能示範*
![GITHUB]( ./public/image/Screenshot-4-2.png )
*登入頁示範*
![GITHUB]( ./public/image/Screenshot-4-3.png )
*註冊頁示範*

## 介紹

紀錄自己的餐廳清單，可以瀏覽搜尋、查看餐廳詳細資料、連結至餐廳地圖。

- [前往功能](#features)
- [前往更新](#updates)
- [前往開始使用](#start)
- [前往開發工具(環境)](#development-tools)

### 功能<a name="features"></a>

* 查看所紀錄的餐廳
* 點擊瀏覽餐廳詳細資料
* 連接餐廳Google map地址
* 搜尋特定餐廳名稱
* 新增、編輯、刪除餐廳資料
* 顯示店家英文名稱
* 搜尋時店家英文名稱可被搜尋
* 條件排序功能
* 註冊、登入、登出功能
* 使用者有自己的餐廳列表

### 更新<a name="updates"></a>

* 註冊、登入、登出功能
* 使用者有自己的餐廳列表

## 開始使用<a name="start"></a>

1. 請先確認已安裝 Node.js 與 npm ，輸入下方指令可以確認版本

   ```bash
   $ node -v
   $ npm -v
   ```

2. 接著將此專案 clone 至欲安裝之位置，或在欲安裝之位置開啟終端機輸入下列指令

   ```bash
   $ git clone https://github.com/w3i3538/RestaurantList
   ```

3. 確認安裝完成後，開啟本專案資料夾，並使用終端機


4. 透過npm安裝所有套件

   ```bash
   $ npm install
   ```

5. 安裝完畢後，請在本專案資料夾中，根據.env.example內容指示，建立一個.env檔案設置環境變數

   ```bash
   MONGODB_URI=設定你的MongoDB連線字串
   FACEBOOK_ID=設定你的Facebook App ID
   FACEBOOK_SECRET=設定你的Facebook App Secret
   FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
   SESSION_SECRET=設定一串字串
   PORT=3000或其他數字，若更改上方也需一併更改
   ```

5. 設置.env完畢後，可以選擇是否建立種子資料

   ```bash
   $ npm run seed
   ```

6. 建立完畢後，若環境已安裝Nodemon可輸入第一段指令，若無則使用第二段，開啟伺服器

   ```bash
   $ npm run dev  
   $ npm run start
   ```

7. 若看見此行訊息則代表伺服器順利運行、mongoDB成功連接

   ```bash
   Express is listening on localhost:3000
   mongodb connected!
   ```

8. 開啟瀏覽器進入網站，即可正常使用

   ```bash
   http://localhost:3000/users/login
   ```

8. 若欲暫停使用伺服器，在終端機輸入

   ```bash
   $ ctrl + c
   ```

## 開發工具(環境)<a name="development-tools"></a>


- Node.js 18.16.0
- Bootstrap 5.2.1
- Font-awesome 5.8.1
- Dotenv 16.1.4

- bcryptjs 2.4.3
- body-parser 1.20.2
- connect-flash 0.1.1
- express 4.18.2 
- express-handlebars 3.1.0
- express-session 1.17.3
- method-override 3.0.0
- mongoose 7.2.2
- passport 0.4.1
- passport-facebook 3.0.0
- passport-local 1.0.0

