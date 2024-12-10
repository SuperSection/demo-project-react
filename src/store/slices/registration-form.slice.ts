import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { type UserData, type AddressData } from '@/types/auth.type';

interface RegistrationFormState {
  userDetails: UserData | null;
  address: AddressData[];
  step: number; // Tracks current step (1: UserDetailsForm, 2: AddressForm)
}

const initialState: RegistrationFormState = {
  userDetails: null,
  address: [],
  step: 1,
};

const registrationFormSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    saveUserDetails(state, action: PayloadAction<UserData>) {
      state.userDetails = action.payload;
    },
    saveAddress(state, action: PayloadAction<AddressData[]>) {
      state.address = action.payload;
    },
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    resetForm(state) {
      state.userDetails = null;
      state.address = [];
      state.step = 1;
    },
  },
});

export const { saveUserDetails, saveAddress, setStep, resetForm } = registrationFormSlice.actions;
export default registrationFormSlice.reducer;
