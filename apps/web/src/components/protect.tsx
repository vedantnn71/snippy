// NOT using middlewares as they were quite buggy

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface IProtectProps {
  children: React.ReactNode
}

export const Protect = ({ children }: IProtectProps) => {
  const router = useRouter()
  const session = useSession()

  const routeContains = (route: string) => router.pathname.includes(route);

  useEffect(() => {
    if (session.status === 'authenticated') return;

    if (routeContains("/lists") || routeContains("/collections")) {
      router.push("/signin");
    }

  }, [session.status])

  return <>{children}</>
}
