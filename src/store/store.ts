import { Store } from '@/types/store'
import { create } from 'zustand'
import { createUserSlice } from '@/store/user.slice'
import { createCartSlice } from '@/store/cart.slice'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
import { subscribeWithSelector } from 'zustand/middleware'

export const useStore = create<Store>()(
  devtools(
    subscribeWithSelector(
      immer((...a) => ({
        ...createUserSlice(...a),
        ...createCartSlice(...a),
      }))
    )
  )
)
