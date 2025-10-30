export function main() {
  const fs = require("fs");
  const invoices = JSON.parse(fs.readFileSync("input/invoices.json", "utf8"));
  const plays = JSON.parse(fs.readFileSync("input/plays.json", "utf8"));
	
	const performances = invoices[0].performances;	//演目
	
	const invoiceTxt = renderTxt(plays, performances);

	print(invoiceTxt);



	function amount(plays, performance) {
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

	function calcTotalAmount(performances) {
		let totalAmount = 0;
		for (const performance of performances) {
			totalAmount += amount(plays, performance);
		}
		return totalAmount;
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

	function calcPoint(plays, performance) {
		let result = 0;
		if (performance.audience > 30) {
			result += (performance.audience - 30) * 1;
		}
		if (plays[performance.playID].type === "comedy") {
			result += Math.floor(performance.audience / 5) * 1;
		}
		return result;
	}

	function renderTxt(plays, performances) {
		let invoiceTxt = `請求書\n\n${invoices[0].customer}\n\n`;
		for (const performance of performances) {
			invoiceTxt += `・${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${amount(plays, performance)})\n`;
		}
		invoiceTxt += `\n合計金額：$${calcTotalAmount(performances)}\n\n`;
		invoiceTxt += `獲得ポイント：${point()}pt\n`;
		return invoiceTxt;
	}

	function print(data) {
		fs.writeFileSync("output/invoice.txt", data);
	}
}

main();