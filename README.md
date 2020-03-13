# Rossum Capture (MVP)

Mobile app, that let's you upload your documents to [Elis](https://rossum.ai/data-capture) with a snap of your finger. Both iOS and Android supported.

## Stack

`react`, `react-native`, `rxjs`, `redux`, `redux-observables`, `react-router-native`, `react-native-elements`, `typescript`

## Start

`yarn android` - to run android app (you will need android sdk, or real device connected)
`yarn ios` - to run ios app (you will need the Xcode installed) - in this case pls navigate to `/fastlane` folder and run `fastlane fetch_certificates` - see `deployment_guide.md` for more info)
you will be probably prompted to have private key for the certificate installed. The key is stored in `...`
