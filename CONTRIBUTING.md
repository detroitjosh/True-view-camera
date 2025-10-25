# Contributing to TrueView Camera

Thank you for considering contributing to TrueView Camera! We welcome contributions from everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/detroitjosh/True-view-camera/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Device and OS information

### Suggesting Features

1. Check [Discussions](https://github.com/detroitjosh/True-view-camera/discussions) for similar suggestions
2. Create a new discussion or issue with:
   - Clear use case
   - Expected behavior
   - Why this would be valuable
   - Possible implementation approach

### Code Contributions

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR-USERNAME/True-view-camera.git
   cd True-view-camera
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Keep changes focused and atomic
   - Test on both iOS and Android if possible

4. **Test Your Changes**
   ```bash
   npm start
   # Test thoroughly on device or simulator
   ```

5. **Commit**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```
   
   Follow conventional commits:
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation
   - `style:` formatting
   - `refactor:` code restructuring
   - `test:` adding tests
   - `chore:` maintenance

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Keep lines under 100 characters when possible
- Use meaningful variable names
- Add JSDoc comments for functions

### Testing

- Test on both iOS and Android
- Test on physical devices when possible
- Verify camera permissions work correctly
- Check that all features work as expected
- Test with different skin tones if working on imaging features

## Development Setup

### Prerequisites
- Node.js 16+
- Expo CLI
- iOS Simulator (Mac) or Android Studio
- Git

### Environment Setup
1. Copy `.env.example` to `.env`
2. Configure any necessary API keys
3. Run `npm install`

### Running the App
```bash
npm start
```

### Running the AI Server
```bash
cd server
npm install
npm start
```

## Project Structure

- `/src/screens` - Main app screens
- `/src/components` - Reusable UI components
- `/src/utils` - Utility functions
- `/src/services` - External service integrations
- `/server` - Optional AI server

## Focus Areas

We especially welcome contributions in:

1. **Skin Tone Processing**
   - Better detection algorithms
   - Enhanced color correction
   - Real Tone implementation improvements

2. **AI Features**
   - Local model integration
   - Performance optimization
   - New generation capabilities

3. **Filters & Effects**
   - New filter presets
   - Advanced editing tools
   - Real-time processing improvements

4. **Accessibility**
   - Screen reader support
   - High contrast modes
   - Alternative input methods

5. **Performance**
   - Faster image processing
   - Better memory management
   - Smoother UI

## Community

- Be respectful and inclusive
- Help others learn and grow
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md)
- Ask questions in Discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to ask questions in [Discussions](https://github.com/detroitjosh/True-view-camera/discussions)!

Thank you for contributing! 🙏
