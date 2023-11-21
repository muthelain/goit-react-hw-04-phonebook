import React, { useState, useEffect } from 'react';
import shortid from 'shortid';

import { Container } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

export function App() {
  const [contacts, setContacts] = useState(() => { return JSON.parse(window.localStorage.getItem('contacts')) ?? ''});
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (contacts.length >= 1) {
      window.localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    const parsedContacts = JSON.parse(window.localStorage.getItem('contacts'));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  const addContact = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };
    if (contacts.flatMap(contact => contact.name).includes(newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    setContacts(prevState => [newContact, ...prevState]);
  };
  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };
  const onFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(normalizedFilter) ||
      contact.number.includes(filter)
  );
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter onFilterChange={onFilterChange} />
      <ContactList
        deleteContact={deleteContact}
        contacts={filteredContacts}
      ></ContactList>
    </Container>
  );
}