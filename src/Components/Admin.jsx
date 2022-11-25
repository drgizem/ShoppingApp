import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Input from './Input'
import { useEffect } from 'react'

export default function Admin() {
  const [file, setFile] = useState([])
  const [isEditable, setIsEditable] = useState({
    title: '',
    id: '',
    description: '',
    price: '',
    stok: '',
    image: '',
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchFiles = async () => {
      const res = await fetch(
        'https://6319ce4a8e51a64d2becda22.mockapi.io/products',
        {
          method: 'GET',
        }
      )
      const data = await res.json()
      setFile(data)
    }
    fetchFiles()
  }, [])

  const deleteProduct = id => {
    setFile(products => {
      return products.filter(product => {
        return product.id !== id
      })
    })
  }
  const editProduct = async id => {
    setIsEditing(true)
    const res = await fetch(
      `https://6319ce4a8e51a64d2becda22.mockapi.io/products/${id}`,
      {
        method: 'GET',
      }
    )
    const data = await res.json()
    setIsEditable(data)
  }
  const onChange = e => {
    const { name, value } = e.target
    setIsEditable(prevalue => {
      return { ...prevalue, [name]: value }
    })
  }
  const onEdit = () => {
    file[file.findIndex(item => item.id === isEditable.id)] = isEditable
    fetch(
      `https://6319ce4a8e51a64d2becda22.mockapi.io/products/${isEditable.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title: isEditable.title,
          id: isEditable.id,
          price: isEditable.price,
          stok: isEditable.stok,
          image: isEditable.image,
          description: isEditable.description,
        }),
      }
    ).then(response => response.json())
    setIsEditing(false)
    setIsEditable({
      title: '',
      id: '',
      description: '',
      price: '',
      stok: '',
      image: '',
    })
    setFile(prevalue => {
      return [...prevalue]
    })
  }

  return (
    <div className='table'>
      {isEditing && (
        <Input
          key={isEditable.id}
          title={isEditable.title}
          id={isEditable.id}
          description={isEditable.description}
          image={isEditable.image}
          price={isEditable.price}
          stok={isEditable.stok}
          onChange={onChange}
          onEdit={onEdit}
        />
      )}
      <Table>
        <TableHead className='table__head'>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align='right'>ID</TableCell>
            <TableCell align='right'>Description</TableCell>
            <TableCell align='right'>Image</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='right'>Stock</TableCell>
            <TableCell align='right'>Delete/Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {file.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell align='right'>{product.id}</TableCell>
              <TableCell align='right'>{product.description}</TableCell>
              <TableCell align='right'>{product.image}</TableCell>
              <TableCell align='right'>{product.price}</TableCell>
              <TableCell align='right'>{product.stok}</TableCell>
              <TableCell align='right'>
                <div onClick={() => deleteProduct(product.id)}>
                  <DeleteIcon />
                </div>
                <div onClick={() => editProduct(product.id)}>
                  <EditIcon />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
