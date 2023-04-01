import React, { useEffect, useState } from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {

  const [name, setName] = useState('')
  const [src, setSrc] = useState('')

  function handelChangeName(evt) {
    setName(evt.target.value)
  }
  function handelSrc(evt) {
    setSrc(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onAddPlace({
      name: name,
      link: src,
    })
  }

  useEffect(() => {
    setName('')
    setSrc('')
  }, [props.isOpen])

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name='add' title='Новое место' textBtn='Создать'>
      <div className="popup__form-container">
        <input value={name} onChange={handelChangeName} id="textplus-input" type="text" name="name" placeholder="Название"
          className="popup__input popup-add__input popup-add__input_value_autor" minLength="2" maxLength="30" required />
        <span className="textplus-input-error popup__input-error"></span>
      </div>
      <div className="popup__form-container">
        <input value={src} onChange={handelSrc} id="ulrplus-input" type="url" name="link" placeholder="Ссылка на картинку"
          className="popup__input  popup-add__input popup-add__input_value_prof" required />
        <span className="ulrplus-input-error popup__input-error"></span>
      </div>
    </PopupWithForm>
  )
}
export default AddPlacePopup