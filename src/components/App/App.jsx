import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ItemModal from '../ItemModal/ItemModal';
import Profile from '../Profile/Profile';
import EditProfileModal from '../EditProfileModal/EditProfileModal.jsx';
import {
  latitude as DEFAULT_LAT,
  longitude as DEFAULT_LON,
} from '../../utils/constants';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import AddItemModal from '../AddItemModal/AddItemModal';
import {
  getItems,
  addItem,
  deleteCard,
  addCardLike,
  removeCardLike,
  hideDefaultItem,
} from '../../utils/api';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import ConfirmLogOutModal from '../ConfirmLogOutModal/ConfirmLogOutModal.jsx';
import ProtectedRoute from '../ProtectedRoute';
import * as auth from '../../utils/auth';
import Register from '../RegisterModal/RegisterModal';
import Login from '../Login/LoginModal';
import { setToken, getToken, removeToken } from '../../utils/token';
import AppContext from '../../contexts/AppContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { defaultClothingItems } from '../../utils/constants.js';

function App() {
  //useState hooks
  const [weatherData, setWeatherData] = useState({
    type: '',
    temp: { F: 999 },
    city: '',
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [weatherLocation, setLocation] = useState('');
  const [temp, setTemp] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    avatar: '',
  });
  const [coords, setCoords] = useState({ lat: DEFAULT_LAT, lon: DEFAULT_LON });
  const navigate = useNavigate();

  //Clicks
  const handleCardClick = (card) => {
    setActiveModal('preview');
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal('add-garment');
  };
  const handleDeleteCardClick = () => {
    setActiveModal('delete-confirmation');
  };
  const handleLoginClick = () => {
    setActiveModal('login');
  };
  const handleRegisterClick = () => {
    setActiveModal('signup');
  };
  const handleEditClick = () => {
    setActiveModal('edit-profile');
  };
  const handleLogOutClick = () => {
    setActiveModal('logout-confirmation');
  };
  const closeActiveModal = () => {
    setActiveModal('');
    setIsLoading(false);
  };
  // handle Escape&Overlay Close
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        closeActiveModal();
      }
    };

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [activeModal]);

  // SignUp, Login
  const handleRegistration = ({ name, avatar, email, password }) => {
    setIsLoading(true);
    auth
      .signUp({ name, avatar, email, password })
      .then(() => {
        handleLogin({ email, password });
        navigate('/profile');
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) return;

    setIsLoading(true);

    auth
      .signIn({ email, password })
      .then((res) => {
        setToken(res.token);
        return auth.getUserInfo(res.token);
      })
      .then((user) => {
        setCurrentUser(user.data);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleLogOut = () => {
    removeToken();
    setIsLoggedIn(false);
    closeActiveModal();
  };

  const handleUpdateUser = (data) => {
    auth
      .updateUser(data)
      .then((res) => {
        setCurrentUser(res.data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    auth
      .getUserInfo(jwt)
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  //Cards, Items
  const handleCardLike = ({ id, isLiked }) => {
    if (!id) return;

    const requestFn = isLiked ? removeCardLike : addCardLike;

    requestFn(id)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((it) => (it._id === updatedCard._id ? updatedCard : it)),
        );
      })
      .catch(console.error);
  };

  const onAddItem = (values) => {
    addItem(values)
      .then((newItem) => {
        setClothingItems((clothingItems) => [newItem.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error('Error adding item:', error);
      });
  };

  const onDeleteItem = () => {
    const card = selectedCard;
    if (!card?._id) return;

    if (card.isDefault) {
      if (!card.seedId) return;
      hideDefaultItem(card.seedId)
        .then((res) => {
          setCurrentUser(res.data);
          closeActiveModal();
        })
        .catch(console.error);

      return;
    }

    deleteCard(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id !== selectedCard._id;
          }),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    let cancelled = false;

    getItems()
      .then((data) => {
        if (cancelled) return;
        setClothingItems(Array.isArray(data) ? data.slice().reverse() : []);
      })
      .catch((err) => {
        console.error('getItems failed:', err);
        if (!cancelled) setClothingItems([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const hidden = currentUser?.hiddenDefaultItems ?? [];

  const visibleClothingItems = clothingItems.filter((item) => {
    if (!item?.isDefault) return true;
    if (!item?.seedId) return true;
    return !hidden.includes(item.seedId);
  });

  // Weather
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === 'C') setCurrentTemperatureUnit('F');
    if (currentTemperatureUnit === 'F') setCurrentTemperatureUnit('C');
  };

  useEffect(() => {
    let cancelled = false;

    const loadWeather = async (lat, lon) => {
      try {
        const data = await getWeather(lat, lon);
        if (cancelled) return;
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        setTemp(filteredData.temp);
        setLocation(filteredData.city);
      } catch (e) {
        console.error(e);
      }
    };

    const fallback = () => {
      setGeoError('Geolocation unavailable or denied; using default location.');
      loadWeather(DEFAULT_LAT, DEFAULT_LON);
    };

    if (!('geolocation' in navigator)) {
      fallback();
      return () => {
        cancelled = true;
      };
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        if (cancelled) return;
        setCoords({ lat, lon });
        loadWeather(lat, lon);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        fallback();
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 5 * 60 * 1000,
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <AppContext.Provider value={{ isLoggedIn }}>
        <div className="page">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                handleRegisterClick={handleRegisterClick}
                handleLoginClick={handleLoginClick}
                weatherLocation={weatherLocation}
                weatherData={weatherData}
                isLoggedIn={isLoggedIn}
              />
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      weatherTemp={temp}
                      onCardClick={handleCardClick}
                      clothingItems={visibleClothingItems}
                      onCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        clothingItems={visibleClothingItems}
                        onCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        handleEditClick={handleEditClick}
                        onCardLike={handleCardLike}
                        handleLogOutClick={handleLogOutClick}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/" replace />
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
              </Routes>
              <Footer />
            </div>
            {activeModal === 'add-garment' && (
              <AddItemModal
                isOpen={activeModal === 'add-garment'}
                onClose={closeActiveModal}
                onAddItem={onAddItem}
                isLoading={isLoading}
              />
            )}
            {activeModal === 'preview' && (
              <ItemModal
                isOpen={activeModal === 'preview'}
                card={selectedCard}
                onClose={closeActiveModal}
                onDeleteConfirm={handleDeleteCardClick}
              />
            )}
            {activeModal === 'delete-confirmation' && (
              <ConfirmDeleteModal
                isOpen={activeModal === 'delete-confirmation'}
                card={selectedCard}
                onClose={closeActiveModal}
                onDeleteItem={onDeleteItem}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
          {activeModal === 'signup' && (
            <Register
              isOpen={activeModal === 'signup'}
              onClose={closeActiveModal}
              handleRegistration={handleRegistration}
              handleLoginClick={handleLoginClick}
              isLoading={isLoading}
            />
          )}
          {activeModal === 'login' && (
            <Login
              isOpen={activeModal === 'login'}
              onClose={closeActiveModal}
              isLoading={isLoading}
              handleLogin={handleLogin}
              handleRegisterClick={handleRegisterClick}
            />
          )}
          {activeModal === 'edit-profile' && (
            <EditProfileModal
              isOpen={activeModal === 'edit-profile'}
              onClose={closeActiveModal}
              updateUser={handleUpdateUser}
              isLoading={isLoading}
            />
          )}
          {activeModal === 'logout-confirmation' && (
            <ConfirmLogOutModal
              isOpen={activeModal === 'logout-confirmation'}
              onClose={closeActiveModal}
              handleLogOut={handleLogOut}
            />
          )}
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
