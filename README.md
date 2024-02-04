Hello and welcome to File Manager!
We have different commands to work with your file system and even operation system.

You can star work with command

```
npm run start -- --username=your_username
```

**Commands**:

**up** - Go upper from current directory;

**cd** - Go to dedicated folder from current directory. After command you need to enter space and argument: it needs to be path to folder in absolute or relative format, e.g.

```
cd path_to_folder
```

or

```
cd /Users/some_user/Desktop/path_to_folder;
```

**ls** - Print in console list of all files and folders in current directory;

**cat** - Read file and print it's content in console. After command you need to enter space and argument: path to the file, e.g.

```
cat file.txt
```

or

```
cat /Users/some_user/file.txt;
```

**add** - Create empty file in current working directory. You can't create file with the file name that already exists in that directory. You need to enter space and name file after command, e.g.

```
add file.txt
```

**rn** - Rename file. You can't use name that some file in that folder has. You need to enter space and path to the file and new file name, separated by space, e.g.

```
rn old_name.txt new_name.txt
```

or

```
rn /Users/user_name/old_name.txt new_name.txt
```

**cp** - Copy file to dedicated destination. You need to enter space and file path and path to the folder you want to copy that file, separated by space. You can't copy it if file with the same name exists in that folder. You can use absolute and relative paths in different variations. Example:

```
cp file.txt folder
```

or

```
cp /Users/some_user/file.txt /Users/some_user/folder
```

**mv** - Move file to dedicated destination. You can't move file if in that folder there is file with the same name. After moving file to destination folder the file in his original directory will be removed. You need to enter space and file path and path to the folder you want to move that file, separated by space. You can use absolute and relative paths in different variations. Example:

```
mv file.txt folder_one/destination_folder
```

or

```
mv /Users/some_user/file.txt /Users/some_user/folder_one/destination_folder

```

**rm** - Delete file. You need to enter space and path to the file, e.g.

```
rm file.txt
```

or

```
rm /Users/some_user/file.txt
```

**os** - Print operation system info to the console. You need to enter space and one of following arguments in format

```
os --arg
```

- EOL - Get default system End-Of-Line and print it to console.
- cpus - Get host machine CPUs info and print it to console.
- homedir - Get home directory and print it to console.
- username - Get system username and print it to console.
- architecture - Get CPU architecture for which Node.js binary has compiled and print it to console.

**hash** - Calculate hash for file and print it into console. You need to enter space and path to file for which you want calculate hash, e.g.

```
hash file.txt
```

or

```
hash /Users/user_name/file.txt
```

**compress** - Compress file to the Bortli format (with extension .br). You need to enter space and path to file you want to compress and destination folder you want to have new archive, separated by space. You can't compress file to the folder that have archive with the same name. Example:

```
compress file.txt folder
```

or

```
compress /Users/user_name/file.txt /Users/user_name/folder
```

**decompress** - Decompress file from Bortli format (with extension .br). You need to enter space and path to archive (with .br extension) you want to decompress and to folder where you want to have decompressed file. You can't decompress file if this folder has file with the same name.
Example:
```
decompress archive.br folder
```
or
```
decompress /Users/some_user/archive.br /Users/some_user/folder