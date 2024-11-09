---
outline: deep
---

# Evaluator module overview

## Requirements

- `qtrvsim_cli` executable is needed to be installed and be present in the system PATH.
- `Python 3.11`
	- `psycopg2` module
	- `markdown` module
	- `toml` module

For compilation of assembly files into RISC-V elf files, the `riscv64-unknown-elf-gcc` compiler is needed.

## Introduction

The main evaluation is handled by a python wrapper for QtRVSim called [`evaluator/qtrvsim.py`](https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web/-/blob/main/evaluator/qtrvsim.py?ref_type=heads). This module (and the class `QtRVSim`) is constructed in the [`evaluator/evaluator.py`](https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web/-/blob/main/evaluator/evaluator.py?ref_type=heads) file. The module is responsible for the evaluation of the user's solution and the generation of the evaluation report (that is then saved in the postgres database).

## The evaluation process

The evaluation process is as follows:

1. Fetch submissions

Submissions are fetched from the database. The evaluator fetches a number of submissions from the database.

2. Evaluation

For each submission fetched, it is evaluated according to the task definition file (as described in the [Task creation](./tasks) section).

3. Database update

The evaluation results are saved in the database.

:::info
The evaluation process takes place in `/tmp/qtrvsim_web_eval/` folder, each submission is beaing evaluated in a seperate folder with the `pid` of the evaluator process.
:::

## Evaluator results

| Code | Name | Description |
|------|------|-------------|
| -1   | Pending | The evaluation is still in progress. |
| 0    | Accepted | The solution is correct. |
| 2    | Timeout | The solution has exceeded the time limit. |
| 3    | Cache error | The solution has failed to compile. |
| 4    | Make error | The solution has failed to compile. |
| 5    | Assembly error | The solution has failed to compile. |
| 99   | Internal evaluator error | The evaluator has encountered an internal error. |
| 100  | Score reset by admin | The score has been reset by an admin. |
| Other| Rejected | The solution is incorrect. |

:::info
Note that this is the exact definition of result codes as defined in [`web/templates/task.html`](https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web/-/blob/main/web/templates/task.html?ref_type=heads), some of these codes are directly returned by the evaluator, some are set by the web application.
:::

## Evaluation with Python

The module can be used without the automatic loading of the task file.

This can be done in the following manner (you manually use the `QtRVSim` class methods, the `evaluator` class automatically does that for you):

```python
from qtrvsim import QtRVSim

sim = QtRVSim(args="--d-regs --dump-cycles --cycle-limit 1000", submission_file="file.S")

ending_regs = {
	"a1": 2,
	"a2": 4,
	"a3": 6,
}

starting_mem = {
	"array_start": [2, 4],
}

ending_mem = {
	"array_start": [2, 4, 6],
}

sim.set_reference_ending_regs(ending_regs)
sim.set_starting_memory(starting_mem)
sim.set_reference_ending_memory(ending_mem)
#sim.set_private() #optional, if set to true, does not show errors

sim.run("Testcase 1")

print(sim.get_log())
print(sim.get_scores()["cycles"] if sim.get_result() == 0 else "-1")

sim.reset() 
```

## Local evaluation

You can use a local evaluator, located in [`evaluator/local/`](https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web/-/tree/main/evaluator/local?ref_type=heads). The evaluation process is then performed by writing a simple Python script.

```python
from eval import QtRVSimEvaluator

code = "test.S" 					#your code file
task_file = "test.toml" 			#the task.toml file with the necessary testcases
folder = "/tmp/qtrvsim_web_eval" 	#folder where the evaluation is performed in, usually /tmp/qtrvsim_web_eval

verbose = False						#set this to true if you need more info to debug
log_file = code.replace(".S", ".log") if code.endswith(".S") else code.replace(".c", ".log")

#we create an evaluator object, which uses the QtRVSim class
QEval = QtRVSimEvaluator(folder, verbose)

#we start the evaluation on the task file and the file with the code that is to be evaluated
QEval.evaluate(task_file, code)

#we save the evaluation log to a file
QEval.save_log(log_file)
```