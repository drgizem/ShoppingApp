import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import UserDataContext from './UserDataContext'
import Badge from '@mui/material/Badge'

export default function Navbar() {
  const { userData, query, setQuery } = useContext(UserDataContext)

  return (
    <>
      <nav className='navbar d-flex-text-align'>
        <div className='navbar__title'>
          <EmojiPeopleIcon fontSize='large' />
          Buybuy
        </div>
        <div>
          <Link to='/' className='navbar__link'>
            Products
          </Link>
        </div>
        <div>
          <input
            className='navbar__search'
            placeholder='Search...'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        {userData.username === '' ? (
          <div>
            <Link to='/login' className='navbar__link'>
              Login
            </Link>
          </div>
        ) : (
          <div className='username'>
            Hello{' '}
            {userData.username === 'Admin' ? (
              <Link to='/admin' className='navbar__link'>
                Admin
              </Link>
            ) : (
              userData.username
            )}
          </div>
        )}
        <div>
          <Link to='/cart' className='navbar__link'>
            <Badge badgeContent={userData.items.length} color='error'>
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </div>
      </nav>
    </>
  )
}
