# sandbox


# ionic-dev-repo


## Ionic 5 Adding Vibration Ionic Example Application using Cordova & Native Plugins

- Ref:

https://www.freakyjolly.com/vibration-in-ionic-application-using-cordova-native-plugins/

### Install or Update Ionic CLI

npm install -g @ionic/cli
npm install @ionic/cli


npm uninstall cordova ionic

npm cache clean -f
npm install npm -g

### Create new Ionic Angular Application

ionic start ionic-vibration-plugin-app blank --type=angular

ionic start ionic-vibration blank --type=angular

- Error: nodejs\ionic.ps1 cannot    be loaded because running scripts is   disabled on this system.

Solution 1: Switch to git bash.

Solution 2: Remove ng.ps1 from the directory C:\Users\%username%\AppData\Roaming\npm\ then try clearing the npm cache at C:\Users\%username%\AppData\Roaming\npm-cache\

Solution 3: run Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser


ionic serve --lab

The--lab option is used to open the application in the browser into a lab viewer where you can concurrently see how it will look on multiple platforms including Android, iOS, and Windows. 


### Install Cordova & Native Plugins for Vibration

ionic cordova plugin add cordova-plugin-vibration

- Error: [ERROR] Refusing to run ionic cordova plugin inside a Capacitor project.

Solution 1: Running the code below should fix it  

```
ionic integrations disable capacitor

this actually changes ionic.config.json

"capacitor": {
      "enabled": false
    }

```

Solution 2: simply delete the capacitor.config file in the root of the project and the 'capacitor' entry in ionic.config.json under integrations


- Error: [ERROR] The Cordova CLI was not found on your PATH. 
```
Please install Cordova
        globally:

npm i -g cordova
```


npm install @ionic-native/vibration

- Error: Error: The target entry-point "@ionic-native/vibration" has missing dependencies: [ng]  - @ionic-native/core

npm i @ionic-native/core


ionic serve --lab

### Run Application in Real Device
To check vibration functionality, you need to run the application in a real device. For that, you need to add the Platform for which you are going to build the application.


#### Add Platform in Application
Run the following command in the terminal to install the required platform

```
# Add Android
$ ionic cordova platform add android

# Add iOS
$ ionic cordova platform add ios

# Add Windows
$ ionic cordova platform add windows
```

#### Build Runnable File
After adding the platform, you can run the following commands to create an executable file like APK file for Android. Or you can simply run the app in the USB connected mobile with USB Debugging enabled discussed in the next step.

```
# Build Android
$ ionic cordova build android

# Build iOS
$ ionic cordova build ios

# Build Windows
$ ionic cordova build windows
```

#### Live Run Application in USB connected Device
If you just want to run the application in the real device and debug it on the Chrome browser, just execute the following command after connecting your mobile to your computer

```
# Live Run on Android
$ ionic cordova run android -l

# Live Run on iOS
$ ionic cordova run ios -l

# Live Run on Windows
$ ionic cordova run windows -l

```


