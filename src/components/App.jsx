import { useState, useEffect } from 'react';
import { ContactForm, ContactList, Filter } from './phoneBook';
import { STORAGE_KEY } from './services/constants';
import { load, save } from './services/localStorage';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setContacts(load(STORAGE_KEY));
  }, []);

  useEffect(() => {
    if (contacts.length) save(STORAGE_KEY, contacts);
  }, [contacts]);

  const onSubmitData = obj => {
    setContacts(prevState => [...prevState, obj]);
  };

  const onHandleChange = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      contact =>
        contact.number.toLowerCase().includes(normalizedFilter) ||
        contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

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

// export class App extends Component {
//   state = { contacts: [], filter: '' };

//   componentDidMount() {
//     this.setState({ contacts: load(STORAGE_KEY) || [] });
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       save(STORAGE_KEY, this.state.contacts);
//     }
//   }

//   onSubmitData = obj => {
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, obj],
//     }));
//   };

//   onHandleChange = e => {
//     const { name: key, value } = e.currentTarget;
//     this.setState({ [key]: value });
//   };

//   filterContacts = () => {
//     const { filter, contacts } = this.state;
//     const reg = /[\s\d]/;

//     const normalizedFilter = filter.toLowerCase();
//     if (reg.test(filter)) {
//       return contacts.filter(contact =>
//         contact.number.toLowerCase().includes(normalizedFilter)
//       );
//     } else {
//       return contacts.filter(contact =>
//         contact.name.toLowerCase().includes(normalizedFilter)
//       );
//     }
//   };

//   deleteContacts = id => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   render() {
//     return (
//       <div>
//         <section>
//           <div className="container">
//             <h1>Phonebook</h1>
//             <ContactForm
//               onSubmitData={this.onSubmitData}
//               contacts={this.state.contacts}
//             />
//             <h2>Contacts</h2>
//             <Filter
//               onHandleChange={this.onHandleChange}
//               filter={this.state.filter}
//             />
//             <ContactList
//               contacts={this.filterContacts()}
//               deleteContacts={this.deleteContacts}
//             />
//           </div>
//         </section>
//       </div>
//     );
//   }
// }
