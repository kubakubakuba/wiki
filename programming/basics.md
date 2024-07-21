---
outline: deep
---

# The basics of programming

Before we even start programming, we need to understand how to work with a computer (duh?). It may seem redundant and simple in these days, but it may shed some light on how things work under the hood.

The first important thing is the operating system we will be working on. Most of you will probably be using Windows, or possibly Apple machines loaded with MacOS. However, to simplify all possible caveats,
we will be using Linux. So as not to install all the necessary stuff (also, installing different OS on all your machines could be quite a hassle), we have made accounts on our local server. These accounts are accesible via SSH, which is a secure way to connect to a remote machine (in this case, our server).

## Connecting to a server

To connect to your usespace, you can use many different applications, most of them already packaged with the operating system. On Windows, you can use Powershell, Command Prompt, Git Bash or Putty.

```bash
ssh username@server.localhost
```

You will be prompted for a password, which will be given to you.

If you try to copy the password using `Ctrl+C`, you may end up cancelling the `ssh` command. This is because `Ctrl+C` is a shortcut for cancelling the current command. Another useful shortcut is `Ctrl+D`, which is a shortcut for line break (or EOF, which stands for End Of File).
If you wish to copy the password (or any other text) from the terminal, you can use `Ctrl+Shift+C` to copy and `Ctrl+Shift+V` to paste.

Once you are connected, you will se a so called `CLI`, this is a abbreviation for Command Line Interface. The 'only' thing you can do in a CLI is to write commands to the console, and to recive textual output. It may seem like a step back, but as we will shortly see, it actually is quite powerful. The other way to communicate with a computer is using a `GUI`, which stands for Graphical User Interface. This is what you are used to, with windows, buttons, and other graphical elements. The GUI is more user friendly, but it is also slower and less powerful than the CLI.

## The basics of Linux

Linux, correctly GNU/Linux, is a family of open-source operating systems. It is based on the Unix operating system, which was developed in the 1970s. GNU on the other hand, is a project started by Richard Stallman in 1983, with the goal of creating a free operating system. The Linux kernel was created by Linus Torvalds in 1991, and it was combined with the GNU project to create the GNU/Linux operating system.

To start working with Linux, you can type anything in the console and see the result.

```bash
jakub@server:~$ hello?
-bash: Hello?: command not found
```

What we will see, is that the console has tried to execute the command we have written, but failed miserably. The other thing we can see is the part:

```bash
jakub@server:~$
```
This is our username and the server we are connected to (technically the computer we are on), the `~` symbolizes the home directory of the user. Directory structure on Unix based system is a bit different than on Windows.

### Directory structure in Unix

The main folder on Linux is simply called `/`. This is the root directory, and all other directories are located inside it. The most important directories are:

- `/bin` - contains essential binaries (programs) that are needed for the system to run
- `/boot` - contains the kernel and other files needed for booting the system
- `/dev` - contains device files, which are used to communicate with hardware
- `/etc` - contains system-wide configuration files
- `/home` - contains user directories
- `/lib` - contains shared libraries needed for programs to run
- `/media` - contains mount points for removable media
- `/mnt` - contains mount points for temporary filesystems
- `/opt` - contains optional software
- `/proc` - contains information about processes and the kernel
- `/root` - the home directory of the root user
- `/run` - contains system information that is valid until the system is rebooted
- `/sys` - contains information about the system
- `/tmp` - contains temporary files
- `/usr` - contains user binaries, libraries, documentation, and source code

So the `~` symbolizes the home directory of the user, located in the variable `$HOME`. The home directory is the directory where the user is placed after logging in. It is usually located in `/home/username`, but it can be changed in the `/etc/passwd` file.

### Basic commands

Firstly, what is a command? A command is essentially a program, that is being run in the console. A 'command' consists of a name and its arguments
```bash
run arg1 arg2 arg3 ...
```
Some of the arguments may be compulsory, some may be optional. The most common way to write arguments is to use flags, which are usually preceded by a `-` or `--`.

