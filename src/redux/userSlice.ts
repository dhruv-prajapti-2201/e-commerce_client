import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role:'user',
    isLoggedIn:localStorage.getItem('userData')?true:false,
    username:JSON.parse(localStorage.getItem('userData') as string)?.name 
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
        state={
            username:action.payload.name,
            isLoggedIn:action.payload.isLoggedIn,
            role:'user'        
        }
        return state;
      },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;