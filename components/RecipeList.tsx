import React, {useMemo} from 'react';
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
import {
  selector,
  useRecoilCallback,
  useRecoilSnapshot,
  useRecoilValueLoadable,
} from 'recoil';

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

const recipesSelector = selector({
  key: 'recipesSelector',
  get: async () => {
    return await getPublicRecipes().then(data => data);
  },
});

function QueryErrorMessage() {
  const snapshot = useRecoilSnapshot();
  const selectors = useMemo(() => {
    const ret = [];
    for (const node of snapshot.getNodes_UNSTABLE({isInitialized: true})) {
      const {loadable} = snapshot.getInfo_UNSTABLE(node);
      if (loadable != null && loadable.state === 'hasError') {
        ret.push(node);
      }
    }
    return ret;
  }, [snapshot]);
  const retry = useRecoilCallback(
    ({refresh}) =>
      () =>
        selectors.forEach(refresh),
    [selectors],
  );

  return selectors.length > 0 ? (
    <View>
      <Text>Error</Text>
      <Text>Query: {selectors[0].key}</Text>
      <Pressable onPress={retry}>
        <Text>Retry</Text>
      </Pressable>
    </View>
  ) : null;
}

const RecipeList = ({navigation}: RecipeListProps) => {
  const recipesState = useRecoilValueLoadable(recipesSelector);

  if (recipesState.state === 'loading') {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  if (recipesState.state === 'hasError') {
    return <QueryErrorMessage />;
  }

  return (
    <FlatList
      style={style.container}
      data={recipesState.contents}
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
