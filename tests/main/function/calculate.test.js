import { describe, test, expect } from "vitest";
import { calcAmount,
         calcPoint,
         calcTotalAmount,
         calcTotalPoint } from '../../../src/main.js';

const plays = { "hamlet": { "type": "tragedy" },
                "as-like" : { "type": "comedy" },
                "othello" : { "type": "tragedy" }};

describe('calcAmountのテスト', () => {
    // 悲劇
    test('testCase1, 悲劇／人数超過なし', () => {
        // 引数で渡すもの
        const performance = { "playID" : "hamlet", "audience" : 29 };
        // 関数実行する
        const result = calcAmount(plays, performance);
        // 結果と比較する
        expect(result).toBe(40000);
    })

    test('testCase2, 悲劇／人数超過なし', () => {
        const performance = { "playID" : "hamlet", "audience" : 30 };
        const result = calcAmount(plays, performance);
        expect(result).toBe(40000);
    })

    test('testCase3, 悲劇／人数超過あり', () => {
        const performance = { "playID" : "hamlet", "audience" : 31 };
        const result = calcAmount(plays, performance);
        expect(result).toBe(41000);
    })

    test('testCase4, 悲劇／人数０', () => {
        const performance = { "playID" : "hamlet", "audience" : 0 };
        const result = calcAmount(plays, performance);
        expect(result).toBe(40000);
    })

    // 喜劇
    test('testCase5, 喜劇／人数超過なし', () => {
        const performance = { "playID" : "as-like", "audience" : 19 };
        const result = calcAmount(plays, performance);
        expect(result).toBe(35700);
    })

    test('testCase6, 喜劇／人数超過なし', () => {
        const performance = { "playID" : "as-like", "audience" : 20 };
        const result = calcAmount(plays, performance);
        expect(result).toBe(36000);
    })

    test('testCase7, 喜劇／人数超過あり', () => {
        const performance = { "playID" : "as-like", "audience" : 21 };
        const result = calcAmount(plays, performance);
        expect(result).toBe(46800);
    })

    test('testCase8, 喜劇／人数０', () => {
        const performance = { "playID" : "as-like", "audience" : 0 };
        const result = calcAmount(plays, performance);
        expect(result).toBe(30000);
    })
})

describe('calcTotalAmountのテスト', () => {
    test('testCase1', () => {
        const performances = [{ "playID" : "hamlet", "audience" : 55 },
                             { "playID": "as-like", "audience": 35 },
                             { "playID": "othello", "audience": 40 }];
        const result = calcTotalAmount(plays, performances);
        expect(result).toBe(173000);
    })
})

describe('calcPointのテスト', () => {
    test('testCase1, 悲劇／人数超過なし', () => {
        const performance = { "playID" : "hamlet", "audience" : 29 };
        const result = calcPoint(plays, performance);
        expect(result).toBe(0);
    })

    test('testCase2, 悲劇／人数超過なし', () => {
        const performance = { "playID" : "hamlet", "audience" : 30 };
        const result = calcPoint(plays, performance);
        expect(result).toBe(0);
    })

    test('testCase3, 悲劇／人数超過あり', () => {
        const performance = { "playID" : "hamlet", "audience" : 31 };
        const result = calcPoint(plays, performance);
        expect(result).toBe(1);
    })

    test('testCase4, 悲劇／人数０', () => {
        const performance = { "playID" : "hamlet", "audience" : 0 };
        const result = calcPoint(plays, performance);
        expect(result).toBe(0);
    })

    test('testCase5, 喜劇／人数超過なし', () => {
        const performance = { "playID" : "as-like", "audience" : 4 };
        const result = calcPoint(plays, performance);
        expect(result).toBe(0);
    })

    test('testCase6, 喜劇／人数超過なし', () => {
        const performance = { "playID" : "as-like", "audience" : 5 };
        const result = calcPoint(plays, performance);
        expect(result).toBe(1);
    })

    test('testCase7, 喜劇／人数超過なし', () => {
        const performance = { "playID" : "as-like", "audience" : 6 };
        const result = calcPoint(plays, performance);
        expect(result).toBe(1);
    })

    test('testCase8, 喜劇／人数超過なし', () => {
        const performance = { "playID" : "as-like", "audience" : 30 };
        const result = calcPoint(plays, performance);
        expect(result).toBe(6);
    })

    test('testCase9, 喜劇／人数超過あり', () => {
        const performance = { "playID" : "as-like", "audience" : 31 };
        const result = calcPoint(plays, performance);
        expect(result).toBe(7);
    })

    test('testCase10, 喜劇／人数超過あり', () => {
        const performance = { "playID" : "as-like", "audience" : 35 };
        const result = calcPoint(plays, performance);
        expect(result).toBe(12);
    })

    test('testCase11, 喜劇／人数超過あり', () => {
        const performance = { "playID" : "as-like", "audience" : 36 };
        const result = calcPoint(plays, performance);
        expect(result).toBe(13);
    })

    test('testCase12, 喜劇／人数超過あり', () => {
        const performance = { "playID" : "as-like", "audience" : 0 };
        const result = calcPoint(plays, performance);
        expect(result).toBe(0);
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