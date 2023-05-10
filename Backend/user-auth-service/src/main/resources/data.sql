insert into tb_secret_questions(id,question) values (1,'What is your mother"s maiden name?');
insert into tb_secret_questions(id,question) values (2,'What is your favorite color?');
insert into tb_secret_questions(id,question) values (3,'What was the name of your first pet?');
insert into tb_secret_questions(id,question) values (4,'In what city were you born?');
insert into tb_secret_questions(id,question) values (5,'What is the name of your favorite teacher?');
insert into tb_user (user_id, email, first_name, last_name, password, role, secret_question_id, answer) values ('A346490ab-84c1-4d8b-87b8-92b98337438c','jamesKadams@gmail.com','James','Adams','$2a$10$v76BPGs6I/AJHW9//FIb4efDffWs5p2jPTTYCzwxRbAqLEvFfIR2e','ADMIN',2,'purple');
insert into tb_user (user_id, email, first_name, last_name, password, role, secret_question_id, answer) values ('A62204f38-ee22-11ed-a05b-0242ac120003','johnKmedley@gmail.com','Jhon','Mendley','$2a$10$cF3u72YrsDjIii4LXN0xtODng9EHV3uAbBYqrpprS.FV9KO2piFnq','ADMIN',3,'tom');