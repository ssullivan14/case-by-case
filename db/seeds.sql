USE casebycase;

INSERT INTO user (user_name, user_email, user_password)
VALUES ("ssullivan", "saralsullivan@gmail.com", "cr!m3junk!3"),("dsullivan46", "sully804@gmail.com", "Fr33Qu1ncy!");

ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';