BEGIN;

TRUNCATE
  "user",
  "bills",
  "income",
  "debt"

INSERT INTO "user" ("user_name", "first_name", "password")
VALUES
  (
    'admin',
    'Andrea Pullen',
   'dogmouse'
  );

INSERT INTO "bills" ("bill_name", "bill_amt", "amt_paid", "month", "paid")
VALUES
        ('Car Payment', 550, 'january', false),
        ('Car Insurance', 240, 'january', false),   
        ('Mortgage', 255, 'january', false),         
        ('Water', 120, 'january', false),
        ('Electricity', 150, 'january', false);

INSERT INTO "income" ("source", "amount", "month", "received")
VALUES
        ('Salary', 1550, 'january', false),
        ('Side Hustle', 1820, 'january', false);  

INSERT INTO "debt" ("name", "start_bal", "curr_bal", "monthly_min", "amt_paid", "month", "paid")
VALUES
         ('Student Loan', 35550, 19652, 150, 0, 'january', false),
        ('Credit Card', 550,  385, 60,  0, 'january', false),   
        ('Mortgage', 378550,  322550, 2450,  0, 'january', false),         
        ('Furniture', 6732, 2550, 124, 0, 'january', false),
        ('Truck', 32550,  28745, 498, 0, 'january', false);

COMMIT;