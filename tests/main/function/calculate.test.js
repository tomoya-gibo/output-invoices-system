import { describe, test, expect } from "vitest";
import { calcTotalAmount,
         calcTotalPoint } from '../../../src/main.js';

const plays = { "hamlet": { "type": "tragedy" },
                "as-like" : { "type": "comedy" },
                "othello" : { "type": "tragedy" },
                "romeo-and-juliet": {"type": "tragic-comedy"}};

describe('calcTotalAmountのテスト', () => {
    test('testCase1', () => {
        const performances = [{ "playID" : "hamlet", "audience" : 55 },
                             { "playID": "as-like", "audience": 35 },
                             { "playID": "othello", "audience": 40 }];
        const result = calcTotalAmount(plays, performances);
        expect(result).toBe(173000);
    })
})

describe('calcTotalPointのテスト', () => {
    test('testCase1', () => {
        const performances = [{ "playID" : "hamlet", "audience" : 55 },
                             { "playID": "as-like", "audience": 35 },
                             { "playID": "othello", "audience": 40 }];
        const result = calcTotalPoint(plays, performances);
        expect(result).toBe(47);
    })
})