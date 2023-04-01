function PopupWithForm(props) {

  return (
    <div className={`popup popup-${props.name} ${props.isOpen && 'popup_opened'} `}>
      <div className="popup-container popup-edit__container">
        <button onClick={props.onClose} type="button" className="popup__close "></button>
        <h2 className={`${props.isOpen && props.classNamePopupDelete}  popup-edit__text `}>{props.title}</h2>
        <form onSubmit={props.onSubmit} action="get" className="popup__form popup__form-edit" name={props.name}>
          {props.children}
          <button onClick={props.onClose} type="submit" className="popup__button popup__btn popup-edit__btn popup__button">{props.textBtn}</button>
        </form>
      </div>
    </div >
  )
}

export default PopupWithForm