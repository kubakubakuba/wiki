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

### Running a program

To this point we have only run system commands, but what if we installed a program and we want to run it? What actually happens is that bash finds the program by that name in the directories listed in the `PATH` variable. This variable is a list of directories separated by `:`. You can view the `PATH` variable by running `echo $PATH`.

```bash
jakub@server:~$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
```

To know where the program is located, you can use the `which` command.

```bash
jakub@server:~$ which code
/usr/bin/code
jakub@server:~$ which nano
/usr/bin/nano
```

You now can run a program using `./program-name`, when you are in the same directory as the program. If you wish to run a program from anywhere, you can add it to the `PATH` variable.

```bash
jakub@server:~$ export PATH=$PATH:/home/jakub/hello
jakub@server:~$ world
Hello, world!
```
### Sudo

What is sudo? Sudo stands for SuperUser DO, and it is a command that allows you to run other commands as a superuser, or root. The superuser is a special user that has the power to do anything on the system. This includes installing and removing software, changing system settings, and more. The superuser is also known as the root user, because the root directory is the top-level directory in the filesystem.

```bash
jakub@server:~$ apt update
E: Could not open lock file /var/lib/apt/lists/lock - open (13: Permission denied)
jakub@server:~$ sudo apt update
[sudo] password for jakub:
```

### File extensions

As you can see, our files have no extension. This is because Unix based systems do not rely on file extensions to determine the file type. The file type is determined by the file itself, and not by the extension. This is why you can have a file without an extension, and it will still work. While naming files with their correct extension is a good practise, it is sometimes better and of course quicker to create a file simply named `f`.


### Little tip

Yeah and about all that tedious writing we are doing? You can use `Tab` to autocomplete the thing you are just writing. Using $\uparrow$ and $\downarrow$ you can navigate through the history of commands you have written.

## Linux distributions

After you logged in to the server via ssh, you may have seen that you have been greeted by `Ubuntu` instead of just `'Linux'`, what the hell is Ubuntu? To say it simply the name `'Linux'` is the name of the kernel, the heart of the operating system, while Ubuntu and others are distributions of the Linux operating system. A distribution is a version of the operating system that includes the kernel, system utilities, and other software. There are many different distributions of Linux, each with its own unique features and design.

The main difference between distributions is the package manager.

### Package manager

A package manager is a tool that is used to install, update, and remove software packages on a Linux system. This saves users a lot of hassle while installing applications that have been prepackaged by authors of said application (while it still sometimes can be a bit of a hassle).

#### Ubuntu / Debian

On Ubuntu (and Debian), the package manager is simply called apt.

```bash
jakub@server:~$ sudo apt update
```

Updates the list of available packages, and their versions, but does not install or upgrade any packages.

```bash
jakub@server:~$ sudo apt upgrade
```

Upgrades all of the installed packages to their latest versions.

```bash
jakub@server:~$ sudo apt install package
```

Installs a package.

```bash
jakub@server:~$ sudo apt remove package
```

Removes a package.

#### Arch Linux

The installing of a package could be a very different story, were you to be on a different `flavour` of Linux. For example, on `Arch` (if you managed to install it successfully), you would use `pacman` instead of `apt`.

```bash
jakub@server:~$ sudo pacman -Syu
jakub@server:~$ sudo pacman -S package
jakub@server:~$ sudo pacman -R package
```

You can also install packages from source, that you compile yourself during the installation process. For example using yay

```bash
jakub@server:~$ yay -S package
```

#### NixOS

On the other hand, for example `NixOS` (using [nixpkgs](https://search.nixos.org/packages) manager), you can not install packages directly, you rather create a virtual environment (a sandbox) where you can install the package. Or you rebuild the whole system with the package included - the whole system is *immutable* (unchangeable).

```bash
jakub@server:~$ nix-shell -p package
```

There is a way to do a more complex environment, but you will need to learn functional and highly esoterical programming language `Nix`.

*shell.nix:*


```nix
with import <nixpkgs> {};
	let
	pp = pkgs.python311Packages;
	in pkgs.mkShell rec{
		buildInputs = [
			maven
			jdk
			vscode-fhs
			pp.numpy
			pp.pandas
		];
		shellHook = ''
			exec zsh
		'';
	}
```

You then run it and use the packages installed in the environment created, without pollution of the system. This can save a lot of dependency hell.
```bash
jakub@server:~$ nix-shell
[nix-shell:~]$ mvn --version
```