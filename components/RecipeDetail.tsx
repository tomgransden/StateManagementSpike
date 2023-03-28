import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import {getPublicRecipeDetail} from '../api/publicRecipes';
import {PublicRecipeDetailed} from '../types/publicRecipeTypes';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigationTypes';

const screenWidth = Dimensions.get('screen').width;

type RecipeDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'Recipe Detail'
>;

const RecipeDetail = ({route}: RecipeDetailProps) => {
  const [recipe, setRecipe] = useState<PublicRecipeDetailed | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const loadRecipeDetail = useCallback((slug: string) => {
    getPublicRecipeDetail(slug)
      .then(res => {
        setRecipe(res);
      })
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (route.params.slug) {
      loadRecipeDetail(route.params.slug);
    }
  }, [route.params.slug, loadRecipeDetail]);

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
            loadRecipeDetail(route.params.slug);
          }}>
          <Text>An error occured. retry?</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <Image
        source={{
          uri: `${recipe?.image.src}&width=${screenWidth}&height=${screenWidth}`,
        }}
        style={style.image}
      />
      <Text style={style.title}>{recipe?.title}</Text>
      <Text style={style.description}>{recipe?.description}</Text>
    </View>
  );
};

type RecipeListStyle = {
  container: ViewStyle;
  image: ImageStyle;
  title: TextStyle;
  description: TextStyle;
  loadingContainer: ViewStyle;
};

const style = StyleSheet.create<RecipeListStyle>({
  container: {
    flex: 1,
  },
  image: {
    width: screenWidth,
    height: screenWidth,
  },
  title: {fontSize: 24},
  description: {fontSize: 16},
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default RecipeDetail;
