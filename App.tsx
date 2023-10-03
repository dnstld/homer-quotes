import React from 'react';
import { AppRegistry } from 'react-native';

import HomerQuotes from './src/screens/homer-quotes';

const App = () => <HomerQuotes />;

AppRegistry.registerComponent('HomerQuotesApp', () => App);

export default App;
