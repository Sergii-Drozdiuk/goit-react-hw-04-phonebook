import PropTypes from 'prop-types';
import { PiMagnifyingGlassLight } from 'react-icons/pi';

export const Filter = ({ onSearch, filterValue }) => {
  return (
    <label className='mb-2 flex flex-col items-center gap-2'>
      {' '}
      <div className='flex flex-row items-center gap-2'>
        <PiMagnifyingGlassLight />
        <input
          value={filterValue}
          placeholder='Find contacts by name'
          type='text'
          onChange={e => onSearch(e.target.value)}
          className='rounded-lg pl-2 text-black'
        ></input>
      </div>
    </label>
  );
};

Filter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
};
