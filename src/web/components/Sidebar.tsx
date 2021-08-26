import { ReactElement } from 'react'
import styled from 'styled-components'

export default function Sidebar(): ReactElement {
  return <Nav></Nav>
}

const Nav = styled.nav`
  position: relative;
  background: black;
  width: 30%;
  height: 100vh;
`
