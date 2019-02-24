# Elis Capture (WIP)
Mobile app, that let's you upload your documents to [Elis](https://rossum.ai/data-capture) with a snap of your finger. Both iOS and Android supported.

**Watch out! This version of expo has a bug. If you're using Android, Async Storage may not work all the times. If you're having trouble with signing in, consider restarting the expo app in your phone.**

## Stack
`react`, `react-native`, `expo`, `rxjs`, `redux`, `redux-observables`, `react-router-native`, `react-native-elements`, `flow`

## Commands
`yarn start` - Runs the packager
`yarn test` - Runs tests
`yarn eslint` - Checks code linting
`yarn flow` - Checks validity of types

## TODO:
* [x] - Refactor auth
* [x] - Fix messages
* [x] - Redesign preview up to latest [design](https://app.zeplin.io/project/5b1682fc37b0c8a45f679b33/screen/5c1cbba8839feeaf105cecc4)
* [x] - Implement upload of multiple pages
* [x] - Fix platform dependant issues
* [x] - Fix screen dependant issues
* [ ] - Add icon for the app

## Nice to Have
- [ ] - Take photo with volume down button
- [ ] - Allow user to choose quality of the camera (to overcome RIR size limit)
- [ ] - Allow user to log out
- [ ] - Handle errors in more user friendly way (so he knows what exactly is the issue)
