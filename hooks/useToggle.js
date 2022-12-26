import { useState } from 'react'

export default function useToggle(DeclaratedState = false) {
  const [state, setState] = useState(DeclaratedState)

  function changeState() {
    setState(!state)
  }
  return [state, changeState]
}
