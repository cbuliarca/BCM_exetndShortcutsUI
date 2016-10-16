/*
<javascriptresource>
  <name>BCM> ZBake using ZAppLink...</name>
  <category>BCM</category>
</javascriptresource>
*/

doc = app.activeDocument;
function act(){
	// cLayer = doc.activeLayer;
	selectUpper();
	duplicateLayer();
	selectLower();
	mergeDown();
	selectUpper();
	// hideCurrent();
	selectLower();
	try{selectLower()}catch(err){return};
	try{selectLower()}catch(err){return};
}
doc.activeLayer = doc.layers[1];
for(i=0; i<doc.layers.length/2; i++){
	act();
}


function selectUpper(){
// =======================================================
var idslct = charIDToTypeID( "slct" );
    var desc102 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref92 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idFrwr = charIDToTypeID( "Frwr" );
        ref92.putEnumerated( idLyr, idOrdn, idFrwr );
    desc102.putReference( idnull, ref92 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc102.putBoolean( idMkVs, false );
executeAction( idslct, desc102, DialogModes.NO );
}
function selectLower(){
	var idslct = charIDToTypeID( "slct" );
    var desc106 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref96 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idBckw = charIDToTypeID( "Bckw" );
        ref96.putEnumerated( idLyr, idOrdn, idBckw );
    desc106.putReference( idnull, ref96 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc106.putBoolean( idMkVs, false );
executeAction( idslct, desc106, DialogModes.NO );
}
function duplicateLayer(){
	// =======================================================
	var idDplc = charIDToTypeID( "Dplc" );
		var desc103 = new ActionDescriptor();
		var idnull = charIDToTypeID( "null" );
			var ref93 = new ActionReference();
			var idLyr = charIDToTypeID( "Lyr " );
			var idOrdn = charIDToTypeID( "Ordn" );
			var idTrgt = charIDToTypeID( "Trgt" );
			ref93.putEnumerated( idLyr, idOrdn, idTrgt );
		desc103.putReference( idnull, ref93 );
		// var idNm = charIDToTypeID( "Nm  " );
		// desc103.putString( idNm, "Front ZShading (do not edit) copy" );
		var idVrsn = charIDToTypeID( "Vrsn" );
		desc103.putInteger( idVrsn, 5 );
	executeAction( idDplc, desc103, DialogModes.NO );
}
function mergeDown(){
	// =======================================================
var idMrgtwo = charIDToTypeID( "Mrg2" );
    var desc122 = new ActionDescriptor();
executeAction( idMrgtwo, desc122, DialogModes.NO );
}
function hideCurrent(){
	// =======================================================
var idHd = charIDToTypeID( "Hd  " );
    var desc140 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var list72 = new ActionList();
            var ref123 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            var idOrdn = charIDToTypeID( "Ordn" );
            var idTrgt = charIDToTypeID( "Trgt" );
            ref123.putEnumerated( idLyr, idOrdn, idTrgt );
        list72.putReference( ref123 );
    desc140.putList( idnull, list72 );
executeAction( idHd, desc140, DialogModes.NO );
}