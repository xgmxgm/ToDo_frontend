'use client'

import { store } from '@/store'
import { SessionProvider } from 'next-auth/react'
import { Provider } from "react-redux"

export const Providers = ({children}: {children: React.ReactNode}) => {
    return (
        <Provider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Provider>
    )
}