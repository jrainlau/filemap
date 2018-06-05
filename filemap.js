#!/usr/bin/env node

/**
 * @author Jrain Lau
 * @email jrainlau@163.com
 * @date 2016-07-14
 */ 

'use strict'
const fs = require('fs');

String.prototype.trim = function (char, type) {
    if (char) {
        if (type == 'left') {
            return this.replace(new RegExp('^\\'+char+'+', 'g'), '');
        } else if (type == 'right') {
            return this.replace(new RegExp('\\'+char+'+$', 'g'), '');
        }
        return this.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};

// dir configure
let findPath = null;
if(process.argv[2] === '-d' && process.argv[3]){
    findPath = process.argv[3];
} else {
    console.log('\n\nPath Arg Invalid\n\n');
    process.exit();
}

let ignoreCase = {}
if(process.argv[4] === '-i'){
    for (let i of process.argv.slice(5)) {
      ignoreCase[i] = true
    }
}

// read git ignore
const ignFile = `${findPath}/.gitignore`;
if(fs.existsSync(ignFile)) {
    ignoreCase['.git'] = true; // ignore .git
    const ignText = fs.readFileSync(ignFile, 'utf8');
    const lines = ignText.split('\n');
    lines.forEach((line) => {
        if (line.length && line.indexOf('#') !== 0){
            ignoreCase[line.trim('/')] = true;
        }
    });
}

// console.log('\n\nIgnore: \n\n');
// console.log(JSON.stringify(ignoreCase));
console.log('\n\nThe files tree is:\n=================\n\n');

const placeHolder = (num) => {
  if (placeHolder.cache[num]) return placeHolder.cache[num] + '|__'
  placeHolder.cache[num] = ''
  for (let i = 0; i < num; i++) {
    placeHolder.cache[num] += '  '
  }
  return placeHolder.cache[num] + '|__'
}
placeHolder.cache = {}

let isDic = (url) => fs.statSync(url).isDirectory()

const traverseFiles = (path, deep) => {
  let files = fs.readdirSync(path)
  let con = false
  for (let i = 0, len = files.length; i < len; i++) {
    con = ignoreCase[files[i].trim('/')] === undefined? true: false;
    if(con) console.log(placeHolder(deep), files[i]); // if ignored, don't show it
    let dirPath = path + '/' + files[i];
    if (isDic(dirPath) && con) traverseFiles(dirPath, deep + 1)
  }
}

traverseFiles(findPath, 1)

process.exit();
