# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-22

### Added
- **CLI (Command Line Interface)**: New executable for generating OTPs and passwords from command line
  - `otp-pass-kit otp` - Generate OTP with customizable options
  - `otp-pass-kit pass` - Generate password with customizable options
  - Support for all generation options: length, character sets, ensure-each-type
  - Comprehensive help system with usage examples
  - Can be used via `npx` or installed globally

### Changed
- Updated package.json with CLI binary configuration
- Enhanced build configuration to include CLI compilation
- Improved README with CLI usage documentation

## [1.0.5] - 2025-11-22

### Added
- **CLI (Command Line Interface)**: New executable for generating OTPs and passwords from command line
  - `otp-pass-kit otp` - Generate OTP
  - `otp-pass-kit pass` - Generate password
  - Full option support: length, character sets, ensure-each-type
  - Comprehensive help system
- Cryptographically secure random number generation using `crypto.randomInt`
- Input validation for length parameter
- Comprehensive test suite with Vitest
- ESLint configuration for code quality
- Additional development scripts (lint, type-check, test:run)
- LICENSE file
- Security section in README
- Repository and homepage links in package.json

### Changed
- Refactored code to reduce duplication between `generateOtp` and `generatePass`
- Updated dependencies to latest versions
- Improved README with better examples and development info
- Enhanced special characters set for more variety

### Fixed
- Improved error messages and validation

## [1.0.4] - 2024-01-01

### Added
- Initial release with OTP and password generation functions