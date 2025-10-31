# Privacy Policy & Best Practices

## Overview

TrueView Camera is designed with privacy as a core principle. We believe that your photos, videos, and data belong to you, and we're committed to transparent and ethical data handling practices.

## Core Privacy Principles

### 1. Local-First Processing
- **Default Behavior**: All image and video processing happens on your device
- **No Automatic Uploads**: Photos are never uploaded to external servers without your explicit action
- **Offline Capable**: Core features work without internet connection

### 2. Explicit Consent
- **AI Features**: Cloud-based AI features require explicit opt-in
- **Social Sharing**: You choose when and what to share
- **Analytics**: Any usage analytics require user consent (currently not implemented)

### 3. Minimal Data Collection
- **No User Tracking**: We don't track your behavior or usage patterns
- **No Personal Data**: We don't collect names, emails, or other personal information
- **No Metadata Harvesting**: EXIF data remains on your device

### 4. Transparency
- **Open Source**: All code is publicly available for review
- **Clear Documentation**: Data flows and processing are documented
- **No Hidden Features**: All functionality is transparent and documented

---

## Data Handling

### Photos and Videos

#### On-Device Storage
- **Location**: Stored in your device's media library
- **Access**: Only you can access via your device's native gallery
- **Deletion**: Deleting from gallery removes completely
- **Permissions**: Requires Media Library permission (granted by you)

#### Processing
- **Skin Tone Enhancement**: Processed locally using on-device algorithms
- **Filters and Effects**: Applied locally, no external servers
- **Face Detection**: Uses Expo's on-device face detection
- **Auto-Capture**: All logic runs on your device

### AI Features (Optional)

#### Local Server Option
- **Your Server**: You can run the AI server on your own hardware
- **Your Control**: You manage the server and its data
- **No Third Parties**: Data doesn't leave your infrastructure

#### Cloud API Option
- **Opt-In Only**: Explicitly enabled by user
- **Single Operation**: Data sent only for specific generation requests
- **No Storage**: API providers don't store your data (per their policies)
- **API Keys**: You provide your own API keys

