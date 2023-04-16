import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
       token : '',
       admin : null
    },
    reducers: {
        adminLogin: (state, action) => {

            state.admin = action.payload
        },
        adminLogout:(state, action) => {
            state.admin = {
                token : '',
                admin : null
            }
        }
    }
})

export const { adminLogin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;