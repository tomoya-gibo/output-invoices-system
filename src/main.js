const invoices = require('../input/invoices.json');
const plays = require('../input/plays.json');
const fs = require("fs");

function main() {
	const performances = invoices[0].performances;	//演目(dic)
	let point = 0;				//ポイント
	let amount = 0;				//金額
	let totalAmount = 0;		//合計金額
	let resultTxt = "請求書\n\n株式会社ビッグカンパニー\n\n";		//出力用(txt)
	let resultHtml = "<h2>請求書</h2><h3>株式会社ビッグカンパニー</h3><br>";	//出力用(html)

	//金額計算
	for (const performance of performances) {
		amount = 0;
		if (plays[performance.playID].type === "tragedy") {		//悲劇の場合
			amount += 40000;
			if (performance.audience > 30) {	//観客数の超過料金計算
				amount += (performance.audience - 30) * 1000;
			}
		} else {	//喜劇の場合
			amount += 30000;
			amount += performance.audience * 300;
			if (performance.audience > 20) {
				amount += 10000;
				amount += (performance.audience - 20) * 500;
			}
		}
		totalAmount += amount;
		resultTxt += `・${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${amount})\n`;
		resultHtml += `<li>・${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${amount})</li><br>`;
	}	

	//ポイント計算
	for (const performance of performances) {
		if (performance.audience > 30) {
			point += (performance.audience - 30) * 1;
		}
		if (plays[performance.playID].type === "comedy") {
			point += Math.floor(performance.audience / 5) * 1;
		}
	}

	resultTxt += `\n合計金額：$${totalAmount}\n\n獲得ポイント：${point}pt\n`;
	resultHtml += `<br><p>合計金額：$${totalAmount}</p><br><br><p>獲得ポイント：${point}pt</p><br>`;

	console.log(resultHtml);

	// // ファイルへ書き込む
	// fs.writeFileSync("../output/invoice.txt", resultTxt);
}

main();


//resultDataの内容(String)
// let resultData = "請求書\n\n株式会社ビッグカンパニー\n\n";
// resultData += `・${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${amount})\n`;
// resultData += `\n合計金額：$${totalAmount}\n\n`;
// resultData += `獲得ポイント：${point}pt\n`;

