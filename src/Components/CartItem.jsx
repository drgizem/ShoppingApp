import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'

export default function CartItem({
  deleteItem,
  onItemDecrease,
  id,
  onItemIncrease,
  image,
  title,
  description,
  price,
  quantity,
  stok,
}) {
  return (
    <div className='card'>
      <div onClick={() => deleteItem(id)} className='deleteItem'>
        <DeleteIcon color='warning' />
      </div>
      <img alt='cardimage' src={image} />
      <h1 className='card__title margin-t-sm'>{title}</h1>
      <p className='card__info margin-t-sm'>{description}</p>
      <p className='card__price margin-t-sm'>{price}</p>
      <div className='number margin-l-lg'>
        <Button onClick={() => onItemDecrease(id)} color='warning'>
          <RemoveIcon />
        </Button>
        <p>{quantity}</p>
        <Button
          style={{ display: quantity == stok ? 'none' : 'block' }}
          onClick={() => onItemIncrease(id)}
          color='warning'
        >
          <AddIcon />
        </Button>
      </div>
    </div>
  )
}
