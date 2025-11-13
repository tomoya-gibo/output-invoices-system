 
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

    //コマンドライン引数を受取る定数
    const args = process.argv.slice(2);
    console.log(args);
    console.log(args[0]);

      
    // 出力用変数
    let outputTxt = buildText(invoices,plays,args);
    console.log(outputTxt);
    outputFile(args,outputTxt);
  }

  export function buildText(invoices,plays,args) {
    let outputTxt = `請求書\n${invoices[0].customer}\n\n`;
    
    if (args[0] === "txt") {      
      for (let performance of invoices[0].performances) {
        //console.log(performance);
        // playsのキーとperformance.playIDを照合してplayに代入
        const play = plays[performance.playID];
        outputTxt += `・${play.name} (観客数: ${performance.audience}、金額: $${calcAmount(play,performance)})\n`;
      }
      return outputTxt += `\n 合計金額: $${calculateTotalAmounts(invoices,plays)}\n 獲得ポイント: ${calculateTotalPoints(invoices,plays)}pt`
    }
    
    let outputHtml = `<p>請求書</p>\n <p>${invoices[0].customer}</p>\n\n<ul>`
    if (args[0] === "html") {      
      for (let performance of invoices[0].performances) {
        //console.log(performance);
        // playsのキーとperformance.playIDを照合してplayに代入
        const play = plays[performance.playID];
        outputHtml += `<li>${play.name}(観客数: ${performance.audience}、金額: $${calcAmount(play,performance)})</li>\n`;
      }
      return outputHtml += `</ul>\n <p>合計金額: $${calculateTotalAmounts(invoices,plays)}</p>\n <p>獲得ポイント: ${calculateTotalPoints(invoices,plays)}pt</p>`
    }
  }



  //ファイルの出力をする関数
  export function outputFile(args,outputTxt) {
    if (args[0] === "txt") {
      fs.writeFileSync("output.txt", outputTxt, 'utf-8');
    }
    if (args[0] === "html") {
      fs.writeFileSync("output.html", outputTxt, 'utf-8');
    }
  }

  export function calculateTotalAmounts(invoices,plays) {
    let totalAmount = 0;
    for (let performance of invoices[0].performances) {
      // playsのキーとperformance.playIDを照合してplayに代入
      const play = plays[performance.playID];
      //合計金額
      totalAmount += calcAmount(play,performance);
    }
    return totalAmount;
  }

  export function calculateTotalPoints(invoices,plays) {
    let totalPoint = 0;
    for (let performance of invoices[0].performances) {
      //console.log(performance);
      // playsのキーとperformance.playIDを照合してplayに代入
      const play = plays[performance.playID];      
      //獲得ポイントの合計
      totalPoint += calcPoint(performance,play);
    }
    return totalPoint;
  }

  export function calcPoint(performance,play) {
    let thisPoint = 0;
    if (performance.audience > 30) {
      thisPoint += (performance.audience - 30);
    }
    if (play.type === "comedy") {
      thisPoint += Math.floor(performance.audience / 5);
    }
    return thisPoint;
  }

  export function calcAmount(play,performance) {
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
  export function outputFileTest(outputTxt) {
    fs.writeFileSync("test.txt", outputTxt, 'utf-8');
  }

  main();