import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, Navigate, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Error } from 'utils/Components';
import { useAuth, MessagesContext } from 'utils/Context';
import { t, API_URL } from 'utils/utils';

export async function loader({ params }) {
  let data = {};
  try {
    const response = await fetch(`${API_URL}/todo/get/${params.id}`);
    data = await response.json();
  } catch (error) {
    console.error(error);
  }
  return { data };
}

export default function ToDoListEditTask() {
  const { logout } = useAuth();
  const [error, setError] = useState('');
  const { data } = useLoaderData();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { updateMessage } = useContext(MessagesContext);
  const location = useLocation();
  const navigate = useNavigate();

  async function onSubmit(formData) {
    if (localStorage.getItem('user')) {
      formData.status = + formData.status; // Convert boolean to integer

      if ((data.status > 1) || (data.text !== formData.text)) {
        formData.status += 2;
      }

      try {
        const response = await fetch(`${API_URL}/todo/update/${data.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        updateMessage(t('Task updated successfully'));
        navigate('/');
      } catch (error) {
        setError(`${error.name}: ${error.message}`);
      }
    } else {
      logout();
    }
  };

  if (localStorage.getItem('user')) {
    return (
      <>
        <h1>{ t('Edit task') }</h1>
        <Error message={error} />
        <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>

          <div className="form-element">
            <label htmlFor="text">{ t('Text') }:</label>
            <textarea {...register('text', { required: t('This field is reqired') })} id="text" defaultValue={data.text} />
            <Error message={errors.text?.message} />
          </div>

          <div className="form-element">
            <input {...register('status')} type="checkbox" id="status" defaultChecked={ (data.status === 1) || (data.status === 3) } />
            <label htmlFor="status">{ t('Done') }</label>
          </div>

          <button type="submit">{ t('Save') }</button>
          <Link to={'/'} className="button button-link">{ t('Back') }</Link>

        </form>
      </>
    );
  } else {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }
}
