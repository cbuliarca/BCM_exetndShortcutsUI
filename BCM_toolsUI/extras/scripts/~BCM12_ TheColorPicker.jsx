/*
<javascriptresource>
  <name>BCM12> TheColorPicker...</name>
  <category>BCM</category>
</javascriptresource>
*/
// code modifyed from: http://forums.adobe.com/thread/487994?start=40&tstart=0 
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
        it's created just to be use with a keyboard shortcut.It opens the PhotoshopColorPicker
        when you for a Solid Color layer or when you have selected a normal layer for the 
        Foreground Color 
      
    Tested and works in photoshop versions: 
        CS3, CS4, CS5, CS6, CC
        In CS3 and CS4 for the Foreground Color it opens the System Color Picker
    
        Use and/or modify at your own risk.
*/
////////////////////////////////////////////
#target Photoshop
function colorPicker(){//obsolette
    // set starting color
var historyState = activeDocument.activeHistoryState;
    var startColor = app.foregroundColor;
var originalUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;
app.activeDocument.selection.select([[0,0],[1,0],[1,1],[0,1]]);
app.preferences.rulerUnits = originalUnits;
    // create colour layer
    CreateSolidLayer();
    // call the color picker
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( stringIDToTypeID( "contentLayer" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
    desc.putReference( charIDToTypeID( "null" ), ref );
    var modeDesc = new ActionDescriptor();
        var colorDesc = new ActionDescriptor();
            colorDesc.putDouble( charIDToTypeID( "Rd  " ), startColor.rgb.red );
            colorDesc.putDouble( charIDToTypeID( "Grn " ), startColor.rgb.green );
            colorDesc.putDouble( charIDToTypeID( "Bl  " ), startColor.rgb.blue );
        modeDesc.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), colorDesc );
    desc.putObject( charIDToTypeID( "T   " ), stringIDToTypeID( "solidColorLayer" ), modeDesc );
try{
    executeAction( charIDToTypeID( "setd" ), desc, DialogModes.ALL )
}catch(e){}
    // get user's color and set to forground color
    var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
    var desc = executeActionGet(ref)
    var adjList = desc.getList(stringIDToTypeID('adjustment'));
    var adjDesc = adjList.getObjectValue(0);
    var colorDesc = adjDesc.getObjectValue(stringIDToTypeID('color'));
    var Colour = new SolidColor();
        Colour.rgb.red = colorDesc.getDouble(charIDToTypeID('Rd  '));
        Colour.rgb.green = colorDesc.getDouble(charIDToTypeID('Grn '));
        Colour.rgb.blue = colorDesc.getDouble(charIDToTypeID('Bl  '));
    // restore
activeDocument.activeHistoryState = historyState;
  //  activeDocument.activeLayer.remove();
    app.foregroundColor = Colour;
    }

    function CreateSolidLayer() {

        var startColor = app.foregroundColor;
        var desc = new ActionDescriptor();
            var ref = new ActionReference();
            ref.putClass( stringIDToTypeID('contentLayer') );
        desc.putReference( charIDToTypeID('null'), ref );
            var desc1 = new ActionDescriptor();
                var desc2 = new ActionDescriptor();
                    var desc3 = new ActionDescriptor();
                    desc3.putDouble( charIDToTypeID('Rd  '), startColor.rgb.red );
                    desc3.putDouble( charIDToTypeID('Grn '), startColor.rgb.green );
                    desc3.putDouble( charIDToTypeID('Bl  '), startColor.rgb.blue );
                desc2.putObject( charIDToTypeID('Clr '), charIDToTypeID('RGBC'), desc3 );
            desc1.putObject( charIDToTypeID('Type'), stringIDToTypeID('solidColorLayer'), desc2 );
        desc.putObject( charIDToTypeID('Usng'), stringIDToTypeID('contentLayer'), desc1 );
        executeAction( charIDToTypeID('Mk  '), desc, DialogModes.NO );
};


