/*
<javascriptresource>
  <name>BCM08> ToggleOpen_CloseGroup...</name>
  <category>BCM</category>
</javascriptresource>
*/
// code adjusted from: http://ps-scripts.com/bb/viewtopic.php?f=9&t=3235
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
	this script will close or open the selected leyerSets
  
Tested and works in photoshop versions: 
  CS4, CS5, CS6, CC, 
		in CS3 if the layerSet has a vector mask it will be deleted when closing the set 
		for all the versions it won't support the vector mask enabled and vector mask linked

	Use and/or modify at your own risk.
*/
////////////////////////////////////////////
#include mb_Utils.jsxinc
// app.togglePalettes();
app.activeDocument.suspendHistory("bcmToogleOpenCloseSet", "toogleOpenCloseSet()");
// app.togglePalettes();