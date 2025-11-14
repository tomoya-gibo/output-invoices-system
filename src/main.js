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


export class TotalCalculator {
	constructor(plays, performances) {
		this._data = { plays: plays, performances: performances };
	}
	get plays() { return this._data.plays; }
	get performances() { return this._data.performances; }

	amount() {
		let result = 0;
		for (const performance of this.performances) {
			result += createCalculator(this.plays, performance).amount();
		}
		return result;
	}

	point() {
		let result = 0;
		for (const performance of this.performances) {
			result += createCalculator(this.plays, performance).point();
		}
		return result;
	}
}


class CreateInvoice {
	constructor(invoice, plays) {
		this._data = { invoice: invoice, plays: plays };
	}
	get invoice() { return this._data.invoice; }
	get plays() { return this._data.plays; }

	renderTxt() {
		let invoiceTxt = `請求書\n\n${this.invoice.customer}\n\n`;
		for (const performance of this.invoice.performances) {
			invoiceTxt += `・${this.plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${createCalculator(this.plays, performance).amount()})\n`;
		}
		const totalCalc = new TotalCalculator(this.plays, this.invoice.performances);
		invoiceTxt += `\n合計金額：$${totalCalc.amount()}\n\n`;
		invoiceTxt += `獲得ポイント：${totalCalc.point()}pt\n`;
		return invoiceTxt;
	}

	renderHtml() {
		let invoiceHtml = `<h3>請求書</h3><h4>${this.invoice.customer}</h4><ul>`;
		for (const performance of this.invoice.performances) {
			invoiceHtml += `<li>${this.plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${createCalculator(this.plays, performance).amount()})</li><br>`;
		}
		const totalCalc = new TotalCalculator(this.plays, this.invoice.performances);
		invoiceHtml += `</ul><p>合計金額：$${totalCalc.amount()}</p>`;
		invoiceHtml += `<p>獲得ポイント：${totalCalc.point()}pt</p>`;
		return invoiceHtml;
	}
}

export function renderInvoiceHtml(createInvoice) {
	return createInvoice.renderHtml();
}

export function printInvoice(invoice, plays, arg) {
	const createInvoice = new CreateInvoice(invoice, plays);
	switch(arg) {
		case "txt":
			fs.writeFileSync("output/invoice.txt", createInvoice.renderTxt());
			break;
		case "html":
			fs.writeFileSync("output/invoice.html", renderInvoiceHtml(createInvoice));
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