import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  id: number,
  name: string;
  balance: number;
  currentPosition: number;

  fildsInProperty: [];
}

interface usersState {
  usersList: UserData[]
}

const initialState: usersState = {
  usersList: []
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserData>) => {
      state.usersList = [...state.usersList, action.payload]
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.usersList = state.usersList.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<UserData>) => {
      const index = state.usersList.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.usersList[index] = action.payload;
      }
    },
  },
});

export const { addUser, removeUser, updateUser } = usersSlice.actions
export default usersSlice.reducer
