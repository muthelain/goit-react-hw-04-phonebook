import React, { useState  } from 'react';
import PropTypes from 'prop-types';
import {
  ContactFormStyled,
  ContactLabel,
  ContactInput,
  ContactBtn,
} from './ContactForm.styled';

export function ContactForm({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChange = e => {
    if (e.currentTarget.name === 'name') {
      setName(e.currentTarget.value);
      return;
    }
    if (e.currentTarget.name === 'number') {
      setNumber(e.currentTarget.value);
      return;
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    addContact(name, number);
    resetForm();
  };
  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <ContactFormStyled onSubmit={onSubmit}>
      <ContactLabel>
        Name
        <ContactInput
          onChange={onChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </ContactLabel>
      <ContactLabel>
        Number
        <ContactInput
          onChange={onChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </ContactLabel>
      <ContactBtn type="submit">Add contact</ContactBtn>
    </ContactFormStyled>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};