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
})