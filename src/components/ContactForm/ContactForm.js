import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Form } from './Form.styles';
import { InputForm } from './InputForm.styles';

function ContactForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const nameInputId = nanoid();
    const numberInputId = nanoid();

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const statusWrite = onSubmit({ name, number });
        if (!statusWrite) {
            return;
        }
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <Form className="form" onSubmit={handleSubmit}>
            <label htmlFor={nameInputId}>Name</label>

            <InputForm
                id={nameInputId}
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />

            <label htmlFor={numberInputId}>Number</label>

            <InputForm
                id={numberInputId}
                type="tel"
                name="number"
                value={number}
                onChange={handleChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />

            <button type="submit">add contact</button>
        </Form>
    );
}

ContactForm.propTypes = {
    onSubmit:PropTypes.func.isRequired,
};

export default ContactForm;