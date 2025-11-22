import { randomInt } from 'crypto';
import type { Options } from './types';

// Character sets
const DIGITS = '0123456789';
const LOWERCASE_ALPHABETS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// ---------------------------------------
/**
 * Validates the length parameter for generation functions.
 * @param length - The desired length of the generated string
 * @throws Error if length is not a positive integer or exceeds 1000
 */
function validateLength(length: number): void {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error('Length must be a positive integer');
  }
  if (length > 1000) {
    throw new Error('Length cannot exceed 1000 characters');
  }
}

/**
 * Builds the character pool based on the provided options.
 * @param options - The options specifying which character sets to include
 * @returns A string containing all allowed characters
 * @throws Error if no character sets are enabled
 */
function buildCharacterPool(options: Options): string {
  let pool = '';

  if (options.digits) pool += DIGITS;
  if (options.lowerCaseAlphabets) pool += LOWERCASE_ALPHABETS;
  if (options.upperCaseAlphabets) pool += UPPERCASE_ALPHABETS;
  if (options.specialChars) pool += SPECIAL_CHARS;

  if (!pool) {
    throw new Error('At least one character set must be enabled');
  }

  return pool;
}

/**
 * Generates a random string of the specified length using the given character pool.
 * Uses an array for better performance with large lengths.
 * @param length - The length of the string to generate
 * @param characterPool - The pool of characters to choose from
 * @param options - Options for generation behavior
 * @returns A randomly generated string
 */
function generateRandomString(length: number, characterPool: string, options?: Options): string {
  const chars = new Array(length);

  if (options?.ensureEachType && length >= 4) {
    // Ensure at least one of each enabled type
    const sets = [];
    if (options.digits) sets.push(DIGITS);
    if (options.lowerCaseAlphabets) sets.push(LOWERCASE_ALPHABETS);
    if (options.upperCaseAlphabets) sets.push(UPPERCASE_ALPHABETS);
    if (options.specialChars) sets.push(SPECIAL_CHARS);

    // Fill first positions with one from each set
    for (let i = 0; i < sets.length && i < length; i++) {
      const set = sets[i];
      chars[i] = set[randomInt(0, set.length)];
    }

    // Fill remaining positions randomly
    for (let i = sets.length; i < length; i++) {
      const randomIndex = randomInt(0, characterPool.length);
      chars[i] = characterPool[randomIndex];
    }

    // Shuffle to avoid predictable patterns
    for (let i = length - 1; i > 0; i--) {
      const j = randomInt(0, i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
  } else {
    // Standard random generation
    for (let i = 0; i < length; i++) {
      const randomIndex = randomInt(0, characterPool.length);
      chars[i] = characterPool[randomIndex];
    }
  }

  return chars.join('');
}

/**
 * Generates a One-Time Password (OTP) with customizable options.
 * @param length - The length of the OTP (default: 6)
 * @param options - Options for character sets to include
 * @returns A randomly generated OTP string
 * @throws Error if length is invalid or no character sets are enabled
 */
export function generateOtp(length: number = 6, options?: Options): string {
  validateLength(length);

  const defaultOptions: Options = {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
    ...options
  };

  const characterPool = buildCharacterPool(defaultOptions);
  return generateRandomString(length, characterPool, defaultOptions);
}

/**
 * Generates a password with customizable options.
 * @param length - The length of the password (default: 8)
 * @param options - Options for character sets to include
 * @returns A randomly generated password string
 * @throws Error if length is invalid or no character sets are enabled
 */
export function generatePass(length: number = 8, options?: Options): string {
  validateLength(length);

  const defaultOptions: Options = {
    lowerCaseAlphabets: true,
    upperCaseAlphabets: true,
    specialChars: true,
    digits: true,
    ...options
  };

  const characterPool = buildCharacterPool(defaultOptions);
  return generateRandomString(length, characterPool, defaultOptions);
}