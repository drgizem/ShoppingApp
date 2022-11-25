import React from 'react'
import Button from '@mui/material/Button'

export default function Product(props) {
  const { image, description, price, title, product, handleClick } = props

  return (
    <div className='card'>
      <img alt='cardimage' src={image} />
      <h1 className='card__title'>{title}</h1>
      <p className='card__info'>{description}</p>
      <p className='card__price'>{price}</p>
      <div className='margin-b-md'>
        <Button
          variant='contained'
          color='warning'
          onClick={() => {
            handleClick(product)
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
