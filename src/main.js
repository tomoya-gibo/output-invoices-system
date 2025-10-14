//jsonファイルのインポート
const invoices = require('../input/invoices.json');
const plays = require('../input/plays.json');
const fs = require("fs");

function main() {
	//使いそうな変数　△let/const
	const company = invoices[0].customer;			//会社名
	let performances = invoices[0].performances;	//演目(dic)
	let point = 0;				//ポイント
	let amount = 0;				//金額
	let totalAmount = 0;		//合計金額

	//請求内容　→これよろしくない、別の方法考えよう⚠️
	let resultData = "請求書\n\n株式会社ビッグカンパニー\n\n";		
	
	//金額計算
	for (let performance of performances) {
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
		
		// console.log(`単価:${amount}`);
		totalAmount += amount;
		// console.log(`合計:${totalAmount}`);
		resultData += `・${performance.playID} (観客数:${performance.audience}人、金額:$${amount})\n`;
		//大文字にしたいし汎用性ない⚠️

	}	

	//ポイント計算
	for (let performance of performances) {
		if (performance.audience > 30) {
			point += (performance.audience - 30) * 1;
		}
		if (plays[performance.playID].type === "comedy") {
			point += (performance.audience / 5) * 1;
		}
	}

	resultData += `\n合計金額：$${totalAmount}\n\n`;
	resultData += `獲得ポイント：${point}pt\n`;
	
	// console.log(resultData);
	
	//結果の出力
	
	// //ファイルへ書き込む
	// fs.writeFileSync("../output/invoice.txt", resultData);
}

main();