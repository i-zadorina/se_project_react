import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { React, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  // onCardClick,
  updatedClothingItems,
  onCardLike,
  // isLiked,
  // isLoggedIn,
  weatherTemp,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.[currentTemperatureUnit];

  return (
    <main>
      <WeatherCard weatherData={weatherData} weatherTemp={temp} />
      <section className="cards">
        <p className="cards__text">
          Today is {temp} &deg;{currentTemperatureUnit}/ You may want to wear:
        </p>
        <ul className="cards__list">
          {updatedClothingItems
            ?.filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id || item.id}
                  item={item}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  // isLiked={isLiked}
                  // isLoggedIn={isLoggedIn}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
export default Main;
