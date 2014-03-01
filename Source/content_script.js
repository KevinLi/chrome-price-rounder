var pricing_regex = /\b(\d+)\.(\d\d)\b/g;

document.onreadystatechange = function() {
	if (document.readyState != "loading") {
		walk(document.body);
	}
}

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	var v = textNode.nodeValue;
	var match = pricing_regex.exec(v);
	if (match != null) {
		if (match[2] >= "95") {
			v = "$"+(parseInt(match[1])+1).toString()+".00";
		}
	}
	textNode.nodeValue = v;
}
