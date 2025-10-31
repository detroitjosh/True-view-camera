# Security Policy

## Supported Versions

We actively maintain and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### For Critical Vulnerabilities

**DO NOT** open a public issue for critical security vulnerabilities that could be exploited.

Instead:
1. Open a GitHub issue with the `security` label
2. **Provide minimal details** in the public issue
3. Indicate that you would like to discuss privately
4. We will respond within 48 hours with a secure communication method

### For Non-Critical Vulnerabilities

For less critical issues (e.g., outdated dependencies with no known exploits):
1. Open a GitHub issue with the `security` label
2. Provide full details in the issue
3. We will prioritize and address promptly

## Security Update Process

When a security vulnerability is reported:

1. **Acknowledgment**: We respond within 48 hours
2. **Assessment**: We evaluate severity within 5 business days
3. **Fix Development**: Critical issues addressed immediately, others prioritized
4. **Testing**: Thorough testing of security fixes
5. **Release**: Security patches released as soon as safely possible
6. **Disclosure**: Coordinated disclosure after fix is available
7. **Credit**: Reporter credited (unless they prefer anonymity)

## Security Best Practices

### For Users

1. **Keep Updated**: Always use the latest version of the app
2. **Protect API Keys**: Never share your AI service API keys
3. **Review Permissions**: Only grant necessary permissions
4. **Secure Your Device**: Use device lock and encryption
5. **Be Cautious**: Don't share sensitive photos without reviewing

### For Developers

1. **Code Review**: All PRs reviewed for security issues
2. **Dependency Scanning**: Automated scanning of dependencies
3. **Secure Coding**: Follow secure coding practices
4. **No Secrets in Code**: Never commit API keys or secrets
5. **Input Validation**: Always validate and sanitize user input
6. **Least Privilege**: Request only necessary permissions

## Known Security Considerations

### Local Processing
- Most processing happens on-device
- Images are not transmitted without explicit user action
- No automatic cloud uploads

### API Keys
- User-provided API keys stored in environment variables
- Not transmitted or logged
- Used only for user-initiated AI requests

### Third-Party Services
When using optional AI features:
- Data sent to third-party APIs (HuggingFace, Stability AI)
- Subject to their privacy policies
- User must explicitly enable and configure

### Permissions
Required permissions:
- **Camera**: For photo/video capture
- **Media Library**: For saving/loading photos
- **Microphone**: For video recording (optional)

## Security Features

### Current Protections
- ✅ Local-first processing
- ✅ No automatic data transmission
- ✅ HTTPS for all API calls
- ✅ No telemetry or tracking
- ✅ Open source (transparent security)

### Planned Enhancements (v1.1+)
- [ ] Enhanced API key security
- [ ] Certificate pinning
- [ ] Code signing for builds
- [ ] Security audit by third party
- [ ] Automated dependency updates

## Vulnerability Disclosure Policy

We believe in responsible disclosure:

1. **Report First**: Report vulnerabilities privately before public disclosure
2. **Grace Period**: Allow us reasonable time to fix (typically 90 days)
3. **Coordinated Disclosure**: We'll work with you on disclosure timing
4. **Credit**: We'll credit researchers (unless they prefer anonymity)
5. **No Legal Action**: We won't pursue legal action against good-faith researchers

## Security Audit History

### v1.0 (October 2025)
- Initial release security review
- Manual code review
- Dependency scan
- No critical issues found

Future audits will be documented here.

## Contact

For security concerns:
1. **Preferred**: Open a GitHub issue with `security` label
2. **For critical issues**: Request private communication in the issue
3. **Response Time**: Within 48 hours

## Security-Related Dependencies

We monitor these dependencies for security issues:

### Core Dependencies
- expo-camera
- expo-media-library
- react-native
- expo

### Security Tools
- npm audit (automated)
- Dependabot (GitHub)
- Manual review of critical dependencies

## Bug Bounty

We currently do not have a bug bounty program, but we greatly appreciate security researchers who:
- Report vulnerabilities responsibly
- Provide detailed reproduction steps
- Suggest fixes or improvements

We will:
- Credit you in our security advisories
- Recognize you in our CONTRIBUTORS.md
- Provide detailed feedback on your report

## Compliance

This project aims to comply with:
- OWASP Mobile Top 10
- General security best practices
- Privacy regulations (GDPR, CCPA)

## Resources

### Security Guidelines
- [OWASP Mobile Security](https://owasp.org/www-project-mobile-security/)
- [React Native Security](https://reactnative.dev/docs/security)
- [Expo Security](https://docs.expo.dev/guides/security/)

### Related Documents
- [PRIVACY.md](PRIVACY.md) - Privacy policy
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - Community guidelines

---

**Last Updated**: October 2025  
**Next Review**: January 2026

Thank you for helping keep TrueView Camera secure! 🔒