```bash
run -v -f file.txt -o output.txt
run --verbose --file file.txt --output output.txt
run file.txt output.txt
```
All of these are of course valid, for a specific program. The programmer who designed how the program reads the input from the user decided in which form those arguments are to be supplied.

Here I will list the most basic (and useful) commands you can use in the console.

- `ls [directory]` - list files in the directory, if you need more details, use a flag `-la`, which essentialy shows all files with all details.
- `mv [source] [destination]` - move a file or directory from source to destination
- `cp [source] [destination]` - copy a file or directory from source to destination (same as `mv`, but leaves the original file in place)
- `rm [file]` - remove a file
- `mkdir [directory]` - create a directory
- `rmdir [directory]` - remove a directory
- `cd [directory]` - change directory
- `pwd` - print working directory
- `cat [file]` - print the contents of a file
- `echo [text]` - print text to the console
- `man [command]` - show the manual page for a command (a very useful command which we will be using)
- `nano [file]` - open a file in the nano text editor
- `vim [file]` - open a file in the vim text editor (if you wish to exit, press `Esc` then type `:q!` and press `Enter` ;) )
- `clear` - clear the console (useful if you have a lot of output and you want to see the top of the console)

Now, try to create a directory, with a name `hello`, inside it a directory `world`, and inside it a simple text file `hello.txt`. Then, print the contents of the file to the console.
Then go back to the home directory (this is done by running `cd` without any arguments), and remove the directory `hello` with all its contents.

You may notice, that a simple `rmdir` does not work.
```bash
jakub@server:~$ rmdir hello
rmdir: failed to remove 'hello': Directory not empty
```

Now, you utilise a flag `-r` which stands for recursive, which means that the command will remove all files and directories inside the directory you are trying to remove.
```bash
jakub@server:~$ rm -r hello
```

Now a little dangerous command, do not run this on your system under any circumstances (it will delete all files, that includes the operating system).
```bash
jakub@server:~$ rm -rf /
```
These 6 characters essentially mean: remove all files in the folder `/` (root folder), and do it recursively without asking for confirmation.

By comparison
```bash
jakub@server:~$ rm -rf ./
```

Removes all files in the current directory. See the difference?

There is a singular `.`, which essentially stands current directory. Two dots `..` stand for the parent directory.

So if we do a little magic:
```bash
jakub@server:~$ cd hello
jakub@server:/hello$ cd world
jakub@server:/hello/world$ cd ..
jakub@server:/hello$ cd ..
jakub@server:~$

jakub@server:~$ cd /home/jakub/hello/world
jakub@server:/hello/world$ cd
jakub@server:~$
```
Wow, you can now navigate a folder system without using the mouse!

### Writing to a first file

To create and write to a file, we can utilise many of command line text editors, most notably `nano` and `vim`.

```bash
jakub@server:~$ nano hello
```

You can now write anything into this file, close and save using `Ctrl+X`, then `Y` and `Enter`.

On the other hand, in vim

```bash
jakub@server:~$ vim world
```

Write anything to the file by pressing `i` (for insert), then `Esc` and `:wq` to save and exit.

For more rough overview, visit [osy.pages.fel.cvut.cz](https://osy.pages.fel.cvut.cz/docs/cviceni/lab1/vim/).

You can view what you have just saved by using `cat` command.

```bash
jakub@server:~$ cat hello
```

As you can see, our files have no extension. This is because Unix based systems do not rely on file extensions to determine the file type. The file type is determined by the file itself, and not by the extension. This is why you can have a file without an extension, and it will still work. While naming files with their correct extension is a good practise, it is sometimes better and of course quicker to create a file simply named `f`.

Yeah and about all that tedious writing we are doing? You can use `Tab` to autocomplete the thing you are just writing. Using $\uparrow$ and $\downarrow$ you can navigate through the history of commands you have written.