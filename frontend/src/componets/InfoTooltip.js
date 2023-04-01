import React from "react";
import btnSucces from '../images/btnSucces.svg'
import btnError from '../images/btnErro.svg'

function InfoTooltip(props) {

  return (
    <div className={`popup popup-info ${props.isOpen && 'popup_opened'}  `}>
      <div className="popup-edit__container popup-info__container">
        <button onClick={props.onClose} className="popup__close " type="button"></button>
        <img className="popup-info__img" src={props.valueMasseg ? btnSucces : btnError}></img>
        <h2 className="popup-info__title">{props.valueMasseg ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip   