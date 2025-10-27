 
  //2025/10/15
  //リファクタリング開始

  export function main() {
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
            if (performance.audience > 30){
              thisPoint += (performance.audience - 30)
            }
            break;
          case "comedy":
            thisAmount = comedyBasePrice;
            //超過料金の算定
            if (performance.audience > 20) {
              thisAmount += 10000;
              thisAmount += (performance.audience - 20) * 500;
            }
            if (performance.audience > 30){
              thisPoint += (performance.audience - 30)
            }
            //喜劇の場合のみ超過にかかわらず一人につき$300の追加
            thisAmount += performance.audience * 300;
            //観客数5人につき1ポイント追加
            thisPoint += Math.floor(performance.audience / 5)
            break;
        }
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