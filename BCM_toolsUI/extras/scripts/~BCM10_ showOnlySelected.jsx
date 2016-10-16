/*
<javascriptresource>
  <name>BCM10> showOnlySelected...</name>
  <category>BCM</category>
</javascriptresource>
*/
////////////////////////////////////////////
/*
Author: Buliarca Cristian (buliarca@yahoo.com)
Copyright (C) 2013 Buliarca Cristian
http://buliarca.blog124.fc2.com/
http// http://ps-scripts.com/bb/viewtopic.php?f=9&t=3235://buliarcatools.blog.fc2.com/

Installation:
  Close Photoshop
  and copy the script in your Photoshop scripts folder:
  
  "c:\Program Files\Adobe\Adobe Photoshop CS5 (64 Bit)\Presets\Scripts"
   for osx:
  "/Applications/Adobe Photoshop CS6/Presets/Scripts/"
  
  Then restart Photoshop and you will see the scripts in the File>Scripts menu

Version: 1.0

Function:
	this script will take the first selected layer's visibility and will toggle the visibility for
	it and for the other selected layers
  
Tested and works in photoshop versions: 
  	CS4, CS5, CS6, CC

	Use and/or modify at your own risk.
*/
////////////////////////////////////////////
#include mb_Utils.jsxinc
app.activeDocument.suspendHistory("bcmShowOnlySelected", "showOnlyThis()");
// showOnlyThis();