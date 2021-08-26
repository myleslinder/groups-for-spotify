import { ReactElement } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Group } from '@prisma/client'

const FakeImage = styled.div`
  background: lightgray;
  width: 100%;
  height: 200px;
  border-radius: 4px;
`

const Name = styled.p`
  color: white;
  font-size: 18px;
  font-weight: 600;
  padding: 5px 0;
`
const MemberCount = styled.p`
  font-size: 16px;
  padding: 5px 0;
`

const Description = styled.p`
  font-size: 13px;
  padding: 5px 0;
`
const UpdatesAt = styled.p`
  color: white;
  font-size: 13px;
  font-weight: 600;
  padding: 5px 0;
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 20px;
`

const CardContainer = styled.div`
  flex-grow: 1;
  background-color: rgb(24, 24, 24);
  border-radius: 4px;
  padding: 10px 20px;
  border: none;
  &:hover {
    background-color: #282828;
  }
  transition: background-color 0.3s ease;
`

export default function GroupCard({
  id,
  name,
  description,
}: Group): ReactElement {
  return (
    <Link href={`/app/${id}`} as={`/app/${id}`}>
      <CardContainer>
        <FakeImage />
        <CardBody>
          <div>
            <Name>{name}</Name>
            <MemberCount>4 Members</MemberCount>
          </div>
          <div>
            <Description>{description}</Description>
            <UpdatesAt>Updates at</UpdatesAt>
          </div>
        </CardBody>
      </CardContainer>
    </Link>
  )
}
