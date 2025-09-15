import { Container } from '@mui/material'
import { Header } from './header'

export default function ProtectedLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  )
}
