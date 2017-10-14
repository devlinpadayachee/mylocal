Start Android Emulator
emulator -list-avds
emulator -avd Nexus_5X_API_25

Start ReactNative
react-native run-android
react-native log-android

 cd android && ./gradlew assembleRelease
 react-native run-android --variant=release
