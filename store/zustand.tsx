import create from 'zustand';
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
  error: boolean;
  setError: (state: boolean) => void;
}

const useRecepiesStore = create<RecepiesStore>()(set => ({
  recepiesAll: [],
  recepieDetails: [],
  fetchRecepiesAll: async () => {
    const fetchedRecepiesAll = await getPublicRecipes();
    if (fetchedRecepiesAll) {
      set({recepiesAll: fetchedRecepiesAll || {}});
      set({isLoading: false});
    } else {
      set({error: true});
      set({isLoading: false});
    }
  },
  fetchRecepieDetails: async slug => {
    const fetchedRecepieDetails = await getPublicRecipeDetail(slug);
    if (fetchedRecepieDetails) {
      set({recepieDetails: fetchedRecepieDetails || {}});
      set({isLoading: false});
    } else {
      set({error: true});
      set({isLoading: false});
    }
  },
  isLoading: true,
  error: false,
  setError: state => {
    set({error: state});
  },
}));
export default useRecepiesStore;
