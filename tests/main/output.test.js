import { describe, expect, test } from 'vitest';
import fs from 'fs';
import { main } from '../../src/main.js';

const OUTPUT_FILE_PATH = 'output.txt'; // main()実行時の出力ファイルパス。自分の環境に合わせて修正すること。

describe('出力テスト', () => {
  test('testCase1', () => {
    const testData = fs.readFileSync('tests/main/input/testCase1.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase1.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase2', () => {
    const testData = fs.readFileSync('tests/main/input/testCase2.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase2.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase3', () => {
    const testData = fs.readFileSync('tests/main/input/testCase3.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase3.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase4', () => {
    const testData = fs.readFileSync('tests/main/input/testCase4.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase4.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase5', () => {
    const testData = fs.readFileSync('tests/main/input/testCase5.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase5.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase6', () => {
    const testData = fs.readFileSync('tests/main/input/testCase6.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase6.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase7', () => {
    const testData = fs.readFileSync('tests/main/input/testCase7.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase7.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase8', () => {
    const testData = fs.readFileSync('tests/main/input/testCase8.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase8.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase9', () => {
    const testData = fs.readFileSync('tests/main/input/testCase9.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase9.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase10', () => {
    const testData = fs.readFileSync('tests/main/input/testCase10.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase10.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase11', () => {
    const testData = fs.readFileSync('tests/main/input/testCase11.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase11.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase12', () => {
    const testData = fs.readFileSync('tests/main/input/testCase12.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase12.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase13', () => {
    const testData = fs.readFileSync('tests/main/input/testCase13.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase13.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase14', () => {
    const testData = fs.readFileSync('tests/main/input/testCase14.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase14.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase15', () => {
    const testData = fs.readFileSync('tests/main/input/testCase15.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase15.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase16', () => {
    const testData = fs.readFileSync('tests/main/input/testCase16.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase16.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

  test('testCase17', () => {
    const testData = fs.readFileSync('tests/main/input/testCase17.json', 'utf8');
    fs.writeFileSync("input/invoices.json", testData, 'utf-8');
    main();
    const expectedOutput = fs.readFileSync('tests/main/output/testCase17.txt', 'utf8');
    expect(fs.readFileSync(OUTPUT_FILE_PATH, 'utf8').replace(/\r\n/g, '\n')).toBe(expectedOutput.replace(/\r\n/g, '\n'));
  })

})