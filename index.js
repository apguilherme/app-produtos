
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { LogBox } from "react-native"

AppRegistry.registerComponent(appName, () => App);

//LogBox.ignoreAllLogs(true)

// set PATH=%PATH%;D:\Android\Sdk\platform-tools
// set JAVA_HOME=D:\Java\jdk-15.0.1
// adb reverse tcp:3333 tcp:3333 
// adb devices
// npx react-native run-android
// https://stackoverflow.com/questions/60844245/how-solve-could-not-initialize-class-org-codehaus-groovy-reflection-reflectionc
