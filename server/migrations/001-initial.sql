--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE todo (
  id     INTEGER PRIMARY KEY,
  name   TEXT    NOT NULL,
  email  TEXT    NOT NULL,
  text   TEXT    NOT NULL,
  status INTEGER NOT NULL
);

INSERT INTO todo (name, email, text, status) VALUES ('test', 'test@test.com', 'test job', 0);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE todo;
