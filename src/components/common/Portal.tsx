import { ReactNode, useMemo } from 'react'
import { createPortal } from 'react-dom'
interface portal {
  elementId: string
  children: ReactNode
}
function Portal({ children, elementId }: portal) {
  const rootElement = useMemo(() => document.getElementById(elementId), [elementId]) as HTMLElement

  return createPortal(children, rootElement)
}

export default Portal
