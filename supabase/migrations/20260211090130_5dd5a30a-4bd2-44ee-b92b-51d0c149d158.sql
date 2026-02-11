ALTER TABLE user_billing ALTER COLUMN balance SET DEFAULT 0;
ALTER TABLE user_billing ALTER COLUMN current_plan SET DEFAULT 'p1';
UPDATE user_billing SET balance = 0, current_plan = 'p1';