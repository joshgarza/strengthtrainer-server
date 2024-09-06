-- \i tables.sql to run this file from psql prompt

\c postgres;
DO $$
DECLARE
    r RECORD;
BEGIN
    -- Loop through all active processes in pg_stat_activity for the 'strengthtrainer' database
    FOR r IN
        SELECT pid
        FROM pg_stat_activity
        WHERE datname = 'strengthtrainer'
          AND pid <> pg_backend_pid() -- Exclude the current session
    LOOP
        -- Dynamically terminate each backend process
        EXECUTE 'SELECT pg_terminate_backend(' || r.pid || ')';
    END LOOP;
END $$;

DROP DATABASE IF EXISTS strengthtrainer;
CREATE DATABASE strengthtrainer;
\c strengthtrainer;

-- DROP TABLE IF EXISTS exercise_results CASCADE;
-- DROP TABLE IF EXISTS e1rm_history CASCADE;
-- DROP TABLE IF EXISTS personal_bests CASCADE;
-- DROP TABLE IF EXISTS exercise_assignments CASCADE;
-- DROP TABLE IF EXISTS circuit_assignments CASCADE;
-- DROP TABLE IF EXISTS workout_assignments CASCADE;
-- DROP TABLE IF EXISTS workouts CASCADE;
-- DROP TABLE IF EXISTS exercise_modifications CASCADE;
-- DROP TABLE IF EXISTS exercises CASCADE;
-- DROP TABLE IF EXISTS tokens CASCADE;
-- DROP TABLE IF EXISTS coach_user_relation CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;

-- DROP SEQUENCE IF EXISTS workout_position_seq CASCADE;
-- DROP SEQUENCE IF EXISTS circuit_position_seq CASCADE;
-- DROP SEQUENCE IF EXISTS exercise_position_seq CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  role VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE authorized_user_ids (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  coach_id INT NOT NULL REFERENCES users(id)
);

CREATE TABLE coach_user_relation (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  coach_id INT NOT NULL REFERENCES users(id),
  start_date DATE NOT NULL,
  end_date DATE NULL,
  status VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tokens (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  token VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL
);

CREATE TABLE exercises (
  id SERIAL PRIMARY KEY,
  user_id INT NULL REFERENCES users(id),
  name VARCHAR NOT NULL,
  description TEXT NULL,
  difficulty VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exercise_substitutes (
  id SERIAL PRIMARY KEY,
  exercise_id INT NOT NULL REFERENCES exercises(id),
  substitute_exercise_id INT NOT NULL REFERENCES exercises(id),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE program_assignment_templates (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  description TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workout_assignment_templates (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  program_assignment_template_id INT NULL REFERENCES program_assignment_templates(id),
  program_day INT NULL,
  workout_position INT NULL,
  name TEXT NULL,
  description TEXT NULL,
  notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE circuit_assignment_templates (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  workout_assignment_template_id INT NULL REFERENCES workout_assignment_templates(id),
  circuit_position INT NULL,
  sets INT NOT NULL DEFAULT 1 CHECK (sets >= 1),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exercise_assignment_templates (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  circuit_assignment_template_id INT NULL REFERENCES circuit_assignment_templates(id),
  exercise_id INT NOT NULL REFERENCES exercises(id),
  exercise_position INT NULL,
  sets INT NULL,
  reps INT NULL,
  weight FLOAT NULL,
  percentage_of_e1rm FLOAT NULL,
  percentage_of_last_set FLOAT NULL,
  rpe_target FLOAT NULL,
  amrap BOOLEAN NOT NULL DEFAULT false,
  amsap BOOLEAN NOT NULL DEFAULT false,
  time_limit INT NULL,
  rest_period INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE program_assignments (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  coach_id_id INT NOT NULL REFERENCES users(id),
  program_assignment_templates_id INT NOT NULL REFERENCES program_assignment_templates(id),
  name TEXT NOT NULL,
  description TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workout_assignments (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  coach_id INT NOT NULL REFERENCES users(id),
  program_assignment_id INT NULL REFERENCES program_assignments(id),
  workout_assignment_template_id INT NULL REFERENCES workout_assignment_templates(id),
  workout_date TIMESTAMP NOT NULL,
  position INT NOT NULL,
  name TEXT NULL,
  description TEXT NULL,
  notes TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE circuit_assignments (
  id SERIAL PRIMARY KEY,
  workout_assignment_id INT NOT NULL REFERENCES workout_assignments(id),
  circuit_assignment_template_id INT NULL REFERENCES circuit_assignment_templates(id),
  position INT NOT NULL,
  sets INT NOT NULL DEFAULT 1 CHECK (sets >= 1),
  rest_period INT NOT NULL DEFAULT 0
);

CREATE TABLE exercise_assignments (
  id SERIAL PRIMARY KEY,
  circuit_assignment_id INT NOT NULL REFERENCES circuit_assignments(id),
  exercise_assignment_template_id INT NULL REFERENCES exercise_assignment_templates(id),
  exercise_id INT NOT NULL REFERENCES exercises(id),
  position INT NOT NULL,
  sets INT NULL,
  reps INT NULL,
  weight FLOAT NULL,
  percentage_of_e1rm FLOAT NULL,
  percentage_of_last_set FLOAT NULL,
  adjusted_weight FLOAT NULL,
  rpe_target FLOAT NULL,
  amrap BOOLEAN NOT NULL DEFAULT FALSE,
  amsap BOOLEAN NOT NULL DEFAULT FALSE,
  duration INT NULL,
  rest_period INT NULL
);

CREATE TABLE exercise_assignment_results (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  exercise_assignment_id INT NOT NULL REFERENCES exercise_assignments(id),
  actual_sets INT NULL,
  actual_reps INT NULL,
  actual_weight FLOAT NULL,
  actual_rpe INT NULL,
  actual_duration INT NULL,
  notes TEXT NULL,
  completed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE e1rm_history (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  exercise_id INT NOT NULL REFERENCES exercises(id),
  e1rm FLOAT NOT NULL,
  calculated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE personal_bests (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  exercise_id INT NOT NULL REFERENCES exercises(id),
  rep_range INT NOT NULL,
  weight FLOAT NOT NULL,
  achieved_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
