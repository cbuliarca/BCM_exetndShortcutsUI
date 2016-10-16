/*
<javascriptresource>
  <name>BCM11> ToggleMask...</name>
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
    it's created just to be use with a keyboard shortcut. First it selects the RGB channels
    of the layers, then it selects the Mask and last it shows the mask(just like Alt clicking on
    the mask in the layers palette)
  
Tested and works in photoshop versions: 
    CS3, CS4, CS5, CS6, CC

    Use and/or modify at your own risk.
*/
////////////////////////////////////////////
//http://forums.adobe.com/thread/1224809?tstart=0
//modied to make a toogle beween rgb>select mask >make visible mask with the help of Michael Hale
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
        // var keyHasMask = app.stringIDToTypeID( 'hasUserMask' );
        var keyHasMask = app.charIDToTypeID( 'UsrM' );
        ref.putEnumerated( app.charIDToTypeID( 'Lyr ' ), app.charIDToTypeID( 'Ordn' ), app.charIDToTypeID( 'Trgt' ) );
        var desc = executeActionGet( ref );
        if ( desc.hasKey( keyHasMask ) ) {
            hasMask = true;
        }
    return hasMask;
}
function selectComponentChannel() {
    try{
        var map = {}
        map[DocumentMode.GRAYSCALE] = charIDToTypeID('Blck');
        map[DocumentMode.RGB] = charIDToTypeID('RGB ');
        map[DocumentMode.CMYK] = charIDToTypeID('CMYK');
        map[DocumentMode.LAB] = charIDToTypeID('Lab ');
        var desc = new ActionDescriptor();
            var ref = new ActionReference();
            ref.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), map[app.activeDocument.mode] );
        desc.putReference( charIDToTypeID('null'), ref );
        executeAction( charIDToTypeID('slct'), desc, DialogModes.NO );
    }catch(e){}
};
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
function getChannelMaskVis(){
    var isVisible = false;

        var ref = new ActionReference();
        var keyVisChannels = app.stringIDToTypeID( 'visibleChannels' );
        ref.putEnumerated( app.charIDToTypeID( 'Lyr ' ), app.charIDToTypeID( 'Ordn' ), app.charIDToTypeID( 'Trgt' ) );
        var desc = executeActionGet( ref );
        if ( desc.hasKey( keyVisChannels ) ) {
            list = desc.getList(keyVisChannels);
            // alert("kas key");
            // alert(desc.getType(keyVisChannels));
            // alert(list.count);
            if(list.count > 1)
            {
                isVisible = false;
            }
            else{isVisible = true}
        }
    return isVisible;
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
function toggleChannelMask(){
    var maskSelected = isChannelMaskSelected();
    if(maskSelected == true){
        if(getChannelMaskVis() == true)
        {
            selectComponentChannel();
        }else{selectChannelMask(true)};
    }else{
          selectChannelMask(false);
    }
};
toggleChannelMask();