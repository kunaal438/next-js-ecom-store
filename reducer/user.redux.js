import { createSlice } from "@reduxjs/toolkit";

const initialState = { adminVerified: null };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
        login: (_, action) => {
            return { ...initialState , ...action.payload };
        },

        setAdminStatus: (state, action) => {
            return { ...state, adminVerified: action.payload }
        },

        logout: () => {
            localStorage.removeItem("user");
            return initialState;
        }

    }
})

export const { login, logout, setAdminStatus } = userSlice.actions;

export default userSlice.reducer;