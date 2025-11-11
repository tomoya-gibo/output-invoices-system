 
  //2025/10/28
  //リファクタリング開始

  //今回のリファクタリングの方向性について
  //最初はテストに確実に通るような小さな変更から始めていく
  //振る舞いや出力が変わりそうな変更は後回しにする


  //main関数がESモジュール形式のためimport形式に変更
  import fs from "fs";

  export function main() {
    // 1 入力データの読み込み
    const invoices = JSON.parse(fs.readFileSync("input/invoices.json", "utf8"));
    const plays = JSON.parse(fs.readFileSync("input/plays.json", "utf8"));
      
    // 出力用変数
    let outputTxt = buildText(invoices,plays);
    outputFile(outputTxt);

    function buildText(invoices,plays) {
      let outputTxt = `請求書\n${invoices[0].customer}\n\n`;

      for (let performance of invoices[0].performances) {
        //console.log(performance);
        // playsのキーとperformance.playIDを照合してplayに代入
        const play = plays[performance.playID];
        outputTxt += `・${play.name} (観客数: ${performance.audience}、金額: $${calcAmount(play,performance)})\n`;
      }
      return outputTxt += `\n 合計金額: $${calculateTotalAmounts(invoices,plays)}\n 獲得ポイント: ${calculateTotalPoints(invoices,plays)}pt`
    }
    
    function calculateTotalAmounts(invoices,plays) {
      let totalAmount = 0;
      for (let performance of invoices[0].performances) {
        // playsのキーとperformance.playIDを照合してplayに代入
        const play = plays[performance.playID];
        //合計金額
        totalAmount += calcAmount(play,performance);
      }
      return totalAmount;
    }
    
    function calculateTotalPoints(invoices,plays) {
      let totalPoint = 0;
      for (let performance of invoices[0].performances) {
        //console.log(performance);
        // playsのキーとperformance.playIDを照合してplayに代入
        const play = plays[performance.playID];      
        //獲得ポイントの合計
        totalPoint += pointCalc(performance,play);
      }
      return totalPoint;
    }

    function pointCalc(performance,play) {
      let thisPoint = 0;
      if (performance.audience > 30) {
        thisPoint += (performance.audience - 30);
      }
      if (play.type === "comedy") {
        thisPoint += Math.floor(performance.audience / 5);
      }
      return thisPoint;
    }

  }

  function pointCalc(performance,play) {
    let thisPoint = 0;
    if (performance.audience > 30) {
      thisPoint += (performance.audience - 30);
    }
    if (play.type === "comedy") {
      thisPoint += Math.floor(performance.audience / 5);
    }
    return thisPoint;
  }

  function calcAmount(play,performance) {
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        let tragedyBasePrice = 40000;
        if (performance.audience > 30) {
          tragedyBasePrice += (performance.audience - 30) * 1000;
        }
        thisAmount = tragedyBasePrice;
        break;
      case "comedy":
        const comedyBasePrice = 30000;
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
    return thisAmount;
  }

  //ファイルの出力をする関数
  function outputFile(outputTxt) {
    fs.writeFileSync("output.txt", outputTxt, 'utf-8');
  }

  main();