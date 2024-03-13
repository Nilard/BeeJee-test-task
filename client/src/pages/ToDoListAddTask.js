import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate  } from 'react-router-dom';
import { Error } from 'utils/Components';
import { MessagesContext } from 'utils/Context';
import { t, API_URL } from 'utils/utils';

export default function ToDoListAddTask() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { updateMessage } = useContext(MessagesContext);
  const navigate = useNavigate();

  async function onSubmit(formData) {
    try {
      const response = await fetch(`${API_URL}/todo/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      updateMessage(t('Task added successfully'));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>{ t('Add task') }</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>

        <div className="row">
          <div className="col">
            <div className="form-element">
              <label htmlFor="name">{ t('Username') }:</label>
              <input {...register('name', { required: t('This field is reqired') })} type="text" id="name" />
              <Error message={errors.name?.message} />
            </div>
          </div>
          <div className="col">
            <div className="form-element">
              <label htmlFor="email">{ t('Email') }:</label>
              <input {...register('email', {
                required: t('This field is reqired'),
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: t('Email is invalid')
                }
              })} type="text" id="email" />
              <Error message={errors.email?.message} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="form-element">
              <label htmlFor="text">{ t('Text') }:</label>
              <textarea {...register('text', { required: t('This field is reqired') })} id="text" />
              <Error message={errors.text?.message} />
            </div>
          </div>
        </div>

        <button type="submit">{ t('Add task') }</button>
        <Link to={'/'} className="button button-link">{ t('Back') }</Link>

      </form>
    </>
  );
}
