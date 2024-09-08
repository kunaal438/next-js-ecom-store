import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: { },
    reducers: {
        
        login: (state, action) => {
            return action.payload;
        },

        logout: () => {
            localStorage.removeItem("user")
            return { }
        }

    }
})

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;