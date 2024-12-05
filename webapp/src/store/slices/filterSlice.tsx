import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

type FilterState = {
  selectedTags: string[];
  selectedSizes: string[];
  selectedColors: string[];
  selectedRatings: number[];
  selectedPotTypes: string[];
  selectedCategories: string[];
  selectedPlantTypes: string[];
};

const initialState: FilterState = {
  selectedTags: [],
  selectedSizes: [],
  selectedColors: [],
  selectedRatings: [],
  selectedPotTypes: [],
  selectedPlantTypes: [],
  selectedCategories: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedColors: (state, action: PayloadAction<string[]>) => {
      state.selectedColors = action.payload;
    },
    setSelectedRatings: (state, action: PayloadAction<number[]>) => {
      state.selectedRatings = action.payload;
    },
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
    },
    setSelectedPotTypes: (state, action: PayloadAction<string[]>) => {
      state.selectedPotTypes = action.payload;
    },
    setSelectedPlantTypes: (state, action: PayloadAction<string[]>) => {
      state.selectedPlantTypes = action.payload;
    },
    setSelectedTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
    setSelectedSizes: (state, action: PayloadAction<string[]>) => {
      state.selectedSizes = action.payload;
    },
    resetFilters: (state) => {
      state.selectedTags = [];
      state.selectedSizes = [];
      state.selectedColors = [];
      state.selectedRatings = [];
      state.selectedPotTypes = [];
      state.selectedCategories = [];
      state.selectedPlantTypes = [];
    },
  },
});

export const {
  resetFilters,
  setSelectedTags,
  setSelectedSizes,
  setSelectedColors,
  setSelectedRatings,
  setSelectedPotTypes,
  setSelectedCategories,
  setSelectedPlantTypes,
} = filterSlice.actions;
