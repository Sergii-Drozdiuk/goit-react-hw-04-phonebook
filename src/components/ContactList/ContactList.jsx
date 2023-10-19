import PropTypes from 'prop-types';
import { PiUserCircleMinusDuotone } from 'react-icons/pi';

export const ContactList = ({ contacts, onRemoveContact }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className='mb-2 flex items-center justify-between gap-2'>
          <div className='flex items-center justify-between w-10/12'>
            <span className='w-1/2 overflow-hidden max-[375px]:text-xs'>{name}:</span>
            <span className='overflow-hidden max-[375px]:text-xs'>{number}</span>
          </div>
          <button
            type='button'
            onClick={() => onRemoveContact(id)}
            className='flex rounded-lg bg-rose-500 px-2 py-[2px] hover:bg-rose-700 hover:stroke-black active:bg-rose-700 max-[375px]:text-xs max-[375px]:gap-1'
          >
            <PiUserCircleMinusDuotone />
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};
