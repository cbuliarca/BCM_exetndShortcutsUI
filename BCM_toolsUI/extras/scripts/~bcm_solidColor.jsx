makeSolidColor();
callColorPicker(getSolidColors());
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
}
function makeSolidColor(){
    // =======================================================
    var startColor = app.foregroundColor;
var idMk = charIDToTypeID( "Mk  " );
    var desc25269 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref1401 = new ActionReference();
        var idcontentLayer = stringIDToTypeID( "contentLayer" );
        ref1401.putClass( idcontentLayer );
    desc25269.putReference( idnull, ref1401 );
    var idUsng = charIDToTypeID( "Usng" );
        var desc25270 = new ActionDescriptor();
        var idClr = charIDToTypeID( "Clr " );
        var idClr = charIDToTypeID( "Clr " );
        var idVlt = charIDToTypeID( "Vlt " );
        desc25270.putEnumerated( idClr, idClr, idVlt );
        var idType = charIDToTypeID( "Type" );
            var desc25271 = new ActionDescriptor();
            var idClr = charIDToTypeID( "Clr " );
                var desc25272 = new ActionDescriptor();
                var idRd = charIDToTypeID( "Rd  " );
                desc25272.putDouble( idRd, startColor.rgb.red );
                var idGrn = charIDToTypeID( "Grn " );
                desc25272.putDouble( idGrn, startColor.rgb.green );
                var idBl = charIDToTypeID( "Bl  " );
                desc25272.putDouble( idBl, startColor.rgb.blue );
            var idRGBC = charIDToTypeID( "RGBC" );
            desc25271.putObject( idClr, idRGBC, desc25272 );
        var idsolidColorLayer = stringIDToTypeID( "solidColorLayer" );
        desc25270.putObject( idType, idsolidColorLayer, desc25271 );
    var idcontentLayer = stringIDToTypeID( "contentLayer" );
    desc25269.putObject( idUsng, idcontentLayer, desc25270 );
executeAction( idMk, desc25269, DialogModes.NO );
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
