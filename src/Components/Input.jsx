import * as React from 'react'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'

const ariaLabel = { 'aria-label': 'description' }

export default function Inputs(props) {
  const { title, description, id, image, price, stok, onChange, onEdit } = props
  return (
    <>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete='off'
      >
        <Input
          placeholder='Title'
          name='title'
          value={title}
          onChange={onChange}
          inputProps={ariaLabel}
        />
        <Input
          placeholder='ID'
          name='id'
          value={id}
          onChange={onChange}
          inputProps={ariaLabel}
        />
        <Input
          placeholder='Description'
          name='description'
          value={description}
          onChange={onChange}
          inputProps={ariaLabel}
        />
        <Input
          placeholder='Image'
          name='image'
          value={image}
          onChange={onChange}
          inputProps={ariaLabel}
        />
        <Input
          placeholder='Price'
          name='price'
          value={price}
          onChange={onChange}
          inputProps={ariaLabel}
        />
        <Input
          placeholder='Stock'
          name='stok'
          value={stok}
          onChange={onChange}
          inputProps={ariaLabel}
        />
        <Button variant='contained' color='warning' onClick={onEdit}>
          Save
        </Button>
      </Box>
    </>
  )
}