**Supported Providers:**
- HuggingFace (see their [privacy policy](https://huggingface.co/privacy))
- Stability AI (see their [privacy policy](https://stability.ai/privacy-policy))

### Configuration Data

#### Environment Variables
- **Storage**: Stored in `.env` file on your device
- **Contains**: API keys, server URLs, app settings
- **Access**: Only the app can access
- **Security**: Never committed to git, never shared

---

## Permissions

### Required Permissions

#### Camera
- **Purpose**: Capture photos and videos
- **Scope**: Access to camera hardware
- **When**: Only when camera is in use
- **Alternative**: App cannot function without this

#### Media Library
- **Purpose**: Save and load photos/videos
- **Scope**: Access to device photo gallery
- **When**: When saving/loading media
- **Alternative**: You can take photos without saving

### Optional Permissions

#### Microphone
- **Purpose**: Record audio in videos
- **Scope**: Audio capture only
- **When**: Only during video recording
- **Alternative**: Can take photos without this

#### Internet
- **Purpose**: Access AI generation APIs (optional features)
- **Scope**: Network access for API calls
- **When**: Only when using AI features
- **Alternative**: Use offline features only

---

## Third-Party Services

### Expo Platform
- **Purpose**: Mobile app development framework
- **Data Shared**: None automatically
- **Privacy Policy**: [Expo Privacy Policy](https://expo.dev/privacy)
- **Usage**: Used for app infrastructure only

### Social Media Platforms (When Sharing)
When you choose to share:
- **Instagram, Facebook, Twitter, etc.**: Subject to their privacy policies
- **Data Shared**: Only the photo/video you explicitly choose to share
- **Control**: You initiate all sharing actions

### AI Services (Optional, Opt-In Only)

#### HuggingFace API
- **Purpose**: AI image/video generation
- **Data Shared**: Text prompts you provide
- **Privacy Policy**: [HuggingFace Privacy](https://huggingface.co/privacy)
- **Control**: You enable and provide API keys

#### Stability AI
- **Purpose**: Stable Diffusion image generation
- **Data Shared**: Text prompts you provide
- **Privacy Policy**: [Stability AI Privacy](https://stability.ai/privacy-policy)
- **Control**: You enable and provide API keys

---

## Data Security

### On-Device Security
- **Storage**: Uses standard iOS/Android secure storage
- **Encryption**: Device-level encryption (iOS/Android default)
- **Access Control**: Protected by device lock/biometrics

### API Key Security
- **Storage**: Environment variables, not in code
- **Transmission**: HTTPS for all API calls
- **Exposure**: Never logged or exposed in error messages
- **Best Practice**: Use API keys with limited permissions

### Network Security
- **HTTPS Only**: All network requests use HTTPS
- **Certificate Validation**: Standard certificate pinning
- **No Plaintext**: No sensitive data in plaintext transmission

---

## User Rights

### Your Rights
You have the right to:
1. **Access**: All your data is accessible through your device
2. **Deletion**: Delete any photo/video from your device
3. **Portability**: Export photos using standard formats
4. **Control**: Full control over what is processed and shared
5. **Transparency**: Understand how your data is used

### Data Deletion
To delete all app data:
1. Delete photos from your device's gallery
2. Uninstall the app
3. (Optional) If using local AI server, delete server data

---

## Privacy by Design

### Development Practices
- **Code Reviews**: Privacy implications reviewed in all PRs
- **Security Audits**: Regular security assessments
- **Dependency Scanning**: Automated vulnerability scanning
- **Minimal Dependencies**: Only essential libraries included

### Future Privacy Commitments
As we add features:
- Privacy impact assessment for each new feature
- Default to most privacy-preserving option
- Clear user consent for any new data usage
- Regular privacy policy updates

---

## Children's Privacy

This app is not intended for children under 13. We do not knowingly collect data from children. If you believe a child has used this app, please contact us.

---

## Changes to Privacy Policy

We may update this privacy policy as:
- New features are added
- Legal requirements change
- Best practices evolve

**Notification**: Updates will be clearly indicated in:
- This document's version history
- Release notes
- GitHub commit history

---

## Best Practices for Users

### Protect Your Privacy
1. **Review Permissions**: Only grant necessary permissions
2. **API Keys**: Keep your API keys private
3. **Sharing**: Think before sharing sensitive photos
4. **Updates**: Keep the app updated for security patches

### Enhanced Privacy Options
1. **Disable AI Features**: Don't configure API keys
2. **Local Only**: Don't install or use the AI server
3. **Offline Mode**: Disable internet access for the app
4. **Regular Cleanup**: Delete photos you no longer need

---

## Developer Privacy Guidelines

For developers contributing to TrueView Camera:

### Code Requirements
1. **No Telemetry**: Don't add usage tracking
2. **No External Calls**: No unauthorized network requests
3. **Secure Storage**: Use secure storage APIs
4. **Document Data Flow**: Explain any data processing

### Review Checklist
Before submitting a PR, ask:
- [ ] Does this collect or transmit user data?
- [ ] Is user consent obtained?
- [ ] Is data handling documented?
- [ ] Are there privacy-preserving alternatives?
- [ ] Are API keys properly secured?

---

## Compliance

### Regulations
This app is designed to comply with:
- **GDPR** (EU): Right to access, deletion, portability
- **CCPA** (California): Consumer privacy rights
- **COPPA** (US): Children's privacy protection
- **General Privacy Principles**: Worldwide best practices

### Data Protection
- **Data Minimization**: Collect only what's necessary (nothing!)
- **Purpose Limitation**: Use data only for stated purposes
- **Storage Limitation**: No long-term data storage on external servers
- **Integrity and Confidentiality**: Secure processing and transmission

---

## Contact

### Privacy Concerns
If you have privacy questions or concerns:
1. **Review**: Check this document and the code
2. **Issues**: Open a GitHub issue with `privacy` label
3. **Security**: For security issues, see SECURITY.md

### Data Subject Requests
Since all data is on your device:
- **Access**: Check your device's gallery
- **Deletion**: Delete from your device
- **Export**: Use your device's export features

---

## Transparency Report

### Current Status (v1.0)
- **Data Collected**: None
- **Data Stored Externally**: None
- **Third-Party Sharing**: Only when you explicitly share
- **Tracking**: None
- **Analytics**: None
- **Advertising**: None

This will be updated as the app evolves.

---

## Acknowledgments

Privacy principles inspired by:
- **Privacy by Design** framework
- **GDPR** privacy principles
- **Electronic Frontier Foundation** best practices
- **Open Source privacy standards**

---

**Last Updated**: October 2025  
**Version**: 1.0  
**Next Review**: January 2026

---

*TrueView Camera is committed to protecting your privacy. This is an open source project - you can verify all claims by reviewing the code.*
