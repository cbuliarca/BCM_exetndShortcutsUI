#include "../../_main/extras/_libs/layerIdAM.jsxinc"
#include "../../_main/extras/_libs/metadata.jsxinc"

/*
  this script is triggered by the eventListener when the user uses the magicwand to select some area,
  if the user has the key Accent(`) pressed then the script will select area from the defined hotLayer if not 
  the magic wand will work like it suposed to. The user can also use the Alt or Shift to substarct or add to selection.
*/

try {
    if (arguments.length >= 2) {
    var desc = arguments[0];
    var event = arguments[1];
    // alert(typeIDToCharID(event));//"AddT", "SbtF"
    // alert(desc.count);
    // for(i=0;i<desc.count;i++){
    //   alert(typeIDToCharID(desc.getKey(i)));
    // }

    if(typeIDToCharID(desc.getKey(0)) == 'null'){
      var ref = desc.getReference(desc.getKey(0));
      var theRefClass = typeIDToStringID(ref.getDesiredClass());
      if(theRefClass == "channel"){//if it's a selection channel
        if(typeIDToCharID(desc.getKey(1)) == "T   "){//if the second key is To it means that there is a object
          if(desc.getType(charIDToTypeID("T   ")) == DescValueType.OBJECTTYPE){// if it's an object type and not enumerated
            // enumerated its' for deselecting
            if(typeIDToCharID(desc.getObjectType(charIDToTypeID("T   "))) == "Pnt "){
              var theTDesc = desc.getObjectValue(charIDToTypeID("T   "));//the to action descriptor
              // if it's a point it means that the magic wand was used by the user
              // now get the points 
              if(typeIDToCharID(theTDesc.getKey(0)) == "Hrzn"){
                var theHRZN = theTDesc.getUnitDoubleValue(charIDToTypeID("Hrzn"));
                if(typeIDToCharID(theTDesc.getKey(1)) == "Vrtc"){
                  var theVRTC = theTDesc.getUnitDoubleValue(charIDToTypeID("Vrtc"));
                  var theTlrn = desc.getInteger(charIDToTypeID( "Tlrn" ));
                  var theCntgous = desc.hasKey(charIDToTypeID( "Cntg" ))?false:true;
                  

                  if(processHotKeys() == 'Accent' ){// this will hapen only if the Accent key is pressed 
                    // on versions smaller then CC this will happen auotomaticaly if the events are on
                    //get the current selected layers 
                    var selL = getSelectedLayersIdsMore();
                    var wndSpeciaLayers = getSpecialLayersIDsFromDocMetadata( "BCM_MagicWandSpecialLayers" );
                    if(wndSpeciaLayers == ''){
                        toConfirm( "Set", true );
                    }else{
                      multiSelectByIDs(wndSpeciaLayers);//select my layer

                      if(typeIDToCharID(event) == "SbtF"){// the alt key was pressed
                        app.activeDocument.suspendHistory("BCM_MagicWand :: Substract from HotLayer",
                          'substractMW('+theHRZN+', '+ theVRTC +', '+ theTlrn +', '+ theCntgous +')');

                      }else if(typeIDToCharID(event) == "AddT"){// the shift key was pressed
                        app.activeDocument.suspendHistory("BCM_MagicWand :: Add from HotLayer",
                          'addMW('+theHRZN+', '+ theVRTC +', '+ theTlrn +', '+ theCntgous +')');
                      
                      }else if(typeIDToCharID(event) == "setd"){
                        app.activeDocument.suspendHistory("BCM_MagicWand :: Select from HotLayer",
                          'selMW('+theHRZN+', '+ theVRTC +', '+ theTlrn +', '+ theCntgous +')');
                      }
                      
                      multiSelectByIDsMore(selL);//select back my layers 
                    
                    }
                  }else if(processHotKeys() == "Decimal"){
                      
                      toConfirm( "Replace", true );
                  
                  }else if(processHotKeys() == "CapsLock"){
                      showOnlyHotLayer( true );
                  }else{
                    // for(a in ScriptUI.environment.keyboardState){
                    //   alert( a + ' :: '+ ScriptUI.environment.keyboardState[a]);
                    // }
                    // alert(ScriptUI.environment.keyboardState.keyName);
                    // undoOneStep();
                  }
                }
              }            
            }
          }
        }
      }
    }
  }
} catch (e) {
  alert( "Error: " + e + ":" + e.line );
}

// setCurentLayerAsHot( false );
function processHotKeys(){
  var strA = "";
  if(parseInt(app.version) < 14){// because on cs6 the keyname doesn't work
    strA = 'Accent';
  }else{
    strA = ScriptUI.environment.keyboardState.keyName;
  }
  return strA;
}

