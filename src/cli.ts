#!/usr/bin/env node

import { generateOtp, generatePass } from './functions.js';
import type { Options } from './types.js';

function parseArgs() {
  const args = process.argv.slice(2);

  // Check for help first
  if (args.includes('-h') || args.includes('--help')) {
    console.log(`
Usage: otp-pass-kit <command> [options]

Commands:
  otp     Generate an OTP (One-Time Password)
  pass    Generate a password

Options:
  -l, --length <number>     Length of the generated string (default: 6 for otp, 8 for pass)
  -d, --digits              Include digits (default: true for otp, true for pass)
  --no-digits               Exclude digits
  -u, --uppercase           Include uppercase letters (default: false for otp, true for pass)
  --no-uppercase            Exclude uppercase letters
  -w, --lowercase           Include lowercase letters (default: false for otp, true for pass)
  --no-lowercase            Exclude lowercase letters
  -s, --special             Include special characters (default: false for otp, true for pass)
  --no-special              Exclude special characters
  -e, --ensure-each-type    Ensure at least one character from each enabled set
  -h, --help                Show this help message

Examples:
  otp-pass-kit otp
  otp-pass-kit otp -l 8 -u -d
  otp-pass-kit pass
  otp-pass-kit pass -l 12 --ensure-each-type
  otp-pass-kit pass -l 10 -u -w -d --no-special
`);
    process.exit(0);
  }

  const command = args[0];

  if (!command || (command !== 'otp' && command !== 'pass')) {
    console.error('Error: Invalid command. Use --help for usage information.');
    process.exit(1);
  }

  const options: Options = {};
  let length = command === 'otp' ? 6 : 8;

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '-l':
      case '--length':
        length = parseInt(args[++i]);
        if (isNaN(length) || length <= 0) {
          console.error('Error: Length must be a positive integer');
          process.exit(1);
        }
        break;
      case '-d':
      case '--digits':
        options.digits = true;
        break;
      case '--no-digits':
        options.digits = false;
        break;
      case '-u':
      case '--uppercase':
        options.upperCaseAlphabets = true;
        break;
      case '--no-uppercase':
        options.upperCaseAlphabets = false;
        break;
      case '-w':
      case '--lowercase':
        options.lowerCaseAlphabets = true;
        break;
      case '--no-lowercase':
        options.lowerCaseAlphabets = false;
        break;
      case '-s':
      case '--special':
        options.specialChars = true;
        break;
      case '--no-special':
        options.specialChars = false;
        break;
      case '-e':
      case '--ensure-each-type':
        options.ensureEachType = true;
        break;
      default:
        console.error(`Unknown option: ${arg}`);
        console.log('Use --help for usage information');
        process.exit(1);
    }
  }

  return { command, length, options };
}

function main() {
  try {
    const { command, length, options } = parseArgs();

    let result: string;
    if (command === 'otp') {
      result = generateOtp(length, options);
    } else {
      result = generatePass(length, options);
    }

    console.log(result);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
}

main();