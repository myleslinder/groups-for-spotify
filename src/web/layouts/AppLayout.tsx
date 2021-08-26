import { ReactChildren, ReactElement } from 'react'
import styled from 'styled-components'
import Sidebar from '../components/Sidebar'

export default function AppLayout({
  children,
}: {
  children: ReactChildren
}): ReactElement {
  return (
    <AppContainer>
      <Sidebar />
      <MainContainer>
        <AppNavigation />
        <PageComponentContainer>{children}</PageComponentContainer>
      </MainContainer>
    </AppContainer>
  )
}

const AppNavigation = () => {
  const Container = styled.header`
    display: flex;
    column-gap: 0.75rem;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px 0;
    height: 60px;
    background-color: black;
  `
  return (
    <Container>
      <AppNavigationButton>B</AppNavigationButton>
      <AppNavigationButton>F</AppNavigationButton>
    </Container>
  )
}

const AppNavigationButton = styled.button`
  background: white;
  color: black;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MainContainer = styled.main`
  position: relative;
  max-height: 100vh;
  overflow: scroll;
  width: 100%;
`

const PageComponentContainer = styled.div`
  height: 200vh;
  width: 100%;
`

// convert this to grid
const AppContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  min-height: 100%;
  width: 100%;
`
