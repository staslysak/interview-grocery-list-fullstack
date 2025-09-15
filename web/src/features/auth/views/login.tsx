'use client'

import { useLogin } from '../api/hooks'
import { LoginForm } from '../components/login-form'

export default function LoginView() {
  const login = useLogin()
  return <LoginForm loading={login.isPending} onSubmit={login.mutate} />
}
