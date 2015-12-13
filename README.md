# textToFormat
A Nodejs Package to Convert any Plain text file to the X format(JSON,XML,SQL,CSV)

![alt tag](https://github.com/ismnoiet/textToFormat/blob/master/how.png)


## Configuration
#### Note :
**Configuration is Case sensitive so be careful when writing configuration**

### Configuration Getters :
```
textToFormat --get Separator
```
```
textToFormat --get Attributes
```
```
textToFormat --get CurrentFormat
```
```
textToFormat --get FormatTable
```
```
textToFormat --get Default  // to get an object of the default configuration  
```

### Configuration Setters
Here are some example of using setters :

```
textToFormat --set Separator --value new_separator
```
```
textToFormat --set Attributes --value attributeName1,attributeName2,etc
```
```
textToFormat --set CurrentFormat XML
```

## Convertion
In order to convert a text file to a standard Format(JSON,XML,CSV),
we have to :

1) Specify first the **source** text file(the ``--src`` parameter)

2) Specify the **format** to convert to (the ``--to`` parameter)

3) Specify the **destination** file to save the converted data to (the ``--dest``  parameter), if the destination file doesn't exist
it will be created otherwise overwritten


### Example

**A JSON example :**

```
textToFormat --src source.txt --to json --dest output.json
```

**An XML example :**

```
textToFormat --src source.txt --to xml --dest output.xml
```
