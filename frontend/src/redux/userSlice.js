import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
       token : '',
       user : null
    },
    reducers: {
        userLogin: (state, action) => {
            state.user = action.payload;
        },
        userLogout:(state, action) => {
            state.user = {
                token : '',
                user : null
            }
        }
    }
})

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;