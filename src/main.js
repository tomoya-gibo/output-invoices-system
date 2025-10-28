export function main() {
  const fs = require("fs");
  const invoices = JSON.parse(fs.readFileSync("input/invoices.json", "utf8"));
  const plays = JSON.parse(fs.readFileSync("input/plays.json", "utf8"));

	let point = 0;				//ポイント
		
	//金額計算
	const performances = invoices[0].performances;	//演目(dic)
	let amount = 0;				//金額
	let totalAmount = 0;		//合計金額
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
	}

	function calculateAmount () {
		
	}
	
	let resultData = `請求書\n\n${invoices[0].customer}\n\n`;		//請求内容出力用
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
		resultData += `・${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${amount})\n`;
	}

	point = calculatePoint();

	resultData += `\n合計金額：$${totalAmount}\n\n`;
	resultData += `獲得ポイント：${point}pt\n`;

	printTxt(resultData);


	function calculatePoint() {
		for (const performance of performances) {
			if (performance.audience > 30) {
				point += (performance.audience - 30) * 1;
			}
			if (plays[performance.playID].type === "comedy") {
				point += Math.floor(performance.audience / 5) * 1;
			}
		}
		return point;
	}

	function printTxt(data) {
		fs.writeFileSync("output/invoice.txt", data);
	}
}

main();