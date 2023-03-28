import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  ViewStyle,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {getPublicRecipes} from '../api/publicRecipes';
import {PublicRecipeSearchResult} from '../types/publicRecipeTypes';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigationTypes';
import RecipeTile from './RecipeTile';
import {useNavigation} from '@react-navigation/native';

type RecipeListNavigator = NativeStackNavigationProp<
  RootStackParamList,
  'Slimming World Recipes'
>;

const RecipeList = () => {
  const [recipes, setRecipes] = useState<PublicRecipeSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const {navigate} = useNavigation<RecipeListNavigator>();

  const loadRecipes = useCallback(() => {
    getPublicRecipes()
      .then(res => {
        setRecipes(res);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  if (isLoading) {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={style.loadingContainer}>
        <Pressable
          onPress={() => {
            setError(false);
            loadRecipes();
          }}>
          <Text>An error occured. retry?</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      style={style.container}
      data={recipes}
      initialNumToRender={12}
      renderItem={({item}) => (
        <RecipeTile
          item={item}
          onPress={() => {
            navigate('Recipe Detail', {slug: item.link});
          }}
        />
      )}
    />
  );
};

type RecipeListStyle = {
  container: ViewStyle;
  loadingContainer: ViewStyle;
};

const style = StyleSheet.create<RecipeListStyle>({
  container: {flex: 1},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecipeList;
