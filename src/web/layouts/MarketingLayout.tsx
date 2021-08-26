import { ReactChildren, ReactElement } from 'react'

export default function MarketingLayout({
  children,
}: {
  children: ReactChildren
}): ReactElement {
  return (
    <main>
      <div>{children}</div>
    </main>
  )
}
