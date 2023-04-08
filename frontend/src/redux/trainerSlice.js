import { createSlice } from '@reduxjs/toolkit';

const trainerSlice = createSlice({
    name: 'trainer',
    initialState: {
       token : '',
       trainer : null
    },
    reducers: {
        trainerLogin: (state, action) => {

            state.trainer = action.payload
        },
        trainerLogout:(state, action) => {
            state.trainer = {
                token : '',
                trainer : null
            }
        }
    }
})

export const { trainerLogin, trainerLogout } = trainerSlice.actions;
export default trainerSlice.reducer;