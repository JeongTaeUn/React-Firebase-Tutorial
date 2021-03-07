## Management System
本プロジェクトはReactとFireBaseを利用し顧客管理システムです。

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

## Gitを追加する。
- .gitignoreファイルを作成する。

  ```
  ・Gitの初期化
  git init
  ・ファイルを追加
  git add .
  ・Commit
  git commit -m "comment"
  ・Remote設定
  git remote add origin 自分のGitのリポジトリURL
  ・Remote情報の確認
  git remote -v
  ・Push
  git push --set-upstream origin master
  ・リポジトリURLの変更
  git remote set-url origin REPOSITORY-URL
  ・認証情報を保存
  git config --global credential.helper store
  git config --global credential.helper cache
  git config --global credential.helper 'cache --timeout=3600'
  git config credential.helper store --global
  ```

## Design System
- Material-uiを利用する。
  - material-ui.com
  - `yarn add @material-ui/core`
  - `yarn add @material-ui/icons`

## React Scope
- constructor
  - 初期実行時
- componentWillMount
  - コンポネントがマウントされるとき
- render
  - コンポネントをレンダリングする。
- componentDidMount
  - コンポネントがマウントされたあと
- shouldComponentUpdate
  - state or propsが更新されたとき
