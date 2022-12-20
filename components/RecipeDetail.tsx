import React, {useEffect} from 'react';
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
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigationTypes';
import useRecepiesStore from '../store/zustand';

const screenWidth = Dimensions.get('screen').width;

type RecipeDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'Recipe Detail'
>;

const RecipeDetail = ({route}: RecipeDetailProps): JSX.Element => {
  const {fetchRecepieDetails, recepieDetails, isLoading, error, setError} =
    useRecepiesStore(state => state);

  useEffect(() => {
    if (route.params.slug) {
      fetchRecepieDetails(route.params.slug);
    }
  }, [route.params.slug, fetchRecepieDetails]);

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
            fetchRecepieDetails(route.params.slug);
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
          uri: `${recepieDetails?.image?.src}&width=${screenWidth}&height=${screenWidth}`,
        }}
        style={style.image}
      />
      <Text style={style.title}>{recepieDetails?.title}</Text>
      <Text style={style.description}>{recepieDetails?.description}</Text>
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
