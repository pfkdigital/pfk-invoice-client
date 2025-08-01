import { Suspense } from 'react'
import { router } from './router'
import { RouterProvider } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { client } from '../libs/query-client'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <QueryClientProvider client={client}>
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </div>
  )
}

export default App
