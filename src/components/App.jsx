import { useState, useEffect } from 'react';
import { ContactForm, ContactList, Filter } from './phoneBook';
import { STORAGE_KEY } from './services/constants';
import { load, save } from './services/localStorage';

export const App = () => {
  const [contacts, setContacts] = useState(() => load(STORAGE_KEY) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    save(STORAGE_KEY, contacts);
  }, [contacts]);

  const onSubmitData = obj => {
    setContacts(prevState => [...prevState, obj]);
  };

  const onHandleChange = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const filterContacts = () =>
    contacts.filter(
      contact =>
        contact.number.toLowerCase().includes(filter.toLowerCase()) ||
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  const deleteContacts = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <div>
      <section>
        <div className="container">
          <h1>Phonebook</h1>
          <ContactForm onSubmitData={onSubmitData} contacts={contacts} />
          <h2>Contacts</h2>
          <Filter onHandleChange={onHandleChange} filter={filter} />
          <ContactList
            contacts={filterContacts()}
            deleteContacts={deleteContacts}
          />
        </div>
      </section>
    </div>
  );
};
