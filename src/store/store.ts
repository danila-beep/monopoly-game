import { configureStore } from '@reduxjs/toolkit'
import { usersSlice } from './slices/usersSlice'
import { gameFieldSlice } from './slices/gameFieldSlice'

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    gameFieldPoints: gameFieldSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch