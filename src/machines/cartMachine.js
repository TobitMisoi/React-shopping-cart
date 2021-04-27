/* eslint-disable no-unused-vars */
import uuid from 'uuid/v4'
import { assign, Machine, sendParent, spawn } from 'xstate'

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

const addCartItem = assign({
  items: (ctx) => {
    return [
      ...ctx.items,
      {
        ref: spawn(
          cartItemMachine.withContext({
            id: uuid(),
            title: 'A Product Title'
          })
        )
      }
    ]
  }
})

const removeCartItem = assign({
  items: (ctx, e) => {
    console.log(e.id)
    console.log(ctx.items)
    return ctx.items.filter((item) => item.ref.initialState.context.id !== e.id)
  }
})

export const cartMachine = Machine(
  {
    id: 'cart',
    context: {
      items: []
    },
    initial: 'no-items',
    states: {
      'no-items': {
        entry: assign({
          items: (ctx, _e) => {
            return ctx.items.map((item) => ({
              ...item,
              ref: spawn(cartItemMachine.withContext(item))
            }))
          }
        }),
        on: {
          ADDITEM: {
            target: 'has-items',
            actions: ['addCartItem']
          }
        }
      },
      'has-items': {
        on: {
          ADDITEM: {
            actions: ['addCartItem']
          },
          REMOVEITEM: {
            actions: ['removeCartItem']
          }
        }
      }
    }
  },
  {
    actions: { addCartItem, removeCartItem }
  }
)
