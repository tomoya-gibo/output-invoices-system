import { describe, test, expect } from "vitest";
import { TotalCalculator } from "../../../src/main";

const plays = { "hamlet": { "type": "tragedy" },
                "as-like": { "type": "comedy" },
                "othello": { "type": "tragedy" },
                "romeo-and-juliet": {"type": "tragic-comedy"}};

describe('TotalCalculator-amountのテスト', () => {
    test('testCase1', () => {
        const performances = [{ "playID" : "hamlet", "audience" : 55 },
                              { "playID": "as-like", "audience": 35 },
                              { "playID": "othello", "audience": 40 }];
        const totalCalc = new TotalCalculator(plays, performances);
        const result = totalCalc.amount();
        expect(result).toBe(173000);
    })
})

describe('TotalCalculator-pointのテスト', () => {
    test('testCase1', () => {
        const performances = [{ "playID" : "hamlet", "audience" : 55 },
                              { "playID": "as-like", "audience": 35 },
                              { "playID": "othello", "audience": 40 }];
        const totalCalc = new TotalCalculator(plays, performances);
        const result = totalCalc.point();
        expect(result).toBe(47);
    })
})