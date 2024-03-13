import { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate  } from 'react-router-dom';
import { Error } from 'utils/Components';
import { useAuth } from 'utils/Context';
import { t } from 'utils/utils';

export default function LogIn() {
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  function onSubmit(formData) {
    // TODO: Implement real user creddential check via API using 'pbkdf2-password' npm package
    if ((formData.username === 'admin') && (formData.password === '123')) {
      login(formData);
      navigate('/');
    } else {
      setError(t('Invalid credentials'));
    }
  };

  return (
    <>
      <h1>{ t('Log in') }</h1>
      <Error message={error} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>

        <div className="row">
          <div className="col">
            <div className="form-element">
              <label htmlFor="username">{ t('Username') }:</label>
              <input {...register('username', { required: t('This field is reqired') })} type="text" id="username" />
              <Error message={errors.username?.message} />
            </div>
          </div>
          <div className="col">
            <div className="form-element">
              <label htmlFor="password">{ t('Password') }:</label>
              <input {...register('password', { required: t('This field is reqired') })} type="password" id="password" />
              <Error message={errors.password?.message} />
            </div>
          </div>
        </div>

        <button type="submit">{ t('Log in') }</button>
        <Link to={'/'} className="button button-link">{ t('Back') }</Link>

      </form>
    </>
  );
}
