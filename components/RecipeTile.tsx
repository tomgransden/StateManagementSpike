import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  ViewStyle,
  TextStyle,
  Dimensions,
  StyleSheet,
  ImageStyle,
} from 'react-native';
import {PublicRecipeSearchResult} from '../types/publicRecipeTypes';

interface RecipeTileProps {
  item: PublicRecipeSearchResult;
  onPress: () => void;
}

const screenWidth = Dimensions.get('screen').width;

const RecipeTile = ({item, onPress}: RecipeTileProps) => (
  <TouchableOpacity style={style.tileContainer} onPress={onPress}>
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

type RecipeTileStyle = {
  tileContainer: ViewStyle;
  image: ImageStyle;
  textContainer: ViewStyle;
  text: TextStyle;
};

const style = StyleSheet.create<RecipeTileStyle>({
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
  text: {
    color: '#fffefe',
    textAlign: 'center',
    fontSize: 24,
  },
});

export default RecipeTile;
