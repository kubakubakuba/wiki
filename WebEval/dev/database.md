---
outline: deep
---

# Database

Here we show the schema that is used in the Web Evaluator application. Is is a PostgreSQL database, using some of PSQL triggers and functions.

:::info
The databse schema is stored in [`scripts/qtrvsim_web_eval.sql`](https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web/-/blob/main/scripts/qtrvsim_web_eval.sql?ref_type=heads) file.
:::

## Tables

### public.results

| Column       | Data Type                 | Constraints                       |
|--------------|---------------------------|-----------------------------------|
| userid       | bigint                    | NOT NULL                          |
| taskid       | bigint                    | NOT NULL                          |
| result_file  | text                      |                                   |
| last_source  | text                      |                                   |
| best_source  | text                      |                                   |
| score_last   | integer                   | DEFAULT '-1'                      |
| score_best   | integer                   | DEFAULT '-1'                      |
| time         | timestamp with time zone  | DEFAULT CURRENT_TIMESTAMP         |
| result       | smallint                  | DEFAULT '-1'                      |

### public.submissions

| Column    | Data Type                 | Constraints                       |
|-----------|---------------------------|-----------------------------------|
| id        | integer                   | NOT NULL, PRIMARY KEY             |
| userid    | integer                   | NOT NULL                          |
| taskid    | integer                   | NOT NULL                          |
| file      | text                      |                                   |
| evaluated | boolean                   | DEFAULT false                     |
| time      | timestamp with time zone  | DEFAULT CURRENT_TIMESTAMP         |

### public.tasks

| Column    | Data Type          | Constraints                       |
|-----------|--------------------|-----------------------------------|
| id        | integer            | NOT NULL, PRIMARY KEY             |
| name      | varchar(64)        | NOT NULL                          |
| path      | varchar(256)       | NOT NULL                          |
| available | boolean            | DEFAULT true                      |
| sequence  | integer            | DEFAULT 0                         |

### public.users

| Column        | Data Type          | Constraints                       |
|---------------|--------------------|-----------------------------------|
| id            | integer            | NOT NULL, PRIMARY KEY             |
| email         | varchar(128)       | NOT NULL                          |
| password      | varchar(128)       | NOT NULL                          |
| salt          | varchar(128)       | NOT NULL                          |
| token         | varchar(128)       | DEFAULT NULL                      |
| verified      | boolean            | DEFAULT false                     |
| username      | varchar(128)       | NOT NULL                          |
| admin         | boolean            | DEFAULT false                     |
| display_name  | varchar(64)        |                                   |
| country       | varchar(128)       |                                   |
| organization  | varchar(256)       |                                   |
| group         | varchar(128)       |                                   |
| visibility    | integer            | DEFAULT 0                         |

## Functions

### public.delete_evaluated_submission

```sql
CREATE FUNCTION public.delete_evaluated_submission() RETURNS trigger
    LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.evaluated = TRUE THEN
    DELETE FROM submissions WHERE id = NEW.id;
    RETURN NULL;
  ELSE
    RETURN NEW;
  END IF;
END;
$$;

```

### public.update_best_score

```sql
CREATE FUNCTION public.update_best_score() RETURNS trigger
    LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.score_best = -1 OR NEW.score_best = 0 OR (NEW.score_last <= NEW.score_best AND NEW.result = 0) THEN
    NEW.score_best := NEW.score_last;
    NEW.best_source := NEW.last_source;
    RETURN NEW;
  END IF;
  RETURN NEW;
END;
$$;

```

### public.update_results_timestamp

```sql
CREATE FUNCTION public.update_results_timestamp() RETURNS trigger
    LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE results
  SET time = CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Prague'
  WHERE userid = NEW.userid AND taskid = NEW.taskid;
  RETURN NEW;
END;
$$;

```

## Triggers

### after_submission_update on public.submissions

```sql
CREATE TRIGGER after_submission_update
AFTER UPDATE ON public.submissions
FOR EACH ROW
WHEN ((OLD.evaluated IS DISTINCT FROM NEW.evaluated) AND (NEW.evaluated = TRUE))
EXECUTE FUNCTION public.delete_evaluated_submission();

```

### update_best_score_trigger on public.results

```sql
CREATE TRIGGER update_best_score_trigger
BEFORE INSERT OR UPDATE ON public.results
FOR EACH ROW
EXECUTE FUNCTION public.update_best_score();

```

### update_results_after_insert on public.submissions

```sql
CREATE TRIGGER update_results_after_insert
AFTER INSERT ON public.submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_results_timestamp();

```