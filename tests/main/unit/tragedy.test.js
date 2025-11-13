import { describe, test, expect } from "vitest";
import { Tragedy } from "../../../src/main";

const plays = { "hamlet": { "type": "tragedy" },
                "as-like": { "type": "comedy" },
                "othello": { "type": "tragedy" },
                "romeo-and-juliet": {"type": "tragic-comedy"}};

describe('Tragedy-amountのテスト', () => {
    test('testCase1: 人数超過なし', () => {
        const performance = { "audience": 29 };
        const tragedy = new Tragedy(plays, performance);
        const result = tragedy.amount();
        expect(result).toBe(40000);
    })

    test('testCase2: 人数超過なし', () => {
        const performance = { "audience": 30 };
        const tragedy = new Tragedy(plays, performance);
        const result = tragedy.amount();
        expect(result).toBe(40000);
    })

    test('testCase3: 人数超過あり', () => {
        const performance = { "audience": 31 };
        const tragedy = new Tragedy(plays, performance);
        const result = tragedy.amount();
        expect(result).toBe(41000);
    })

    test('testCase4: 人数０', () => {
        const performance = { "audience": 0 };
        const tragedy = new Tragedy(plays, performance);
        const result = tragedy.amount();
        expect(result).toBe(40000);
    })
})

describe('Tragedy-pointのテスト', () => {
    test('testCase1: 人数超過なし', () => {
        const performance = { "audience": 29 };
        const tragedy = new Tragedy(plays, performance);
        const result = tragedy.point();
        expect(result).toBe(0);
    })

    test('testCase2: 人数超過なし', () => {
        const performance = { "audience": 30 };
        const tragedy = new Tragedy(plays, performance);
        const result = tragedy.point();
        expect(result).toBe(0);
    })

    test('testCase3: 人数超過あり', () => {
        const performance = { "audience": 31 };
        const tragedy = new Tragedy(plays, performance);
        const result = tragedy.point();
        expect(result).toBe(1);
    })

    test('testCase4: 人数０', () => {
        const performance = { "audience": 0 };
        const tragedy = new Tragedy(plays, performance);
        const result = tragedy.point();
        expect(result).toBe(0);
    })
})