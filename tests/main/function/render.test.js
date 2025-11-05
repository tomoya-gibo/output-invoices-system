import { describe, test, expect } from "vitest";
import { renderInvoiceHtml,
         renderInvoiceTxt,
         renderTxt } from '../../../src/main.js';

const plays = { "hamlet": { "name": "Hamlet", "type": "tragedy" },
                "as-like" : { "name": "As You Like It", "type": "comedy" },
                "othello" : { "name": "Othello", "type": "tragedy" } };

describe('renderTxtのテスト', () => {
    test('testCase1, txt', () => {
        const invoices = [{ "customer" : "Customer"}];
        const performances = [{ "playID" : "hamlet", "audience" : 55 },
                              { "playID" : "as-like", "audience" : 35 },
                              { "playID" : "othello", "audience" : 40 }];
        const arg = "txt";
        const testData = renderTxt(invoices, plays, performances, arg);
        const expectData = `請求書\n\nCustomer\n\n・Hamlet (観客数:55人、金額:$65000)\n・As You Like It (観客数:35人、金額:$58000)\n`
            + `・Othello (観客数:40人、金額:$50000)\n\n合計金額：$173000\n\n獲得ポイント：47pt\n`;
        expect(testData).toBe(expectData);
    })

    test('testCase2, html', () => {
        const invoices = [{ "customer" : "Customer"}];
        const performances = [{ "playID" : "hamlet", "audience" : 55 },
                              { "playID" : "as-like", "audience" : 35 },
                              { "playID" : "othello", "audience" : 40 }];
        const arg = "html";
        const testData = renderTxt(invoices, plays, performances, arg);
        const expectData = `<h3>請求書</h3><h4>Customer</h4><ul><li>Hamlet (観客数:55人、金額:$65000)</li><br>`
            + `<li>As You Like It (観客数:35人、金額:$58000)</li><br><li>Othello (観客数:40人、金額:$50000)</li><br>`
            + `</ul><p>合計金額：$173000</p><p>獲得ポイント：47pt</p>`;
        expect(testData).toBe(expectData);
    })
})

describe('renderInvoiceTxtのテスト', () => {
    test('testCase1', () => {
        const invoices = [{ "customer" : "Customer"}];
        const performances = [{ "playID" : "hamlet", "audience" : 55 },
                              { "playID" : "as-like", "audience" : 35 },
                              { "playID" : "othello", "audience" : 40 }];
        const testData = renderInvoiceTxt(invoices, plays, performances);
        const expectData = `請求書\n\nCustomer\n\n・Hamlet (観客数:55人、金額:$65000)\n・As You Like It (観客数:35人、金額:$58000)\n`
            + `・Othello (観客数:40人、金額:$50000)\n\n合計金額：$173000\n\n獲得ポイント：47pt\n`;
        expect(testData).toBe(expectData);
    })
})

describe('renderInvoiceHtmlのテスト', () => {
    test('testCase1', () => {
        const invoices = [{ "customer" : "Customer"}];
        const performances = [{ "playID" : "hamlet", "audience" : 55 },
                              { "playID" : "as-like", "audience" : 35 },
                              { "playID" : "othello", "audience" : 40 }];
        const testData = renderInvoiceHtml(invoices, plays, performances);
        const expectData = `<h3>請求書</h3><h4>Customer</h4><ul><li>Hamlet (観客数:55人、金額:$65000)</li><br>`
            + `<li>As You Like It (観客数:35人、金額:$58000)</li><br><li>Othello (観客数:40人、金額:$50000)</li><br>`
            + `</ul><p>合計金額：$173000</p><p>獲得ポイント：47pt</p>`;
        expect(testData).toBe(expectData);
    })
})