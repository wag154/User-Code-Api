DROP TABLE IF EXISTS example;
DROP TABLE IF EXISTS admins;

CREATE TABLE example (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30),
    user_password VARCHAR(255) NOT NULL,
    gen_code VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE admins (
    id INT GENERATED ALWAYS AS IDENTITY,
    admin_key VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO admins (admin_key) VALUES ('admin|r4DPR1&HsQ4j');