function isSolidColor(){
	rr = app.activeDocument.activeLayer;
	xx = false;
	if(rr.kind == "LayerKind.SOLIDFILL"){xx = true};
	return xx;
}
function callColorPicker(stClr){
	    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( stringIDToTypeID( "contentLayer" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
    desc.putReference( charIDToTypeID( "null" ), ref );
    var modeDesc = new ActionDescriptor();
        var colorDesc = new ActionDescriptor();
            colorDesc.putDouble( charIDToTypeID( "Rd  " ), stClr[0] );
            colorDesc.putDouble( charIDToTypeID( "Grn " ), stClr[1] );
            colorDesc.putDouble( charIDToTypeID( "Bl  " ), stClr[2] );
        modeDesc.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), colorDesc );
    desc.putObject( charIDToTypeID( "T   " ), stringIDToTypeID( "solidColorLayer" ), modeDesc );
	try{
	    executeAction( charIDToTypeID( "setd" ), desc, DialogModes.ALL )
	}catch(e){}
}
function getFG(stClr){
        var desc = new ActionDescriptor();
            var ref = new ActionReference();
            ref.putEnumerated( charIDToTypeID( "capp" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
            var mDesc =  executeActionGet(ref);
            if(mDesc.hasKey(charIDToTypeID( "FrgC" ))){
                alert(mDesc.getObjectValue(charIDToTypeID( "FrgC" )).getDouble(charIDToTypeID("Rd  ")));
            }
}
function callColorPickerText(stClr){
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( stringIDToTypeID( "TxLr" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
    desc.putReference( charIDToTypeID( "null" ), ref );
    var modeDesc = new ActionDescriptor();
        var colorDesc = new ActionDescriptor();
            colorDesc.putDouble( charIDToTypeID( "Rd  " ), stClr[0] );
            colorDesc.putDouble( charIDToTypeID( "Grn " ), stClr[1] );
            colorDesc.putDouble( charIDToTypeID( "Bl  " ), stClr[2] );
        modeDesc.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), colorDesc );
    desc.putObject( charIDToTypeID( "T   " ), stringIDToTypeID( "Txtt" ), modeDesc );
    try{
        executeAction( charIDToTypeID( "setd" ), desc, DialogModes.ALL )
    }catch(e){alert(e);}
}
function getSolidColors(){
	var R = 0;
	var G = 0;
	var B = 0;
    	var ref = new ActionReference();
    	ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
    var desc= executeActionGet( ref );
    if(desc.hasKey(charIDToTypeID("Adjs"))){
    	R = desc.getList(charIDToTypeID("Adjs")).getObjectValue( 0 ).getObjectValue(charIDToTypeID("Clr ")).getDouble(charIDToTypeID("Rd  "));
    	G = desc.getList(charIDToTypeID("Adjs")).getObjectValue( 0 ).getObjectValue(charIDToTypeID("Clr ")).getDouble(charIDToTypeID("Grn "));
    	B = desc.getList(charIDToTypeID("Adjs")).getObjectValue( 0 ).getObjectValue(charIDToTypeID("Clr ")).getDouble(charIDToTypeID("Bl  "));
    }
    return [R,G,B];
}
function isChannelMaskSelected(){
    var ret = false;
    if(hasMask() == true){
        if(getChannelMaskSel() == true)
        {
            ret = true;
        }
    else{ret = false}
    }
    return ret;
};
function hasMask(){
        var hasMask = false;

        var ref = new ActionReference();
        var keyHasMask = app.stringIDToTypeID( 'hasUserMask' );
        ref.putEnumerated( app.charIDToTypeID( 'Lyr ' ), app.charIDToTypeID( 'Ordn' ), app.charIDToTypeID( 'Trgt' ) );
        var desc = executeActionGet( ref );
        if ( desc.hasKey( keyHasMask ) ) {
            hasMask = true;
        }
    return hasMask;
}
function getChannelMaskSel(){
    var ref = new ActionReference();
    ref.putProperty( charIDToTypeID( 'Prpr' ), stringIDToTypeID('numberOfChannels') );
    ref.putEnumerated( charIDToTypeID( "Dcmn" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
    var desc = executeActionGet(ref);
    var numberOfChannels = desc.getInteger(stringIDToTypeID('numberOfChannels'));
    var ref = new ActionReference();
    ref.putProperty( charIDToTypeID( 'Prpr' ), stringIDToTypeID( 'targetChannels' ) );
    ref.putEnumerated( app.charIDToTypeID( 'Lyr ' ), app.charIDToTypeID( 'Ordn' ), app.charIDToTypeID( 'Trgt' ) );
    var desc = executeActionGet( ref );
    var list = desc.getList( stringIDToTypeID( 'targetChannels' ) );
    var firstIndex = list.getReference(0).getIndex();
    return list.count == 1 && firstIndex == numberOfChannels+1;
}
function selectChannelMask(visible){
  try {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated( charIDToTypeID( "Chnl" ), charIDToTypeID( "Chnl" ), charIDToTypeID( "Msk " ) );
    desc.putReference( charIDToTypeID( "null" ), ref );
    desc.putBoolean( charIDToTypeID( "MkVs" ), visible );
    executeAction( charIDToTypeID( "slct" ), desc, DialogModes.NO );
    return true;
  } catch (e) { return false;}
};
function hexToRgb(hex) {
    hex1 = hex.substring(0,2);
    hex2 = hex.substring(2,4);
    hex3 = hex.substring(4,6);
    
    var rgb = {r:0, g:0, b:0};
    
    rgb.r =parseInt(hex1, 16);
    rgb.g =parseInt(hex2, 16);
    rgb.b =parseInt(hex3, 16);
    return rgb;
}
function rgbToHex(color) {
    hexStr = "";
    rH = color.rgb.red.toString(16).length < 2?"0"+color.rgb.red.toString(16):color.rgb.red.toString(16)
    gH = color.rgb.green.toString(16).length < 2?"0"+color.rgb.green.toString(16):color.rgb.green.toString(16)
    bH = color.rgb.blue.toString(16).length < 2?"0"+color.rgb.blue.toString(16):color.rgb.blue.toString(16)
    hexStr += rH;
    hexStr += gH;
    hexStr += bH;
    return hexStr;
}
function appCP(){//this is beacause the function app.showColorPicker() works only in cs5 and above
    try{app.showColorPicker()}
    catch(err){
        var startColor = app.foregroundColor;
        ss = ("0x"+rgbToHex(startColor));
        var resCol = $.colorPicker(ss);
        
        //set the foregroundColor:
        app.foregroundColor.rgb.red = hexToRgb(resCol.toString(16)).r;
        app.foregroundColor.rgb.green = hexToRgb(resCol.toString(16)).g;
        app.foregroundColor.rgb.blue = hexToRgb(resCol.toString(16)).b;
    }
}

function main(){
    if(app.documents.length != 0)
    {
        if(isSolidColor()){
            if(isChannelMaskSelected()){
                appCP();
            }else{
                callColorPicker(getSolidColors())
            }
        }
        else{appCP()};
    }else{appCP()}
}
main();