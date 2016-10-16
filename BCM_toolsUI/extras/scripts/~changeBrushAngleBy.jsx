/*
<javascriptresource>
  <name>BCM> changeBrshAngle...</name>
  <category>BCM</category>
</javascriptresource>
*/
//http://www.ps-scripts.com/bb/viewtopic.php?t=2801
function setBrushAngle( angle, round ){
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID( "Brsh" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
    desc.putReference( charIDToTypeID( "null" ), ref );
        var desc1 = new ActionDescriptor();
        desc1.putUnitDouble( stringIDToTypeID( "angle" ), charIDToTypeID( "#Ang" ), angle );
       	if(round != null){
        	desc1.putUnitDouble( stringIDToTypeID( "roundness" ), charIDToTypeID( "#Prc" ), round );	
       	}
    desc.putObject( charIDToTypeID( "T   " ), charIDToTypeID( "Brsh" ), desc1 );
executeAction( charIDToTypeID( "setd" ), desc, DialogModes.NO );
}

function setBrushAngle4(angle, round, brshType){
	var btype = ("'"+brshType+"'");
	alert(btype);
var idsetd = charIDToTypeID( "setd" );
    var desc58 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref43 = new ActionReference();
        var idBrsh = charIDToTypeID( "Brsh" );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref43.putEnumerated( idBrsh, idOrdn, idTrgt );
    desc58.putReference( idnull, ref43 );
    var idT = charIDToTypeID( "T   " );
        var desc59 = new ActionDescriptor();
        var idAngl = charIDToTypeID( "Angl" );
        var idAng = charIDToTypeID( "#Ang" );
        desc59.putUnitDouble( idAngl, idAng, 38.000000 );
    var idcomputedBrush = stringIDToTypeID( btype );
    desc58.putObject( idT, idcomputedBrush, desc59 );
executeAction( idsetd, desc58, DialogModes.NO );
}

function setBrushAngle5(angle, round, brshType){
	var btype = ("'"+brshType+"'");
    var desc58 = new ActionDescriptor();
        var ref54 = new ActionReference();
        // ref54.putProperty( charIDToTypeID( "Prpr" ), stringIDToTypeID('currentToolOptions') );
        ref54.putEnumerated( charIDToTypeID( "capp" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
    desc58.putReference( charIDToTypeID( "null" ), ref54 );
        var desc59 = new ActionDescriptor();
            var desc60 = new ActionDescriptor();
            desc60.putUnitDouble( charIDToTypeID( "Angl" ), charIDToTypeID( "#Ang" ), 50 );
        desc59.putObject( charIDToTypeID( "Brsh" ), stringIDToTypeID( 'sampledBrush' ), desc60 );
    desc58.putObject( charIDToTypeID( "T   " ), stringIDToTypeID('currentToolOptions'), desc59 );
executeAction( charIDToTypeID( "setd" ), desc58, DialogModes.NO );
}
function getBrushAngle(){
	var ref = new ActionReference();
	ref.putEnumerated( charIDToTypeID("capp"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
	var appDesc = executeActionGet(ref);
	var toolDesc = appDesc.getObjectValue(stringIDToTypeID('currentToolOptions'));
	var brushDesc = toolDesc.getObjectValue(charIDToTypeID('Brsh'));
	var brushAngle = brushDesc.getDouble(charIDToTypeID('Angl'));
	return brushAngle;
}
function getBrushType(){
	var ref = new ActionReference();
	ref.putEnumerated( charIDToTypeID("capp"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
	var appDesc = executeActionGet(ref);
	var toolDesc = appDesc.getObjectValue(stringIDToTypeID('currentToolOptions'));
	brsh = toolDesc.getObjectType(charIDToTypeID('Brsh'));
	return typeIDToStringID(brsh);
}
function getBrushRoundness(){
	var ref = new ActionReference();
	ref.putEnumerated( charIDToTypeID("capp"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
	var appDesc = executeActionGet(ref);
	var toolDesc = appDesc.getObjectValue(stringIDToTypeID('currentToolOptions'));
	var brushDesc = toolDesc.getObjectValue(charIDToTypeID('Brsh'));
	var brushRoundness = brushDesc.getDouble(charIDToTypeID('Rndn'));
	return brushRoundness;
}
function mbAddBrushAngle(value){
	mbBrushType = getBrushType();
	try{mbAngle = getBrushAngle(mbBrushType); mbNewAngle = mbAngle + value;}catch(err){mbNewAngle = null }
	try{mbRoundness = getBrushRoundness(mbBrushType);}catch(err){mbRoundness = null }
	alert(mbBrushType + " _ "+mbNewAngle+" - "+mbRoundness);
	setBrushAngle5(mbNewAngle, mbRoundness, mbBrushType);
	// makeNewBrush();
}
mbAddBrushAngle(-10);

function setBrushFeatures(Diameter,Hardness,Angle,Roundness,Spacing,Flipy,Flipx) {
   var ref = new ActionReference();
   ref.putEnumerated( charIDToTypeID("capp"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
   var appDesc = executeActionGet(ref);
   var toolDesc = appDesc.getObjectValue(stringIDToTypeID('currentToolOptions'));
   var brushDesc = toolDesc.getObjectValue(stringIDToTypeID('brush'));
   if( brushDesc.hasKey(stringIDToTypeID('sampledData'))){
      var SampleData = brushDesc.getString(stringIDToTypeID('sampledData'));
      Hardness = undefined;
   }else{
         if (Hardness == undefined) Hardness = brushDesc.getDouble(stringIDToTypeID('hardness'));
   }
   if (Diameter == undefined) Diameter = brushDesc.getDouble(stringIDToTypeID('diameter'));
   if (Angle == undefined ) Angle = brushDesc.getDouble(stringIDToTypeID('angle'));
   if (Roundness  == undefined) Roundness = brushDesc.getDouble(stringIDToTypeID('roundness'));
   if (Spacing == undefined) Spacing = brushDesc.getDouble(stringIDToTypeID('spacing'));
   if (Flipy == undefined) Flipy = brushDesc.getBoolean(stringIDToTypeID('flipY'));
   if (Flipx == undefined) Flipx = brushDesc.getBoolean(stringIDToTypeID('flipX'));
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID( "Brsh" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
    desc.putReference( charIDToTypeID( "null" ), ref );
   var desc1 = new ActionDescriptor();
      desc1.putDouble(stringIDToTypeID('diameter'), Diameter);
      if(Hardness != undefined) desc1.putDouble(stringIDToTypeID('hardness'), Hardness);
      desc1.putDouble(stringIDToTypeID('angle'), Angle);
      desc1.putDouble(stringIDToTypeID('roundness'), Roundness);
      desc1.putDouble(stringIDToTypeID('spacing'), Spacing);
      desc1.putBoolean(stringIDToTypeID('flipY'), Flipy);
      desc1.putBoolean(stringIDToTypeID('flipX'), Flipx);
        if( brushDesc.hasKey(stringIDToTypeID('sampledData'))) desc1.putString(stringIDToTypeID('sampledData'), SampleData);
    desc.putObject( charIDToTypeID( "T   " ), charIDToTypeID( "Brsh" ), desc1 );
   executeAction( charIDToTypeID( "setd" ), desc, DialogModes.NO );
}
// var idMk = charIDToTypeID( "Mk  " );
//     var desc44 = new ActionDescriptor();
//     var idnull = charIDToTypeID( "null" );
//         var ref41 = new ActionReference();
//         var idBrsh = charIDToTypeID( "Brsh" );
//         ref41.putClass( idBrsh );
//     desc44.putReference( idnull, ref41 );
//     var idUsng = charIDToTypeID( "Usng" );
//         var ref42 = new ActionReference();
//         var idPrpr = charIDToTypeID( "Prpr" );
//         var idCrnT = charIDToTypeID( "CrnT" );
//         ref42.putProperty( idPrpr, idCrnT );
//         var idcapp = charIDToTypeID( "capp" );
//         var idOrdn = charIDToTypeID( "Ordn" );
//         var idTrgt = charIDToTypeID( "Trgt" );
//         ref42.putEnumerated( idcapp, idOrdn, idTrgt );
//     desc44.putReference( idUsng, ref42 );
// executeAction( idMk, desc44, DialogModes.NO );

// var idMk = charIDToTypeID( "Mk  " );
//     var desc45 = new ActionDescriptor();
//     var idnull = charIDToTypeID( "null" );
//         var ref43 = new ActionReference();
//         var idBrsh = charIDToTypeID( "Brsh" );
//         ref43.putClass( idBrsh );
//     desc45.putReference( idnull, ref43 );
//     var idNm = charIDToTypeID( "Nm  " );
//     desc45.putString( idNm, """Flat Point 2""" );
//     var idUsng = charIDToTypeID( "Usng" );
//         var ref44 = new ActionReference();
//         var idPrpr = charIDToTypeID( "Prpr" );
//         var idCrnT = charIDToTypeID( "CrnT" );
//         ref44.putProperty( idPrpr, idCrnT );
//         var idcapp = charIDToTypeID( "capp" );
//         var idOrdn = charIDToTypeID( "Ordn" );
//         var idTrgt = charIDToTypeID( "Trgt" );
//         ref44.putEnumerated( idcapp, idOrdn, idTrgt );
//     desc45.putReference( idUsng, ref44 );
// executeAction( idMk, desc45, DialogModes.NO );

// =======================================================
// var idsetd = charIDToTypeID( "setd" );
//     var desc47 = new ActionDescriptor();
//     var idnull = charIDToTypeID( "null" );
//         var ref46 = new ActionReference();
//         var idPrpr = charIDToTypeID( "Prpr" );
//         var idGnrP = charIDToTypeID( "GnrP" );
//         ref46.putProperty( idPrpr, idGnrP );
//         var idcapp = charIDToTypeID( "capp" );
//         var idOrdn = charIDToTypeID( "Ordn" );
//         var idTrgt = charIDToTypeID( "Trgt" );
//         ref46.putEnumerated( idcapp, idOrdn, idTrgt );
//     desc47.putReference( idnull, ref46 );
//     var idT = charIDToTypeID( "T   " );
//         var desc48 = new ActionDescriptor();
//         var idClrr = charIDToTypeID( "Clrr" );
//             var desc49 = new ActionDescriptor();
//             var idPckr = charIDToTypeID( "Pckr" );
//             var idPckK = charIDToTypeID( "PckK" );
//             var idSysP = charIDToTypeID( "SysP" );
//             desc49.putEnumerated( idPckr, idPckK, idSysP );
//         var idClrk = charIDToTypeID( "Clrk" );
//         desc48.putObject( idClrr, idClrk, desc49 );
//         var idlegacyPathDrag = stringIDToTypeID( "legacyPathDrag" );
//         desc48.putBoolean( idlegacyPathDrag, true );
//     var idGnrP = charIDToTypeID( "GnrP" );
//     desc47.putObject( idT, idGnrP, desc48 );
// executeAction( idsetd, desc47, DialogModes.NO );


//     var desc47 = new ActionDescriptor();
//         var ref46 = new ActionReference();
//         ref46.putProperty( charIDToTypeID( "Prpr" ), charIDToTypeID( "GnrP" ) );
//         ref46.putEnumerated( charIDToTypeID( "capp" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ));
//     desc47.putReference( charIDToTypeID( "null" ), ref46 );
//         var desc48 = new ActionDescriptor();
//             var desc49 = new ActionDescriptor();
//             desc49.putEnumerated( charIDToTypeID( "Pckr" ), charIDToTypeID( "PckK" ), charIDToTypeID( "SysP" ) );
//         desc48.putObject( charIDToTypeID( "Clrr" ), charIDToTypeID( "Clrk" ), desc49 );
//         desc48.putBoolean( stringIDToTypeID( "legacyPathDrag" ), true );
//     desc47.putObject( charIDToTypeID( "T   " ), charIDToTypeID( "GnrP" ), desc48 );
// executeAction( charIDToTypeID( "setd" ), desc47, DialogModes.NO );

// // =======================================================
// var idsetd = charIDToTypeID( "setd" );
//     var desc58 = new ActionDescriptor();
//     var idnull = charIDToTypeID( "null" );
//         var ref54 = new ActionReference();
//         var idPrpr = charIDToTypeID( "Prpr" );
//         var idDspP = charIDToTypeID( "DspP" );
//         ref54.putProperty( idPrpr, idDspP );
//         var idcapp = charIDToTypeID( "capp" );
//         var idOrdn = charIDToTypeID( "Ordn" );
//         var idTrgt = charIDToTypeID( "Trgt" );
//         ref54.putEnumerated( idcapp, idOrdn, idTrgt );
//     desc58.putReference( idnull, ref54 );
//     var idT = charIDToTypeID( "T   " );
//         var desc59 = new ActionDescriptor();
//         var idBrsh = charIDToTypeID( "Brsh" );
//             var desc60 = new ActionDescriptor();
//             var idRd = charIDToTypeID( "Rd  " );
//             desc60.putDouble( idRd, 0.000000 );
//             var idGrn = charIDToTypeID( "Grn " );
//             desc60.putDouble( idGrn, 0.000000 );
//             var idBl = charIDToTypeID( "Bl  " );
//             desc60.putDouble( idBl, 255.000000 );
//         var idRGBC = charIDToTypeID( "RGBC" );
//         desc59.putObject( idBrsh, idRGBC, desc60 );
//     var idDspP = charIDToTypeID( "DspP" );
//     desc58.putObject( idT, idDspP, desc59 );
// executeAction( idsetd, desc58, DialogModes.NO );

// =======================================================
//     var desc58 = new ActionDescriptor();
//         var ref54 = new ActionReference();
//         ref54.putProperty( charIDToTypeID( "Prpr" ), charIDToTypeID( "DspP" ) );
//         ref54.putEnumerated( charIDToTypeID( "capp" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
//     desc58.putReference( charIDToTypeID( "null" ), ref54 );
//         var desc59 = new ActionDescriptor();
//             var desc60 = new ActionDescriptor();
//             desc60.putDouble( charIDToTypeID( "Rd  " ), 0.000000 );
//             desc60.putDouble( charIDToTypeID( "Grn " ), 0.000000 );
//             desc60.putDouble( charIDToTypeID( "Bl  " ), 255.000000 );
//         desc59.putObject( charIDToTypeID( "Brsh" ), charIDToTypeID( "RGBC" ), desc60 );
//     desc58.putObject( charIDToTypeID( "T   " ), charIDToTypeID( "DspP" ), desc59 );
// executeAction( charIDToTypeID( "setd" ), desc58, DialogModes.NO );