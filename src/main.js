import fs from 'fs';


class Calculator {
	constructor(plays, performance) {
		this._data = { plays: plays, performance: performance };
	}
	get plays() { return this._data.plays; }
	get performance() { return this._data.performance; }

	amount() {
		throw new Error("オーバーライドされていません(amount)");
	}

	point() {
		throw new Error("オーバーライドされていません(point)");
	}
}

export class Tragedy extends Calculator {
	amount() {
		let result = 40000;
		if (this.performance.audience > 30) {
			result += (this.performance.audience - 30) * 1000;
		}
		return result;
	}

	point() {
		let result = 0;
		if (this.performance.audience > 30) {
			result += (this.performance.audience - 30) * 1;
		}
		return result;
	}
}

export class Comedy extends Calculator {
	amount() {
		let result = 30000;
		result += this.performance.audience * 300;
		if (this.performance.audience > 20) {
			result += 10000;
			result += (this.performance.audience - 20) * 500;
		}
		return result;
	}

	point() {
		let result = 0;
		if (this.performance.audience > 30) {
			result += (this.performance.audience - 30) * 1;
		}
		result += Math.floor(this.performance.audience / 5) * 1;
		return result;
	}
}

function amount(plays, performance) {
	return createCalculator(plays, performance).amount();
}

function point(plays, performance) {
	return createCalculator(plays, performance).point();
}

function createCalculator(plays, performance) {
	switch (plays[performance.playID].type) {
		case "tragedy":
			return new Tragedy(plays, performance);
		case "comedy":
			return new Comedy(plays, performance);
		default:
			throw new Error("想定外の劇タイプです");
	}
}

export function calcTotalAmount(plays, performances) {
	let totalAmount = 0;
	for (const performance of performances) {
		totalAmount += createCalculator(plays, performance).amount();
	}
	return totalAmount;
}

export function calcTotalPoint(plays, performances) {
	let result = 0;
	for (const performance of performances) {
		result += point(plays, performance);
	}
	return result;
}

export function renderInvoiceTxt(invoice, plays) {
	let invoiceTxt = `請求書\n\n${invoice.customer}\n\n`;
	for (const performance of invoice.performances) {
		invoiceTxt += `・${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${amount(plays, performance)})\n`;
	}
	invoiceTxt += `\n合計金額：$${calcTotalAmount(plays, invoice.performances)}\n\n`;
	invoiceTxt += `獲得ポイント：${calcTotalPoint(plays, invoice.performances)}pt\n`;
	return invoiceTxt;
}

export function renderInvoiceHtml(invoice, plays) {
	let invoiceHtml = `<h3>請求書</h3><h4>${invoice.customer}</h4><ul>`;
	for (const performance of invoice.performances) {
		invoiceHtml += `<li>${plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${amount(plays, performance)})</li><br>`;
	}
	invoiceHtml += `</ul><p>合計金額：$${calcTotalAmount(plays, invoice.performances)}</p>`;
	invoiceHtml += `<p>獲得ポイント：${calcTotalPoint(plays, invoice.performances)}pt</p>`;
	return invoiceHtml;
}

export function printInvoice(invoice, plays, arg) {
	switch(arg) {
		case "txt":
			fs.writeFileSync("output/invoice.txt", renderInvoiceTxt(invoice, plays));
			break;
		case "html":
			fs.writeFileSync("output/invoice.html", renderInvoiceHtml(invoice, plays));
			break;
		default:
			console.log("txtかhtmlを指定してください。");
	}
}


export function main() {
	const invoices = JSON.parse(fs.readFileSync("input/invoices.json", "utf8"));
	const plays = JSON.parse(fs.readFileSync("input/plays.json", "utf8"));
	const arg = process.argv.slice(2)[0];			// txt/html

	printInvoice(invoices[0], plays, "txt");	// テスト用にargを指定
}

// main();