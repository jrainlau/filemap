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

const traverseFiles = (path, deep) => {
  let files = fs.readdirSync(path)
  let con = false
  for (let i = 0, len = files.length; i < len; i++) {
    files[i] !== 'filemap.js'? console.log(placeHolder(deep), files[i], '\n'): false
    ignoreCase.indexOf(files[i]) !== -1? con = false: con = true
    files[i].split('.')[1] === undefined && con? traverseFiles(path + '\\' + files[i], deep + 1): false
  }
}

traverseFiles('./', 1)

process.exit()