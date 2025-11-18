import { describe, test, expect } from "vitest";
import { CreateInvoice, Tragedy, Comedy } from "../../../src/main";

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

    createCalculator(plays, performance) {
        switch (plays[performance.playID].type) {
            case "tragedy":
                return new Tragedy(plays, performance);
            case "comedy":
                return new Comedy(plays, performance);
            default:
                throw new Error("想定外の劇タイプです");
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