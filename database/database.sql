DROP TABLE IF EXISTS example;

CREATE TABLE example (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30),
    user_password VARCHAR(255) NOT NULL,
    gen_code INT NOT NULL,
    PRIMARY KEY (id)
);
