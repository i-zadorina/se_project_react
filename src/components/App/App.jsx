import { useState } from 'react';
import Header from '../Header/Header.jsx'
import Main from '../Main/Main.jsx'
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx'
import Footer from '../Footer/Footer.jsx';
import './App.css' 

function App() {
const [weatherData, setWeatherData]=useState({type:"cold"});
const [activeModal,setActiveModal]=useState("");
const [selectedCard,setSelectedCard]=useState({});

const handleCardClick=(card)=>{
  setActiveModal("preview");
  setSelectedCard(card);
}
const handleAddClick=()=>{
  setActiveModal("add-garment");
};
const closeActiveModal =()=>{
  setActiveModal("");
};

  return (
    <div className='page'>
      <div className="page__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer/>
      </div>
       <ModalWithForm title="New garment" 
       buttonText="Add garment" 
       activeModal={activeModal} 
       handleCloseClick={closeActiveModal}>
    <label htmlFor="name" className="modal__label">Name{" "}
    <input id="name" type="text" className="modal__input" placeholder='Name' />
    </label>
    <label htmlFor="imageUrl" className="modal__label">Image{" "}
    <input id="imageUrl" type="text" className="modal__input" placeholder='Image URL' />
    </label>
    <fieldset className='modal__radio-buttons'>
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input id="hot" type="radio" className="modal__radio-input" /> Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
            <input id="warm" type="radio" className="modal__radio-input" /> Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
            <input id="cold" type="radio" className="modal__radio-input" /> Cold
        </label>
    </fieldset>
    </ModalWithForm>
    <ItemModal 
      activeModal={activeModal} 
      card={selectedCard} 
      handleCloseClick={closeActiveModal}/>
   </div>
  );
}

export default App;