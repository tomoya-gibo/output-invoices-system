import { describe, it, expect } from 'vitest';
import {main, outputFile, calcAmount, calcPoint, calculateTotalPoints, calculateTotalAmounts, buildText, outputFileTest} from '../../src/main.js'

import fs from "fs";


describe('calcPoint関数のテスト', () => {
 it('観客数が30人以下で演劇の内容が悲劇のとき、ポイントが0になる', () => {
  expect(calcPoint({ audience: 29 }, { type: 'tragedy' })).toBe(0);
 });
 it('観客数が30人で演劇の内容が悲劇のとき、ポイントが0になる', () => {
  expect(calcPoint({ audience: 30 }, { type: 'tragedy' })).toBe(0);
 });
 it('観客数が31人で演劇の内容が悲劇のとき、ポイントが1になる', () => {
  expect(calcPoint({ audience: 31 }, { type: 'tragedy' })).toBe(1);
 });
 it('観客数が4人で演劇の内容が喜劇のとき、ポイントが0になる', () => {
  expect(calcPoint({ audience: 4 }, { type: 'comedy' })).toBe(0);
 });
 it('観客数が5人で演劇の内容が喜劇のとき、ポイントが1になる', () => {
  expect(calcPoint({ audience: 5 }, { type: 'comedy' })).toBe(1);
 });
 it('観客数が6人で演劇の内容が喜劇のとき、ポイントが1になる', () => {
  expect(calcPoint({ audience: 6 }, { type: 'comedy' })).toBe(1);
 });
 it('観客数が30人で演劇の内容が喜劇のとき、ポイントは30人超過した場合の処理は発生せず30/5で6になる', () => {
  expect(calcPoint({ audience: 30 }, { type: 'comedy' })).toBe(6);
 });
 it('観客数が31人で演劇の内容が喜劇のとき、ポイントは30人超過した場合の処理が発生し超過一人+30/5で7になる', () => {
  expect(calcPoint({ audience: 31 }, { type: 'comedy' })).toBe(7);
 });
});

describe('calcAmount関数のテスト', () => {
 it('観客数が29人で演劇の内容が悲劇のとき、基本料金に対する加算は発生しない', () => {
  expect(calcAmount({ type: 'tragedy' }, { audience: 29 })).toBe(40000);
 });
 it('観客数が30人で演劇の内容が悲劇のとき、基本料金に対する加算は発生しない', () => {
  expect(calcAmount({ type: 'tragedy' }, { audience: 30 })).toBe(40000);
 });
 it('観客数が31人で演劇の内容が悲劇のとき、基本料金に対する加算は発生する', () => {
  expect(calcAmount({ type: 'tragedy' }, { audience: 31 })).toBe(41000);
 });
 it('観客数が19人で演劇の内容が喜劇のとき、超過料金が発生せず30000+19*300=35700になる', () => {
  expect(calcAmount({ type: 'comedy' }, { audience: 19 })).toBe(35700);
 });
 it('観客数が20人で演劇の内容が喜劇のとき、超過料金が発生せず30000+20*300=36000になる', () => {
  expect(calcAmount({ type: 'comedy' }, { audience: 20 })).toBe(36000);
 });
 it('観客数が21人で演劇の内容が喜劇のとき、超過料金が発生して30000+10000+1*500+21*300=46800になる', () => {
  expect(calcAmount({ type: 'comedy' }, { audience: 21 })).toBe(46800);
 });
});


describe('calculateTotalPoints関数のテスト', () => {
 //１件分の請求データ
const invoices = [
  {
    customer: "TestCase No.17",
    performances: [
      { playID: "hamlet", audience: 31 } // 31人の悲劇
    ]
  }
];
//2件分の請求データ
const testInvoices = [
 {
   customer: "TestCase Mix",
   performances: [
     { playID: "hamlet", audience: 31 },    // 悲劇（1ポイント）
     { playID: "as-like", audience: 30 }    // 喜劇（30 / 5 = 6ポイント）
   ]
 }
];

const plays = {
  "hamlet" : {"name": "Hamlet", "type": "tragedy"},
  "as-like" : {"name": "As You Like It", "type": "comedy"},
  "othello" : {"name": "Othello", "type": "tragedy"},
  "romeo-and-juliet" : {"name": "Romeo and Juliet", "type": "tragic-comedy"}
  }

 it('１件分のデータで関数が動作するかをテストする', () => {
  expect(calculateTotalPoints(invoices, plays)).toBe(1);
 });

 it('2件分のデータで関数が動作するかをテストする,1+6=7', () => {
  expect(calculateTotalPoints(testInvoices, plays)).toBe(7);
 });
});

