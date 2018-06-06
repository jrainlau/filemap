## Introduce
`filemap.js` is a tool for creating files structure tree map. It's light, fast, and clever. It helps you to creat a files structure tree map automatically by one line of command.

if -d dir contains .gitignore, the script will read it and add lines to ignore configure.

## Usage && Example
```
npm install filemap.js -g

filemap
```

And you will get a files structure tree map like this
```
The files tree is:
=================

  |__ empty.js
  |__ folder1
    |__ folder-inside.md
  |__ folder2
    |__ inside1
      |__ 5555.txt
    |__ inside2
      |__ hello.txt
      |__ staff
        |__ test.txt
  |__ some.html
  |__ TEST
    |__ xxx
  |__ test.md
```

## Options
```
node tree.js -d ./project/ -i node_modules .DS_Store .dist > tree.text
```
- -d: Read from dir.
- -i: In order to ignore some folders which contains lots of files and folders, such as `node_modules` etc, you could use this command to avoid them to be unfolded. Use blank to split each `folder-name`.

## Update
Set the `filemap.js` into global command.

## License
MIT
