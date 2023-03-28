import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  ImageStyle,
  TextStyle,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {getPublicRecipes} from '../api/publicRecipes';
import {PublicRecipeSearchResult} from '../types/publicRecipeTypes';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigationTypes';
import RecipeTile from './RecipeTile';

type RecipeListProps = NativeStackScreenProps<
  RootStackParamList,
  'Slimming World Recipes'
>;

const RecipeList = ({navigation}: RecipeListProps) => {
  const [recipes, setRecipes] = useState<PublicRecipeSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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
      renderItem={({item}) => (
        <RecipeTile
          item={item}
          onPress={() => {
            navigation.navigate('Recipe Detail', {slug: item.link});
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
