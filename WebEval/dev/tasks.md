---
outline: deep
---

# Task creation

Each task is defined by a single `.toml` file. The file should be located inside the `web/tasks/` directory.

# On this page

[[toc]]

## Task file structure

The task file is a `.toml` file that contains the following fields.

- `[task]`
	- `name` - the name of the task
	- `template` - path to a .S or .c file, that will be used as a template for the task
	- `description` - the description of the task, can be styled using markdown, MathJax can also be used
	- `c_solution` - (optional), if set to true, the task is set to be solved in C, `Makefile` and file to be present during compile time may be needed.
	- `cache_max_size` - (optional), if set to some int number, sets the maximum size of the cache in the simulator (activates the cache settings in the evaluator)
	- `submit_start` and `submit_end` - (optional), if set to a timestamp in a format of `2024-01-01T00:00:00Z` the task will be available for submission only in the given time frame

- `[arguments]`
	- `run` - arguments that will be passed to QtRVSim when evaluation the task, note that some arguments are required for certain functionalities, eg. `--d-regs` should be used, when reading the state of registers is needed. By default `--dump-cycles` is the minimal required argument in this section.

- `[[inputs]] array` - array of textual inputs descriptions that will be displayed to the user, now are not needed to be filled out
	- `data_in` - data that will be passed to the task
	- `data_out` - data that is expected as an output
	- `description` - description of the input

### Simple preprocessor

***New feature***

You can now use a [preprocessor](https://gitlab.fel.cvut.cz/b35apo/qtrvsim-eval-web/-/blob/main/evaluator/preprocessor.py) to dynamically generate random data for your testcases, mainly to prevent hardcoded solutions.

Start your task file with a preprocessor variables section:
```toml
[preprocessor]
vect_10 = "[random.randint(0, 100) for _ in range(10)]"
vect_10_s = "sorted(vect_10)"
```
Where variables are defined by python functions.

To use the variables in a testcase, surround it by <span v-pre>`{{` and `}}`</span>:
```toml
[[testcases.starting_mem]]
array_size = [10]
array_start = "{{$vect_10$}}"

[[testcases.reference_mem]]
array_start = "{{$vect_10_s$}}"
```

::: details
The surrounding symbols are technically <span v-pre>`"{{$` and `$}}"`</span>, this is because non numeric or array like values need to be treated like strings, otherwise they would lead to a not toml-readable file.

This is why the python code for variable assignment and the variables itself are surrounded by `""` and are effectively treated as strings.
::: 

The most important field is the `[[testcases]]`, which is an array that can have following fields:

```toml
[[testcases]]
name = "test01"
```

Ending reference registers:
```toml
[[testcases.reference_regs]]
a1 = 10
a2 = 12
```
Starting memory ranges can be defined by:
```toml
[[testcases.starting_mem]]
0x400 = [5, 10]
0x404 = [10, 15]
```

The reference (ending / expected) memory ranges:
```toml
[[testcases.reference_mem]]
0x408 = [15]
```

A testcase can be set to private by doing:
```toml
[[testcases]]
name = "scoring testcase"
private = true
```

A scoring testcase (benchmark) can be defined by the follofing:
```toml
[score]
description = "Scoring based on the number of cycles used to execute the program."
testcase = "scoring testcase"
```
:::info
It is best to define the scoring testcase to be a private one, so that the users cannot see the specific scoring testcase that will be run on their code.
:::

Input UART:
```toml
[[testcases.input_uart]]
uart = "112233\n445566\n"
```

Expected output UART:
```toml
[[testcases.reference_uart]]
uart = "557799\n"
```

If your tasks requires to be compiled to elf, before running in the simulator (eg. when `%lo` and `%hi` are usedm or `C`), you need to create a `Makefile` inside the `[make]` section:

```toml
Makefile="""ARCH=riscv64-unknown-elf
SOURCES = submission.S
TARGET_EXE = submission

...

clean:
	rm -f *.o *.a $(OBJECTS) $(TARGET_EXE) depend

"""
```

You can also supply any number of files that will be created and used in compile time by:
```toml
[[files]]
name = "crt0local.S"
code = """
...
"""
[[files]]
name = "test.S"
code = """
...
"""
```

:::info
The `Makefile` should accept a `submission.S` file at the same folder, and create a `submission` executable in the same folder. There should also be a `clean` target, that is called after the evaluation of the task.

Look below at the more complex examples to see exact `Makefile` usage.
:::


## Examples

### Reading from registers

The most basic example of a task file, only uses register values to check the correctness of the solution.

<<< ../tasks/addition.toml

### Reading from memory

Also uses memory values to load values to the program and to check the final state of memory addresses. Look at how multiple memory addresses can be set and checked.

<<< ../tasks/readmem.toml

### Usage of the preprocessor (Bubble sort)

An example of a task that uses the preprocessor to generate random data for the testcases.

<<< ../tasks/bubble.toml

### Pragma cache usage

An example of a usage of the `#pragma cache` directive in the task template file.

<<< ../tasks/cache.toml

### Usage of MathJax and syntax highlighting (Fibonacci)

Here you can see the usage of formatted task file with MathJax and syntax highlighting.

<<< ../tasks/fibonacci.toml

### Usage of custom Makefile (Hazard detection)

This task uses a custom `Makefile` to compile the solution to an ELF file, which is then run in the simulator (for programs that cannot yet be run in the simulator directly).

<<< ../tasks/hazards.toml

### Writing the solution in C, custom Makefile, files and UART input/output (Calculator)

This example of a task file requires the user to solve the task in C, write the output to UART. The task also uses other files which are present during compile time.

<<< ../tasks/calculator.toml
