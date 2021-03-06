[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
# textToFormat
A Node.js Package to Convert any Plain text file to the X format(JSON,XML,SQL,CSV).

![alt tag](https://raw.githubusercontent.com/ismnoiet/textToFormat/master/how.png)

## Installation
```
npm install -g text-to-format
```
**Note :** In some computers you need to be an administrator,
in this case add ``sudo`` before the previous command.

## Configuration

### Configuration Getters :
```
textToFormat --get separator
```
```
textToFormat --get sttributes
```
```
textToFormat --get currentFormat
```
```
textToFormat --get formatTable
```
```
textToFormat --get default  // to get an object of the default configuration  
```
```
textToFormat --get tagName
```

### Configuration Setters
Here are some example of using setters :

```
textToFormat --set separator --value new_separator
```
```
textToFormat --set attributes --value attributeName1,attributeName2,etc
```
```
textToFormat --set currentFormat XML
```
```
textToFormat --set tagName user
```

## Convertion
In order to convert a text file to a standard Format(JSON,XML,CSV),
we have to :

1) Specify first the list of attributes, for example username,email,password
```
textToFormat --set attributes --value username,email,password
```

2) Then specify the **source** text file(the ``--src`` parameter)

3) Specify the **format** to convert to (the ``--to`` parameter)

3) Specify the **destination** file to save the converted data to (the ``--dest``  parameter), if the destination file doesn't exist it will be created otherwise overwritten

### Example

**A JSON example :**

```
textToFormat --set attributes --value username,email,password
```

```
textToFormat --src source.txt --to json --dest output.json
```

**An XML example :**

```
textToFormat --set attributes --value username,email,password
```

**Important:** *for XML we can set the tagName of the wrapper element, otherwirse the default tagName wrapper is used( by default it is 'element')*

```
textToFormat --set tagName --value user
```

```
textToFormat --src source.txt --to xml --dest output.xml
```
