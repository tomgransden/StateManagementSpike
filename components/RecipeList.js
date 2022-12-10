import {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import {getPublicRecipes} from '../api/publicRecipes';

const screenWidth = Dimensions.get('screen').width;

renderItem = (item, navigation) => (
  <TouchableOpacity
    style={{height: screenWidth}}
    onPress={() => navigation.navigate('Recipe Detail', {slug: item.link})}>
    <Image
      source={{
        uri: `${item.image.src}&width=${screenWidth}&height=${screenWidth}`,
      }}
      style={{width: screenWidth, height: screenWidth}}
    />
    <View
      style={{
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        height: 60,
        justifyContent: 'center',
      }}>
      <Text style={{color: '#fffefe', textAlign: 'center', fontSize: 24}}>
        {item.title}
      </Text>
    </View>
  </TouchableOpacity>
);

const RecipeList = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getPublicRecipes().then(res => {
      setRecipes(res);
    });
  }, []);

  return (
    <FlatList
      style={{flex: 1}}
      data={recipes}
      renderItem={({item}) => renderItem(item, navigation)}
    />
  );
};

export default RecipeList;
