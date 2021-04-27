/* eslint-disable react/prop-types */
import React from 'react'
import { cartMachine } from './machines/cartMachine'
import { useMachine, useService } from '@xstate/react'

const TestCartItem = ({ cartItemRef }) => {
  const [state, send] = useService(cartItemRef)
  const { id, title } = state.context
  return (
    <div>
      {id}:{title}
      <button onClick={() => send('DELETE')}>Remove Item from Cart</button>
    </div>
  )
}
const TestCart = () => {
  const [current, send] = useMachine(cartMachine)
  return (
    <div>
      {current.context.items.map((item, index) => (
        <TestCartItem cartItemRef={item.ref} key={index} />
      ))}
      <button onClick={() => send('ADDITEM')}>Add Item To Cart</button>
    </div>
  )
}
export default TestCart
