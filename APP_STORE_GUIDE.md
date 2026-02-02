# Custom Dev Client - App Store Submission Guide

This is a custom Expo development client that can be submitted to the Apple App Store. It functions similarly to Expo Go but under your own Apple Developer account.

## What This App Does

This is a **development client** that allows you to:
- Scan QR codes to load Expo development projects
- Connect to Metro bundler servers
- Test your Expo apps on physical devices
- Use native modules beyond what's available in Expo Go

## Key Differences from Expo Go

1. **Your Own Bundle ID**: Uses `com.yourcompany.devclient` (customize this)
2. **App Store Compliant**: Can be submitted to the App Store
3. **Your Branding**: Customize the name, icon, and colors
4. **Extended Native Modules**: Include any native modules your projects need

## Setup Steps

### 1. Configure Your App Identity

Edit `app.json` and update:
- `expo.name`: Your app's display name
- `expo.slug`: URL-friendly identifier
- `expo.ios.bundleIdentifier`: Your unique bundle ID (e.g., `com.yourcompany.devclient`)
- `expo.extra.eas.projectId`: Get this by running `eas init`

### 2. Create App Icons

You need to provide:
- `assets/icon.png` (1024x1024) - App icon
- `assets/splash.png` (1284x2778 recommended) - Splash screen
- `assets/adaptive-icon.png` (1024x1024) - Android adaptive icon
- `assets/favicon.png` (48x48) - Web favicon

You can generate these with: `bunx expo generate:icon`

### 3. Initialize EAS

```bash
bunx eas-cli init
```

This creates your Expo project and updates the `projectId` in `app.json`.

### 4. Configure Apple Developer Account

The easiest way is through the Expo Launch integration:
- Go to https://expo.dev in your browser
- Navigate to your project
- Go to the "Launch" tab
- Follow the guided Apple sign-in and app creation flow

Alternatively, use EAS CLI:
```bash
bunx eas-cli device:create
```

### 5. Build for App Store

For iOS simulator (testing):
```bash
bunx eas-cli build -p ios --profile development
```

For TestFlight (internal testing):
```bash
bunx eas-cli build -p ios --profile preview
```

For App Store submission:
```bash
bunx eas-cli build -p ios --profile production
```

### 6. Submit to App Store

After a successful production build:
```bash
bunx eas-cli submit -p ios --latest
```

## App Store Review Guidelines

To pass Apple's review:

1. **Clear Purpose**: In your App Store description, clearly state this is a development tool for testing Expo applications

2. **Privacy Policy**: Provide a privacy policy URL in App Store Connect

3. **App Review Notes**: In App Store Connect's "App Review Information", explain:
   - This is a development client for React Native/Expo apps
   - How to test: provide a demo project URL they can scan
   - Any test credentials if needed

4. **Demo Content**: Consider having a default demo project that loads if no QR code is scanned, so reviewers can see it in action

5. **Permissions**: The app requests camera (for QR scanning), microphone, and photo library access. Ensure your usage descriptions in `app.json` explain why.

## Customization

### Add More Native Modules

If your projects need specific native modules, install them:
```bash
bunx expo add expo-camera expo-location react-native-maps
```

Then rebuild with EAS Build. The new modules will be compiled into your custom dev client.

### Branding

Update these files to match your brand:
- `app.json` - name and colors
- `assets/icon.png` - your icon
- `src/app/index.tsx` - customize the UI

### Advanced: Auto-Load a Project

You can modify `src/app/index.tsx` to automatically load a specific project URL on launch, making it a dedicated client for your organization's apps.

## Troubleshooting

### Build Failures

If a build fails:
```bash
# View recent builds
bunx eas-cli build:list -p ios --status errored --limit 5

# Get details on a specific build
bunx eas-cli build:view <BUILD_ID>
```

### Native Module Issues

If you get "Cannot find native module" errors:
- Remove or replace the problematic import
- Make sure the module is installed with `bunx expo add`
- Create a new build with the module included

### App Store Rejection

Common reasons and fixes:
- **"App is too simple"**: Add more context about it being a development tool
- **"Missing functionality"**: Provide demo content that reviewers can test
- **"Privacy issues"**: Ensure all permission descriptions are clear and accurate

## Resources

- [Expo Dev Client Docs](https://docs.expo.dev/develop/development-builds/introduction/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Expo Forums](https://forums.expo.dev/)

## Support

For issues with:
- **EAS Build**: Check https://expo.dev/eas-status
- **App Store Review**: Contact Apple Developer Support
- **Expo SDK**: File issues at https://github.com/expo/expo
