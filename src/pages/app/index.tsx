import { ReactElement } from 'react'
import styled from 'styled-components'
import GroupCard from '../../web/components/GroupCard'

const groups = [
  {
    id: '1',
    name: 'Group 1',
    description: 'this is a group description',
    memberships: ['1', '2'],
    syncSlot: {
      dayOfWeek: 1,
      utc24Hour: 8,
    },
  },
  {
    id: '2',
    name: 'Group 2',
    description: 'this is a group description',
    memberships: ['1', '2'],
    syncSlot: {
      dayOfWeek: 1,
      utc24Hour: 8,
    },
  },
]

const GroupList = styled.div`
  display: flex;
  width: 100%;
  column-gap: 20px;
  padding: 20px 0 0 0;
`

export const AppHome = (): ReactElement => (
  <AppPageContainer>
    <PageTitle>My Groups</PageTitle>
    <GroupList>
      {groups.map((group) => (
        <GroupCard key={group.id} {...group} />
      ))}
    </GroupList>
  </AppPageContainer>
)

const PageTitle = styled.h1`
  color: white;
`

const AppPageContainer = styled.div`
  padding: 50px;
`

export default AppHome
