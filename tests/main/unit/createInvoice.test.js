import { describe, test, expect } from "vitest";
import { CreateInvoice } from "../../../src/main";

const plays = { "hamlet": { "name": "Hamlet", "type": "tragedy" },
                "as-like": { "name": "As You Like It", "type": "comedy" },
                "othello": { "name": "Othello", "type": "tragedy" } }; 

class MockTotalCalculator {
    constructor(plays, performances) {
        this._data = { plays: plays, performances: performances };
    }
    get plays() { return this._data.plays; }
    get performances() { return this._data.performances; }

    amount() { return 173000; }

    point() { return 47; }

    createCalculator(performance) {
        return new MockCalculator(this.plays, performance);
    }
}

class MockCalculator {
    constructor(plays, performance) {
		this._data = { plays: plays, performance: performance };
	}
    get plays() { return this._data.plays; }
	get performance() { return this._data.performance; }

    amount() {
        // render()の単価計算でcreateInvoice.amount()しているので分岐必要
        // amountの呼び出し方が変更できたら、return１つの形に修正する
        switch(this.performance.playID) {
			case "hamlet":
				return 65000;
			case "as-like":
				return 58000;
            case "othello":
                return 50000;
		}
	}
}


describe('CreateInvoiceのテスト', () => {
    test('renderTxtのテスト', () => {
        const invoice = { "customer": "Customer",
                          "performances": [{ "playID": "hamlet", "audience": 55 },
                                           { "playID": "as-like", "audience": 35 },
                                           { "playID": "othello", "audience": 40 }]};
        const totalCalc = new MockTotalCalculator(plays, invoice.performances);
        const createInvoice = new CreateInvoice(invoice, plays, totalCalc);
        const testResult = createInvoice.renderTxt();
        const expectData = `請求書\n\nCustomer\n\n・Hamlet (観客数:55人、金額:$65000)\n・As You Like It (観客数:35人、金額:$58000)\n`
            + `・Othello (観客数:40人、金額:$50000)\n\n合計金額：$173000\n\n獲得ポイント：47pt\n`;
        expect(testResult).toBe(expectData);
    })

    test('renderHtmlのテスト', () => {
        const invoice = { "customer": "Customer",
                          "performances": [{ "playID": "hamlet", "audience": 55 },
                                           { "playID": "as-like", "audience": 35 },
                                           { "playID": "othello", "audience": 40 }]};
        const totalCalc = new MockTotalCalculator(plays, invoice.performances);
        const createInvoice = new CreateInvoice(invoice, plays, totalCalc);
        const testResult = createInvoice.renderHtml();
        const expectData = `<h3>請求書</h3><h4>Customer</h4><ul><li>Hamlet (観客数:55人、金額:$65000)</li><br>`
            + `<li>As You Like It (観客数:35人、金額:$58000)</li><br><li>Othello (観客数:40人、金額:$50000)</li><br>`
            + `</ul><p>合計金額：$173000</p><p>獲得ポイント：47pt</p>`;
        expect(testResult).toBe(expectData);
    })
})