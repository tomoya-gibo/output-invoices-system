// 追加仕様
// 追加仕様の制約
// 既存のコードはなるべく手を加えない。ただし、細かい変更(例：else ifを増やしたいなど)は可とする。判断が難しいと感じたら相談すること。
// 仕様を追加する際も、新しく関数を作らない。引き続き、元ある制約は守ること。
// 追加仕様の詳細
// htmlでの出力に対応する。ヒント：コマンドライン引数でユーザがtxtかhtmlか選べるようにする。

  function main() {
    //ファイルを読み込むモジュール
    const fs = require("fs");
    //コマンドラインからのユーザーの入力を受け取れるようにするモジュール
    const readline = require("readline");
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

    //料金を入れる変数
    let thisAmount = 0;
    let thisPoint = 0;

    // 2 請求書の内容ごとの料金算定
    // for文でinvoicesの中身を取り出す
    for (let invoice of invoices) {
      // for文でinvoice.performancesの中身を取り出す
      for (let performance of invoice.performances) {
        // playsのキーとperformance.playIDを照合してplayに代入
        const play = plays[performance.playID];

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

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('txtかhtmlどちらの形式で出力しますか？ : ', (answer) => {
      console.log(`${answer}の形式で出力します`);
      if (answer === 'txt') {
        fs.writeFileSync("output.txt", output, 'utf-8');
      }
      if (answer === 'html') {

        output = `<p>請求書</p>
<p>株式会社ビッグカンパニー</p>

<ul>
<li>${play.name} (観客数: ${performance.audience}、金額: $${thisAmount})\n
<li>
<li>
</ul>

 <p>合計金額: $173000</p>
 <p>獲得ポイント: 47pt</p>`

        fs.writeFileSync("output.html", output, 'utf-8');
      }
      rl.close();
    });

  }
  
  main();