function showOnlyHotLayer( fromEvent ){
  var wndSpeciaLayers2 = getSpecialLayersIDsFromDocMetadata( "BCM_MagicWandSpecialLayers" );
  // alert(wndSpeciaLayers2);
  if(wndSpeciaLayers2 == ''){
    toConfirm( "Set",  fromEvent);
  }else{
    app.activeDocument.suspendHistory("BCM_MagicWand :: Show only the HotLayer",
      'showOnlyMW('+wndSpeciaLayers2.toSource()+', '+fromEvent+')');
  }
}

function setCurentLayerAsHot( fromEvent ){
  toConfirm( "Replace", fromEvent );
}

//=================for history
function substractMW(theHRZN, theVRTC, theTlrn, theCntgous){
  undoOneStep();
  MagicWandSubstByScript( theHRZN, theVRTC, theTlrn, theCntgous );
}
function addMW(theHRZN, theVRTC, theTlrn, theCntgous){
  undoOneStep();
  MagicWandAddByScript( theHRZN, theVRTC, theTlrn, theCntgous );
}
function selMW(theHRZN, theVRTC, theTlrn, theCntgous){
  // undoOneStep();
  MagicWandByScript( theHRZN, theVRTC, theTlrn, theCntgous );
}
function showOnlyMW(wndSpeciaLayers2 , fromEvent){
  if (fromEvent == true){
    undoOneStep();
  }
  showOnlyMagicWandSpecialLayer(wndSpeciaLayers2);
}


function setHotLayer( fromEvent ){
  if(fromEvent == true){
    undoOneStep();
  }
  setSelectedIDsAsSpecial( "BCM_MagicWandSpecialLayers" );
  ClearSelection();
}
//============================
function toConfirm( mode, fromEvent ){
  var strConf = "";
  if( mode == "Set"){
    var strConf = 'There is no layer set to be used by the BCM_MagicWand.\n'
  }
  strConf += 'Do you want to set the selected layer as the special layer for BCM_MagicWand? \
If you want to set another layer just press the Decimal(Del) key on your numeric keyboard\
and click with the magic wand anywhere on the document.\
Also you an use CapsLock pressed when using the magic wand and it will show only the hot layer';
  var CNFRM = confirm(strConf);
  if(CNFRM == true){
    app.activeDocument.suspendHistory("BCM_MagicWand :: Set the HotLayer",
      'setHotLayer('+fromEvent+')')

  }
}

function multiSelectByIDsMore( obj ){
  if(obj.selectedMask == true){
    selectMaskByID(obj.sel[0])
  }else{
    multiSelectByIDs(obj.sel);
  }
}
function useCustomOrHotkeys(){
  if(parseInt(app.version) < 14){

  }
}

function getSelectedLayersIdsMore(){
  var sel = getSelectedLayersIds();
  var sss = {sel:sel, selectedMask:false}
  if(sel.length == 1){
    sss.selectedMask = isChannelMaskSelectedID(sel[0]);
  }
  return sss;
}

function logW(str){
  var f = new File(File($.fileName).path +"/getEventMagicWand.log");
  f.open('a');
  f.write('\r==============================\r');
  f.write(str);
  f.close();
}


function showOnlyMagicWandSpecialLayer( ids ){
  // alert( ids.toSource() )
  // alert(getIdxfromId( ids[0] ));
  selectionIDX = [];
  selectionIDX.push(getIdxfromId( ids[0] ));
  // alert(selectionIDX.toSource());
  setBack = false;
    var toDeselect = 0;
    // alert(selectionIDX.toSource());
    for(var i=0; i<selectionIDX.length; i++)//adding the hidden parents
      {
        // alert(selectionIDX[i]);
        theParents = loopParentsIDXfor(selectionIDX[i]);
        // alert(theParents.toSource());
        for(par in theParents){
          // alert(theParents[par]);
          if(!isVisibleIDX(theParents[par])){
            toDeselect ++;
            selectionIDX.push(theParents[par]);
          }
        }
      }
      // multiSelectByIDX(selectionIDX,false);
  if(selectionIDX.length > 1)
  {
      // =======================================================
    var idShw = charIDToTypeID( "Shw " );
        var desc95 = new ActionDescriptor();
        var idnull = charIDToTypeID( "null" );
            var list3 = new ActionList();
                var ref18 = new ActionReference();
                var idLyr = charIDToTypeID( "Lyr " );
                var idOrdn = charIDToTypeID( "Ordn" );
                var idTrgt = charIDToTypeID( "Trgt" );
                // ref18.putEnumerated( idLyr, idOrdn, idTrgt );
                ref18.putIdentifier( idLyr, ids[0] );
            list3.putReference( ref18 );
        desc95.putList( idnull, list3 );
        var idTglO = charIDToTypeID( "TglO" );
        desc95.putBoolean( idTglO, true );
    executeAction( idShw, desc95, DialogModes.NO );
    if(setBack == false){
      for(i=0;i<selectionIDX.length;i++)
      {
        showByIDX( selectionIDX[i] );
      }

    }else{
      for(a=0;a<selectionIDX.length;a++){
      }
    }
      
  }else{
    // =======================================================
      var idShw = charIDToTypeID( "Shw " );
          var desc95 = new ActionDescriptor();
          var idnull = charIDToTypeID( "null" );
              var list3 = new ActionList();
                  var ref18 = new ActionReference();
                  var idLyr = charIDToTypeID( "Lyr " );
                  var idOrdn = charIDToTypeID( "Ordn" );
                  var idTrgt = charIDToTypeID( "Trgt" );
                  // ref18.putEnumerated( idLyr, idOrdn, idTrgt );
                  ref18.putIdentifier( idLyr, ids[0] );
              list3.putReference( ref18 );
          desc95.putList( idnull, list3 );
          var idTglO = charIDToTypeID( "TglO" );
          desc95.putBoolean( idTglO, true );
      executeAction( idShw, desc95, DialogModes.NO );
  }
}

