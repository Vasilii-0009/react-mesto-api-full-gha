import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    console.log(avatarRef.current.value);
  }

  if (props.isOpen) {
    avatarRef.current.value = ""
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name='avatar' title='Обновить аватра' textBtn='Сохранить'>
      <div className="popup__form-container">
        <input ref={avatarRef} id="ulrAvatar-input" type="url" name="inputAvatar" placeholder="Ссылка на картинку"
          className="popup__input  popup-avatar__input popup-avatar__input_value_prof" required />
        <span className="ulrAvatar-input-error popup__input-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup