# JodelStatsReactNative
A [Jodel Stats](http://jodelstats.com) client for iOS (Android probably coming soon) implemented using React Native.

## What is this?
This is an app that lets you read the most popular posts on [Jodel](http://jodel-app.com) from everywhere in the world.
Just like [jodelstats.com](http://jodelstats.com), but right on your homescreen!

## How do I install it?
**iOS Users:**

You need a Mac with a recent version of XCode and a free Apple Developer account.

1. [Download](https://github.com/ppati000/JodelStatsReactNative/archive/master.zip) this repository as a zip
2. Unzip it
3. Open `JodelStatsReactNative/ios/JodelStatsReactNative/AppDelegate.m` and change the line
`   //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];`
to `   jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];`
4. Open `JodelStatsReactNative/ios/JodelStatsReactNative.xcodeproj`
5. Select your device in XCode and compile the project. If you get a codesigning error, try changing the app's bundle id.
(Just click on `JodelStatsReactNative` on the top left, then on `Target`)

If you need any help, feel free to message me on [Twitter](http://twitter.com/ppati000) or send me an [e-mail](mailto:ppati000@me.com) :)

**Android Users:**

This app is currently not available for Android users. Android support might be coming soon.

## How can I contribute?

- Fork it
- Push your changes
- Make a pull request

#TODO:

- Android support
- Search support
- Internationalization
- Fix a bug that causes the refresh indicator not to be shown
