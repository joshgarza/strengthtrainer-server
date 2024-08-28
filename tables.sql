CREATE DATABASE strengthtrainer;
\c strengthtrainer;

-- DROP TABLE exercise_results;
-- DROP TABLE e1rm_history;
-- DROP TABLE personal_bests;
-- DROP TABLE exercise_assignments;
-- DROP TABLE circuit_assignments;
-- DROP TABLE workout_assignments;
-- DROP TABLE workouts;
-- DROP TABLE exercise_modifications;
-- DROP TABLE exercises;
-- DROP TABLE tokens;
-- DROP TABLE coach_client_relation;
-- DROP TABLE users;
-- DROP SEQUENCE workout_position_seq;
-- DROP SEQUENCE circuit_position_seq;
-- DROP SEQUENCE exercise_position_seq;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  role VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE coach_client_relation (
  id SERIAL PRIMARY KEY,
  coach_id INT REFERENCES users(id),
  client_id INT REFERENCES users(id),
  start_date DATE NOT NULL,
  end_date DATE NULL,
  status VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE tokens (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  token VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE exercises (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  difficulty VARCHAR,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE exercise_modifications (
  id SERIAL PRIMARY KEY,
  exercise_id INT REFERENCES exercises(id),
  modification_exercise_id INT REFERENCES exercises(id),
  deleted_at TIMESTAMP NULL
);

CREATE TABLE workouts (
  id SERIAL PRIMARY KEY,
  client_id INT REFERENCES users(id),
  coach_id INT REFERENCES users(id),
  workout_date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE SEQUENCE workout_position_seq;

CREATE TABLE workout_assignments (
  id SERIAL PRIMARY KEY,
  workout_id INT REFERENCES workouts(id),
  workout_position FLOAT NOT NULL DEFAULT nextval('workout_position_seq'),
  notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE SEQUENCE circuit_position_seq;

CREATE TABLE circuit_assignments (
  id SERIAL PRIMARY KEY,
  workout_assignment_id INT REFERENCES workout_assignments(id),
  circuit_position FLOAT NOT NULL DEFAULT nextval('circuit_position_seq'),
  sets INT NOT NULL,
  deleted_at TIMESTAMP NULL
);

CREATE SEQUENCE exercise_position_seq;

CREATE TABLE exercise_assignments (
  id SERIAL PRIMARY KEY,
  circuit_assignment_id INT REFERENCES circuit_assignments(id),
  modification_exercise_id INT REFERENCES exercises(id) NULL,
  exercise_position FLOAT NOT NULL DEFAULT nextval('exercise_position_seq'),
  sets INT,
  reps INT,
  weight FLOAT NOT NULL,
  percentage_of_e1rm FLOAT NULL,
  percentage_of_last_set FLOAT NULL,
  adjusted_weight FLOAT NULL,
  rpe_target INT NULL,
  amrap BOOLEAN NOT NULL DEFAULT FALSE,
  amsap BOOLEAN NOT NULL DEFAULT FALSE,
  time_limit INT NULL,
  rest_period INT NOT NULL DEFAULT 180,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE exercise_results (
  id SERIAL PRIMARY KEY,
  exercise_assignment_id INT REFERENCES exercise_assignments(id),
  sets_completed INT NULL,
  reps_completed INT NULL,
  weight_used FLOAT NULL,
  rpe_actual INT NULL,
  notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE e1rm_history (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  exercise_id INT REFERENCES exercises(id),
  e1rm FLOAT NOT NULL,
  calculated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE personal_bests (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  exercise_id INT REFERENCES exercises(id),
  rep_range INT NOT NULL,
  weight FLOAT NOT NULL,
  achieved_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);
