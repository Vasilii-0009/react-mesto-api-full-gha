import { React } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import HeaderGeneral from './HeaderGeneral'


function Header(props) {

  return (
    <>
      <HeaderGeneral>
        <Routes>
          <Route path="/" element={<div className='header__box' >
            <div className='header__email'>{props.userEmail}</div>
            <button type='button' onClick={props.signOut} className='header__name header__name_moddif'>Выйти</button>
          </div>} />

          <Route path="/sign-in" element={<div className='header__box' >
            <NavLink to="/sign-up" className='header__name header__name_hover'>Регистрация</NavLink>
          </div>} />

          <Route path="/sign-up" element={<div className='header__box' >
            <NavLink to="/sign-in" className='header__name header__name_hover' >Войти</NavLink>
          </div>} />
        </Routes>
      </HeaderGeneral>


    </>
  )
}

export default Header;