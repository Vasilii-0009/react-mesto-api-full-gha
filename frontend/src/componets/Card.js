import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext'
function Card(props) {

  const currentUserContext = React.useContext(CurrentUserContext);
  const isOwn = props.cardInfo.owner === currentUserContext._id;
  const isLiked = props.cardInfo.likes.some((like) => {

    return like._id === currentUserContext._id
  });

  const cardLikeButtonClassName = (
    `elements__like ${isLiked && 'elements__img-heart'}`
  );;

  function handleClick() {
    props.onCardClick(props.cardInfo);
  }

  function handleClickLike() {
    props.handleLikeClick(props.cardInfo)
  }

  // function handleDeleteClick() {
  //   props.handleDeleteClick(props.cardInfo)
  // }
  function handlePopupConfirmasion() {
    props.onClickConfirmasion(props.cardInfo)
  }

  return (
    <div className="elements__element">
      <div onClick={handleClick} style={{ backgroundImage: `url(${props.cardInfo.link})` }}
        className="elements__img" ></div>
      <div className="elements__box">
        <h2 className="elements__title">{props.cardInfo.name}</h2>
        <div className="elements__box-like">
          <button onClick={handleClickLike} type="button" className={cardLikeButtonClassName}>
          </button>
          <p className="elements__number">{props.cardInfo.likes.length}</p>
        </div>

      </div>
      {isOwn && <button
        // onClick={handleDeleteClick} 
        onClick={handlePopupConfirmasion}
        type="button" className="elements__basket"></button>}

    </div>
  )
}

export default Card