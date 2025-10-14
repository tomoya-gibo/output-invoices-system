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

  /*
  金額の算定方法
  喜劇：As You Like It
  悲劇：Hamlet、Othello

  悲劇の場合:
  基本料金$40000
  観客数が30人を超過する場合、超過一人につき$1000を追加
  喜劇の場合:
  基本料金$30000
  観客数が20人を超える場合、$10000を追加した上で、さらに超過一人につき$500を追加
  また、超過に関わらず、一人につき$300の追加
  */

  /*
  ポイントの算定方法
  喜劇：As You Like It
  悲劇：Hamlet、Othello

（悲劇、喜劇どちらにも適用）一回の劇発注で、観客数が30人を超過した場合は、超過一人につき1ポイント追加
（喜劇のみに適用）観客数5人につき1ポイント追加
  金額はドル換算です。
  */  
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
   料金を入れる変数 基本料金、観客数による追加料金,ポイントを入れる変数
   必用な処理:
   入力データの読み込み
   演目の内容ごとの料金の算定
   合計金額の算定
   ポイントの算定
  */
  //3コーディングする



  function main() {
    const fs = require("fs");
    // 1 入力データの読み込み
    const invoices = JSON.parse(fs.readFileSync("input/invoices.json", "utf8"));
    const plays = JSON.parse(fs.readFileSync("input/plays.json", "utf8"));
  
    // 出力用変数
    let output = "請求書\n株式会社ビッグカンパニー\n\n";
  
    // 基本料金
    const tragedyBasePrice = 40000;
    const comedyBasePrice = 30000;
  
    // 合計金額・ポイント
    let totalAmount = 0;
    let totalPoint = 0;
  
    // 2 請求書の内容ごとの料金算定
    // for文でinvoicesの中身を取り出す
    for (let invoice of invoices) {
      // for文でinvoice.performancesの中身を取り出す
      for (let performance of invoice.performances) {
        // playsのキーとperformance.playIDを照合してplayに代入
        const play = plays[performance.playID];
        console.log(play);
        //料金を入れる変数
        let thisAmount = 0;
        let thisPoint = 0;
  
        //演目の種別ごとの料金算定
        switch (play.type) {
          case "tragedy":
            thisAmount = tragedyBasePrice;
            //超過料金の算定
            if (performance.audience > 30) {
              thisAmount += (performance.audience - 30) * 1000;
            }
            break;
  
          case "comedy":
            thisAmount = comedyBasePrice;
            //超過料金の算定
            if (performance.audience > 20) {
              thisAmount += 10000;
              thisAmount += (performance.audience - 20) * 500;
            }
            //喜劇の場合のみ超過にかかわらず一人につき$300の追加
            thisAmount += performance.audience * 300;
            break;
        }
      }
    }
  }
  
  main();
  
