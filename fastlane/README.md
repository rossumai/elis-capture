fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## Android
### android store
```
fastlane android store
```
Build and submit Rossum Capture to Play Store
### android stage
```
fastlane android stage
```


----

## iOS
### ios fetch_certificates
```
fastlane ios fetch_certificates
```
Download appstore, release and development certificates
### ios stage
```
fastlane ios stage
```
Build and deploy iOS app

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
