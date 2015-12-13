#!/usr/bin/env node
var Promise = require('bluebird'),
  fs = Promise.promisifyAll(require('fs')),
  Configuration = require('./configHandler'),
  converter = require('./formatConverter'),
  minimist = require('minimist'),
  argv = minimist(process.argv.slice(2))

// listen for a configuration change then fire the apropriate eventListener
var config = new Configuration()
config.on('configuration-has-changed', function (attributeName) {
  config.updateConfig(attributeName)
})

var possibleConfig = ['Separator', 'FormatTable', 'CurrentFormat', 'Attributes','Default'],
  formatTable = config.getFormatTable(),
  getParam = argv.get,
  setParam = argv.set,
  valueParam = argv.value,
  srcParam = argv.src,
  toParam = argv.to,
  destParam = argv.dest

// check for configuration getters
getParam = toTitleCase(getParam)
if( (typeof (getParam) === 'string')) {
  if (possibleConfig.indexOf(getParam) !== -1) {
    console.log('the used ' + getParam + ' :')
    console.log(config['get' + getParam]())
  } else {
    console.log('wrong value of --get, the value must be in one of the following :  \n* Separator\n* FormatTable\n* CurrentFormat\n* Attributes')
  }
}

// check for configuration setters 
setParam = toTitleCase(setParam)

if (typeof (setParam) === 'string') {
  if ((possibleConfig.indexOf(setParam) !== -1) && typeof (valueParam) === 'string') {
    // if Attributes, change string to an array of strings 
    if (setParam === 'Attributes') {
      valueParam = valueParam.toString().split(',')
      console.log(valueParam)
    }

    config['set' + setParam](valueParam)
  } else {
    console.log('wrong value of --set, the value must be in one of the following :  \n* Separator\n* FormatTable\n* CurrentFormat\n* Attributes')
    console.log('if your don\'t have the previous problem then VERIFY that the value of --value');   
  }
}

// return a promise object that can be used later on 
function read (filename) {
  var readPromise = fs.readFileAsync(filename)
  return readPromise
}

// Convert plain text to a usable array 
function getFileContent (data) {
  var dataArray // an array of arrays containting all the fields

  // set the default separator 
  config.setSeparator(' ')
  dataArray = converter.toArray(data.toString(), config.getSeparator())
  return dataArray
}

function write (filename, data) {
  fs.writeFile(filename, data, function (err) {
    if (err) throw err
    console.log('saved to ' + filename)
  })
}

function toTitleCase (str) {
  if (typeof (str) === 'string' && str.length > 0) {
    return str[0].toUpperCase() + str.substr(1, str.length - 1)
  }
}

function fileExists (filePath) {
  try {
    return fs.statSync(filePath).isFile()
  } catch (err) {
    return false
  }
}

// here we manage all the fancy stuff 
 
if (typeof (srcParam) === 'string' && fileExists(srcParam)) {
  // check that the desired format already exists in our formataTable variable
  if (formatTable.indexOf(toParam.toUpperCase()) != -1) {
    // file is ready to be read , TODO verify that ther source file is not empty
    // this is used when want to use the retrieved from the file 

    console.log('data after convertion : ')

    read(srcParam).then(function (data) {
      var dataArray = getFileContent(data),
        dataAfterConversion = converter['to' + toParam.toUpperCase()](dataArray, config.getAttributes())
      write(destParam, dataAfterConversion)
      console.log(dataAfterConversion)
    })

  } else {
    console.log(' Trying to use unknown format ')
  }

} else if (typeof (srcParam) === 'string' && !fileExists(srcParam)) {
  // the src file doesn't exist
  console.log("the src file doesn't exist")
}



