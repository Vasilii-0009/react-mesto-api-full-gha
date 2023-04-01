import React, { useEffect, useState } from 'react'
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function handelChangeName(evt) {
    setName(evt.target.value)
  }
  function handelChangeDescription(evt) {
    setDescription(evt.target.value)
  }
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name='edit' title='Редактировать профиль' textBtn='Сохранить' >
      <div className="popup__form-container">

        <input value={name || " "} onChange={handelChangeName} type="text" name="inputName" placeholder="Имя" id="email-input"
          className="popup__input popup-edit__input popup__input_value_autor" minLength="2" maxLength="40" required />
        <span className="email-input-error popup__input-error"></span>
      </div>

      <div className="popup__form-container">
        <input value={description || " "} onChange={handelChangeDescription} type="text" name="inputProf" placeholder="О себе"
          className="popup__input popup-edit__input popup__input_value_prof" id="text-input" minLength="2"
          maxLength="200" required />
        <span className="text-input-error popup__input-error"></span>
      </div>

    </PopupWithForm>
  )
}
export default EditProfilePopup


