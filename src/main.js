  const fs = require("fs");

  function main() {
  //概要
  //与えられたJSONファイルより請求書を出力するサブシステムを作成する。

  //ルール
  /*
    関数は一つだけ用意(function main())し、その関数内に処理を記述すること。
    なるべく少ない行数で記述すること。
    手続き的な書き方で実装すること
  */
  //機能
  //請求情報の算定
  //請求情報の出力

  //出力項目
  // 会社名
  // 発注演目とその観客数および金額
  // 合計金額
  // 獲得ポイント

  //進め方
  //1仕様書を読んで目的に必要な機能やデータを確認する
  //2目的に実際に必要な変数や関数を考える
  /*
   必用な変数:
   出力する文字列を入れる変数
   入力データを入れる変数
   料金を入れる変数 基本料金、観客数による追加料金,
   必用な処理:
   入力データの読み込み
   演目の内容ごとの料金の算定
   合計金額の算定
   ポイントの算定
  */
  //3コーディングする

  //入力データの読み込み
  const invoices = JSON.parse(fs.readFileSync('input/invoices.json', 'utf8'));
  const plays = JSON.parse(fs.readFileSync('input/plays.json', 'utf8'));

  //出力するデータを格納する変数
  let output = "請求書\n株式会社ビッグカンパニー\n";

  //　悲劇の基本料金
  let tragedyBasePrice = 40000;
  // 喜劇の基本料金
  let comedyBasePrice = 30000;

  console.log(output);

  console.log(invoices);
  console.log(plays);

  //演目の内容ごとの料金の算定


}
main();


