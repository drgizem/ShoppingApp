import Product from './Product'
import React, { useContext, useEffect, useState } from 'react'
import UserDataContext from './UserDataContext'

export default function Shopping(props) {
  const { query } = useContext(UserDataContext)
  const { handleClick } = props
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchFiles = async () => {
      const res = await fetch(
        'https://6319ce4a8e51a64d2becda22.mockapi.io/products',
        {
          method: 'GET',
        }
      )
      const data = await res.json()
      setProducts(data)
    }
    fetchFiles()
  }, [])

  return (
    <div className='container d-flex-text-align'>
      {products
        .filter(
          product =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        )
        .map(product => {
          const { title, price, image, description, id } = product
          return (
            <Product
              title={title}
              price={price}
              image={image}
              description={description}
              key={id}
              id={id}
              handleClick={handleClick}
              product={product}
            />
          )
        })}
    </div>
  )
}
