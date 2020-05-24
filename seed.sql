USE employee_db;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('HR');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 90000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 120000, 2),
    ('Software Engineer', 140000, 2),
    ('Accounts Manager', 90000, 3),
    ('Accountant', 105000, 3),
    ('Administrative Officer', 60000, 4),
    ('Lawyer', 200000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Alex', 'Park', 1, NULL),
    ('Sarah', 'Schley', 2, 1),
    ('Anna', 'Jang', 3, NULL),
    ('Tim', 'Lee', 4, 3),
    ('Charlotte', 'Cho', 5, NULL),
    ('Jason', 'Lee', 6, 5),
    ('Wilton', 'Kang', 7, NULL),
    ('Esther', 'Kwon', 8, 7);