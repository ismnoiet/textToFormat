var fs = require('fs'),
  util = require('util'),
  EventEmitter = require('events'),
  CONFIG = require('./config.json')

function Configuration () {
  EventEmitter.call(this)
}
util.inherits(Configuration, EventEmitter)

Configuration.prototype.setSeparator = function (newSeparator) {
  CONFIG.SEPARATOR = newSeparator
  this.emit('configuration-has-changed', 'Separator')
},
Configuration.prototype.setCurrentFormat = function (newFormat) {
  CONFIG.CURRENT_FORMAT = newFormat
  this.emit('configuration-has-changed', 'CurrentFormat')
},
Configuration.prototype.setAttributes = function (attributes) {
  CONFIG.ATTRIBUTES = attributes
  this.emit('configuration-has-changed', 'Attributes')
},
Configuration.prototype.getSeparator = function (newSeparator) {
  return CONFIG.SEPARATOR
},
Configuration.prototype.getCurrentFormat = function (newFormat) {
  return CONFIG.CURRENT_FORMAT
},
Configuration.prototype.getAttributes = function (attributes) {
  return CONFIG.ATTRIBUTES
},
Configuration.prototype.getFormatTable = function (attributes) {
  return CONFIG.FORMAT_TABLE
},
Configuration.prototype.getDefault = function (attributes) {
  return CONFIG.DEFAULT
},
Configuration.prototype.updateConfig = function (attributeName) {
  var configJSON = JSON.stringify(CONFIG, null, '  ')
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
