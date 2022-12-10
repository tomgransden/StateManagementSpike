import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {getPublicRecipeDetail} from '../api/publicRecipes.';
import {PublicRecipeDetailed} from '../types/publicRecipeTypes';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigationTypes';

const screenWidth = Dimensions.get('screen').width;

type Props = NativeStackScreenProps<RootStackParamList, 'Recipe Detail'>;

const RecipeDetail = ({route}: Props): JSX.Element => {
  console.log(route.params);

  const [recipe, setRecipe] = useState<PublicRecipeDetailed | null>();

  useEffect(() => {
    if (route.params.slug) {
      getPublicRecipeDetail(route.params.slug).then(res => setRecipe(res));
    }
  }, [route.params.slug]);

  if (!recipe) {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View style={style.container}>
      <Image
        source={{
          uri: `${recipe.image.src}&width=${screenWidth}&height=${screenWidth}`,
        }}
        style={style.image}
      />
      <Text style={style.title}>{recipe.title}</Text>
      <Text style={style.description}>{recipe.description}</Text>
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
