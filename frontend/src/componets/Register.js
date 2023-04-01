import React, { useState } from "react";
import WindowWithForm from "./WindowWithForm";
import { Link } from "react-router-dom";


function Register(props) {
  const [userInfo, setUserName] = useState({ email: '', password: '' })

  function handleFormSubmit(e) {
    e.preventDefault()
    const { email, password } = userInfo
    props.handleRegisterUser({ email, password })
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
      <WindowWithForm onSubmit={handleFormSubmit} title='Регистрация' >
        <input name='email' onChange={handleChange} value={userInfo.email || ""} className="window-form__input window-form__email" type="email" placeholder="Email" ></input>
        <input name='password' onChange={handleChange} value={userInfo.password || ""} className="window-form__input window-form__password" type="password" placeholder="Пароль" ></input>
        <button className="window-form__button" type="submit">Зарегистрироваться</button>
        <div className="window-form__button-register">Уже зарегистрированы? <Link className="window-form__button-register window-form__link" to='/sign-in' > Войти </Link> </div>
      </WindowWithForm>
    </>

  )
}

export default Register