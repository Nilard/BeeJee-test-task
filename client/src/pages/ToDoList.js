import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Messages } from 'utils/Components';
import { useAuth, ToDoListContext, ToDoListContextProvider } from 'utils/Context';
import { t } from 'utils/utils';

import EditIcon from 'assets/icon-edit.svg';

function ToDoListTablePagination({ count }) {
  const { value, updateValue } = useContext(ToDoListContext);

  function handleClick(event) {
    let values = Object.create(value);
    values.activePage = parseInt(event.target.dataset.index);
    updateValue(values);
  }

  let i = 0;
  const items = Array.from(Array(count)).map(() =>
    <button key={i} onClick={handleClick} className={ (value.activePage - 1) === i ? 'active' : '' } data-index={++i}>{i}</button>
  );

  return (
    <div className="pagination">{items}</div>
  );
}

function ToDoListTable() {
  const { user } = useAuth();
  const { value, updateValue } = useContext(ToDoListContext);

  function renderOrder(name) {
    return value.order === name ? '▴' : value.order === `${name} DESC` ? '▾' : '';
  }

  function renderStatus(status) {
    let renderStatusDone;
    let renderStatusEdited;

    if (status === 1 || status === 3) {
      renderStatusDone = <span className="status status-done">{ t('done') }</span>;
    }

    if (status > 1) {
      renderStatusEdited = <span className="status status-edited">{ t('edited by admin') }</span>;
    }

    return (
      <>
        {renderStatusDone}
        {renderStatusEdited}
      </>
    );
  }

  function handleClick(event) {
    let values = Object.create(value);
    if (values.order === event.target.dataset.name) {
      values.order = `${event.target.dataset.name} DESC`;
    } else {
      values.order = event.target.dataset.name;
    }
    updateValue(values);
  }

  const rows = value.data.map(item => (
    <tr key={item.id}>
      <td><span onClick={handleClick}>{item.name}</span></td>
      <td>{item.email}</td>
      <td><pre>{item.text}</pre></td>
      <td>{ user ? (<Link to={`edit/${item.id}`}><img src={EditIcon} alt={ t('Edit') } /></Link>) : (null) }</td>
      <td>{ renderStatus(item.status) }</td>
    </tr>
  ));

  return (
    <>
      <table>
        <thead>
          <tr>
            <th><span onClick={handleClick} className="sortable" tabIndex="0" data-name="name">{ t('Username') }{ renderOrder('name') }</span></th>
            <th><span onClick={handleClick} className="sortable" tabIndex="0" data-name="email">{ t('Email') }{ renderOrder('email') }</span></th>
            <th><span>{ t('Text') }</span></th>
            <th></th>
            <th><span onClick={handleClick} className="sortable" tabIndex="0" data-name="status">{ t('Status') }{ renderOrder('status') }</span></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <ToDoListTablePagination count={Math.ceil(value.totalCount / value.itemsPerPage)} />
    </>
  );
};

export default function ToDoList() {
  return (
    <>
      <h1>TO DO list</h1>
      <Messages />
      <Link to={'add'} className="button">+ { t('Add task') }</Link>
      <ToDoListContextProvider>
        <ToDoListTable />
      </ToDoListContextProvider>
    </>
  );
}
