//jsonファイルのインポート
const invoices = require('../input/invoices.json');
const plays = require('../input/plays.json');

function main() {
	//使いそうな変数　△let/const
	const company = invoices[0].customer;			//会社名
	let performances = invoices[0].performances;	//演目(dic)
	let point;				//ポイント
	let amount;				//金額
	let totalAmount;		//合計金額
	let resultData;			//請求内容
	
	
	
}

main();