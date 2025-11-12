import { describe, it, expect } from 'vitest';
import {main, outputFile, calcAmount, calcPoint, calculateTotalPoints, calculateTotalAmounts, buildText} from '../../src/main.js'

describe('calcPoint関数のテスト', () => {
 it('観客数が30人以下で演劇の内容が悲劇のとき、ポイントが0になる', () => {
  expect(calcPoint({ audience: 29 }, { type: 'tragedy' })).toBe(0);
 });
 it('観客数が31人で演劇の内容が悲劇のとき、ポイントが1になる', () => {
  expect(calcPoint({ audience: 31 }, { type: 'tragedy' })).toBe(1);
 });
 it('観客数が5人で演劇の内容が喜劇のとき、ポイントが1になる', () => {
  expect(calcPoint({ audience: 5 }, { type: 'comedy' })).toBe(1);
 });
 it('観客数が30人で演劇の内容が喜劇のとき、ポイントが6になる', () => {
  expect(calcPoint({ audience: 30 }, { type: 'comedy' })).toBe(6);
 });
});

