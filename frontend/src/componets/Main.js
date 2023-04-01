import React from 'react';
import avatar from '../images/Avatar.jpg'
import labelEdit from '../images/pencil.svg'
import Card from './Card'

//new import
import CurrentUserContext from '../contexts/CurrentUserContext'
import Cards from '../contexts/CardsContext'

function Main(props) {
  const currentUserContext = React.useContext(CurrentUserContext);
  const cardsContext = React.useContext(Cards)

  //last code
  return (
    <main>
      <section className="profile container">
        <div className="profile__container-img" >
          <div style={{ backgroundImage: `url(${currentUserContext.avatar})` }} alt="Аватарка" className="profile__img"></div>
          <img onClick={props.onEditAvatar} src={labelEdit} alt="Ярлык редактирования" className="profile__img-pencil" />
        </div>
        <div className="profile__info">
          <div className="profile__box">
            <h1 className="profile__autor">{currentUserContext.name}</h1>
            <button onClick={props.onEditProfile} type="button" className="btn profile__btn-edit"></button>
          </div>
          <p className="profile__text">{currentUserContext.about}</p>
        </div>
        <button onClick={props.onAddPlace} type="button" className="  profile__add"></button>
      </section>
      <section className="elements container">

        {cardsContext.map((card) => {
          return (
            <Card
              //  handleDeleteClick={props.onCardDelete} 
              onClickConfirmasion={props.onPopupConfirmasin}
              handleLikeClick={props.onCardLike} cardInfo={card} onCardClick={props.onCardClick} key={card._id} />
          )
        })}
      </section>
    </main >
  )
}

export default Main