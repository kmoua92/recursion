// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var result = "";
  var type = typeof obj; // determine data type of argument passed
  var addDoubQuotes = function(item){return '"' + item + '"'};
  var addSingQuotes = function(item){return "'" + item + "'"};
  var typeMethods = {
  	'string': function(str){return addDoubQuotes(str);},
  	'number': function(num){return num},
  	'boolean': function(bool){return bool;},
  	'null': function(nul){return addSingQuotes(nul);},
  	'undefined': function(){return undefined;},
  	'function': function(){return undefined;}
  };
  // if argument passed is an array
  	if (Array.isArray(obj)){
		result += "[";
		for (var i = 0; i < obj.length; i++) {
	  		// check for undefined or a function
	  		if (typeof obj[i] === 'undefined' || typeof obj[i] === 'function') { 
	  			result += (null);
	  			// check if comma needed
	  			if (i !== obj.length - 1) { 
	  				result += ",";
	  			}
	  			continue;
	  		} else{
	  			result += stringifyJSON(obj[i]);
	  			// check current element is not the last element
	  			if (i !== obj.length - 1) { 
	  				result += ",";
	  			}
	 			continue;
	  		}		  	
	  	}
		
  		result += "]";
  // if argument passed is an object but not an array
  	} else if (type === 'object'){
  		// check for empty object
  		if (!obj) { 
	  		result += null;		  	
	  	} else {	  		
	  		result += "{";
		  	for (var key in obj) {
		  		// check for undefined or a function
		  		if (typeof obj[key] === 'undefined' || typeof obj[key] === 'function'){ 
		  			continue;
		  		} else {
		  			// stringify key
		  			result += ('"' + key + '":'); 
		  			result += stringifyJSON(obj[key]);
		  			var objKeys = Object.keys(obj);
		  			// check current key is not the last key
		  			if (objKeys.indexOf(key) < objKeys.length - 1) { 
		  				result += ",";
		  			}
		  		}
		  	}
		  	result += "}";	
	  	}
  // if argument passed is not a collection (base case)
  	} else {
  		result += typeMethods[type](obj);
  	}
  	return result;
};
