import fs from 'fs';
import { totalmem } from 'os';


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


export class TotalCalculator {
	constructor(plays, performances) {
		this._data = { plays: plays, performances: performances };
	}
	get plays() { return this._data.plays; }
	get performances() { return this._data.performances; }

	amount() {
		let result = 0;
		for (const performance of this.performances) {
			result += this.createCalculator(performance).amount();
		}
		return result;
	}

	point() {
		let result = 0;
		for (const performance of this.performances) {
			result += this.createCalculator(performance).point();
		}
		return result;
	}

	createCalculator(performance) {
		switch (this.plays[performance.playID].type) {
			case "tragedy":
				return new Tragedy(this.plays, performance);
			case "comedy":
				return new Comedy(this.plays, performance);
			default:
				throw new Error("想定外の劇タイプです");
		}
	}
}


export class CreateInvoice {
	constructor(invoice, plays, totalCalc) {
		this._data = { invoice: invoice, plays: plays, totalCalc: totalCalc };
	}
	get invoice() { return this._data.invoice; }
	get plays() { return this._data.plays; }
	get totalCalc() { return this._data.totalCalc; }

	renderTxt() {
		let invoiceTxt = `請求書\n\n${this.invoice.customer}\n\n`;
		for (const performance of this.invoice.performances) {
			invoiceTxt += `・${this.plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${this.totalCalc.createCalculator(performance).amount()})\n`;
		}
		invoiceTxt += `\n合計金額：$${this.totalCalc.amount()}\n\n`;
		invoiceTxt += `獲得ポイント：${this.totalCalc.point()}pt\n`;
		return invoiceTxt;
	}

	renderHtml() {
		let invoiceHtml = `<h3>請求書</h3><h4>${this.invoice.customer}</h4><ul>`;
		for (const performance of this.invoice.performances) {
			invoiceHtml += `<li>${this.plays[performance.playID].name} (観客数:${performance.audience}人、金額:$${this.totalCalc.createCalculator(performance).amount()})</li><br>`;
		}
		invoiceHtml += `</ul><p>合計金額：$${this.totalCalc.amount()}</p>`;
		invoiceHtml += `<p>獲得ポイント：${this.totalCalc.point()}pt</p>`;
		return invoiceHtml;
	}
}

export function zz_printInvoice(invoice, plays, totalCalc, createInvoice, arg) {
	switch(arg) {
		case "txt":
			fs.writeFileSync("output/invoice.txt", createInvoice.renderTxt());
			break;
		case "html":
			fs.writeFileSync("output/invoice.html", createInvoice.renderHtml());
			break;
		default:
			console.log("txtかhtmlを指定してください。");
	}
}

export function printInvoice(invoice, plays, totalCalc, createInvoice, arg) {

}


export function main() {
	const invoices = JSON.parse(fs.readFileSync("input/invoices.json", "utf8"));
	const plays = JSON.parse(fs.readFileSync("input/plays.json", "utf8"));
	const arg = process.argv.slice(2)[0];			// txt/html

	const totalCalc = new TotalCalculator(plays, invoices[0].performances);
	const createInvoice = new CreateInvoice(invoices[0], plays, totalCalc);
	zz_printInvoice(invoices[0], plays, totalCalc, createInvoice, "txt");	// テスト用にargを指定
}

// main();