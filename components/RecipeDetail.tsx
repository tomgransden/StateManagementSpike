import React from 'react';
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
import {getPublicRecipeDetail} from '../api/publicRecipes.';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigationTypes';
import {useQuery} from '@tanstack/react-query';

const screenWidth = Dimensions.get('screen').width;

type Props = NativeStackScreenProps<RootStackParamList, 'Recipe Detail'>;

const RecipeDetail = ({route}: Props): JSX.Element => {
  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ['publicRecipe', route.params.slug],
    queryFn: getPublicRecipeDetail,
  });

  if (isLoading) {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={style.loadingContainer}>
        <Pressable onPress={() => refetch()}>
          <Text>An error occured, retry?</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <Image
        source={{
          uri: `${data.image.src}&width=${screenWidth}&height=${screenWidth}`,
        }}
        style={style.image}
      />
      <Text style={style.title}>{data.title}</Text>
      <Text style={style.description}>{data.description}</Text>
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
