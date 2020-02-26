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
### bump_version
```
fastlane bump_version
```
Bump build number and git tag

----

## Android
### android test
```
fastlane android test
```
Build and submit Elis Capture to Play Store Beta

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
