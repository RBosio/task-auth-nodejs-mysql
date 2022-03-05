CREATE SCHEMA task_auth_crud;

USE task_auth_crud;

CREATE TABLE user(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(25) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  fullname VARCHAR(20) NOT NULL,
  image VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);

CREATE TABLE task(
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(15) NOT NULL,
  description VARCHAR(30),
  id_user INT(11) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
  CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES user(id)
);