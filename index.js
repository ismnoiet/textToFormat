#!/usr/bin/env node

var fs = require('fs')
Configuration = require('./configHandler'),
minimist = require('minimist'),
argv = minimist(process.argv.slice(2))

// listen for changes and then fire the apropriate eventListener
var config = new Configuration()
config.on('configuration-has-changed', function (attributeName) {
  config.updateConfig(attributeName)
})

var possibleConfig = ['Separator', 'FormatTable', 'CurrentFormat', 'Attributes'],
  getParam = argv.get,
  setParam = argv.set,
  valueParam = argv.value,
  srcParam = argv.file,
  toParam = argv.to,
  destParam = argv.dest

// check for configuration getters
if( (typeof (getParam) === 'string')) {
  if (possibleConfig.indexOf(getParam) !== -1) {
    console.log('the used ' + getParam + ' :')
    console.log(config['get' + getParam]())
  } else {
    console.log('wrong value of --get, the value must be in one of the following :  \n* Separator\n* FormatTable\n* CurrentFormat\n* Attributes')
  }
}

// check for configuration setters 
if (typeof (setParam) === 'string') {
  if ((possibleConfig.indexOf(setParam) !== -1) && typeof (valueParam) === 'string') {
    config['set' + setParam](valueParam)
  } else {
    console.log('wrong value of --set, the value must be in one of the following :  \n* Separator\n* FormatTable\n* CurrentFormat\n* Attributes')
  }
}

function read (filename) {
  fs.readFile(filename, function (err, data) {
    var dataLocal,
      dataArray // an array of arrays containting all the fields

    if (err) throw err
    dataArray = toArray(data.toString(), CONFIG.SEPARATOR)
    // console.log(dataArray)

    // console.log(toJSON(dataArray,CONFIG.ATTRIBUTES)); 
    // write('output.txt',toJSON(dataArray,CONFIG.ATTRIBUTES))

    // console.log(toXML(dataArray,CONFIG.ATTRIBUTES))

    // write('xml.txt',toXML(dataArray,CONFIG.ATTRIBUTES))
    // toXML(dataArray,CONFIG.ATTRIBUTES)

    // check for xml convertions 
    write('example/xml.txt', toXML(dataArray, CONFIG.ATTRIBUTES, 'user'))
    console.log(toXML(dataArray, CONFIG.ATTRIBUTES, 'user'))

  })
}

function write (filename, data) {
  fs.writeFile(filename, data, function (err) {
    if (err) throw err
    console.log('saved to ' + filename)
  })
}

function toArray (data, SEPARATOR) {
  var dataLocal,dataArray

  dataLocal = data.split('\n')
  dataArray = dataLocal.map(function (item) {
    return item.split(SEPARATOR)

  })

  return dataArray
}

function toJSON (data, attributes) {
  var JSONFormat

  JSONFormat = data.map(function (row) {
    var jsObject = {}

    // wil be replaced with .map for underscore or smething else where we can get the
    // index of the current element 
    // jsonrow = row.map(function(){

    // })

    // keep it as a js object 
    for (var i = 0;i < row.length;i++) {
      jsObject[attributes[i]] = row[i]
    }

    // convert the js object to a valid json object
    return JSON.stringify(jsObject)
  })

  return '[\n' + JSONFormat.join(',\n') + '\n]'
}

function toXML (data, attributes, tagName) {
  XMLFormat = data.map(function (row) {
    var newRow

    newRow = row.map(function (item, index) {
      // tow spaces here can be used as a parameter 
      var XMLElement = '  <' + attributes[index] + '>' + item + '</' + attributes[index] + '>\n'
      return XMLElement

    })

    // use the provided tagName or element instead
    tagName = tagName || 'element'

    newRow = newRow.join('')
    // add the opening and closing tagName wrapper 
    newRow = '<' + tagName + '>\n' + newRow + '</' + tagName + '>'
    return newRow

  }).join('\n')

  return XMLFormat
}
s
