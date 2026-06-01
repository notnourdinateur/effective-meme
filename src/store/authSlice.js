import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allowedEmails: ['admin@demo.com', 'buyer@demo.com', 'guest@demo.com'],
  currentUserEmail: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const email = action.payload?.trim().toLowerCase()

      if (!email || !state.allowedEmails.includes(email)) {
        return
      }

      state.currentUserEmail = email
    },
    logout(state) {
      state.currentUserEmail = null
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
