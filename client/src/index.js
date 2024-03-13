import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContextProvider, MessagesContextProvider } from 'utils/Context';

import 'scss/styles.scss';

import App from 'App';
import LogIn from 'pages/LogIn';
import ToDoList from 'pages/ToDoList';
import ToDoListAddTask from 'pages/ToDoListAddTask';
import ToDoListEditTask, { loader as ToDoListEditTaskLoader } from 'pages/ToDoListEditTask';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ToDoList />
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "add",
        element: <ToDoListAddTask />,
      },
      {
        path: "edit/:id",
        element: <ToDoListEditTask />,
        loader: ToDoListEditTaskLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MessagesContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </MessagesContextProvider>
  </React.StrictMode>
);
