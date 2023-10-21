import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { FcBusinessContact } from 'react-icons/fc';
import { PiAddressBookDuotone } from 'react-icons/pi';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const savedFilter = localStorage.getItem('filter');
    if (savedContacts !== null) {
      const parsedState = JSON.parse(savedContacts);
      setContacts(parsedState.contacts || []);
    }
    if (savedFilter !== null) {
      const parsedState = JSON.parse(savedFilter);
      setFilter(parsedState.filter || '');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify({ contacts }));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('filter', JSON.stringify({ filter }));
  }, [filter]);

  const addNewContact = newContact => {
    const nameExists = contacts.some(
      contact => contact.name.trim().toLowerCase() === newContact.name.trim().toLowerCase()
    );
    const numberExists = contacts.some(contact => contact.number === newContact.number);
    if (nameExists) {
      Notify.warning(`${newContact.name}' is already in contacts.`);
    } else if (numberExists) {
      Notify.warning(`${newContact.number}' is already in contacts.`);
    } else {
      setContacts(prevContacts => [...prevContacts, { ...newContact, id: nanoid() }]);
    }
  };

  const filterContacts = searchName => {
    setFilter(searchName);
  };

  const removeContact = contactId => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
  };

  const visibleContacts = filter
    ? contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
    : contacts;

  return (
    <div className='w-[310px] rounded-lg border p-3 min-[375px]:w-[365px]'>
      <h1 className='mb-4 flex items-center justify-center gap-2 text-2xl'>
        <FcBusinessContact />
        Phonebook
      </h1>
      <ContactForm onAddContact={addNewContact} />
      <h2 className='mb-4 flex items-center justify-center gap-2 text-xl'>
        <PiAddressBookDuotone />
        Contacts
      </h2>
      <Filter onSearch={filterContacts} filterValue={filter} />
      <ContactList contacts={visibleContacts} onRemoveContact={removeContact} />
    </div>
  );
}
