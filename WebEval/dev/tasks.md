---
outline: deep
---

# Task creation

Each task is created by a single `.toml` file. The file should be located inside the `web/tasks/` directory.


## Task file structure

The task file is a `.toml` file that contains the following fields.

- `[task]`
	- `name` - the name of the task
	- `template` - path to a .S or .c file, that will be used as a template for the task
	- `description` - the description of the task, can be styled using markdown, MathJax can also be used

- `[arguments]`
	- `run` - arguments that will be passed to QtRVSim when evaluation the task, note that some arguments are required for certain functionalities, eg. `--d-regs` should be used, when reading the state of registers is needed. By default `--dump-cycles` is the minimal required argument in this section.

- `[[inputs]] array` - array of textual inputs descriptions that will be displayed to the user, now are not needed to be filled out
	- `data_in` - data that will be passed to the task
	- `data_out` - data that is expected as an output
	- `description` - description of the input

- `cache_max_size` - (optional), if set to some int number, sets the maximum size of the cache in the simulator (activates the cache settings in the evaluator)

- `c_solution` - (optional), if set to true, the task is set to be solved in C, `Makefile` and file to be present during compile time may be needed.

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

### Simple addition

<<< ../tasks/addition.toml

### Reading from memory

<<< ../tasks/readmem.toml

### Cache

<<< ../tasks/cache.toml

### Fibonacci

<<< ../tasks/fibonacci.toml

### Hazard detection

<<< ../tasks/hazards.toml

### Simple C calculator

<<< ../tasks/calculator.toml
