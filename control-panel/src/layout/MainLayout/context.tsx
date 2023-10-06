import {createContext, useContext, useMemo, useState} from "react";

const LayoutContext = createContext({})

const _useContext = () => {
  const ctx = useContext(LayoutContext)
  if (!ctx) {
    throw new Error(`_useCount must be used within a CountProvider`)
  }
  return ctx
}

const LayoutProvider: React.FC<{}> = props => {
  const [toggled, setToggled] = useState(false)
  const value = useMemo(() => [toggled, setToggled], [toggled] )
  return <LayoutContext.Provider value={value} {...props} />
}

export {LayoutContext, _useContext}