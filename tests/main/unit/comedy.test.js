import { describe, test, expect } from "vitest";
import { Comedy } from "../../../src/main";

const plays = { "hamlet": { "type": "tragedy" },
                "as-like": { "type": "comedy" },
                "othello": { "type": "tragedy" },
                "romeo-and-juliet": {"type": "tragic-comedy"}};

describe('Comedy-amountのテスト', () => {
    test('testCase1: 人数超過なし', () => {
        const performance = { "audience": 19 };
        const comedy = new Comedy(plays, performance);
        const result = comedy.amount();
        expect(result).toBe(35700);
    })

    test('testCase2: 人数超過なし', () => {
        const performance = { "audience": 20 };
        const comedy = new Comedy(plays, performance);
        const result = comedy.amount();
        expect(result).toBe(36000);
    })

    test('testCase3: 人数超過あり', () => {
        const performance = { "audience": 21 };
        const comedy = new Comedy(plays, performance);
        const result = comedy.amount();
        expect(result).toBe(46800);
    })

    test('testCase4: 人数０', () => {
        const performance = { "audience": 0 };
        const comedy = new Comedy(plays, performance);
        const result = comedy.amount();
        expect(result).toBe(30000);
    })
})

describe('Comedy-pointのテスト', () => {
    test('testCase1: 人数超過なし', () => {
        const performance = { "audience": 4 };
        const comedy = new Comedy(plays, performance);
        const result = comedy.point();
        expect(result).toBe(0);
    })

    test('testCase2: 人数超過なし', () => {
        const performance = { "audience": 5 };
        const comedy = new Comedy(plays, performance);
        const result = comedy.point();
        expect(result).toBe(1);
    })

    test('testCase3: 人数超過なし', () => {
        const performance = { "audience": 6 };
        const comedy = new Comedy(plays, performance);
        const result = comedy.point();
        expect(result).toBe(1);
    })

    test('testCase4: 人数超過なし', () => {
        const performance = { "audience": 30 };
        const comedy = new Comedy(plays, performance);
        const result = comedy.point();
        expect(result).toBe(6);
    })

    test('testCase5: 人数超過あり', () => {
        const performance = { "audience": 31 };
        const comedy = new Comedy(plays, performance);
        const result = comedy.point();
        expect(result).toBe(7);
    })

    test('testCase6: 人数超過あり', () => {
        const performance = { "audience": 35 };
        const comedy = new Comedy(plays, performance);
        const result = comedy.point();
        expect(result).toBe(12);
    })

    test('testCase7: 人数超過あり', () => {
        const performance = { "audience": 36 };
        const comedy = new Comedy(plays, performance);
        const result = comedy.point();
        expect(result).toBe(13);
    })

    test('testCase8: 人数０', () => {
        const performance = { "audience": 0 };
        const comedy = new Comedy(plays, performance);
        const result = comedy.point();
        expect(result).toBe(0);
    })
})