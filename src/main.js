const fs = require("fs");

export function calcAmount(plays, performance) {
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

export function calcTotalAmount(plays, performances) {
	let totalAmount = 0;
	for (const performance of performances) {
		totalAmount += calcAmount(plays, performance);
	}
	return totalAmount;
}

export function calcPoint(plays, performance) {
	let result = 0;
	if (performance.audience > 30) {
		result += (performance.audience - 30) * 1;
	}
	if (plays[performance.playID].type === "comedy") {
		result += Math.floor(performance.audience / 5) * 1;
	}
	return result;
}

export function calcTotalPoint(plays, performances) {
	let result = 0;
	for (const performance of performances) {
		result += calcPoint(plays, performance);
	}
	return result;
}

export function renderTxt(invoices, plays, performances, arg) {
	let invoiceTxt;
	switch(arg) {
		case "txt":
			invoiceTxt += `請求書\n\n${invoices[0].customer}\n\n`;
			for (const performance of performances) {
				invoiceTxt += `・${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${calcAmount(plays, performance)})\n`;
			}
			invoiceTxt += `\n合計金額：$${calcTotalAmount(plays, performances)}\n\n`;
			invoiceTxt += `獲得ポイント：${calcTotalPoint(plays, performances)}pt\n`;
			break;
		case "html":
			invoiceTxt += `<h3>請求書</h3><h4>${invoices[0].customer}</h4><ul>`;
			for (const performance of performances) {
				invoiceTxt += `<li>${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${calcAmount(plays, performance)})</li><br>`;
			}
			invoiceTxt += `</ul><p>合計金額：$${calcTotalAmount(plays, performances)}</p>`;
			invoiceTxt += `<p>獲得ポイント：${calcTotalPoint(plays, performances)}pt</p>`;
			break;
		default:
			console.log("arg:" + arg);
	}
	return invoiceTxt;
}

export function print(data, arg) {
	switch(arg) {
		case "txt":
			fs.writeFileSync("output/invoice.txt", data);
			break;
		case "html":
			fs.writeFileSync("output/invoice.html", data);
			break;
		default:
			console.log("txtかhtmlを指定してください。");
	}
}


export function main() {
	const invoices = JSON.parse(fs.readFileSync("input/invoices.json", "utf8"));
	const plays = JSON.parse(fs.readFileSync("input/plays.json", "utf8"));
	
	const performances = invoices[0].performances;	//演目
	const argv = process.argv.slice(2);
	const arg = argv[0];		// ↑と１行にできる？？

	const invoiceTxt = renderTxt(invoices, plays, performances, arg);

	print(invoiceTxt, arg);
}

main();