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

describe.only('calcAmount関数のテスト', () => {
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

