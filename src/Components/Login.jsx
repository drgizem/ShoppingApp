import React, { useState, useContext } from 'react'
import usersData from '../users'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import UserDataContext from './UserDataContext'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

export default function Login() {
  const { userData, setUserData } = useContext(UserDataContext)

  const [formControl, setformControl] = useState()
  const [user, setUser] = useState({
    userName: '',
    password: '',
  })

  const [blurControl, setBlurControl] = useState()

  //submite dönecek
  function handleBlur() {
    if (user.userName || user.password) {
      setBlurControl(true)
    }
  }

  function handleLogin(e) {
    e.preventDefault()

    const loggingUser = usersData.find(
      element => element.userName === user.userName
    )

    if (loggingUser && loggingUser.password === user.password) {
      setUserData({
        username: user.userName,
        items: [...userData.items], //  login olduktan sonralogin olmadan önceki itemsler kaybolmaması için
      })
    } else {
      setformControl(true)
    }

    setUser({
      userName: '',
      password: '',
    })
  }

  function handleChange(e) {
    const { name, value } = e.target

    setUser(preV => {
      return { ...preV, [name]: value }
    })
  }

  //onBlur düzeltilecek
  return (
    <div className='form d-flex-text-align margin-t-md'>
      <h1 className='form__title'>Login</h1>
      <form
        className='form d-flex-text-align margin-t-md w_fit'
        onSubmit={handleLogin}
        onClick={() => {
          setformControl(false)
        }}
        onChange={() => setBlurControl(false)}
      >
        <TextField
          error={formControl}
          onBlur={() => {
            handleBlur()
          }}
          id='userName'
          onChange={handleChange}
          value={user.userName}
          name='userName'
          label='Kullanıcı Adı'
          variant='outlined'
          type='text'
          size='small'
        />
        <TextField
          error={formControl}
          onBlur={() => {
            handleBlur()
          }}
          id='password'
          onChange={handleChange}
          value={user.password}
          name='password'
          label='Şifre'
          variant='outlined'
          type='password'
          size='small'
        />

        <Button color='warning' type='submit' variant='contained'>
          Login
        </Button>
      </form>
      {formControl && (
        <Alert className='alert error' severity='error'>
          <AlertTitle>Error</AlertTitle>
          Username or Password is wrong
        </Alert>
      )}
      {blurControl && (
        <Alert className='alert error' severity='warning'>
          <AlertTitle>Error</AlertTitle>
          Username or Password is empty
        </Alert>
      )}
    </div>
  )
}
