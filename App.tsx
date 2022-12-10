/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import {RootStackParamList} from './types/navigationTypes';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#d3072a',
          },
          headerTintColor: '#fffefe',
        }}>
        <Stack.Screen name="Slimming World Recipes" component={RecipeList} />
        <Stack.Screen name="Recipe Detail" component={RecipeDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  </QueryClientProvider>
);

export default App;