describe('calculateTotalAmounts関数のテスト', () => {
 //１件分の請求データ
const invoices = [
  {
    customer: "TestCase No.17",
    performances: [
      { playID: "hamlet", audience: 31 } // 悲劇41000
    ]
  }
];
//2件分の請求データ
const testInvoices = [
 {
   customer: "TestCase Mix",
   performances: [
     { playID: "hamlet", audience: 31 },    // 悲劇41000
     { playID: "as-like", audience: 30 }    // 喜劇30000+10000+10*500+30*300
   ]
 }
];

const plays = {
  "hamlet" : {"name": "Hamlet", "type": "tragedy"},
  "as-like" : {"name": "As You Like It", "type": "comedy"},
  "othello" : {"name": "Othello", "type": "tragedy"},
  "romeo-and-juliet" : {"name": "Romeo and Juliet", "type": "tragic-comedy"}
  }

 it('1件分の請求データで関数が動作するかをテストする', () => {
  expect(calculateTotalAmounts(invoices, plays)).toBe(41000);
 });

 it('2件分の請求データで関数が動作するかをテストする41000+54000 = 95000', () => {
  expect(calculateTotalAmounts(testInvoices, plays)).toBe(95000);
 });
});

describe('buildText関数のテスト', () => {
  //１件分の請求データ
const invoices = [
 {
   customer: "TestCase No.17",
   performances: [
     { playID: "hamlet", audience: 31 } // 悲劇41000
   ]
 }
];


//3件分の請求データ
const testInvoices = [
  {
    "customer": "TestCase No.17",
    "performances": [
      {
        "playID": "hamlet",
        "audience": 31
      },
      {
        "playID": "as-like",
        "audience": 35
      },
      {
        "playID": "othello",
        "audience": 31
      }
    ]
  }
]

const plays = {
  "hamlet" : {"name": "Hamlet", "type": "tragedy"},
  "as-like" : {"name": "As You Like It", "type": "comedy"},
  "othello" : {"name": "Othello", "type": "tragedy"},
  "romeo-and-juliet" : {"name": "Romeo and Juliet", "type": "tragic-comedy"}
  }

//期待値文字列
const expectedOutput = 
`請求書
TestCase No.17

・Hamlet (観客数: 31、金額: $41000)

 合計金額: $41000
 獲得ポイント: 1pt`

//期待値文字列3件分
const testText = 
 `請求書
TestCase No.17

・Hamlet (観客数: 31、金額: $41000)
・As You Like It (観客数: 35、金額: $58000)
・Othello (観客数: 31、金額: $41000)

 合計金額: $140000
 獲得ポイント: 14pt`

 it('1件分の請求データで関数が生成した文字列と検証用の文字列が一致するかをテストする', () => {
  expect(buildText(invoices, plays)).toBe(expectedOutput);
 });
 it('3件分の請求データで関数が生成した文字列と検証用の文字列が一致するかをテストする', () => {
  expect(buildText(testInvoices, plays)).toBe(testText);
 });
});

describe('outputFile関数のテスト', () => {
  it('文字列を受け取り、output.txtを正しい内容で出力できる', () => {
   const testText = "txtファイルが出力されました";
   outputFileTest(testText);
   const result = fs.readFileSync("test.txt", "utf-8");
   expect(result).toBe(testText);
 });
});

describe('main関数のテスト', () => {
  it('最終的に出力されるtxtファイルの内容が仕様書に近いかをテストする', () => {
    main();
    const result = fs.readFileSync("output.txt", "utf8");
    expect(result).toBe(`請求書
TestCase No.17

・Hamlet (観客数: 31、金額: $41000)
・As You Like It (観客数: 35、金額: $58000)
・Othello (観客数: 31、金額: $41000)

 合計金額: $140000
 獲得ポイント: 14pt`
    )
 });
});