import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ParamList } from './type';
import QuotesScreen from '../quotes';
import ShareScreen from '../share';

const Stack = createNativeStackNavigator<ParamList>();

const Root = () => {
  return (
    <Stack.Navigator screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen
        name="Quotes"
        component={QuotesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Share" component={ShareScreen} />
    </Stack.Navigator>
  );
};

export default Root;
