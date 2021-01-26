BEGIN;



INSERT INTO "user" ("user_name", "first_name", "password")
VALUES
  (
    'apullen',
    'Andrea',
   'dogmouses'
  );
  COMMIT;

INSERT INTO "bills" ("bill_name", "bill_amt", "amt_paid", "month", user_id, "paid")
VALUES
        ('Car Payment', 550, 0, 'january', 548264655, false),
        ('Car Insurance', 240, 0, 'january', 548264655, false),   
        ('Mortgage', 255, 0, 'january', 548264655, false),         
        ('Water', 120, 0, 'january', 548264655, false),
        ('Electricity', 150, 0, 'january', 548264655, false);

INSERT INTO "income" ("source", "amount", user_id, "month",  "received")
VALUES
        ('Salary', 1550, 548264655, 'january', false),
        ('Side Hustle', 1820, 548264655, 'january', false);  

INSERT INTO "debt" ("name", "start_bal", "curr_bal", "monthly_min", "amt_paid", user_id, "month", "paid")
VALUES
         ('Student Loan', 35550, 19652, 150, 0, 548264655, 'january', false),
        ('Credit Card', 550,  385, 60,  0, 548264655, 'january', false),   
        ('Mortgage', 378550,  322550, 2450,  0, 548264655, 'january', false),         
        ('Furniture', 6732, 2550, 124, 0, 548264655, 'january', false),
        ('Truck', 32550,  28745, 498, 0, 548264655, 'january', false);

COMMIT;