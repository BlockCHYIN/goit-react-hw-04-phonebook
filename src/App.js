import { useState } from 'react';
import { nanoid } from 'nanoid';

import './App.css';
import Filter from 'components/Filter';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import { Layout } from 'components/Layout.styles';
import useLocalStorage from 'hooks/useLocalStorage';

function App() {
    const [contacts, setContacts] = useLocalStorage('contacts', []);
    const [filter, setFilter] = useState('');

    const formSudmitHandler = (data) => {
        if (
            !contacts.find(
                (contact) =>
                    contact.name.toLowerCase() === data.name.toLowerCase()
            )
        ) {
            setContacts((state) => [...state, { ...data, id: nanoid() }]);
            return true;
        } else {
            alert('Rosie Simpson is aredly in contacts.');
        }
    };

    const removeContact = (e) => {
        setContacts((state) =>
            state.filter((contact) => contact.id !== e.target.dataset.id)
        );
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setFilter(value);
    };

    return (
        <Layout>
            <h2>Phonebook</h2>
            <ContactForm onSubmit={formSudmitHandler} />
            <h2>Contacts</h2>
            <Filter handleChange={handleChange} />
            <ContactList
                filter={filter}
                contacts={contacts}
                removeContact={removeContact}
            />
        </Layout>
    );
}

export default App;