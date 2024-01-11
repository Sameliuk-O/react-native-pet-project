import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './screens/Home';
import {Login} from './screens/Login';
import {Registration} from './screens/Registration';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login'}}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{title: 'Registration'}}
        />
        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
