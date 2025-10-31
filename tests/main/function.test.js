import { describe, test, expect } from "vitest";
import { calcAmount, calcTotalAmount } from '../../src/main.js';

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
        expect(40000).toEqual(result);
    })

    test('testCase2, 悲劇／人数超過なし', () => {
        const performance = { "playID" : "hamlet", "audience" : 30 };
        const result = calcAmount(plays, performance);
        expect(40000).toEqual(result);
    })

    test('testCase3, 悲劇／人数超過あり', () => {
        const performance = { "playID" : "hamlet", "audience" : 31 };
        const result = calcAmount(plays, performance);
        expect(41000).toEqual(result);
    })

    test('testCase4, 悲劇／人数０', () => {
        const performance = { "playID" : "hamlet", "audience" : 0 };
        const result = calcAmount(plays, performance);
        expect(40000).toEqual(result);
    })

    // 喜劇
    test('testCase5, 喜劇／人数超過なし', () => {
        const performance = { "playID" : "as-like", "audience" : 19 };
        const result = calcAmount(plays, performance);
        expect(35700).toEqual(result);
    })

    test('testCase6, 喜劇／人数超過なし', () => {
        const performance = { "playID" : "as-like", "audience" : 20 };
        const result = calcAmount(plays, performance);
        expect(36000).toEqual(result);
    })

    test('testCase7, 喜劇／人数超過あり', () => {
        const performance = { "playID" : "as-like", "audience" : 21 };
        const result = calcAmount(plays, performance);
        expect(46800).toEqual(result);
    })

    test('testCase8, 喜劇／人数０', () => {
        const performance = { "playID" : "as-like", "audience" : 0 };
        const result = calcAmount(plays, performance);
        expect(30000).toEqual(result);
    })
})

describe('calcTotalAmountのテスト', () => {
    test('testCase1', () => {
        const performance = [{ "playID" : "hamlet", "audience" : 55 },
                             { "playID": "as-like", "audience": 35 },
                             { "playID": "othello", "audience": 40 }];
        const result = calcTotalAmount(plays, performance);
        expect(173000).toEqual(result);
    })
})