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
import {QueryClient} from '@tanstack/react-query';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, //24 hours
      networkMode: 'online',
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): JSX.Element => (
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{persister: asyncStoragePersister}}>
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
  </PersistQueryClientProvider>
);

export default App;
