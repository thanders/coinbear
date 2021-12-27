import { createAction, createReducer } from '@reduxjs/toolkit';

const updateFormData = createAction('updateFormData');
const updateFormDataAssets = createAction('updateFormDataAssets');
const isSubmitDisabled = createAction('isSubmitDisabled');
const resetToDefault = createAction('resetToDefault');

const initialState = {
  formData: {
    name: '',
    description: '',
    assets: {},
  },
  isSubmitDisabled: true,
  isAddCurrencyDisabled: true,
};

function isSubmitDisabledHandler(formState) {
  const isDisabled = (formState &&
  formState.name.length > 0 &&
  formState.description.length > 0 &&
  formState.assets &&
  Object.keys(formState.assets).length > 0)
  return !isDisabled;
}


export const createPortfolioReducer = createReducer(initialState, (builder) => {
  
  builder
    .addCase(updateFormData, (state, action) => {
      state.formData = action.payload;
    })
    .addCase(updateFormDataAssets, (state, action) => {
      state.formData.assets = action.payload;
    })
    .addCase(isSubmitDisabled, (state) => {
      const result = isSubmitDisabledHandler(state.formData);
      state.isSubmitDisabled = result;
    })
    .addCase(resetToDefault, (state) => {
      state.formData = initialState.formData;
    })
})