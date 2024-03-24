import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './AuthSlice'
import PlaceSlice from './PlaceSlice'
import BookingSlice from './BookingSlice'

export const store = configureStore({
    reducer: {
        authStore: AuthSlice,
        placeStore: PlaceSlice,
        bookingStore: BookingSlice
    }
})