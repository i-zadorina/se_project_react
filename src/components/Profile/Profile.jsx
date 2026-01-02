import SideBar from '../SideBar/SideBar';
import ClothesSection from '../ClothesSection/ClothesSection';
import './Profile.css';

const Profile = ({
  handleAddClick,
  onCardClick,
  defaultClothingItems,
  handleLogOutClick,
  handleEditClick,
  onCardLike,
}) => {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleLogOutClick={handleLogOutClick}
          handleEditClick={handleEditClick}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          defaultClothingItems={defaultClothingItems}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
};

export default Profile;
