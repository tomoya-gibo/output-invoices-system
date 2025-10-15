const invoices = require('../input/invoices.json');
const plays = require('../input/plays.json');
const fs = require("fs");

function main() {
	const performances = invoices[0].performances;	//演目(dic)
	let point = 0;				//ポイント
	let amount = 0;				//金額
	let totalAmount = 0;		//合計金額
	let resultData = "請求書\n\n株式会社ビッグカンパニー\n\n";		//請求内容出力用
	
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
		resultData += `・${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${amount})\n`;
	}	

	//ポイント計算
	for (const performance of performances) {
		if (performance.audience > 30) {
			point += (performance.audience - 30) * 1;
		}
		if (plays[performance.playID].type === "comedy") {
			point += (performance.audience / 5) * 1;
		}
	}

	resultData += `\n合計金額：$${totalAmount}\n\n`;
	resultData += `獲得ポイント：${point}pt\n`;

	// ファイルへ書き込む
	fs.writeFileSync("../output/invoice.txt", resultData);
}

main();