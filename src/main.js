// 追加仕様
// 追加仕様の制約
// 既存のコードはなるべく手を加えない。ただし、細かい変更(例：else ifを増やしたいなど)は可とする。判断が難しいと感じたら相談すること。
// 仕様を追加する際も、新しく関数を作らない。引き続き、元ある制約は守ること。

  function main() {
    //ファイルを読み込むモジュール
    const fs = require("fs");
    //コマンドラインからのユーザーの入力を受け取れるようにするモジュール
    const readline = require("readline");
    // 1 入力データの読み込み
    const invoices = JSON.parse(fs.readFileSync("input/invoices.json", "utf8"));
    const plays = JSON.parse(fs.readFileSync("input/plays.json", "utf8"));
    const preInvoices = JSON.parse(fs.readFileSync("input/previous.json", "utf8"));
  
    // 出力用変数
    let output = "請求書\n株式会社ビッグカンパニー\n\n";

    // html出力用の変数
    let outputList = "";
  
    // 基本料金
    const tragedyBasePrice = 40000;
    const comedyBasePrice = 30000;
    const tragicomedyBasePrice = 30000;
  
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

        //現在の金額を入れる変数
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
            if (performance.audience > 30) {
              thisPoint += (performance.audience - 30);
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
              thisPoint += (performance.audience - 30);
            }
            //喜劇の場合のみ超過にかかわらず一人につき$300の追加
            thisAmount += performance.audience * 300;
            //観客数5人につき1ポイント追加
            thisPoint += Math.floor(performance.audience / 5);
            break;
          case "tragic-comedy":
            thisAmount = tragicomedyBasePrice;
            //超過にかかわらず観客数一人につき$500追加
            thisAmount += performance.audience * 500;
            if (performance.audience > 20) {
            //20人を超過したら一人につき1ポイント追加。
              thisPoint += (performance.audience - 20);
            }
            break;
        }

        //合計金額
        totalAmount += thisAmount;
        //獲得ポイントの合計
        totalPoint += thisPoint

        outputList += `<li>${play.name} (観客数: ${performance.audience}人、金額: $${thisAmount})</li>`;
        output += `・${play.name} (観客数: ${performance.audience}人、金額: $${thisAmount})\n`;
      }
    }
    output += `\n 合計金額: $${totalAmount}`
    output += `\n 獲得ポイント: ${totalPoint}pt`
    //console.log(output);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    //10/22 追加仕様
    //合計金額と獲得ポイントについて、前回との差分(previous.json)をHTMLかtxtで出す。

    //前回分の合計金額とポイントを保持する変数
    let preAmount = 0;
    let prePoint = 0;
    
    //前回の請求分を算出する処理を追加予定
    for(let pre of preInvoices){
      for(let performance of pre.performances){
        const play = plays[performance.playID];
        console.log(play);

        //現在の金額を入れる変数
        let thisAmount = 0;
        let thisPoint = 0;

        switch (play.type) {
          case "tragedy" :
            thisAmount = tragedyBasePrice;
            if (performance.audience > 30){
              thisAmount += (performance.audience - 30) * 1000;
            };
            if (performance.audience > 30){
              thisPoint += (performance.audience - 30)
            };
          break;
          case "comedy" :
            thisAmount = comedyBasePrice;
            if (performance.audience > 20){
              thisAmount += 10000;
              thisAmount += (performance.audience - 30) * 500;
            };
            if (performance.audience > 30){
              thisPoint += (performance.audience - 30)
            };
            thisAmount += performance.audience * 300;
            thisPoint += Math.floor(performance.audience / 5);
          break;
          case "tragic-comedy" :
            thisAmount = tragicomedyBasePrice;
            if (performance.audience > 20) {
              thisPoint += performance.audience - 20;
            }
            thisAmount += performance.audience * 500;
          break;
        }

        preAmount += thisAmount;
        prePoint += thisPoint; 

      }
    }






    output += "\n-----------------------------------------\n";
    output += "前回の請求分と差額\n"
    output += `合計金額：${preAmount}（前回比：+$××）\n`;
    output += `獲得ポイント：${prePoint}pt（前回比：+〜pt）`;

    rl.question('txtかhtmlどちらの形式で出力しますか？ : ', (answer) => {
      console.log(`${answer}の形式で出力します`);
      if (answer === 'txt') {
        fs.writeFileSync("output.txt", output, 'utf-8');
      }
      if (answer === 'html') {

        output = `<p>請求書</p>
                  <p>株式会社ビッグカンパニー</p>

                  <ul>
                  ${outputList}
                  </ul>

                  <p>合計金額: $${totalAmount}</p>
                  <p>獲得ポイント: ${totalPoint}pt</p>`

        fs.writeFileSync("output.html", output, 'utf-8');
      }
      rl.close();
    });


  }
  
  main();
