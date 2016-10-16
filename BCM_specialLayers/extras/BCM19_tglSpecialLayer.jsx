#include '../../_main/extras/_libs/layerIdAM.jsxinc'

// setSelectedIDsAsSpecial();
// toggleVisForSpecials();
// appendSelLayerIdtoSpecialLayersInMetadata();
function showOneByOneSpecialLayers(){
	spLyers = getSpecialLayersIDsFromMetadata();
	// var selId = getSelectedLayersIds()[0];
	var wasLyr = false;
	var vLayer = spLyers[0];
	if(spLyers.length > 0){
		for( var i=0; i<spLyers.length; i++){
			// alert(getVisibleforID(spLyers[i])+ " "+ spLyers[i]);
			if(getVisibleforID(spLyers[i]) == 1){
				if(i == spLyers.length-1){
					hideByID(spLyers[i]);
					showByID(spLyers[0]);

				}else{
					hideByID(spLyers[i]);
					showByID(spLyers[i+1]);
					
				}
			break;

		}	
	}
	}else{
		alert('no special layer is set!');
	}


}


function selectOneByOneSpecialLayers(){
	// alert('0');
	spLyers = getSpecialLayersIDsFromMetadata();
	// alert('1');

	var selId = getSelectedLayersIds0()[0];
	// alert('2');
	var wasLyr = false;
	if(spLyers.length > 0){
		for( var i=0; i<spLyers.length; i++){
			// alert(selId + " "+ spLyers[i]);
			if(selId == spLyers[i]){
				// alert('now::');
				if(i == spLyers.length-1){
					// alert('lastI :: sel: '+ spLyers[0]);
					multiSelectByIDs(spLyers[0]);
				}else{
					// alert('sel: '+ spLyers[i+1]);
					multiSelectByIDs(spLyers[i+1])
					
				}
				wasLyr = true;
				break;
			}
		}	
		if(wasLyr == false){
			multiSelectByIDs(spLyers[0]);
		}
	}else{
		alert('no special layer is set!');
	}


}

function selectAllSpecialLayers(){
	spLyers = getSpecialLayersIDsFromMetadata();
	multiSelectByIDs(spLyers);
}

function toggleVisForSpecials(){
	spLyers = getSpecialLayersIDsFromMetadata();
	if(spLyers.length > 0){
		for( var i=0; i<spLyers.length; i++){
			cId = parseInt(spLyers[i]);
			if(doesIdExists( cId )){
				if(getVisibleforID(cId) == true){
						hideByID(cId);
				}else{
						showByID(cId);
				}
			}
		}
	}
}


function setSelectedIDsAsSpecial(){
	var selIds = getSelectedLayersIds();
	xmpStr = createOrReplaceMetadata( selIds );
	app.activeDocument.xmpMetadata.rawData = xmpStr;
}

function createOrReplaceMetadata( ids ){
	// load the library
	if (ExternalObject.AdobeXMPScript == undefined) {
	ExternalObject.AdobeXMPScript = new
	ExternalObject('lib:AdobeXMPScript');
	}


	var myString = ids.toSource();
	try{var ss = app.activeDocument.xmpMetadata.rawData}catch(err){};

	if(ss){
		xmp = new XMPMeta(ss);
	}else{xmp = new XMPMeta();}
	
	if(xmp.doesPropertyExist(XMPConst.NS_XMP, "BCM_SpecialLayers")){
		// xmp.appendArrayItem(XMPConst.NS_XMP, "BCM_SpecialLayers", myString);
		xmp.deleteArrayItem(XMPConst.NS_XMP, "BCM_SpecialLayers", 1);
		xmp.insertArrayItem(XMPConst.NS_XMP, "BCM_SpecialLayers", 1 ,myString);

	}else{
		xmp.setProperty(XMPConst.NS_XMP, "BCM_SpecialLayers", "", XMPConst.PROP_IS_ARRAY);
		xmp.setArrayItem(XMPConst.NS_XMP, "BCM_SpecialLayers", 1, myString);
	}
	xmpStr = xmp.serialize(); // serialize the XMP packet to XML
	// alert(xmpStr);
	return xmpStr;
}

