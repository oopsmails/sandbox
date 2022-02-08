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

- Source path does not exist: resources/android/icon/drawable-hdpi-icon.png

I had the same error, After running

ionic resources

Or

ionic cordova resources


- albert@albert-mint20:~/Documents/dev/ionic/sandbox/ionic-vibration$ ionic cordova resources
> cordova-res
[ERROR] cordova-res was not found on your PATH. Please install it globally:
        
        npm i -g cordova-res


albert@albert-mint20:~/Documents/dev/ionic/sandbox/ionic-vibration$ ionic cordova resources
> cordova-res
[cordova-res] Generated 18 resources for Android
[cordova-res] Generated 47 resources for iOS
[cordova-res] Wrote to config.xml

albert@albert-mint20:~/Documents/dev/ionic/sandbox/ionic-vibration$ ionic cordova platform add android
Platform android already exists.


- Error: Source path does not exist: resources/android/xml/network_security_config.xml


Examine the resources folder if the xml folder exists in /android, if it doesn't just create it like..
```
resources/
    android/
        xml/
           network_security_config.xml
```

Enter the following inside the file

```
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
<domain-config cleartextTrafficPermitted="true">
    <domain includeSubdomains="true">localhost</domain>
</domain-config>
</network-security-config>
```

- Error: ANDROID_HOME

```
> cordova build android
Checking Java JDK and Android SDK versions
ANDROID_SDK_ROOT=undefined (recommended setting)
ANDROID_HOME=undefined (DEPRECATED)
Failed to find 'ANDROID_SDK_ROOT' environment variable. Try setting it manually.
Failed to find 'android' command in your 'PATH'. Try update your 'PATH' to include path to valid SDK directory.

```

Type these commands in the console -

export ANDROID_HOME=$HOME/Android/Sdk (Your SDK path)
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools

To make it permanent for the current user, add it to the ~/.bashrc file (open it in terminal through vim ~/.bashrc)

- Error: JAVA_HOME

```
> cordova build android
Checking Java JDK and Android SDK versions
ANDROID_SDK_ROOT=undefined (recommended setting)
ANDROID_HOME=/home/albert/Android/Sdk (DEPRECATED)
Failed to find 'JAVA_HOME' environment variable. Try setting it manually.
[ERROR] An error occurred while running subprocess cordova.
```

- Error: gradle

```
> cordova build android
Checking Java JDK and Android SDK versions
ANDROID_SDK_ROOT=undefined (recommended setting)
ANDROID_HOME=/home/albert/Android/Sdk (DEPRECATED)
Using Android SDK: /home/albert/Android/Sdk
Could not find an installed version of Gradle either in Android Studio,
or on your system to install the gradle wrapper. Please include gradle 
in your path, or install Android Studio
```

- Error in Android Studio: Terminal, run *ionic cordova build android*, ionic not found

albert@albert-mint20:~$ npm list -g --depth=0
/home/albert/.nvm/versions/node/v16.13.0/lib
├── @angular/cli@13.0.3
├── @ionic/cli@6.18.1
├── cordova-res@0.15.4
├── cordova@11.0.0
├── corepack@0.10.0
└── npm@8.1.0

So, switch to bash, by, *bash*

- Error, no Gradle

Download gradle, which will be in zip file, add to PATH

export GRADLE_HOME=/home/albert/Documents/programs/gradle-7.3.3
export PATH=$PATH:$GRADLE_HOME/bin


- Error in Android Studio: Terminal


/app/extra/android-studio/jre



- Error, No installed build tools found. Install the Android build tools version 30.0.3 or higher.

/home/albert/Documents/dev/ionic/sandbox/ionic-vibration/platforms/android/CordovaLib/cordova.gradle

```
def minBuildToolsVersion = new Version(minBuildToolsVersionString)
    def maxVersion = new Version((minBuildToolsVersion.getMajor() + 1) + ".0.0")

    println '##############' + maxVersion
    // def highestBuildToolsVersion = buildToolsDirContents
    //     .collect { 
    //         println '##############' + it
    //         new Version(it) }
    //     // Invalid inputs will be handled as 0.0.0
    //     .findAll { it.isHigherThan('0.0.0') && it.isLowerThan(maxVersion) }
    //     .max()

    def highestBuildToolsVersion = new Version('32.1.0-rc1') <----------------------------- hard coded here!!!!
    println '##############' + highestBuildToolsVersion

    if (highestBuildToolsVersion == null) {
        throw new RuntimeException("""
            No installed build tools found. Install the Android build tools
            version ${minBuildToolsVersionString} or higher.
        """.replaceAll(/\s+/, ' ').trim())
    }


```

- Error: Installed Build Tools revision 32.1.0-rc1 is corrupted

https://stackoverflow.com/questions/68387270/android-studio-error-installed-build-tools-revision-31-0-0-is-corrupted


First of all, I faced this issue in Android Studio 4.2.2 and you do not need to downgrade the SDK build tool from 31 to 30 or change compile SDK version.

The main problem is the two files missing in SDK build tool 31 that are:

dx.bat
dx.jar

The solution is that these files are named d8 in the file location so changing their name to dx will solve the error.

```
First of all, I faced this issue in Android Studio 4.2.2 and you do not need to downgrade the SDK build tool from 31 to 30 or change compile SDK version.

The main problem is the two files missing in SDK build tool 31 that are:

dx.bat
dx.jar
The solution is that these files are named d8 in the file location so changing their name to dx will solve the error.

The steps are below.

For Windows
go to the location

 "C:\Users\user\AppData\Local\Android\Sdk\build-tools\31.0.0"
find a file named d8.bat. This is a Windows batch file.

rename d8.bat to dx.bat.

in the folder lib ("C:\Users\user\AppData\Local\Android\Sdk\build-tools\31.0.0\lib")

rename d8.jar to dx.jar

Remember AppData is a hidden folder. Turn on hidden items to see the AppData folder.

For macOS or Linux
# change below to your Android SDK path
cd ~/Library/Android/sdk/build-tools/31.0.0 \
  && mv d8 dx \
  && cd lib  \
  && mv d8.jar dx.jar

```




echo $JAVA_HOME
echo $PATH

source ~/.bashrc


ionic cordova build android


