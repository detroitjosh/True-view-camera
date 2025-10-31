# Support

Thank you for using TrueView Camera! This document will help you get the support you need.

## 📚 Documentation

Before asking for help, please check our documentation:

- **[README.md](README.md)** - Overview and quick start
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide
- **[DOCUMENTATION.md](DOCUMENTATION.md)** - Comprehensive user manual
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture
- **[ROADMAP.md](ROADMAP.md)** - Feature roadmap and plans

## 🐛 Found a Bug?

1. Check [existing issues](https://github.com/detroitjosh/True-view-camera/issues)
2. If not found, [create a bug report](https://github.com/detroitjosh/True-view-camera/issues/new?template=bug_report.md)
3. Provide as much detail as possible

## 💡 Have a Feature Idea?

1. Check [GitHub Discussions](https://github.com/detroitjosh/True-view-camera/discussions)
2. Search for similar suggestions
3. If new, [create a feature request](https://github.com/detroitjosh/True-view-camera/issues/new?template=feature_request.md)

## ❓ Need Help?

### General Questions

For general questions about using the app:
1. Check the [DOCUMENTATION.md](DOCUMENTATION.md)
2. Search [closed issues](https://github.com/detroitjosh/True-view-camera/issues?q=is%3Aissue+is%3Aclosed)
3. Ask in [GitHub Discussions](https://github.com/detroitjosh/True-view-camera/discussions) - Q&A category

### Technical Questions

For technical or development questions:
1. Check the [ARCHITECTURE.md](ARCHITECTURE.md)
2. Review existing [GitHub Discussions](https://github.com/detroitjosh/True-view-camera/discussions)
3. Ask in Discussions - General or Development category

## 🚨 Common Issues

### Installation Problems

#### npm install fails
```bash
# Try with legacy peer deps
npm install --legacy-peer-deps
```

#### Expo version conflicts
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Camera Issues

#### Camera not working
1. Check permissions in device settings
2. Restart the app
3. Try on a different device
4. Check [camera issues](https://github.com/detroitjosh/True-view-camera/issues?q=is%3Aissue+label%3Acamera)

#### Photos too dark/light
1. Make sure `SKIN_TONE_ENHANCEMENT=true` in .env
2. Try different lighting conditions
3. Report specific cases as issues

### AI Features Issues

#### AI generation not working
1. Check if server is running: `cd server && npm start`
2. Verify API keys in .env
3. Check network connection
4. See [AI troubleshooting](server/README.md)

### Build Issues

#### iOS build fails
1. Check Expo CLI is updated: `npm install -g expo-cli`
2. Verify Xcode is up to date (Mac only)
3. Clear build cache: `expo start -c`

#### Android build fails
1. Check Android Studio is properly set up
2. Update SDK and tools
3. Clear build cache: `expo start -c`

## 🔒 Security Issues

For security vulnerabilities, please see [SECURITY.md](SECURITY.md) for responsible disclosure process.

**DO NOT** post security vulnerabilities in public issues.

## 👥 Community

### GitHub Discussions
The best place for:
- Questions and answers
- Feature discussions
- Showing what you've built
- Getting feedback

[Join the discussions →](https://github.com/detroitjosh/True-view-camera/discussions)

### Contributing
Want to contribute? See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📞 Response Times

We're a community-driven project, but we aim for:

- **Critical bugs**: Response within 24-48 hours
- **Security issues**: Response within 48 hours
- **Feature requests**: Response within 1 week
- **General questions**: Response within 3-5 days

*Note: Response times are best-effort and may vary based on maintainer availability.*

## 🤝 Getting Better Support

To help us help you faster:

### When Reporting Issues
- ✅ Search for existing issues first
- ✅ Use the issue templates
- ✅ Provide complete information
- ✅ Include screenshots/videos if relevant
- ✅ Specify your environment (device, OS, version)
- ✅ Share error messages and logs

### When Asking Questions
- ✅ Be specific and clear
- ✅ Show what you've tried
- ✅ Provide context
- ✅ Be patient and respectful
- ✅ Follow up if you solve it yourself

## 🌟 Support the Project

While we don't have paid support, you can help the project by:

1. **Using it**: Try the app and share feedback
2. **Contributing**: Code, docs, or design
3. **Spreading the word**: Share with others
4. **Reporting bugs**: Help us improve quality
5. **Answering questions**: Help other users
6. **Starring the repo**: Show your support ⭐

## 📋 Support Checklist

Before asking for help:

- [ ] I've read the relevant documentation
- [ ] I've searched existing issues
- [ ] I've searched discussions
- [ ] I've tried the common solutions above
- [ ] I can provide clear reproduction steps
- [ ] I've included my environment details

## 🔗 Useful Links

- **Repository**: https://github.com/detroitjosh/True-view-camera
- **Issues**: https://github.com/detroitjosh/True-view-camera/issues
- **Discussions**: https://github.com/detroitjosh/True-view-camera/discussions
- **Releases**: https://github.com/detroitjosh/True-view-camera/releases

## 📖 External Resources

### Expo Documentation
- [Expo Docs](https://docs.expo.dev/)
- [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/)
- [Expo Media Library](https://docs.expo.dev/versions/latest/sdk/media-library/)

### React Native
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Native Community](https://reactnative.dev/community/overview)

### AI Services
- [HuggingFace Docs](https://huggingface.co/docs)
- [Stability AI Docs](https://platform.stability.ai/docs)

## 💬 Feedback

We're always looking to improve our support. If you have suggestions:
- Open a [documentation improvement issue](https://github.com/detroitjosh/True-view-camera/issues/new?template=documentation.md)
- Share feedback in [Discussions](https://github.com/detroitjosh/True-view-camera/discussions)

---

**Thank you for being part of the TrueView Camera community!** 🙏

We're here to help make your experience great. Don't hesitate to reach out!
