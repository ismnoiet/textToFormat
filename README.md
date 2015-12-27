# textToFormat
A Nodejs Package to Convert any Plain text file to the X format(JSON,XML,SQL,CSV)

![alt tag](https://github.com/ismnoiet/textToFormat/blob/master/how.png)

## Installation
```
npm install -g text-to-format
```
**Note : ** In some computers you need to be an administrator,
in this case use sudo before the previous command

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

```
textToFormat --src source.txt --to xml --dest output.xml
```