function loopParentsIDXfor(idx){
  var parents = new Array();
  var count  = getLayersNb();
  var pidx = getParentIDXfor(idx);
  for(k=0;k<count;k++){
    // alert(pidx+" - "+getParentIDXfor(pidx)+" - "+k);
    if(pidx != 0){
      parents.push(pidx);
    }else{break}
    pidx = getParentIDXfor(pidx);
  }
  // alert(parents);
  return parents;
}


function getParentIDXfor(idx){
  xx = false;
  var count  = getLayersNb();
   var currINDEX = idx;
    var i = currINDEX;
    var nb = 0;
    var x = 1;
    var y = 0;
    try{if(isLayerSet(idx)){y = -1}}catch(err){return};
    var r = 0;
   for(i; i <= count ; i++){
        ref = new ActionReference();
        ref.putIndex( charIDToTypeID( 'Lyr ' ), i );
        var desc = executeActionGet(ref);
        var layerName = desc.getString(charIDToTypeID( 'Nm  ' ));
        var Id = desc.getInteger(stringIDToTypeID( 'layerID' ));
        var ls = desc.getEnumerationValue(stringIDToTypeID("layerSection"));
        ls = typeIDToStringID(ls);
        var vis = desc.getInteger(stringIDToTypeID( 'visible' ));
        if(ls == "layerSectionEnd"){x++};
        if(ls == "layerSectionStart")
          {
            y++;
          }
        r = x - y;
        // alert(ls +" _ "+x+"-"+y+"="+r+ " idx_ "+ i + " name_ "+layerName);
        if(r == 0 && ls == "layerSectionStart")
        {
          nb = i;
          break;
        }

      }
    return nb;
}
     



function undoOneStep(){
  // ======================================================= do an undo
  var idslct = charIDToTypeID( "slct" );
      var desc1825 = new ActionDescriptor();
      var idnull = charIDToTypeID( "null" );
          var ref783 = new ActionReference();
          var idHstS = charIDToTypeID( "HstS" );
          var idOrdn = charIDToTypeID( "Ordn" );
          var idPrvs = charIDToTypeID( "Prvs" );
          ref783.putEnumerated( idHstS, idOrdn, idPrvs );
      desc1825.putReference( idnull, ref783 );
  executeAction( idslct, desc1825, DialogModes.NO );
}
function ClearSelection(){
  // =======================================================
  var idsetd = charIDToTypeID( "setd" );
      var desc490 = new ActionDescriptor();
      var idnull = charIDToTypeID( "null" );
          var ref217 = new ActionReference();
          var idChnl = charIDToTypeID( "Chnl" );
          var idfsel = charIDToTypeID( "fsel" );
          ref217.putProperty( idChnl, idfsel );
      desc490.putReference( idnull, ref217 );
      var idT = charIDToTypeID( "T   " );
      var idOrdn = charIDToTypeID( "Ordn" );
      var idNone = charIDToTypeID( "None" );
      desc490.putEnumerated( idT, idOrdn, idNone );
  executeAction( idsetd, desc490, DialogModes.NO );
}

