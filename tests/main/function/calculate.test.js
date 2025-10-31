import { describe, test, expect } from "vitest";
import { calcAmount,
         calcPoint,
         calcTotalAmount,
         calcTotalPoint } from '../../../src/main.js';

const plays = { "hamlet": { "type": "tragedy" },
                "as-like" : { "type": "comedy" },
                "othello" : { "type": "tragedy" } };

describe('calcAmountのテスト', () => {
    // 悲劇
    test('testCase1, 悲劇／人数超過なし', () => {
        // 引数で渡すもの
        const performance = { "playID" : "hamlet", "audience" : 29 };
        // 関数実行する
        const result = calcAmount(plays, performance);
        // 結果と比較する
        expect(40000).toBe(result);
    })

    test('testCase2, 悲劇／人数超過なし', () => {
        const performance = { "playID" : "hamlet", "audience" : 30 };
        const result = calcAmount(plays, performance);
        expect(40000).toBe(result);
    })

    test('testCase3, 悲劇／人数超過あり', () => {
        const performance = { "playID" : "hamlet", "audience" : 31 };
        const result = calcAmount(plays, performance);
        expect(41000).toBe(result);
    })

    test('testCase4, 悲劇／人数０', () => {
        const performance = { "playID" : "hamlet", "audience" : 0 };
        const result = calcAmount(plays, performance);
        expect(40000).toBe(result);
    })

    // 喜劇
    test('testCase5, 喜劇／人数超過なし', () => {
        const performance = { "playID" : "as-like", "audience" : 19 };
        const result = calcAmount(plays, performance);
        expect(35700).toBe(result);
    })

    test('testCase6, 喜劇／人数超過なし', () => {
        const performance = { "playID" : "as-like", "audience" : 20 };
        const result = calcAmount(plays, performance);
        expect(36000).toBe(result);
    })

    test('testCase7, 喜劇／人数超過あり', () => {
        const performance = { "playID" : "as-like", "audience" : 21 };
        const result = calcAmount(plays, performance);
        expect(46800).toBe(result);
    })

    test('testCase8, 喜劇／人数０', () => {
        const performance = { "playID" : "as-like", "audience" : 0 };
        const result = calcAmount(plays, performance);
        expect(30000).toBe(result);
    })
})

describe('calcTotalAmountのテスト', () => {
    test('testCase1', () => {
        const performances = [{ "playID" : "hamlet", "audience" : 55 },
                             { "playID": "as-like", "audience": 35 },
                             { "playID": "othello", "audience": 40 }];
        const result = calcTotalAmount(plays, performances);
        expect(173000).toBe(result);
    })
})

describe('calcPointのテスト', () => {
    test('testCase1, 悲劇／人数超過なし', () => {
        const performance = { "playID" : "hamlet", "audience" : 29 };
        const result = calcPoint(plays, performance);
        expect(0).toBe(result);
    })

    test('testCase2, 悲劇／人数超過なし', () => {
        const performance = { "playID" : "hamlet", "audience" : 30 };
        const result = calcPoint(plays, performance);
        expect(0).toBe(result);
    })

    test('testCase3, 悲劇／人数超過あり', () => {
        const performance = { "playID" : "hamlet", "audience" : 31 };
        const result = calcPoint(plays, performance);
        expect(1).toBe(result);
    })

    test('testCase4, 悲劇／人数０', () => {
        const performance = { "playID" : "hamlet", "audience" : 0 };
        const result = calcPoint(plays, performance);
        expect(0).toBe(result);
    })

    test('testCase5, 喜劇／人数超過なし', () => {
        const performance = { "playID" : "as-like", "audience" : 4 };
        const result = calcPoint(plays, performance);
        expect(0).toBe(result);
    })

    test('testCase6, 喜劇／人数超過なし', () => {
        const performance = { "playID" : "as-like", "audience" : 5 };
        const result = calcPoint(plays, performance);
        expect(1).toBe(result);
    })

    test('testCase7, 喜劇／人数超過なし', () => {
        const performance = { "playID" : "as-like", "audience" : 6 };
        const result = calcPoint(plays, performance);
        expect(1).toBe(result);
    })

    test('testCase8, 喜劇／人数超過なし', () => {
        const performance = { "playID" : "as-like", "audience" : 30 };
        const result = calcPoint(plays, performance);
        expect(6).toBe(result);
    })

    test('testCase9, 喜劇／人数超過あり', () => {
        const performance = { "playID" : "as-like", "audience" : 31 };
        const result = calcPoint(plays, performance);
        expect(7).toBe(result);
    })

    test('testCase10, 喜劇／人数超過あり', () => {
        const performance = { "playID" : "as-like", "audience" : 35 };
        const result = calcPoint(plays, performance);
        expect(12).toBe(result);
    })

    test('testCase11, 喜劇／人数超過あり', () => {
        const performance = { "playID" : "as-like", "audience" : 36 };
        const result = calcPoint(plays, performance);
        expect(13).toBe(result);
    })

    test('testCase12, 喜劇／人数超過あり', () => {
        const performance = { "playID" : "as-like", "audience" : 0 };
        const result = calcPoint(plays, performance);
        expect(0).toBe(result);
    })
})

describe('calcTotalPointのテスト', () => {
    test('testCase1', () => {
        const performances = [{ "playID" : "hamlet", "audience" : 55 },
                             { "playID": "as-like", "audience": 35 },
                             { "playID": "othello", "audience": 40 }];
        const result = calcTotalPoint(plays, performances);
        expect(47).toBe(result);
    })
})