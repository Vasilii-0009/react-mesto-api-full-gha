import React, { useState } from "react";
import WindowWithForm from './WindowWithForm'

function Login(props) {
  const [userInfo, setUserName] = useState({ email: '', password: '' })

  function handleFormSubmit(e) {
    e.preventDefault()
    const { email, password } = userInfo
    props.handleTokenUser({ email, password })
    // setUserName({ email: '', password: '' })
  }

  function handleChange(e) {
    const { name, value } = e.target

    setUserName({
      ...userInfo,
      [name]: value
    })
  }

  return (
    <>
      <WindowWithForm onSubmit={handleFormSubmit} title='Вход' >
        <input name='email' onChange={handleChange} value={userInfo.email || ""} className="window-form__input window-form__email" type="email" placeholder="Email" ></input>
        <input name='password' onChange={handleChange} value={userInfo.password || ""} className="window-form__input window-form__password" type="password" placeholder="Пароль" ></input>
        <button className="window-form__button" type="submit">Войти</button>
      </WindowWithForm>
    </>

  )
}

export default Login