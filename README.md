# OTP & Password Generator Kit

[![npm version](https://badge.fury.io/js/%40hixbe%2Fotp-pass-kit.svg)](https://badge.fury.io/js/%40hixbe%2Fotp-pass-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![npm downloads](https://img.shields.io/npm/dm/@hixbe/otp-pass-kit.svg)](https://www.npmjs.com/package/@hixbe/otp-pass-kit)

A **secure**, **cryptographically-strong** OTP (One-Time Password) and password generator for Node.js and TypeScript projects. Generate customizable authentication codes and strong passwords with CLI support.

## ✨ Features

- 🔐 **Cryptographically Secure**: Uses Node.js `crypto.randomInt()` for secure random generation
- 🎯 **Customizable**: Configure character sets, length, and complexity requirements
- 🖥️ **CLI Support**: Command-line interface for quick generation
- 📦 **TypeScript**: Full TypeScript support with type definitions
- 🚀 **Fast**: Optimized performance with minimal dependencies
- 🔒 **Security-First**: Designed for authentication and security use cases
- 🎨 **Flexible**: Supports OTP generation and complex password creation

## 📦 Installation

```bash
npm install @hixbe/otp-pass-kit
```

## 🚀 Quick Start

### Programmatic Usage

```typescript
import { generateOtp, generatePass } from "@hixbe/otp-pass-kit";

// Generate a secure 6-digit OTP
const otp = generateOtp();
console.log(otp); // "482739"

// Generate a strong 12-character password
const password = generatePass(12, { ensureEachType: true });
console.log(password); // "rT8#mNpL2&k"
```

### Command Line Interface

```bash
# Generate OTP
npx @hixbe/otp-pass-kit otp

# Generate password
npx @hixbe/otp-pass-kit pass -l 12 --ensure-each-type

# Install globally for easier access
npm install -g @hixbe/otp-pass-kit
otp-pass-kit otp -l 8 -u -d
```

### CLI Usage

```
Usage: otp-pass-kit <command> [options]

Commands:
  otp     Generate an OTP (One-Time Password)
  pass    Generate a password

Options:
  -l, --length <number>     Length of the generated string (default: 6 for otp, 8 for pass)
  -d, --digits              Include digits (default: true for otp, true for pass)
  -u, --uppercase           Include uppercase letters (default: false for otp, true for pass)
  -w, --lowercase           Include lowercase letters (default: false for otp, true for pass)
  -s, --special             Include special characters (default: false for otp, true for pass)
  -e, --ensure-each-type    Ensure at least one character from each enabled set
  -h, --help                Show this help message

Examples:
  otp-pass-kit otp
  otp-pass-kit otp -l 8 -u -d
  otp-pass-kit pass
  otp-pass-kit pass -l 12 --ensure-each-type
  otp-pass-kit pass -l 10 -u -w -d --no-special
```

## OTP Generator

### Function Signature

```ts
function generateOtp(length?: number, options?: OtpOptions): string;
```

### Options

| Option              | Type    | Default | Description                         |
|--------------------|--------|---------|-------------------------------------|
| `upperCaseAlphabets` | boolean | `false` (OTP), `true` (Pass) | Include uppercase letters          |
| `lowerCaseAlphabets` | boolean | `false` (OTP), `true` (Pass) | Include lowercase letters          |
| `specialChars`       | boolean | `false` (OTP), `true` (Pass) | Include special characters         |
| `digits`            | boolean | `true`  | Include digits                      |
| `ensureEachType`     | boolean | `false` | Ensure at least one character from each enabled set is included (requires length >= number of enabled sets) |

### Example Usage

```ts
import { generateOtp } from "@hixbe/otp-pass-kit";

const otp1 = generateOtp(); // Default 6-digit numeric OTP
console.log(otp1);

const otp2 = generateOtp(8, { upperCaseAlphabets: true, digits: true }); // 8-character OTP with digits and uppercase letters
console.log(otp2);
```

## Password Generator

### Function Signature

```ts
function generatePass(length?: number, options?: PassOptions): string;
```

### Options

| Option              | Type    | Default | Description                         |
|--------------------|--------|---------|-------------------------------------|
| `upperCaseAlphabets` | boolean | `true`  | Include uppercase letters          |
| `lowerCaseAlphabets` | boolean | `true`  | Include lowercase letters          |
| `specialChars`       | boolean | `true`  | Include special characters         |
| `digits`            | boolean | `true`  | Include digits                      |

### Example Usage

```ts
import { generatePass } from "@hixbe/otp-pass-kit";

const password1 = generatePass(); // Default 8-character password with all character sets
console.log(password1);

const password2 = generatePass(12, { lowerCaseAlphabets: true, digits: true }); // 12-character password with lowercase letters and digits
console.log(password2);

const password3 = generatePass(12, { ensureEachType: true }); // 12-character password with at least one of each type
console.log(password3);
```

## 🛡️ Security & Trust

- **Cryptographically Secure**: Uses Node.js `crypto.randomInt()` for secure random generation
- **Provenance**: Published with npm provenance for supply chain security
- **TypeScript**: Full type safety and modern JavaScript features
- **Zero Dependencies**: Lightweight with no external runtime dependencies

### Provenance & Build Security

This package is published with [npm provenance](https://docs.npmjs.com/generating-provenance-statements), providing cryptographic proof that the package was built from this source repository. You can verify the build provenance on the npm package page.

**Build Information:**
- Built on: GitHub Actions
- Source: [github.com/hixbe/otp-pass-kit](https://github.com/hixbe/otp-pass-kit)
- Build File: [.github/workflows/publish.yml](.github/workflows/publish.yml)

## 📖 API Reference

### `generateOtp(length?, options?)`

Generates a secure One-Time Password (OTP) for authentication purposes.

```typescript
function generateOtp(length?: number, options?: OtpOptions): string
```

**Parameters:**
- `length` (optional): Length of OTP (default: 6, max: 1000)
- `options` (optional): Configuration object for character sets

**Returns:** A string containing the generated OTP

### `generatePass(length?, options?)`

Generates a strong, customizable password with various character set options.

```typescript
function generatePass(length?: number, options?: PassOptions): string
```

**Parameters:**
- `length` (optional): Length of password (default: 8, max: 1000)
- `options` (optional): Configuration object for character sets and security options

**Returns:** A string containing the generated password

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `digits` | boolean | `true` | Include numeric digits (0-9) |
| `lowerCaseAlphabets` | boolean | `true` (pass), `false` (otp) | Include lowercase letters (a-z) |
| `upperCaseAlphabets` | boolean | `true` (pass), `false` (otp) | Include uppercase letters (A-Z) |
| `specialChars` | boolean | `true` (pass), `false` (otp) | Include special characters (!@#$%^&*()_+-=[]{}|;:,.<>?) |
| `ensureEachType` | boolean | `false` | Guarantee at least one character from each enabled set |

## 💻 CLI Usage

The package includes a powerful command-line interface for generating secure passwords and OTPs directly from your terminal.

### Installation

```bash
# Use with npx (no installation required)
npx @hixbe/otp-pass-kit otp

# Or install globally
npm install -g @hixbe/otp-pass-kit
```

### CLI Commands

```bash
# Generate default 6-digit OTP
otp-pass-kit otp

# Generate 8-character OTP with uppercase and digits
otp-pass-kit otp -l 8 -u -d

# Generate default 8-character password
otp-pass-kit pass

# Generate 12-character password ensuring all character types
otp-pass-kit pass -l 12 --ensure-each-type

# Generate password with custom character sets
otp-pass-kit pass -l 16 -u -w -d --no-special

# Show help
otp-pass-kit --help
```

### CLI Options

- `-l, --length <number>`: Set password/OTP length
- `-d, --digits`: Include digits
- `-u, --uppercase`: Include uppercase letters
- `-w, --lowercase`: Include lowercase letters
- `-s, --special`: Include special characters
- `-e, --ensure-each-type`: Ensure each character type is represented
- `-h, --help`: Show help information

## 🎯 Use Cases

- **Authentication Systems**: Generate secure OTPs for 2FA/MFA
- **Password Management**: Create strong, random passwords
- **Security Tools**: Build password generators and security utilities
- **Development**: Generate test data and temporary credentials
- **CLI Tools**: Quick password generation in scripts and automation

## 🚀 Publishing & Distribution

This package is published under the `@hixbe` organization scope on npm with the following security features:

- **Automated Publishing**: Published via GitHub Actions on every push to main branch with automatic version bumping
- **Manual Publishing**: Available through GitHub Actions workflow dispatch for controlled releases
- **Provenance**: Cryptographically signed builds with npm provenance
- **Org Scope**: Published under `@hixbe/` namespace for organization management

### Build & Publish Process

1. **Automated**: Commits to `main` trigger automatic publishing with version determination based on commit messages
2. **Manual**: Use GitHub Actions "Manual Publish" workflow for controlled releases with specific version bumps
3. **Validation**: Pre-publish checks ensure package integrity and org scope
4. **Verification**: Post-publish verification confirms successful deployment and creates GitHub releases

### Automated Version Management

The package uses automated versioning based on conventional commit messages:

- `fix:` commits trigger **patch** version bumps (1.0.0 → 1.0.1)
- `feat:` commits trigger **minor** version bumps (1.0.0 → 1.1.0)
- `BREAKING CHANGE:` commits trigger **major** version bumps (1.0.0 → 2.0.0)

**Repository**: [github.com/hixbe/otp-pass-kit](https://github.com/hixbe/otp-pass-kit)
**Package**: [npmjs.com/package/@hixbe/otp-pass-kit](https://www.npmjs.com/package/@hixbe/otp-pass-kit)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions welcome! Please feel free to submit issues and pull requests.

## 📞 Support

- 📧 **Issues**: [GitHub Issues](https://github.com/hixbe/otp-pass-kit/issues)
- 📖 **Documentation**: [GitHub Pages](https://github.com/hixbe/otp-pass-kit#readme)
- 🐛 **Bugs**: Report bugs via GitHub issues

---

**Keywords**: otp generator, password generator, secure random, cryptography, authentication, typescript, cli, security, random string, npm package, nodejs