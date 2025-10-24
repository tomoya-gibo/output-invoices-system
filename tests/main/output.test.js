import { describe, expect, test } from 'vitest';
import fs from 'fs';
import { main } from '../../src/main.js';

const OUTPUT_FILE_PATH = 'output/invoice.txt'; // main()実行時の出力ファイルパス。自分の環境に合わせて修正すること。

describe('出力テスト', () => {
  test('testCase1', () => {
    const testData = fs.readFileSync('tests/main/input/testCase1.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase1.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8')).toBe(expectedOutput);
  })

  test('testCase2', () => {
    const testData = fs.readFileSync('tests/main/input/testCase2.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase2.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8')).toBe(expectedOutput);
  })

  test('testCase3', () => {
    const testData = fs.readFileSync('tests/main/input/testCase3.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase3.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8')).toBe(expectedOutput);
  })

  test('testCase4', () => {
    const testData = fs.readFileSync('tests/main/input/testCase4.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase4.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8')).toBe(expectedOutput);
  })

  test('testCase5', () => {
    const testData = fs.readFileSync('tests/main/input/testCase5.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase5.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8')).toBe(expectedOutput);
  })

  test('testCase6', () => {
    const testData = fs.readFileSync('tests/main/input/testCase6.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase6.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8')).toBe(expectedOutput);
  })

  test('testCase7', () => {
    const testData = fs.readFileSync('tests/main/input/testCase7.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase7.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8')).toBe(expectedOutput);
  })
})