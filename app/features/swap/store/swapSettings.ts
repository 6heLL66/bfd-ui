import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SwapSettings {
  slippage: string
  deadline: string
  setSlippage: (slippage: string) => void
  setDeadline: (deadline: string) => void
  resetSettings: () => void
}

const DEFAULT_SETTINGS = {
  slippage: '1.0',
  deadline: '60',
}

export const useSwapSettings = create<SwapSettings>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      
      setSlippage: (slippage) => set({ slippage }),
      
      setDeadline: (deadline) => set({ deadline }),
      
      resetSettings: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: 'swap-settings',
      partialize: (state) => ({
        slippage: state.slippage,
        deadline: state.deadline,
      }),
    }
  )
)

// Helper to validate slippage
export const validateSlippage = (value: string): boolean => {
  const num = parseFloat(value)
  return !isNaN(num) && num > 0 && num <= 50
}

// Helper to validate deadline
export const validateDeadline = (value: string): boolean => {
  const num = parseInt(value)
  return !isNaN(num) && num > 0 && num <= 180
}
