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










