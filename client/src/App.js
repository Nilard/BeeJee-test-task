import { Link, Outlet } from 'react-router-dom';
import { useAuth } from 'utils/Context';
import { t } from 'utils/utils';

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <Link to={'/'} className="site-name">{ t('ToDo list') }</Link>
          { !user ? (<Link to={'login'} className="button">{ t('Log in') }</Link>) : (<button onClick={logout}>{ t('Log out') }</button>) }
        </div>
      </header>
      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="app-footer">
        <div className="container">
          { t('BeeJee test task') }
        </div>
      </footer>
    </div>
  );
}
