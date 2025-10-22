const invoices = require('../input/invoices.json');		//演目(受注:1回目)
const invoices2 = require('../input/invoices2.json');	//演目(受注:2回目)
const plays = require('../input/plays.json');
const fs = require("fs");

function main() {
	const performances = invoices[0].performances;	//演目(受注:1回目)
	const performances2	= invoices2[0].performances;	//演目(受注:2回目)
	let point = 0;				//ポイント
	let amount = 0;				//金額
	let totalAmount = 0;		//合計金額
	let resultData = "請求書\n\n株式会社ビッグカンパニー\n\n";		//出力用(txt)
	let resultHtml = "<h3>請求書</h3><h4>株式会社ビッグカンパニー</h4><ul>";	//出力用(html)
	const args = process.argv.slice(2);
	const arg = args[0];

	//金額計算
	for (const performance of performances) {
		amount = 0;
		if (plays[performance.playID].type === "tragedy") {			//悲劇の場合
			amount += 40000;
			if (performance.audience > 30) {						//観客数の超過料金計算
				amount += (performance.audience - 30) * 1000;
			}
		} else if (plays[performance.playID].type === "comedy") {	//喜劇の場合
			amount += 30000;
			amount += performance.audience * 300;
			if (performance.audience > 20) {
				amount += 10000;
				amount += (performance.audience - 20) * 500;
			}
		} else if (plays[performance.playID].type === "tragic-comedy") {	//悲喜劇の場合
			amount += 30000;
			amount += performance.audience * 500;
		}
		totalAmount += amount;
		resultData += `・${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${amount})\n`;
		resultHtml += `<li>${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${amount})</li><br>`;
	}	

	//ポイント計算
	for (const performance of performances) {
		if(plays[performance.playID].type === "tragic-comedy") {	//喜悲劇の場合
			point += (performance.audience - 20) * 1;
		} else if (performance.audience > 30) {						//悲劇・喜劇の両方
			point += (performance.audience - 30) * 1;
			if (plays[performance.playID].type === "comedy") {		//喜劇の場合加点あり
			point += Math.floor(performance.audience / 5) * 1;
			}
		}
	}

	resultData += `\n合計金額：$${totalAmount}\n\n`;
    resultData += `獲得ポイント：${point}pt\n`;
	resultHtml += `</ul><p>合計金額：$${totalAmount}</p><p>獲得ポイント：${point}pt</p>`;

	console.log(JSON.stringify(invoices2));

	// // ファイルへ書き込む
	// console.log("arg:" + arg);
	// if (arg === "txt") {
	// 	fs.writeFileSync("../output/invoice.txt", resultData);
	// } else if (arg === "html") {
	// 	fs.writeFileSync("../output/invoice.html", resultHtml);
	// } else {
	// 	console.log("想定外の引数");
	// }
}

main();