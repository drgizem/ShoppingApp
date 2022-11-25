import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira'
import CartItem from './CartItem'
import Button from '@mui/material/Button'

const calculatePrice = x => {
  return x.split('.').join('').replace(',', '.')
}

export default function Cart(props) {
  const { deleteItem, onItemDecrease, onItemIncrease, clearCart, items } = props

  const totalPrice = items.reduce(
    (preItem, currentItem) =>
      preItem +
      parseFloat(calculatePrice(currentItem.price)) * currentItem.count,
    0
  )
  return (
    <>
      <h1 className='cart__title'>
        My Cart <ShoppingCartIcon />
      </h1>
      {items.length === 0 && <div className='cart__note'>Cart is empty</div>}
      <div className='cart__page d-flex-text-align'>
        {items.map((item, index) => {
          const { title, price, description, id, count, image, stok } = item
          return (
            <CartItem
              title={title}
              price={price}
              image={image}
              description={description}
              key={index}
              id={id}
              deleteItem={deleteItem}
              onItemDecrease={onItemDecrease}
              onItemIncrease={onItemIncrease}
              quantity={count}
              stok={stok}
            />
          )
        })}
      </div>
      <div className='cart__total margin-b-lg'>
        Total:{totalPrice.toFixed(2)} TL
      </div>
      <div className='cart__btn d-flex'>
        <Button variant='outlined' color='warning' onClick={clearCart}>
          <DeleteIcon />
          Clear My Cart
        </Button>
        <Button variant='outlined' color='warning'>
          <CurrencyLiraIcon />
          Checkout
        </Button>
      </div>
    </>
  )
}
