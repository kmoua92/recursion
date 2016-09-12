// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  // your code here
  
	var results = [];

	var searchForClass = function(element) {

		// array of classes for the current element
		var currentClasses = element.classList;

		// array of current element's children
		var childNodes = element.childNodes;	
		
		// check if current element has target className
		for (var i = 0; i < currentClasses.length; i++) {
			if (currentClasses[i] === className) {
				results.push(element);
			}
		}

		// recursively call function on each child node of current element
		for (var i = 0; i < childNodes.length; i++) {
			// check to make sure child node is an element (and not at text node)
			if (childNodes[i].nodeType === 1) {
				searchForClass(childNodes[i]);
			} else {
				continue;
			}
		}
	}

	// call recursive function
	searchForClass(document.body);
	
	return results;


};