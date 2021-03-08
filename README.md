## Management System
本プロジェクトはReactとFireBaseを利用した顧客管理システムです。
※DBの実装はまだされていない。

※VSCode、NodeJsをインストールしておく

- yarnをインストール
  - npm install -g yarn

- create-react-appをインストール
  - npm install -g create-react-app

- create-react-appで新規プロジェクトを生成
  - create-react-app management

- react server起動
  - yarn start
  - localhost:3000でアクセス可能

## Express Server Setting
- 既存のFE関連ファイルは"client"フォルダーを作成して移動する。
- rootにpackage.jsonファイルを生成する。rootでサーバーモジュールを実行するため
- package.jsonを作成する。
- nodemonをインストールする。
  - npm install -g nodemon
- server.jsを作成する
  - node server.js で稼働可能

### processの状態を確認するコマンド
- Mac
  - ps aux | grep node
  - kill -9 PID
  - lsof -i :port
- Windows
  - netstat -a -o -n
  - taskkill /F /PID (yourprocessID)

## Aws Rds or Firebase
- HeidiSQLを利用してアクセスする。
  - https://www.heidisql.com/
- Aws Rds
  - aws.amazon.com/consoleにアクセス。
  - RDSサービスからインスタンスを作成する。
  - エンコードを設定。パラメータグループから設定可能。
    - 新規作成
    - 編集で[char,collation]を検索して可能なすべてはutf8,utf8_general_ciに変更すること。
    - インスタンスを選択して修正→パラメータグループを修正すること。
    - 先にパラメータグループを作成してインスタンス作成時にパラメータグループを指定すること。

- DB 連動
  - database.jsonファイルを作成
  - mysqlをインストール
    - npm install --save mysql

## サーバーとの通信
- Axioライブラリをインストール
  - npm install --save axios
- Multerライブラリをインストール(for file)
  - npm install --save multer

## エラーになった。
- Error: listen EADDRINUSE: address already in use
  - scriptsのdev定義が間違っていた。
    - client, serverで定義しているのでdevでは「yarn server, yarn start」になっており
    　Portが重複することになりエラーとなった。

- 'concurrently' は、内部コマンドまたは外部コマンド、操作可能なプログラムまたはバッチ ファイルとして認識されていません。
  - npm install concurrently express --save

# Firebaseを使ってみよう

## nodejs をインストールする。
 - バージョン：v12.16.0
 - firebase は Google の Account でログイン可能。

## firebase 使用
1. プロジェクト作成
  - console.firebase.google.com でプロジェクトを作成する。
2. アプリに firebase を追加
 - 今回は Web アプリを追加する
 - Hosting は未設定
3. firebase の SDK を追加
- プロジェクトの public に index.html を追加すること。
- SDK は Script を提供してくれるのでコピーして<body>タグの下部に貼り付ける。
- サービス利用前に実施すること。
4. firebase の CLI をインストール
- `npm install -g firebase-tools`
- `npm install --save firebase-admin`
5. firebase にログイン（ログアウト）
- `firebase login`
- `firebase logout`
6. firebase の初期化
- `firebase init`
- Database,Hosting と Emulate を選択
- Database port : 9000
- Hosting port : 5000 
7. ロカールサービス
- `firebase serve`
8. deploy
- `firebase deploy`

## 認証とデータベースと連動
**認証には下記 JS が必要 ★**
1. 認証
- firebase-auth.js 指定すること
- コンソルページの「Authentication」で認証で使用する Provider を指定できる。
- 今回は Google のみ使用。
2. データベース連動
- firebase-firestore.js 指定すること
- コンソルページの「Realtime Database」あるいは「Cloud Firestore」を利用
- 両方 NoSql である。
- 今回は Cloud Firestore を利用する。
  - Cloud Firestore
    - location : asia-northwest1
    - **index の作成は必須**
