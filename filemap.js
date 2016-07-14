/**
 * @author Jrain Lau
 * @email jrainlau@163.com
 * @date 2016-07-14
 */
 
'use strict'
const fs = require('fs')
let ignoreCase = []
if(process.argv[2] === '-i'){
    ignoreCase = process.argv.slice(3)
}

console.log('\n\nThe files tree is:\n=================\n\n')

const placeHolder = (num) => {
  let mark = ''
  for (let i = 0; i < num; i++) {
    mark += '  '
  }
  return mark + '|__'
}

let isDic = (url) => fs.statSync(url).isDirectory()

const traverseFiles = (path, deep) => {
  let files = fs.readdirSync(path)
  let con = false
  for (let i = 0, len = files.length; i < len; i++) {
    if (files[i] !== 'filemap.js') console.log(placeHolder(deep), files[i], '\n')
    con = ignoreCase.indexOf(files[i]) === -1? true: false
    let dirPath = path + '\\' + files[i]
    if (isDic(dirPath) && con) traverseFiles(dirPath, deep + 1)
  }
}

traverseFiles('./', 1)

process.exit()