function appendNewMetadataArray( ids ){
	// load the library
	if (ExternalObject.AdobeXMPScript == undefined) {
	ExternalObject.AdobeXMPScript = new
	ExternalObject('lib:AdobeXMPScript');
	}


	var myString = ids.toSource();
	try{var ss = app.activeDocument.xmpMetadata.rawData}catch(err){};

	if(ss){
		xmp = new XMPMeta(ss);
	}else{xmp = new XMPMeta();}
	
	if(xmp.doesPropertyExist(XMPConst.NS_XMP, "BCM_SpecialLayers")){
		xmp.appendArrayItem(XMPConst.NS_XMP, "BCM_SpecialLayers", myString);
		// xmp.deleteArrayItem(XMPConst.NS_XMP, "BCM_SpecialLayers", 1);
		// xmp.insertArrayItem(XMPConst.NS_XMP, "BCM_SpecialLayers", 1 ,myString);

	}else{
		xmp.setProperty(XMPConst.NS_XMP, "BCM_SpecialLayers", "", XMPConst.PROP_IS_ARRAY);
		xmp.setArrayItem(XMPConst.NS_XMP, "BCM_SpecialLayers", 1, myString);
	}
	xmpStr = xmp.serialize(); // serialize the XMP packet to XML
	// alert(xmpStr);
	return xmpStr;
}



function appendSelLayerIdtoSpecialLayersInMetadata(){
	selIds = getSelectedLayersIds();
	cSpecialLayers = getSpecialLayersIDsFromMetadata();
	appendedLayers = cSpecialLayers.concat(selIds);
	// alert(appendedLayers.toSource());
	appendedLayers = remove_duplicates(appendedLayers);
	// alert(appendedLayers.toSource());
	xmpStr = createOrReplaceMetadata( appendedLayers );
	app.activeDocument.xmpMetadata.rawData = xmpStr;
}




function getSpecialLayersIDsFromMetadata( ){
	// load the library
	if (ExternalObject.AdobeXMPScript == undefined) {
	ExternalObject.AdobeXMPScript = new
	ExternalObject('lib:AdobeXMPScript');
	}
	strRet ='';
	tRet = [];
	try{var ss = app.activeDocument.xmpMetadata.rawData}catch(err){};

	if(ss){
		xmp = new XMPMeta(ss);
		// alert(ss);
	}
	
	if(xmp.doesPropertyExist(XMPConst.NS_XMP, "BCM_SpecialLayers")){
		strRet = xmp.getArrayItem(XMPConst.NS_XMP, "BCM_SpecialLayers", 1);
	}

	// alert(strRet.toString());
	qq = strRet.toString();
	qq = qq.substring(1,qq.length-1);
	tRet0 = qq.split(",");
	for( var f=0; f<tRet0.length; f++){
		tRet.push(parseInt(tRet0[f]));
	}


	// xmpStr = xmp.serialize(); // serialize the XMP packet to XML
	// alert(xmpStr);
	return tRet;
}

function remove_duplicates(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    arr = [];
    for (var key in obj) {
        arr.push(parseInt(key));
    }
    return arr;
}

function getSelectedLayersIds0(){// it's taking only one layer becasue taking all the layers it's caussing the script to tink a bit
//when the document has a lot of layers, this is the function getSelectedLayersIds simplifyed, without looking in the 'Dcmn' descriptor
  var idxs = getFirstLayerIdx0();// first get the indexes
	var selectedLayersIds = [];
	for( var i=0;i<idxs.length;i++){
		selectedLayersIds.push(getIdfromIdx(idxs[i]));
	}
	return selectedLayersIds;
}

function getFirstLayerIdx0(){
    var selectedLayers = new Array;
    var ref = new ActionReference();
    var add = 1;
    if(hasBackground()){add = 0}

    var ref = new ActionReference(); 
    ref.putProperty( charIDToTypeID('Prpr') , charIDToTypeID( 'ItmI' )); 
    ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    srs = hasBackground()?executeActionGet(ref).getInteger(charIDToTypeID( 'ItmI' ))-1:executeActionGet(ref).getInteger(charIDToTypeID( 'ItmI' ));
    selectedLayers.push( srs );

    return selectedLayers;
}