import { createContext, useContext, useEffect, useState } from 'react';
import { API_URL, t } from 'utils/utils';


// Messages Context and Provider

export const MessagesContext = createContext();

export function MessagesContextProvider({ children }) {
  const [message, setMessage] = useState();

  function updateMessage(newValue) {
    setMessage(newValue);
  };

  return (
    <MessagesContext.Provider value={{ message, updateMessage }}>
      {children}
    </MessagesContext.Provider>
  );
}


// User Auth Context and Provider

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const { updateMessage } = useContext(MessagesContext);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  function login(userData) {
    updateMessage(t('Logged in successfully'));
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  function logout() {
    updateMessage(t('Logged out successfully'));
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// ToDo List Context and Provider

export const ToDoListContext = createContext();

export function ToDoListContextProvider({ children }) {
  const APIURL = API_URL;

  const [value, setValue] = useState({
    activePage: 1,
    itemsPerPage: 3,
    totalCount: 0,
    order: 'id',
    data: []
  });

  useEffect(() => {
    const fetchData = async () => {
      let response;

      let data = [];
      try {
        const offset = value.itemsPerPage * (value.activePage - 1);
        response = await fetch(`${APIURL}/todo/list/${value.itemsPerPage}-${offset}/${value.order}`);
        data = await response.json();
      } catch (error) {
        console.error(error);
      }

      let count = {};
      try {
        response = await fetch(`${APIURL}/todo/count`);
        count = await response.json();
      } catch (error) {
        console.error(error);
      }

      // Fix for infiinite loop bug (tried different ways, only this solution works)
      setValue({
        activePage: value.activePage,
        itemsPerPage: value.itemsPerPage,
        totalCount: count.count,
        order: value.order,
        data: data
      });
    };

    fetchData();
  }, [APIURL, value.activePage, value.itemsPerPage, value.order]);

  function updateValue(newValue) {
    setValue(newValue);
  };

  return (
    <ToDoListContext.Provider value={{ value, updateValue }}>
      {children}
    </ToDoListContext.Provider>
  );
};
