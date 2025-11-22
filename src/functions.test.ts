import { describe, it, expect } from 'vitest';
import { generateOtp, generatePass } from './functions';

describe('generateOtp', () => {
  it('should generate a 6-digit numeric OTP by default', () => {
    const otp = generateOtp();
    expect(otp).toHaveLength(6);
    expect(/^\d{6}$/.test(otp)).toBe(true);
  });

  it('should generate OTP with custom length', () => {
    const otp = generateOtp(8);
    expect(otp).toHaveLength(8);
    expect(/^\d{8}$/.test(otp)).toBe(true);
  });

  it('should include uppercase letters when specified', () => {
    const otp = generateOtp(10, { upperCaseAlphabets: true, digits: true });
    expect(otp).toHaveLength(10);
    expect(/^[A-Z0-9]+$/.test(otp)).toBe(true);
  });

  it('should include lowercase letters when specified', () => {
    const otp = generateOtp(10, { lowerCaseAlphabets: true, digits: true });
    expect(otp).toHaveLength(10);
    expect(/^[a-z0-9]+$/.test(otp)).toBe(true);
  });

  it('should include special characters when specified', () => {
    const otp = generateOtp(10, { specialChars: true, digits: true });
    expect(otp).toHaveLength(10);
    const allowedChars = new Set('!@#$%^&*()_+-=[]{}|;:,.<>?0123456789');
    expect([...otp].every(char => allowedChars.has(char))).toBe(true);
  });

  it('should throw error if no character sets are enabled', () => {
    expect(() => generateOtp(6, { digits: false })).toThrow('At least one character set must be enabled');
  });

  it('should throw error for invalid length', () => {
    expect(() => generateOtp(0)).toThrow('Length must be a positive integer');
    expect(() => generateOtp(-1)).toThrow('Length must be a positive integer');
    expect(() => generateOtp(1.5)).toThrow('Length must be a positive integer');
  });

  it('should throw error for length exceeding limit', () => {
    expect(() => generateOtp(1001)).toThrow('Length cannot exceed 1000 characters');
  });
});

describe('generatePass', () => {
  it('should generate an 8-character password with all sets by default', () => {
    const pass = generatePass();
    expect(pass).toHaveLength(8);
    const allowedChars = new Set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?');
    expect([...pass].every(char => allowedChars.has(char))).toBe(true);
  });

  it('should generate password with custom length', () => {
    const pass = generatePass(12);
    expect(pass).toHaveLength(12);
  });

  it('should allow disabling character sets', () => {
    const pass = generatePass(10, { upperCaseAlphabets: false, specialChars: false });
    expect(pass).toHaveLength(10);
    expect(/^[a-z0-9]+$/.test(pass)).toBe(true);
  });

  it('should throw error if no character sets are enabled', () => {
    expect(() => generatePass(8, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false, digits: false })).toThrow('At least one character set must be enabled');
  });

  it('should ensure at least one character from each enabled set when ensureEachType is true', () => {
    const pass = generatePass(12, { ensureEachType: true });
    expect(pass).toHaveLength(12);
    // Should contain at least one digit, lowercase, uppercase, and special char
    expect(/\d/.test(pass)).toBe(true);
    expect(/[a-z]/.test(pass)).toBe(true);
    expect(/[A-Z]/.test(pass)).toBe(true);
    const specialChars = new Set('!@#$%^&*()_+-=[]{}|;:,.<>?');
    expect([...pass].some(char => specialChars.has(char))).toBe(true);
  });

  it('should work with ensureEachType and custom options', () => {
    const pass = generatePass(10, { specialChars: false, ensureEachType: true });
    expect(pass).toHaveLength(10);
    expect(/\d/.test(pass)).toBe(true);
    expect(/[a-z]/.test(pass)).toBe(true);
    expect(/[A-Z]/.test(pass)).toBe(true);
    const specialChars = new Set('!@#$%^&*()_+-=[]{}|;:,.<>?');
    expect([...pass].every(char => !specialChars.has(char))).toBe(true); // Should not contain special chars
  });
});