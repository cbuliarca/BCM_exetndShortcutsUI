/*
<javascriptresource>
  <name>BCM> LayersToJPG...</name>
  <category>BCM</category>
</javascriptresource>
*/
function saveJPG(name){
	var mySaveOptions = new JPEGSaveOptions();
	mySaveOptions.quality = 8;
	mySaveOptions.embedColorProfile = true;
	app.activeDocument.saveAs( name, mySaveOptions, false, Extension.NONE );
}
function cTID(s){return charIDToTypeID(s)}
function sTID(s){return stringIDToTypeID(s)}

function bcm_exp(){
	doc = app.activeDocument;
	jpgPath = doc.path;
	keepFirstLayer = false;
	i = getLayersNb();
	if(getLayerBlendingMode(getLayersNb()) != "Nrml")
	{
		keepFirstLayer = true;
		i = getLayersNb();
	}
	if(isLayerSet(getLayersNb())){
		keepFirstLayer == true
		i = getLastLayerIDXfromSet(getLayersNb())-1;
	}
	
	if(keepFirstLayer == true){
		makeVisible(getLayersNb());
	}

	for(i;i>0;i--){
		if(keepFirstLayer == true){
			makeActiveByIndex([getLayersNb(),i],false);
		}else{makeActiveByIndex(i,false);}
		theJPG = new File(jpgPath+"/"+getLayerName(i)+".jpg");
		duplicateToAnewDocument(getLayerName(i));
		saveJPG(theJPG);
		app.activeDocument.close();
		app.activeDocument = doc;
	}
}
function duplicateToAnewDocument(name){

	// =======================================================new doc
	var idMk = charIDToTypeID( "Mk  " );
	    var desc180 = new ActionDescriptor();
	    var idnull = charIDToTypeID( "null" );
	        var ref165 = new ActionReference();
	        var idDcmn = charIDToTypeID( "Dcmn" );
	        ref165.putClass( idDcmn );
	    desc180.putReference( idnull, ref165 );
	    var idUsng = charIDToTypeID( "Usng" );
	        var ref166 = new ActionReference();
	        var idLyr = charIDToTypeID( "Lyr " );
	        var idOrdn = charIDToTypeID( "Ordn" );
	        var idTrgt = charIDToTypeID( "Trgt" );
	        ref166.putEnumerated( idLyr, idOrdn, idTrgt );
	    desc180.putReference( idUsng, ref166 );
	    var idVrsn = charIDToTypeID( "Vrsn" );
	    desc180.putInteger( idVrsn, 5 );
	executeAction( idMk, desc180, DialogModes.NO );
	// =======================================================flatten
	var idFltI = charIDToTypeID( "FltI" );
	executeAction( idFltI, undefined, DialogModes.NO );
}
function getLastLayerIDXfromSet(idx){
 var ref = new ActionReference();
   ref.putIndex( charIDToTypeID('Lyr '), idx);
   var toRet = 0;
   var x = 0;
   var y = 0;
   var r = 0;
    var i = idx;
   for(i; i > 0 ; i--){
        ref = new ActionReference();
        ref.putIndex( charIDToTypeID( 'Lyr ' ), i );
        var desc = executeActionGet(ref);
        var layerName = desc.getString(charIDToTypeID( 'Nm  ' ));
        var ls = desc.getEnumerationValue(stringIDToTypeID("layerSection"));
        ls = typeIDToStringID(ls);
        if(ls == "layerSectionStart"){x++};
        if(layerName.match(/^<\/Layer group/) ) 
        { 
          y ++;
          r = x - y;
          if(r == 0 && ls == "layerSectionEnd"){toRet = i; break };
          continue
        }
   }
   return toRet;
}
function isLayerSet( idx ) {
     var propName = stringIDToTypeID( 'layerSection' );
     var ref = new ActionReference(); 
     ref.putProperty( charIDToTypeID( "Prpr" ) , propName);
     ref.putIndex( charIDToTypeID ( "Lyr " ), idx );
     var desc =  executeActionGet( ref );
     var type = desc.getEnumerationValue( propName );
     var res = typeIDToStringID( type ); 
     // alert(res);
     return res == 'layerSectionStart' ? true:false;
}
function getLayersNb()
{
    var ref = new ActionReference();
    ref.putProperty( charIDToTypeID( 'Prpr' ), stringIDToTypeID('numberOfLayers') );
    ref.putEnumerated( charIDToTypeID( "Dcmn" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
    var desc = executeActionGet(ref);
    var numberOfLayers = desc.getInteger(stringIDToTypeID('numberOfLayers'));
    return numberOfLayers;
}
function getLayerBlendingMode(idx){
   var m_Ref01 = new ActionReference();
   	m_Ref01.putIndex( cTID( "Lyr " ), idx);
   var m_Dsc01= executeActionGet( m_Ref01 );
   if(m_Dsc01.hasKey(cTID('Md  '))){
   	a = m_Dsc01.getEnumerationValue(cTID('Md  '));
   	return typeIDToCharID( a ); 
   }
}
function getActiveLayerIndex() {
    var ref = new ActionReference();
    ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" ));
    ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
    return executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ));
};
function makeActiveByIndex( idx, visible ){
     if( idx.constructor != Array ) idx = [ idx ];
     for( var i = 0; i < idx.length; i++ ){
          var desc = new ActionDescriptor();
          var ref = new ActionReference();
          ref.putIndex(charIDToTypeID( 'Lyr ' ), idx[i])
          desc.putReference( charIDToTypeID( 'null' ), ref );
          if( i > 0 ) {
               var idselectionModifier = stringIDToTypeID( 'selectionModifier' );
               var idselectionModifierType = stringIDToTypeID( 'selectionModifierType' );
               var idaddToSelection = stringIDToTypeID( 'addToSelection' );
               desc.putEnumerated( idselectionModifier, idselectionModifierType, idaddToSelection );
          }
          desc.putBoolean( charIDToTypeID( 'MkVs' ), visible );
          executeAction( charIDToTypeID( 'slct' ), desc, DialogModes.NO );
     }     
}
function hideAllLayers(){
	// =======================================================
	var idselectAllLayers = stringIDToTypeID( "selectAllLayers" );
	    var desc52 = new ActionDescriptor();
	    var idnull = charIDToTypeID( "null" );
	        var ref45 = new ActionReference();
	        var idLyr = charIDToTypeID( "Lyr " );
	        var idOrdn = charIDToTypeID( "Ordn" );
	        var idTrgt = charIDToTypeID( "Trgt" );
	        ref45.putEnumerated( idLyr, idOrdn, idTrgt );
	    desc52.putReference( idnull, ref45 );
	executeAction( idselectAllLayers, desc52, DialogModes.NO );
	// =======================================================
	var idHd = charIDToTypeID( "Hd  " );
	    var desc56 = new ActionDescriptor();
	    var idnull = charIDToTypeID( "null" );
	        var list3 = new ActionList();
	            var ref49 = new ActionReference();
	            var idLyr = charIDToTypeID( "Lyr " );
	            var idOrdn = charIDToTypeID( "Ordn" );
	            var idTrgt = charIDToTypeID( "Trgt" );
	            ref49.putEnumerated( idLyr, idOrdn, idTrgt );
	        list3.putReference( ref49 );
	    desc56.putList( idnull, list3 );
	executeAction( idHd, desc56, DialogModes.NO );

}
function makeVisible(idx){
	// =======================================================
	var idShw = charIDToTypeID( "Shw " );
	    var desc65 = new ActionDescriptor();
	    var idnull = charIDToTypeID( "null" );
	        var list8 = new ActionList();
	            var ref58 = new ActionReference();
	            ref58.putIndex( charIDToTypeID( "Lyr " ), idx );
	        list8.putReference( ref58 );
	    desc65.putList( idnull, list8 );
	executeAction( idShw, desc65, DialogModes.NO );
}
function showAll(){
	// =======================================================
	var idselectAllLayers = stringIDToTypeID( "selectAllLayers" );
	    var desc52 = new ActionDescriptor();
	    var idnull = charIDToTypeID( "null" );
	        var ref45 = new ActionReference();
	        var idLyr = charIDToTypeID( "Lyr " );
	        var idOrdn = charIDToTypeID( "Ordn" );
	        var idTrgt = charIDToTypeID( "Trgt" );
	        ref45.putEnumerated( idLyr, idOrdn, idTrgt );
	    desc52.putReference( idnull, ref45 );
	executeAction( idselectAllLayers, desc52, DialogModes.NO );
	// =======================================================
	var idHd = charIDToTypeID( "Shw " );
	    var desc56 = new ActionDescriptor();
	    var idnull = charIDToTypeID( "null" );
	        var list3 = new ActionList();
	            var ref49 = new ActionReference();
	            var idLyr = charIDToTypeID( "Lyr " );
	            var idOrdn = charIDToTypeID( "Ordn" );
	            var idTrgt = charIDToTypeID( "Trgt" );
	            ref49.putEnumerated( idLyr, idOrdn, idTrgt );
	        list3.putReference( ref49 );
	    desc56.putList( idnull, list3 );
	executeAction( idHd, desc56, DialogModes.NO );

}

function hidebyIDX(idx){
	// =======================================================
	var idShw = charIDToTypeID( "Hd  " );
	    var desc65 = new ActionDescriptor();
	    var idnull = charIDToTypeID( "null" );
	        var list8 = new ActionList();
	            var ref58 = new ActionReference();
	            ref58.putIndex( charIDToTypeID( "Lyr " ), idx );
	        list8.putReference( ref58 );
	    desc65.putList( idnull, list8 );
	executeAction( idShw, desc65, DialogModes.NO );
}
function getLayerName(idx){
	var m_Ref01 = new ActionReference();
   		m_Ref01.putIndex( cTID( "Lyr " ), idx);
   var m_Dsc01= executeActionGet( m_Ref01 );
   return m_Dsc01.getString(charIDToTypeID( 'Nm  ' ));
}
bcm_exp();