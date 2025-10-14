//jsonファイルのインポート
const invoices = require('../input/invoices.json');
const plays = require('../input/plays.json');

function main() {
	//使いそうな変数　△let/const
	const company = invoices[0].customer;			//会社名
	let performances = invoices[0].performances;	//演目(dic)
	let point = 0;				//ポイント
	let amount = 0;				//金額
	let totalAmount = 0;		//合計金額
	let resultData;			//請求内容
	
	//金額計算
	for (let performance of performances) {
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
	}
}

main();