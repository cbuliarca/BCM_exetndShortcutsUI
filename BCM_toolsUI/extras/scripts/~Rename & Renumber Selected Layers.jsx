/*
<javascriptresource>
  <name>BCM> Rename f...</name>
  <category>BCM</category>
</javascriptresource>
*/
#target photoshop
app.bringToFront();
main();
function main(){
if(!documents.length) return;
  var selectedLayers = getSelectedLayersIdx();
  var win = new Window( 'dialog', '' ); 
  g = win.graphics;
  var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
  g.backgroundColor = myBrush;
  win.orientation='stack';
  win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
  win.g1 = win.p1.add('group');
  win.g1.orientation = "row";
  win.title = win.g1.add('statictext',undefined,'Rename Layers');
  win.title.alignment="fill";
  var g = win.title.graphics;
  g.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
  win.g5 =win.p1.add('group');
  win.g5.orientation = "column";
  win.g5.alignChildren='left';
  win.g5.spacing=10;
  win.g5.st1 = win.g5.add('statictext',undefined,'New layer name');
  win.g5.et1 = win.g5.add('edittext'); 
  win.g5.et1.preferredSize=[250,20];
  win.g10 =win.p1.add('group');
  win.g10.orientation = "row";
  win.g10.alignment='fill';
  win.g10.spacing=10;
  win.g10.st1 = win.g10.add('statictext',undefined,'Serial Number'); 
  win.g10.et1 = win.g10.add('edittext',undefined,'0');
  win.g10.et1.preferredSize=[50,20];
win.g10.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g10.st1 = win.g10.add('statictext',undefined,'Length'); 
var nums=[0,1,2,3,4,5];
win.g10.dl1 = win.g10.add('dropdownlist',undefined,nums);
win.g10.dl1.selection=0;
win.g15 =win.p1.add('group');
win.g15.orientation = "row";
win.g15.alignment='fill';
win.g15.cb1 = win.g15.add('checkbox',undefined,'Reverse layer order');
win.g100 =win.p1.add('group');
win.g100.orientation = "row";
win.g100.alignment='center';
win.g100.spacing=10;
win.g100.bu1 = win.g100.add('button',undefined,'Rename');
win.g100.bu1.preferredSize=[120,30];
win.g100.bu2 = win.g100.add('button',undefined,'Cancel');
win.g100.bu2.preferredSize=[120,30];
win.g100.bu1.onClick=function(){
if(win.g5.et1.text == ''){
    alert("No layer name has been entered!");
    return;
    }
  if(win.g15.cb1.value) selectedLayers.reverse();
    for(var a in selectedLayers){
      if(Number(win.g10.dl1.selection.text) > 0){
        var LayerName = win.g5.et1.text + zeroPad((Number(win.g10.et1.text)+Number(a)), Number(win.g10.dl1.selection.text));
        putLayerNameByIndex(Number(selectedLayers[a]), LayerName );
        }else{
          var LayerName = win.g5.et1.text;
          putLayerNameByIndex(Number(selectedLayers[a]), LayerName );
    }
  }
  win.close(0);
}
win.center();
win.g5.et1.focus = true;
win.g5.et1.active = true;
win.defaultElement = win.g100.bu1;
win.cancelElement = win.g100.bu2;
win.show(); 
}
function getSelectedLayersIdx(){ 
      var selectedLayers = new Array; 
      var ref = new ActionReference(); 
      ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
      var desc = executeActionGet(ref); 
      if( desc.hasKey( stringIDToTypeID( 'targetLayers' ) ) ){ 
         desc = desc.getList( stringIDToTypeID( 'targetLayers' )); 
          var c = desc.count 
          var selectedLayers = new Array(); 
          for(var i=0;i<c;i++){ 
            try{ 
               activeDocument.backgroundLayer; 
               selectedLayers.push(  desc.getReference( i ).getIndex() ); 
            }catch(e){ 
               selectedLayers.push(  desc.getReference( i ).getIndex()+1 ); 
            } 
          } 
       }else{ 
         var ref = new ActionReference(); 
         ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" )); 
         ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
         try{ 
            activeDocument.backgroundLayer; 
            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))-1); 
         }catch(e){ 
            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))); 
         } 
     var vis = app.activeDocument.activeLayer.visible;
        if(vis == true) app.activeDocument.activeLayer.visible = false;
        var desc9 = new ActionDescriptor();
    var list9 = new ActionList();
    var ref9 = new ActionReference();
    ref9.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    list9.putReference( ref9 );
    desc9.putList( charIDToTypeID('null'), list9 );
    executeAction( charIDToTypeID('Shw '), desc9, DialogModes.NO );
    if(app.activeDocument.activeLayer.visible == false) selectedLayers.shift();
        app.activeDocument.activeLayer.visible = vis;
      } 
      return selectedLayers; 
};
function zeroPad(n, s) { 
n = n.toString(); 
while (n.length < s) n = '0' + n; 
return n; 
};
function putLayerNameByIndex( idx, name ) {
     if( idx == 0 ) return;
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putIndex( charIDToTypeID( 'Lyr ' ), idx );
    desc.putReference( charIDToTypeID('null'), ref );
        var nameDesc = new ActionDescriptor();
        nameDesc.putString( charIDToTypeID('Nm  '), name );
    desc.putObject( charIDToTypeID('T   '), charIDToTypeID('Lyr '), nameDesc );
    executeAction( charIDToTypeID( 'slct' ), desc, DialogModes.NO ); 
    executeAction( charIDToTypeID('setd'), desc, DialogModes.NO );
}