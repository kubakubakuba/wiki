# Writing a first program

After all that we have learned, we can finally write a first program. But in which programming language? You actually seen one already. Bash.

## Hello, World! in Bash

Bash is a shell scripting language, which means that it is used to automate tasks in the terminal. It is a very powerful tool, and you can do a lot with it.

```bash
#!/bin/bash
mkdir hello
cd hello
touch world
echo "Hello, World!" > world
cat world
cd ..
rm -r hello
```

We just automated the task we did before manually. Note the first line `#!/bin/bash`. This is called a shebang, and it tells the system to use the bash interpreter to run the script. The rest of the script is the same as the commands we ran before. More cleaner way for the shebang would be

```bash
#!/usr/bin/env bash
```
Because of the inconsistency of the location of the bash interpreter on different systems. (you could not run the previous script on `FreeBSD` or `NixOS` for example). I will thus use this variation in the future scripts.

To run the program, simply execute it in the terminal using `./`

```bash
jakub@NitroN50-620:~$ ./test.sh
-bash: ./test.sh: Permission denied
jakub@NitroN50-620:~$
```

There are multiple ways to get around not having permissions to execute the script. The first can be by running the program directly with shell

```bash
jakub@NitroN50-620:~$ bash test.sh
Hello, World!
jakub@NitroN50-620:~$
```

But this is not the best way and is not wildly used. First lets look at the permissions of the file

```bash
jakub@NitroN50-620:~$ ls -l test.sh
-rw-r--r-- 1 jakub jakub 90 Sep  6 20:00 test.sh
```

As we can see, the file has no execute permissions. We can add them by using `chmod` command

```bash
jakub@NitroN50-620:~$ chmod +x test.sh
jakub@NitroN50-620:~$ ls -l test.sh
-rwxr-xr-x 1 jakub jakub 90 Sep  6 20:00 test.sh
```

Now we can finally run the script

```bash
jakub@NitroN50-620:~$ ./test.sh
Hello, World!
jakub@NitroN50-620:~$
```

We have now done a simple redundant script, that creates a and deletes a file to print `Hello, World!`. It can of course be made much simpler.

```bash
echo "Hello, World!"
```

## Redirections

The thing you have seen in the first script `<` and `>` are called redirections. They are used to redirect the output of a command to a file or from a file to a command. The `>` is used to redirect the output of a command to a file, and the `<` is used to redirect the input of a command from a file. The `>>` is used to append the output to a file.

```bash
echo "Hello, World!" > world
```

To redirect to `stdout` (standard output) you can use `1>`, to `stderr` (standard error) you can use `2>`, and to `stdin` (standard input) you can use `0<`. The `&` is used to combine the two, so `2>&1` would redirect `stderr` to `stdout`.

## Piping

Another thing to use in bash is so called piping. It is used to take the output of one command and use it as the input of another. The `|` is used to pipe the output of one command to the input of another.

```bash
echo "Hello, World!" | cat
```

We can also run multiple programs after each other, only if the previous one was successful. The `&&` is used to run the next command only if the previous one was successful, and the `||` is used to run the next command only if the previous one was not successful.

for example 

```bash
make && make install && make clean
```

When we simple want to run multiple programs without ignoring the results, we can use `;`

```bash
echo "Hello"; echo " World!"
```


... to be continued