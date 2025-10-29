export function main() {
  const fs = require("fs");
  const invoices = JSON.parse(fs.readFileSync("input/invoices.json", "utf8"));
  const plays = JSON.parse(fs.readFileSync("input/plays.json", "utf8"));
	
	//金額計算
	const performances = invoices[0].performances;	//演目
	let amount = 0;									//金額
	let totalAmount = 0;							//合計金額
	for (const performance of performances) {
		amount = calculateAmount(plays, performance);
		totalAmount += amount;
	}
	
	//請求内容作成
	let resultData = `請求書\n\n${invoices[0].customer}\n\n`;
	for (const performance of performances) {
		amount = calculateAmount(plays, performance);
		resultData += `・${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${amount})\n`;
	}

	const point = calculatePoint();

	resultData += `\n合計金額：$${totalAmount}\n\n`;
	resultData += `獲得ポイント：${point}pt\n`;

	printTxt(resultData);



	function calculateAmount(plays, performance) {
		amount = 0;
		if (plays[performance.playID].type === "tragedy") {		//悲劇の場合
			amount += 40000;
			if (performance.audience > 30) {					//観客数の超過料金計算
				amount += (performance.audience - 30) * 1000;
			}
		} else {												//喜劇の場合
			amount += 30000;
			amount += performance.audience * 300;
			if (performance.audience > 20) {
				amount += 10000;
				amount += (performance.audience - 20) * 500;
			}
		}
		return amount;
	}

	function calculatePoint() {
		let result = 0;
		for (const performance of performances) {
			if (performance.audience > 30) {
				result += (performance.audience - 30) * 1;
			}
			if (plays[performance.playID].type === "comedy") {
				result += Math.floor(performance.audience / 5) * 1;
			}
		}
		return result;
	}

	function printTxt(data) {
		fs.writeFileSync("output/invoice.txt", data);
	}
}

main();