function MagicWandAddByScript( h, v, tlrn, cntg){
  var idAddT = charIDToTypeID( "AddT" );
      var desc1480 = new ActionDescriptor();
      var idnull = charIDToTypeID( "null" );
          var ref600 = new ActionReference();
          var idChnl = charIDToTypeID( "Chnl" );
          var idfsel = charIDToTypeID( "fsel" );
          ref600.putProperty( idChnl, idfsel );
      desc1480.putReference( idnull, ref600 );
      var idT = charIDToTypeID( "T   " );
          var desc1481 = new ActionDescriptor();
          var idHrzn = charIDToTypeID( "Hrzn" );
          var idRlt = charIDToTypeID( "#Rlt" );
          desc1481.putUnitDouble( idHrzn, idRlt, h );
          var idVrtc = charIDToTypeID( "Vrtc" );
          var idRlt = charIDToTypeID( "#Rlt" );
          desc1481.putUnitDouble( idVrtc, idRlt, v );
      var idPnt = charIDToTypeID( "Pnt " );
      desc1480.putObject( idT, idPnt, desc1481 );
      var idTlrn = charIDToTypeID( "Tlrn" );
      desc1480.putInteger( idTlrn, tlrn );
      var idAntA = charIDToTypeID( "AntA" );
      desc1480.putBoolean( idAntA, true );
      var idCntg = charIDToTypeID( "Cntg" );
      desc1480.putBoolean( idCntg, cntg );
      // var idMrgd = charIDToTypeID( "Mrgd" );
      // desc1480.putBoolean( idMrgd, false );
  executeAction( idAddT, desc1480, DialogModes.NO );
}

function MagicWandSubstByScript( h, v, tlrn, cntg ){
  var idAddT = charIDToTypeID( "SbtF" );
      var desc1480 = new ActionDescriptor();
      var idnull = charIDToTypeID( "null" );
          var ref600 = new ActionReference();
          var idChnl = charIDToTypeID( "Chnl" );
          var idfsel = charIDToTypeID( "fsel" );
          ref600.putProperty( idChnl, idfsel );
      desc1480.putReference( idnull, ref600 );
      var idT = charIDToTypeID( "T   " );
          var desc1481 = new ActionDescriptor();
          var idHrzn = charIDToTypeID( "Hrzn" );
          var idRlt = charIDToTypeID( "#Rlt" );
          desc1481.putUnitDouble( idHrzn, idRlt, h );
          var idVrtc = charIDToTypeID( "Vrtc" );
          var idRlt = charIDToTypeID( "#Rlt" );
          desc1481.putUnitDouble( idVrtc, idRlt, v );
      var idPnt = charIDToTypeID( "Pnt " );
      desc1480.putObject( idT, idPnt, desc1481 );
      var idTlrn = charIDToTypeID( "Tlrn" );
      desc1480.putInteger( idTlrn, tlrn );
      var idAntA = charIDToTypeID( "AntA" );
      desc1480.putBoolean( idAntA, true );
      var idCntg = charIDToTypeID( "Cntg" );
      desc1480.putBoolean( idCntg, cntg );
      // var idMrgd = charIDToTypeID( "Mrgd" );
      // desc1480.putBoolean( idMrgd, false );
  executeAction( idAddT, desc1480, DialogModes.NO );
}

function MagicWandByScript( h, v, tlrn, cntg ){
  var idsetd = charIDToTypeID( "setd" );
      var desc225 = new ActionDescriptor();
      var idnull = charIDToTypeID( "null" );
          var ref116 = new ActionReference();
          var idChnl = charIDToTypeID( "Chnl" );
          var idfsel = charIDToTypeID( "fsel" );
          ref116.putProperty( idChnl, idfsel );
      desc225.putReference( idnull, ref116 );
      var idT = charIDToTypeID( "T   " );
          var desc226 = new ActionDescriptor();
          var idHrzn = charIDToTypeID( "Hrzn" );
          var idRlt = charIDToTypeID( "#Rlt" );
          desc226.putUnitDouble( idHrzn, idRlt, h );
          var idVrtc = charIDToTypeID( "Vrtc" );
          var idRlt = charIDToTypeID( "#Rlt" );
          desc226.putUnitDouble( idVrtc, idRlt, v );
      var idPnt = charIDToTypeID( "Pnt " );
      desc225.putObject( idT, idPnt, desc226 );
      var idTlrn = charIDToTypeID( "Tlrn" );
      desc225.putInteger( idTlrn, tlrn );
      var idAntA = charIDToTypeID( "AntA" );
      desc225.putBoolean( idAntA, true );
      var idCntg = charIDToTypeID( "Cntg" );
      desc225.putBoolean( idCntg, cntg );
      // var idMrgd = charIDToTypeID( "Mrgd" );
      // desc225.putBoolean( idMrgd, false );
  executeAction( idsetd, desc225, DialogModes.NO );
}