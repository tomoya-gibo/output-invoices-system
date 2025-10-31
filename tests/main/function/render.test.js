import { describe, test, expect } from "vitest";
import { renderTxt } from '../../../src/main.js';

const plays = { "hamlet": { "name": "Hamlet", "type": "tragedy" },
                "as-like" : { "name": "As You Like It", "type": "comedy" },
                "othello" : { "name": "Othello", "type": "tragedy" } };

describe('renderTxtのテスト', () => {
    test('testCase1', () => {
        const invoices = [{ "customer" : "Customer"}];
        const performances = [{ "playID" : "hamlet", "audience" : 55 },
                              { "playID" : "as-like", "audience" : 35 },
                              { "playID" : "othello", "audience" : 40 }];
        const testData = renderTxt(invoices, plays, performances);
        const expectData = `請求書\n\nCustomer\n\n・Hamlet (観客数:55人、金額:$65000)\n・As You Like It (観客数:35人、金額:$58000)\n`
            + `・Othello (観客数:40人、金額:$50000)\n\n合計金額：$173000\n\n獲得ポイント：47pt\n`;
        expect(expectData).toBe(testData);
    })
})