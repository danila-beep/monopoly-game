import { createSlice } from "@reduxjs/toolkit";
import { FieldDataType, gameFieldPoints } from "../../data/gameFieldData";

const initialState: FieldDataType = gameFieldPoints

export const gameFieldSlice = createSlice({
  name: "gameField",
  initialState,
  reducers: {
    
  },
});

// export const { ... } = gameFieldSlice.actions
export default gameFieldSlice.reducer
