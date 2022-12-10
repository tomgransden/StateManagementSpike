import {useEffect, useState} from 'react';
import {ActivityIndicator, View, Text, Dimensions, Image} from 'react-native';
import {getPublicRecipeDetail} from '../api/publicRecipes';

const screenWidth = Dimensions.get('screen').width;

const RecipeDetail = ({route}) => {
  console.log(route.params);

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (route.params.slug) {
      getPublicRecipeDetail(route.params.slug).then(recipe =>
        setRecipe(recipe),
      );
    }
  }, [route.params.slug]);

  if (!recipe)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  return (
    <View style={{flex: 1}}>
      <Image
        source={{
          uri: `${recipe.image.src}&width=${screenWidth}&height=${screenWidth}`,
        }}
        style={{width: screenWidth, height: screenWidth}}
      />
      <Text style={{fontSize: 24}}>{recipe.title}</Text>
      <Text style={{fontSize: 16}}>{recipe.description}</Text>
    </View>
  );
};

export default RecipeDetail;
