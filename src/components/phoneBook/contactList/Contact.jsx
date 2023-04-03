import PropTypes from 'prop-types';
import { AiFillContacts } from 'react-icons/ai';
import css from './ContactList.module.css';

export const Contact = ({ name, number }) => {
  return (
    <div className={css.itemContainer}>
      <AiFillContacts />
      <p>{`${name}: ${number}`}</p>
    </div>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
