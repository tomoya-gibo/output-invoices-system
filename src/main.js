 
  //2025/10/15
  //リファクタリング開始

  //リファクタリングの目的
  /*
  コードの重複を減らす
  理解しやすく、修正しやすい形にする
  バグを生みにくくする
  後の機能追加を安全に、少ない労力で行えるようにする
  */

  //リファクタリングの進め方
  /*
  1.リファクタリングする前の処理がそれぞれどんな役割を持っているかを考える
  2.処理を関数として抽出したりクラスに分けたりする前に、関数に持たせたい役割や処理内容を明確にする
  3.実際にリファクタリングを行い、main()と個々の関数の責任を分離する
  4.動作が変わっていないかテストや出力結果を確認する
  5.コード全体を読み直し、重複や命名の不整合を再度見直す
  6.少しずつ変更し、都度コミットする
  */

  //ポイントの計算処理
  function calculateBasePoint(performance,play) {
    let result = 0
    if (performance.audience > 30){
      result += (performance.audience - 30)
    }
    if (play.type === 'comedy'){
      result += Math.floor(performance.audience / 5)
    }
    return result
  }

  //公演IDから演目データを取得する処理をplayForとして分離
  function playFor(performance, plays) {
    return plays[performance.playID];
  }

  //演目の種別ごとの料金算定
  function amontFor(play){
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
        const play = playFor(performance, plays);
        //料金を入れる変数
        let thisAmount = 0;
        let thisPoint = 0;




        thisPoint = calculateBasePoint(performance,play);
        //合計金額
        totalAmount += thisAmount;
        //獲得ポイントの合計
        totalPoint += thisPoint
        output += `・${play.name} (観客数: ${performance.audience}、金額: $${thisAmount})\n`;
      }
    }
    output += `\n 合計金額: $${totalAmount}`
    output += `\n 獲得ポイント: ${totalPoint}pt`
    console.log(output)
    fs.writeFileSync("output.txt", output, 'utf-8');
  }
  
  main();
  
