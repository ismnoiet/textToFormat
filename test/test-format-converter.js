var assert = require('chai').assert;
var formatConverter = require('../formatConverter');

describe('Format Converter',function(){
	it('should convert string to Array',function(){
		assert.deepEqual(formatConverter.toArray('fname,age',','),[['fname','age']]);
		assert.deepEqual(formatConverter.toArray('fname1,age1\nfname2,age2',','),[['fname1','age1'],['fname2','age2']]);
		assert.deepEqual(formatConverter.toArray('fname,age',''),[['fname,age']]);
		assert.deepEqual(formatConverter.toArray('',''),[]);
		assert.deepEqual(formatConverter.toArray('',','),[]);			


	})

	it('Should convert string to JSON',function(){

	})
	it('Should convert string to XML',function(){
		assert.equal(formatConverter.toXML('data','attributes','element'),'');
	})	
});
