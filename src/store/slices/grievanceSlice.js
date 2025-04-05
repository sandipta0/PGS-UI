import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  grievances: [],
  currentGrievance: null,
  loading: false,
  error: null,
};

const grievanceSlice = createSlice({
  name: 'grievance',
  initialState,
  reducers: {
    fetchGrievancesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGrievancesSuccess: (state, action) => {
      state.loading = false;
      state.grievances = action.payload;
    },
    fetchGrievancesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchGrievanceByIdStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGrievanceByIdSuccess: (state, action) => {
      state.loading = false;
      state.currentGrievance = action.payload;
    },
    fetchGrievanceByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createGrievanceStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createGrievanceSuccess: (state, action) => {
      state.loading = false;
      state.grievances.push(action.payload);
    },
    createGrievanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateGrievanceStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateGrievanceSuccess: (state, action) => {
      state.loading = false;
      const index = state.grievances.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        state.grievances[index] = action.payload;
      }
      if (state.currentGrievance && state.currentGrievance.id === action.payload.id) {
        state.currentGrievance = action.payload;
      }
    },
    updateGrievanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchGrievancesStart,
  fetchGrievancesSuccess,
  fetchGrievancesFailure,
  fetchGrievanceByIdStart,
  fetchGrievanceByIdSuccess,
  fetchGrievanceByIdFailure,
  createGrievanceStart,
  createGrievanceSuccess,
  createGrievanceFailure,
  updateGrievanceStart,
  updateGrievanceSuccess,
  updateGrievanceFailure,
} = grievanceSlice.actions;

export default grievanceSlice.reducer; 