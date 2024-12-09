import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  addItem,
  createCard,
  deleteCard,
  addCardLike,
  removeCardLike,
  updateUser,
} from "../../utils/api";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import ProtectedRoute from "../ProtectedRoute";
import * as auth from "../../utils/auth";
import Register from "../RegisterModal/RegisterModal";
import Login from "../Login/LoginModal";
import { setToken, getToken, removeToken } from "../../utils/token";
import AppContext from "../../contexts/AppContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  //useState hooks
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherLocation, setLocation] = useState("");
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    getWeather()
      .then((data) => {
        const weather = {
          temperature: {
            F: Math.round(data.main.temp),
            C: Math.round(((data.main.temp - 32) * 5) / 9),
          },
        };
        // const locationName = data.name;
        // setLocation(locationName);
        // setWeatherData(weather);
        // const sunriseData = data.sys.sunrise;
        // setSunrise(sunriseData);
        // const sunsetData = data.sys.sunset;
        // setSunset(sunsetData);
      })
      .catch(console.error);
  }, []);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    avatar: "",
    email: "",
  });

  const navigate = useNavigate();

  //Clicks
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleDeleteCardClick = () => {
    setActiveModal("delete-confirmation");
  };
  const handleLoginClick = () => {
    setActiveModal("login");
  };
  const handleRegisterClick = () => {
    setActiveModal("signup");
  };
  const handleEditClick = () => {
    setActiveModal("edit");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  // handle Escape Close
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  // SignUp, Login
  const handleRegistration = ({ name, avatar, email, password }) => {
    auth
      .signUp({ name, avatar, email, password })
      .then(() => {
        handleLogin({ email, password });
        // setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .signIn({ email, password })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser({
          id: res._id,
          name: res.name,
          avatar: res.avatar,
        });
        setToken();
        closeActiveModal();
        // const redirectPath = location.state?.from?.pathname || "/profile";
        // navigate(redirectPath);
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  const handleUpdateUser = (data) => {
    auth
      .updateUser(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
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
        setCurrentUser(res.user);
        setIsLoggedIn(true);
        // const redirectPath = location.state?.from?.pathname || "/";
        // navigate(redirectPath);
      })
      .catch(console.error);
  }, [isLoggedIn]);

  //Cards, Items
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    return !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
            setIsLiked(true);
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
            setIsLiked(false);
          })
          .catch((err) => console.log(err));
  };

  const onAddItem = (values) => {
    const jwt = localStorage.getItem("jwt");
    addItem(values, jwt)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const onDeleteItem = (cardId) => {
    return deleteCard(cardId)
      .then(() => {
        const updatedClothingItems = clothingItems.filter((item) => {
          return item._id !== cardId;
        });
        setClothingItems(updatedClothingItems);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onDeleteConfirm = (cardId) => {
    setActiveModal("delete-confirmation");
    setSelectedCard(cardId);
  };

  useEffect(() => {
    getItems()
      .then(({ data }) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  // Weather
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };
  useEffect(() => {
    getWeather()
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        const temperature = filteredData.temp;
        setTemp(temperature);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <AppContext.Provider value={{ isLoggedIn, setCurrentUser }}>
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
                currentUser={currentUser}
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
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                      isLiked={isLiked}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute anonymous={isLoggedIn}>
                      <Profile
                        handleAddClick={handleAddClick}
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        handleEditClick={handleEditClick}
                        handleUpdateUser={handleUpdateUser}
                        // isLoggedIn={isLoggedIn}
                        isLiked={isLiked}
                        onCardLike={handleCardLike}
                        handleLogOut={handleLogOut}
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
            {activeModal === "add-garment" && (
              <AddItemModal
                isOpen={activeModal === "add-garment"}
                onClose={closeActiveModal}
                onAddItem={onAddItem}
              />
            )}
            {activeModal === "preview" && (
              <ItemModal
                card={selectedCard}
                onClose={closeActiveModal}
                onDeleteConfirm={onDeleteConfirm}
              />
            )}
            {activeModal === "delete-confirmation" && (
              <ConfirmDeleteModal
                isOpen={activeModal === "delete-confirmation"}
                card={selectedCard}
                onClose={closeActiveModal}
                onDeleteItem={onDeleteItem}
              />
            )}
          </CurrentTemperatureUnitContext.Provider>
          {activeModal === "signup" && (
            <Register
              isOpen={activeModal === "signup"}
              onClose={closeActiveModal}
              handleRegistration={handleRegistration}
              handleLoginClick={handleLoginClick}
            />
          )}
          {activeModal === "login" && (
            <Login
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              handleLogin={handleLogin}
              handleRegisterClick={handleRegisterClick}
            />
          )}
          {activeModal === "edit" && (
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              updateUser={handleUpdateUser}
            />
          )}
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
