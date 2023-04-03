import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { submitSchema } from 'components/services/constants';

const ContactForm = ({ contacts, onSubmitData }) => {
  const onSubmit = (values, action) => {
    const obj = {
      name: values.name.trim(),
      number: values.number.trim(),
      id: nanoid(),
    };

    const isIncluded = contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase().trim()
    );

    if (isIncluded) {
      action.resetForm();
      alert(`${values.name.trim()} is already in contacts`);
      return;
    }

    onSubmitData(obj);
    action.resetForm();
  };

  return (
    <div className={css.container}>
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={submitSchema}
        onSubmit={onSubmit}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <span className={css.text}>Name</span>
            <Field className={css.input} type="text" name="name" />
            <ErrorMessage component="div" name="name" className={css.error} />
          </label>
          <label className={css.label}>
            <span className={css.text}>Number</span>
            <Field className={css.input} type="tel" name="number" />
            <ErrorMessage component="div" name="number" className={css.error} />
          </label>
          <button className={css.button} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

ContactForm.propTypes = {
  onSubmitData: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};

export { ContactForm };
