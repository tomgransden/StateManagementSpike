import create from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PublicRecipeDetailed} from '../types/publicRecipeTypes';
import {getPublicRecipeDetail} from '../api/publicRecipes';
import {getPublicRecipes} from '../api/publicRecipes';
import {PublicRecipeSearchResult} from '../types/publicRecipeTypes';
interface RecepiesStore {
  recepiesAll: PublicRecipeSearchResult;
  recepieDetails: PublicRecipeDetailed;
  fetchRecepieDetails: (slug: string) => any;
  fetchRecepiesAll: () => any;
  isLoading: boolean;
  errorFetchingRecepies: boolean;
  errorFetchingRecepieDetail: boolean;

  setErrorFetchingRecepies: (status: boolean) => void;
  setErrorFetchingRecepieDetail: (status: boolean) => void;
}

const useRecepiesStore = create<RecepiesStore>()(
  persist(
    set => ({
      recepiesAll: [],
      recepieDetails: [],
      fetchRecepiesAll: async () => {
        const fetchedRecepiesAll = await getPublicRecipes();
        if (fetchedRecepiesAll) {
          set({recepiesAll: fetchedRecepiesAll || {}});
          set({isLoading: false});
        } else {
          set({errorFetchingRecepies: true});
          set({isLoading: false});
        }
      },
      fetchRecepieDetails: async slug => {
        const fetchedRecepieDetails = await getPublicRecipeDetail(slug);
        if (fetchedRecepieDetails) {
          set({recepieDetails: fetchedRecepieDetails || {}});
          set({isLoading: false});
        } else {
          set({errorFetchingRecepieDetail: true});
          set({isLoading: false});
        }
      },
      isLoading: true,
      errorFetchingRecepies: false,
      errorFetchingRecepieDetail: false,
      setErrorFetchingRecepies: status => {
        set({errorFetchingRecepies: status});
      },
      setErrorFetchingRecepieDetail: status => {
        set({errorFetchingRecepieDetail: status});
      },
    }),
    {name: 'mystorage', getStorage: () => AsyncStorage},
  ),
);
export default useRecepiesStore;
