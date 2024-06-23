import './Header.css';
import logo from '../../images/logo.svg';
import avatar from '../../images/avatar.svg';

function Header({handleAddClick}) {
  return <header className='header'>
    <img className='header__logo'src={logo} alt="logo"/>
    <p className="header__date-and-location">Date, location</p>
    <button onClick={handleAddClick} type="button" className="header_add-clothes-btn">+ Add clothes</button>
    <div className="header__user-container">
        <p className="header__user-name">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
    </div>
       </header>
}

export default Header;