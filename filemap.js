/**
 * @author Jrain Lau
 * @email jrainlau@163.com
 * @date 2016-07-14
 */
 
'use strict'
const fs = require('fs')

let ignoreCase = {}
if(process.argv[2] === '-i'){
    for (let i of process.argv.slice(3)) {
      ignoreCase[i] = true
    }
}

console.log('\n\nThe files tree is:\n=================\n\n')

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
    if (files[i] !== 'filemap.js') console.log(placeHolder(deep), files[i], '\n')
    con = ignoreCase[files[i]] === undefined? true: false
    let dirPath = path + '\\' + files[i]
    if (isDic(dirPath) && con) traverseFiles(dirPath, deep + 1)
  }
}

traverseFiles('./', 1)

process.exit()