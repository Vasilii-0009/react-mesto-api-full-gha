import React from "react";
import PopupWithForm from "./PopupWithForm";
function PopupConfirmasion(props) {

  function handleSubmitCardDelete(e) {
    e.preventDefault()
    props.onDeleteCard(props.cardDelete)


  }
  return (
    <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmitCardDelete} title='Вы уверены?' textBtn='Да' classNamePopupDelete={'popup-delet__text'} >

    </PopupWithForm>
  )
}
export default PopupConfirmasion