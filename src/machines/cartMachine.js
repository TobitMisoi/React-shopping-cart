import { Machine, sendParent, assign, spawn } from 'xstate'

export const cartItemMachine = Machine({
  id: 'cartItem',
  initial: 'reading',
  context: {
    id: undefined,
    title: ''
  },
  on: {
    DELETE: 'deleted'
  },
  states: {
    reading: {},
    deleted: {
      onEntry: sendParent((ctx) => ({ type: 'REMOVEITEM', id: ctx.id }))
    }
  }
})

export const addCartItem = assign({
  items: (ctx) => {
    return [
      ...ctx.items,
      {
        ref: spawn(
          cartItemMachine.withContext({ id: 12, title: 'Product Title' })
        )
      }
    ]
  }
})

export const removeCartItem = assign({
  items: (ctx) => {
    console.log('[CTX ITEMS]:', ctx.items)
  }
})
