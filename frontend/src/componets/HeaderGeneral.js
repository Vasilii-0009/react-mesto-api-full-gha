import React from "react";
import logo from '../images/logo.svg'

function HeaderGeneral(props) {
  return (
    <header className="header">
      <div className="header__container">
        <img src={logo} alt="Логотип" className="header__logo" />
        {props.children}
      </div>
    </header>
  )

}

export default HeaderGeneral;