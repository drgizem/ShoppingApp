import './index.css'
import React, { useState } from 'react'
import Shopping from './Components/Shopping'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Cart from './Components/Cart'
import Admin from './Components/Admin'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import UserDataContext from './Components/UserDataContext'
import Alert from '@mui/material/Alert'

function App() {
  const [userData, setUserData] = useState({
    username: '',
    items: [],
  })
  const [query, setQuery] = useState('')
  const [isAdded, setIsAdded] = useState(false)
  const [isLastThreeProducts, setIsLastThreeProducts] = useState(false)
  const [isOutOfStock, setIsOutOfStock] = useState(false)

  function deleteItem(id) {
    setUserData({
      ...userData,
      items: userData.items.filter(item => {
        return item.id !== id
      }),
    })
  }

  function onItemDecrease(id) {
    setUserData(oldUserData => {
      const newUserData = { ...oldUserData }
      const oldItemIndex = newUserData.items.findIndex(item => id === item.id)
      const oldItem = newUserData.items[oldItemIndex]
      const newItem = { ...oldItem, count: oldItem.count - 1 }
      const newItems = [...newUserData.items]
      newItems[oldItemIndex] = newItem
      newUserData.items = newItems

      if (oldItem.count > 1) {
        return newUserData
      } else {
        return {
          ...oldUserData,
          items: oldUserData.items.filter(item => {
            return item.id !== id
          }),
        }
      }
    })
  }

  function onItemIncrease(id) {
    setUserData(oldUserData => {
      const newUserData = { ...oldUserData }
      const oldItemIndex = newUserData.items.findIndex(item => id === item.id)
      const oldItem = newUserData.items[oldItemIndex]
      const newItem = { ...oldItem, count: oldItem.count + 1 }
      const newItems = [...newUserData.items]
      newItems[oldItemIndex] = newItem
      newUserData.items = newItems
      return newUserData
    })
  }

  function clearCart() {
    setUserData({ ...userData, items: [] })
  }

  function addtoCart(product) {
    setUserData(oldUserData => {
      let newUserData = { ...oldUserData }
      let oldItemIndex = newUserData.items.findIndex(
        item => product.id === item.id
      )

      if (oldItemIndex > -1) {
        let oldItem = newUserData.items[oldItemIndex]
        let newItem = { ...oldItem, count: oldItem.count + 1 }
        if (newItem.stok - newItem.count === 3) {
          setIsLastThreeProducts(true)
        } else if (newItem.stok <= newItem.count) {
          newItem = { ...oldItem, count: oldItem.stok }
          setIsOutOfStock(true) && setIsAdded(false)
        } else {
          setIsAdded(true)
        }

        let newItems = [...newUserData.items]
        newItems[oldItemIndex] = newItem
        newUserData.items = newItems
        return newUserData
      } else {
        let newItem = { ...product, count: 1 }

        if (newItem.stok - newItem.count === 3) {
          setIsLastThreeProducts(true)
        } else if (newItem.stok <= newItem.count) {
          setIsOutOfStock(true) && setIsAdded(false)
        } else {
          setIsAdded(true)
        }

        let newItems = [...newUserData.items, newItem]
        newItems[newUserData.items.length] = newItem
        newUserData.items = newItems
        return newUserData
      }
    })

    setTimeout(() => setIsAdded(false), 1000)
    setTimeout(() => setIsOutOfStock(false), 2000)
    setTimeout(() => setIsLastThreeProducts(false), 1000)
  }

  return (
    <UserDataContext.Provider
      value={{ userData, setUserData, query, setQuery }}
    >
      <Router>
        <Navbar />
        <Route exact path='/'>
          {isAdded && (
            <Alert className='alert' severity='success'>
              Added to Cart
            </Alert>
          )}
          {isLastThreeProducts && (
            <Alert className='alert' severity='warning'>
              Last 3 products
            </Alert>
          )}
          {isOutOfStock && (
            <Alert className='alert' severity='error'>
              The product is out of stock!
            </Alert>
          )}
          <Shopping handleClick={addtoCart} />
        </Route>
        <Route
          exact
          path='/login'
          render={() =>
            userData.username === '' ? <Login /> : <Redirect push to='/' />
          }
        />
        <Route path='/cart'>
          <Cart
            items={userData.items}
            clearCart={clearCart}
            deleteItem={deleteItem}
            onItemDecrease={onItemDecrease}
            onItemIncrease={onItemIncrease}
          />
        </Route>
        <Route path='/admin'>
          <Admin />
        </Route>
      </Router>
    </UserDataContext.Provider>
  )
}

export default App
