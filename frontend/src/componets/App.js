import React, { useEffect, useState } from 'react'
import Header from './Header';
import Main from './Main'
import Footer from './Footer';
import ImagePopup from './ImagePopup'
//new import 
import { dataApi, dataAuthApi } from '../utils/Api'
import CurrentUserContext from '../contexts/CurrentUserContext'
import CardsContext from '../contexts/CardsContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, Navigate, useNavigate, } from 'react-router-dom';
//new import pr12
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import PopupConfirmasion from './PopupConfirmasion';

function App() {

  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [currentUserContext, setCurrentUser] = useState({})
  const [cardsContext, setCard] = useState([])

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  //state попапа потвирждения для удаление фотографий 
  const [isPopupConfirmasion, setPopupConfirmasion] = useState(false)
  const [isdeleteCard, setdeleteCard] = useState({})
  //------------pr12--------------//
  const navigateMainPage = useNavigate()
  const navigate = useNavigate()

  const [loggedIn, setLoggidIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const [isInfoTooltip, setInfoTooltip] = useState(false)
  const [isValueMassegInfoTooltip, setValueMassegInfoTooltip] = useState(false)

  //-------------  --------------//
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }
  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard({ name: '' })
    setInfoTooltip(false)
    setPopupConfirmasion(false)
    //setdeleteCard({})
  }

  useEffect(() => {

    if (loggedIn) {
      dataApi.getInfoUser().then((data) => {
        setCurrentUser(data)
      }).catch((err) => {
        console.log(`Данные не сохранились на сервере (код ошибки): ${err}`)
      })
    }

  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      dataApi.getTasks().then((data) => {
        setCard(data)
      }).catch((err) => {
        console.log(`Данные не сохранились на сервере (код ошибки): ${err}`)
      })
    }

  }, [loggedIn])

  // функция добавление и удаление лайка
  function handleCardLike(card) {

    const isLiked = card.likes.some((id) => {
      return id === currentUserContext._id
    });
    console.log(` this ${isLiked}`)
    if (isLiked) {
      dataApi.deleteLike(card._id).then((newCard) => {
        setCard((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => {
        console.log(`Лайк не удален (код ошибки): ${err}`)
      })
    } else {
      dataApi.addLike(card._id).then((newCard) => {
        setCard((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => {
        console.log(`Лайк не добавлен (код ошибки): ${err}`)
      })
    }
  }
  // функция  удаление карточки
  function handleCardDelete(card) {

    dataApi.deleteCard(card._id).then((data) => {

      setCard((state) => state.filter((item) => {
        if (item._id !== card._id) {
          return cardsContext
        }
      }))
    }).catch((err) => {
      console.log(`Карточка не удалена (код ошибки): ${err}`)
    })
  }
  //обновляем дынные пользователя 
  function handleUpdateUser(infoUser) {
    dataApi.saveInfoUser(infoUser.name, infoUser.about).then((data) => {
      setCurrentUser(data)
    }).catch((err) => {
      console.log(`Данные пользователя не сохранены (код ошибки): ${err}`)
    })
  }
  // добавление аватарки 
  function handleUpdateAvatar(data) {
    dataApi.updateAvatar(data.avatar).then((data) => {
      setCurrentUser(data)
    }).catch((err) => {
      console.log(`Аватар не поменялся (код ошибки): ${err}`)
    })
  }
  //добавление фоторграфии
  function handleAddPlaceSubmit(data) {
    dataApi.creatCard(data.name, data.link).then((newCard) => {
      setCard([newCard, ...cardsContext])
    }).catch((err) => {
      console.log(`Карточка не сохранена  (код ошибки): ${err}`)
    })
  }

  //------------pr12--------------//
  //регистрация пользовтеля 
  function handleRegisterUser(data) {

    dataAuthApi.registerUser(data.email, data.password).then((infoUser) => {
      setInfoTooltip(true)
      setValueMassegInfoTooltip(true)
      navigate('/sign-in')
    }).catch((err) => {
      setInfoTooltip(true)
      setValueMassegInfoTooltip(false)
      console.log(`400 - некорректно заполнено одно из полей `)
    })
  }
  //получение токена пользователя
  function handleTokenUser(data) {
    dataAuthApi.tokenUser(data.email, data.password).then((tokenUser) => {
      localStorage.setItem('token', tokenUser.token);
      setUserEmail(data.email)
      navigateMainPage('/', { replace: true })
      setLoggidIn(true)
    }).catch((err) => {
      console.log(` ${data.email === "" ? '400 - не передано одно из полей' : "пользователь с email не найден "} `)
    })
  }
  // проверяем токен пользователя для входа на сайт без авторизации 
  useEffect(() => {

    tokenCheck()


  }, [])

  function tokenCheck() {
    const jwt = localStorage.getItem('token')
    if (jwt) {

      dataAuthApi.getToken().then((data) => {

        setLoggidIn(true)
        setUserEmail(data.email)
        navigateMainPage('/', { replace: true })

      }).catch(() => {
        console.log(`${jwt === null ? '401 — Переданный токен некорректен ' : ' 400 — Токен не передан или передан не в том формате'}`
        )
      })
    }
  }

  const navigateHeader = useNavigate()
  function signOut() {
    localStorage.removeItem('token');
    navigateHeader("/sign-in", { replace: true })
    setLoggidIn(false)
  }

  // функция для popupConfirmasion
  function handlePopupConfirmasion(card) {
    setPopupConfirmasion(true)
    setdeleteCard(card)
  }

  return (

    <div className="App">
      <CardsContext.Provider value={cardsContext}>
        <CurrentUserContext.Provider value={currentUserContext}>

          <Header signOut={signOut} userEmail={userEmail} />

          <Routes>
            <Route path="/sign-up" element={<Register handleRegisterUser={handleRegisterUser} />} />
            <Route path="/sign-in" element={<Login handleTokenUser={handleTokenUser} />} />
            <Route path="/" element={<ProtectedRoute element={
              <>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onPopupConfirmasin={handlePopupConfirmasion}
                />
                <Footer />
              </>
            }
              loggedIn={loggedIn}
            />}
            />
          </Routes>



          <ImagePopup onClose={closeAllPopups} card={selectedCard} />

          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
          <PopupConfirmasion isOpen={isPopupConfirmasion} onClose={closeAllPopups} onDeleteCard={handleCardDelete} cardDelete={isdeleteCard} />

          <InfoTooltip onClose={closeAllPopups} isOpen={isInfoTooltip} valueMasseg={isValueMassegInfoTooltip} />


        </CurrentUserContext.Provider>
      </CardsContext.Provider>
    </div>
  );
}

export default App;
