var fs = require('fs'),
  util = require('util'),
  EventEmitter = require('events'),
  config = require('./config.json')

function Configuration () {
  EventEmitter.call(this)
}
util.inherits(Configuration, EventEmitter)

Configuration.prototype.setSeparator = function (separator) {
  config.separator = separator
  this.emit('configuration-has-changed', 'separator')
},
Configuration.prototype.setCurrentFormat = function (format) {
  config.currentFormat = format.toUpperCase();
  this.emit('configuration-has-changed', 'currentFormat')
},
Configuration.prototype.setAttributes = function (attributes) {
  config.attributes = attributes
  this.emit('configuration-has-changed', 'attributes')
},
Configuration.prototype.setTagName = function (newTagName) {
  config.tagName = newTagName
  this.emit('configuration-has-changed', 'tagName')
},
Configuration.prototype.getSeparator = function () {
  return config.separator
},
Configuration.prototype.getCurrentFormat = function () {
  return config.currentFormat
},
Configuration.prototype.getAttributes = function () {
  return config.attributes
},
Configuration.prototype.getFormatTable = function () {
  return config.formatTable
},
Configuration.prototype.getDefault = function () {
  return config.default
},
Configuration.prototype.getTagName = function () {
  return config.tagName
},
Configuration.prototype.updateConfig = function (attributeName) {
  var configJSON = JSON.stringify(config, null, '  ')
  fs.writeFile('./config.json', configJSON, function (err) {
    if (err) throw err
    console.log('"' + attributeName + '" was updated successfully')
  })
}

module.exports = Configuration

// example 
// var con =  new Configuration()
// con.on('configuration-has-changed',function(){
//  con.updateConfig()
// })
// con.setSeparator('test')
