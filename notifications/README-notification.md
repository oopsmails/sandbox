

- Ref:

https://www.youtube.com/watch?v=bww4a4B43tM

- 00:33

ionic start notification blank --type=angular --capacitor

cd notification
ionic build
npx cap add ios
npx cap add android

- copy to android

ionic capacitor copy android

- before open Android Studio or if any change

npx cap sync

- Android Studio, open *sandbox/notifications/android* and run and test using simulator

- build apk

*ionic capacitor copy android && cd android && ./gradlew assembleDebug && cd ..*

```
cd android 
./gradlew assembleDebug
```

Then your apk will be at:

android/app/build/outputs/apk/debug/app-debug.apk





