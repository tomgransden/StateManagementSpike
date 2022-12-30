import React from 'react';
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

import {PublicRecipeSearchResult} from '../types/publicRecipeTypes';
import {useGetRecepieListQuery} from '../services/recepieApi';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigationTypes';

type RecipeListProps = NativeStackScreenProps<
  RootStackParamList,
  'Slimming World Recipes'
>;

const screenWidth: number = Dimensions.get('screen').width;

const renderItem = (
  item: PublicRecipeSearchResult,
  navigation: NativeStackNavigationProp<any>,
): JSX.Element => (
  <TouchableOpacity
    style={style.tileContainer}
    onPress={() => navigation.navigate('Recipe Detail', {slug: item.link})}>
    <Image
      source={{
        uri: `${item.image.src}&width=${screenWidth}&height=${screenWidth}`,
      }}
      style={style.image}
    />
    <View style={style.textContainer}>
      <Text style={style.text}>{item.title}</Text>
    </View>
  </TouchableOpacity>
);

const RecipeList = ({navigation}: RecipeListProps) => {
  const {data, error, isLoading} = useGetRecepieListQuery(
    'search?limit=12&offset=0',
  );

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
            // setError(false);
            // loadRecipes();
          }}>
          <Text>An error occured. retry?</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      style={style.container}
      data={data?.data}
      renderItem={({item}) => renderItem(item, navigation)}
    />
  );
};

type RecipeListStyle = {
  container: ViewStyle;
  tileContainer: ViewStyle;
  image: ImageStyle;
  textContainer: ViewStyle;
  text: TextStyle;
  loadingContainer: ViewStyle;
};

const style = StyleSheet.create<RecipeListStyle>({
  container: {flex: 1},
  tileContainer: {height: screenWidth},
  image: {width: screenWidth, height: screenWidth},
  textContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    minHeight: 60,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  text: {color: '#fffefe', textAlign: 'center', fontSize: 24},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecipeList;
