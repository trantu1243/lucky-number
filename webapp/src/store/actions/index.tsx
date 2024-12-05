import {setUser} from '../slices/userSlice';
import {setScreen} from '../slices/tabSlice';
import {resetFilters} from '../slices/filterSlice';
import {setSelectedTags} from '../slices/filterSlice';
import {setSelectedSizes} from '../slices/filterSlice';
import {setSelectedColors} from '../slices/filterSlice';
import {setSelectedRatings} from '../slices/filterSlice';
import {setFirstLaunch} from '../slices/firstLaunchSlice';
import {setSelectedPotTypes} from '../slices/filterSlice';
import {setSelectedCategories} from '../slices/filterSlice';
import {setSelectedPlantTypes} from '../slices/filterSlice';
import {setPhoneVerified} from '../slices/verificationSlice';
import {setEmailVerified} from '../slices/verificationSlice';

export const actions = {
  setUser,
  setScreen,
  resetFilters,
  setFirstLaunch,
  setSelectedTags,
  setPhoneVerified,
  setSelectedSizes,
  setEmailVerified,
  setSelectedColors,
  setSelectedRatings,
  setSelectedPotTypes,
  setSelectedCategories,
  setSelectedPlantTypes,
};
