function toArray (data, SEPARATOR) {
  var dataLocal,dataArray

  dataLocal = data.split('\n')
  if(!data){
    return [];
  }
  if(!SEPARATOR){
    return [dataLocal];
  }
  
  return dataLocal.map(function (item) {
    return item.split(SEPARATOR)

  })
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

  return '[\n  ' + JSONFormat.join(',\n  ') + '\n]'
}

function toXML (data, attributes, tagName) {
    XMLFormat = data.map(function (row) {
    var newRow;

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

module.exports = {
  toArray: toArray,
  toJSON: toJSON,
  toXML: toXML,
}
