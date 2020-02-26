# Fastlane deployment guide

If you haven't done so already you should install _fastlane_ using

```
[sudo] gem install fastlane -NV
```

or alternatively using `brew cask install fastlane`

### 1. Set proper environment variables

Set the appropriate environment variables in `.env` file for the deployment target.

### 2. Fetch iOS certificates

For iOS local development you need to fetch certificates, so maybe you have already done this part. If that is the case just skip to number 3.

To fetch certificates, run this

```
fastlane ios fetch_certificates
```

You will be prompted for a passphrase (or two). Ask someone who has already done this for those and enter them (they are stored in Gitlab as well, look around).

### 3. Fastlane deployment

During the deployment it is possible that it hangs and nothing happens for longer than 5-10 minutes. If this is the case, kill the process and retry. This is probably because of internet connection breaking.

#### 3a. Deploy Android test release

Download `.env` file from Gitlab. The file should have following structure:

```
MYAPP_RELEASE_STORE_FILE=
MYAPP_RELEASE_KEY_ALIAS=
MYAPP_RELEASE_STORE_PASSWORD=
MYAPP_RELEASE_KEY_PASSWORD=
```

Deploy to Play Store as a testing release

```
fastlane android stage
```

Optionally, you can log in to Play console as `{##Placeholder Deployment Guide##}` and check the current and previous releases in the `Release management` section, under `App releases`.

#### 3b. Deploy iOS test release

Deploy to App Store testflight

```
fastlane ios stage
```

First, you will be prompted, if you're not already logged in, for the `ios@rossum.ai` password, like this

```
[11:50:02]: Login to App Store Connect (ios@rossum.ai)
-------------------------------------------------------------------------------------
Please provide your Apple Developer Program account credentials
The login information you enter will be stored in your macOS Keychain
You can also pass the password using the `FASTLANE_PASSWORD` environment variable
See more information about it on GitHub: https://github.com/fastlane/fastlane/tree/master/credentials_manager
-------------------------------------------------------------------------------------
Password (for ios@rossum.ai): ************
```

Enter the password.

During the deployment you will be prompted 4 times with a dialog to enter a password, with a text like this `codesign wants to access key "......." in your keychain`. Enter your mac password here.

It is possible that many errors pop up at the end of the ios deployment. This is supposedly normal and the only thing you should care about is that you get a string like this towards the end of the output:

```
[12:24:46]: Successfully uploaded the new binary to App Store Connect
```

Go to `https://developer.apple.com/app-store/` and click `Account` in the navbar. Log in as `ios@rossum.ai` and make sure that in the top right corner, under `Rossum Ltd.`, `Rossum Ltd.` is selected.

Then, go to `App Store Connect`. Open the menu in the upper left corner and click `My Apps`. Select your app and go to `TestFlight` tab. Releases are sorted alphabetically, so the latest release might be at the bottom. Find the latest/current release and it should report a status of `Missing Compliance`. Click on the yellow warning sign ⚠️ and then on `Provide Export Compliance Information` text. Select `No` and click `Start Internal Testing`.

### 4. Profit

:tada: