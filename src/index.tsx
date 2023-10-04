import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import Root from './routes/__layout';

const App = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};

export default App;
