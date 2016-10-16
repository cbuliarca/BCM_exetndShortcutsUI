#include "../../_main/extras/_libs/infoWin.jsxinc"
/*
	this script creates the notifiers for the maic wand uses. Jut open 
	File>Scripts>Script Events Manger to see z1them.
	After adding these notifiers on each use of the magic wand the ~getEventMagicWand.jsx
	will be triggered then
	if the user has the key Accent(`) pressed the script will select area from the defined hotLayer if not 
	the magic wand will work like it suposed to. The user can also use the Alt or Shift to substarct or add to selection.
	Also if the user press the Divide key and clicks with the magic wand selecte anywhere on the document 
	it will set the selected layer as a hotLayer
	Pressing CapsLock when clicking with the magic wand the user can toggle visibilty for the hotLayer
*/

function toogle_EventsBCM_MagicWand(){

	var theFile = new File(File($.fileName).path +"/~getEventMagicWand.jsx");

	var tgl = 'add';
	var message = 'Events created';
	var i = 0;
	while(true){// remove only events with ~getEventMagicWand.jsx file
		if(i < app.notifiers.length){
			var ntf = app.notifiers[i];
			if(ntf.eventFile.name == '~getEventMagicWand.jsx'){
				// alert(ntf.event);
				ntf.remove();
				tgl = 'remove';
				message = 'Events removed';
				i--;
			}
		}else{
			break;
		}
		i++;
	}

	if (tgl == 'add'){
		try{app.notifiers.add("setd", theFile, "Chnl")}catch(e){};
		try{app.notifiers.add("SbtF", theFile, "Chnl")}catch(e){};
		try{app.notifiers.add("AddT", theFile, "Chnl")}catch(e){};
		if(app.notifiersEnabled == false){
			notifiersEnabled = true;
		}
	}
	bcm_infoWin0(message, {x:0, y:0}, 7);
}