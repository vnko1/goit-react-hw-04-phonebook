import PropTypes from 'prop-types';

import css from './Filter.module.css';

const Filter = ({ onHandleChange, filter }) => {
  return (
    <label className={css.container}>
      <span>Find contacts by name</span>
      <input
        className={css.input}
        type="text"
        name="filter"
        onChange={onHandleChange}
        value={filter}
      />
    </label>
  );
};

export { Filter };

Filter.propTypes = {
  onHandleChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
