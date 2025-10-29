export function main() {
  const fs = require("fs");
  const invoices = JSON.parse(fs.readFileSync("input/invoices.json", "utf8"));
  const plays = JSON.parse(fs.readFileSync("input/plays.json", "utf8"));
	
	//金額計算
	const performances = invoices[0].performances;	//演目
	let amount = 0;									//金額
	let totalAmount = 0;							//合計金額
	for (const performance of performances) {
		totalAmount += calculateAmount(plays, performance);
	}
	
	//請求内容作成
	let invoiceTxt = `請求書\n\n${invoices[0].customer}\n\n`;
	for (const performance of performances) {
		invoiceTxt += `・${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${calculateAmount(plays, performance)})\n`;
	}

	invoiceTxt += `\n合計金額：$${totalAmount}\n\n`;
	invoiceTxt += `獲得ポイント：${point()}pt\n`;

	printTxt(invoiceTxt);



	function calculateAmount(plays, performance) {
		let result = 0;
		if (plays[performance.playID].type === "tragedy") {		//悲劇の場合
			result += 40000;
			if (performance.audience > 30) {					//観客数の超過料金計算
				result += (performance.audience - 30) * 1000;
			}
		} else {												//喜劇の場合
			result += 30000;
			result += performance.audience * 300;
			if (performance.audience > 20) {
				result += 10000;
				result += (performance.audience - 20) * 500;
			}
		}
		return result;
	}

	function point() {
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