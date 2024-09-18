import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {createStackNavigator} from '@react-navigation/stack';
import ManagerContainer from './ManagerContainer';

const Stack = createStackNavigator();

export default function Root(props) {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          name="Manager"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="ManagerContainer" component={ManagerContainer} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast
        config={{
          position: 'bottom',
          bottomOffset: 60,
        }}
      />
    </>
  );
}
