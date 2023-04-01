function ImagePopup(props) {
  return (

    <div className={` popup popup-photo  ${props.card.name && 'popup_opened'}`} >

      <div className="popup-container popup-photo__container">
        <img src={props.card.link}
          className="popup-photo__img" alt={props.card.name} />
        <p className="popup-photo__text">{props.card.name}</p>
        <button onClick={props.onClose} type="button" className="popup__close popup-photo__btn"></button>
      </div>
    </div>
  )
}

export default ImagePopup