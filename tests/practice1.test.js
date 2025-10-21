import { describe, it, expect } from 'vitest';
import { formatUserProfile } from '../practice/practice1.js';

// テストデータ
const testUser1 = {
  name: '山田 太郎',
  email: 'YAMADA@Example.COM',
  age: 28
};

const testUser2 = {
  name: '鈴木',
  email: 'suzuki@test.com'
  // ageは未設定
};

const testUser3 = {
  name: '佐藤 花子',
  email: 'sato@example.com',
  age: 15
};

describe('formatUserProfile', () => {
  it('正常なユーザーデータを正しくフォーマットする', () => {
    const result = formatUserProfile(testUser1);
    
    expect(result.personalInfo.firstName).toBe('山田');
    expect(result.personalInfo.lastName).toBe('太郎');
    expect(result.personalInfo.fullName).toBe('山田 太郎');
    expect(result.personalInfo.email).toBe('yamada@example.com');
    expect(result.personalInfo.age).toBe(28);
    expect(result.personalInfo.ageGroup).toBe('20代');
    expect(result.display.welcomeMessage).toBe('ようこそ、山田さん！');
  });

  it('年齢が未設定の場合でも正しくフォーマットする', () => {
    const result = formatUserProfile(testUser2);
    
    expect(result.personalInfo.firstName).toBe('鈴木');
    expect(result.personalInfo.lastName).toBe('');
    expect(result.personalInfo.age).toBe('未設定');
    expect(result.personalInfo.ageGroup).toBe('未設定');
    expect(result.display.ageDisplay).toBe('年齢未設定');
  });

  it('10代のユーザーを正しく年齢グループ分類する', () => {
    const result = formatUserProfile(testUser3);
    
    expect(result.personalInfo.ageGroup).toBe('10代');
    expect(result.display.ageDisplay).toBe('15歳 (10代)');
  });

  it('メールアドレスを小文字に変換する', () => {
    const result = formatUserProfile(testUser1);
    expect(result.personalInfo.email).toBe('yamada@example.com');
  });

  it('名前が空の場合にエラーをスローする', () => {
    expect(() => formatUserProfile({ name: '', email: 'test@example.com' }))
      .toThrow('ユーザー名が必須です');
  });

  it('メールアドレスが無効な場合にエラーをスローする', () => {
    expect(() => formatUserProfile({ name: 'テスト', email: 'invalid-email' }))
      .toThrow('有効なメールアドレスが必要です');
  });

  it('年齢が範囲外の場合にエラーをスローする', () => {
    expect(() => formatUserProfile({ name: 'テスト', email: 'test@example.com', age: -1 }))
      .toThrow('年齢は0〜150の範囲である必要があります');
    
    expect(() => formatUserProfile({ name: 'テスト', email: 'test@example.com', age: 151 }))
      .toThrow('年齢は0〜150の範囲である必要があります');
  });

  it('登録日時情報を含む', () => {
    const result = formatUserProfile(testUser1);
    
    expect(result.systemInfo).toHaveProperty('registrationDate');
    expect(result.systemInfo).toHaveProperty('registrationTime');
    expect(result.systemInfo).toHaveProperty('formattedAt');
    expect(typeof result.systemInfo.registrationDate).toBe('string');
    expect(typeof result.systemInfo.registrationTime).toBe('string');
  });
});
