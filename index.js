import { AppRegistry } from 'react-native';
import AppContainer from './src/app.container';
import { YellowBox } from 'react-native';

AppRegistry.registerComponent('BRouterDemo', () => AppContainer);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);