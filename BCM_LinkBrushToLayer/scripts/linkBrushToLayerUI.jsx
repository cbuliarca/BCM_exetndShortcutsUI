/*
<javascriptresource>
  <name>BCM> link brush to layer...</name>
  <category>BCM_LBL</category>
</javascriptresource>
*/

#include extras/options.jsi
#include linkBrshToLayer.jsi
main();

function main(){
	var win = new Window( 'dialog', '',undefined, {resizeable:false,closeButton:false,borderless:true});
  g = win.graphics;
  var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.1, 0.1, 0.1, 1]);
  g.backgroundColor = myBrush;
  g.disabledBackgroundColor = myBrush;
  // var myPen = parseInt(app.version)>11?g.newPen(g.PenType.SOLID_COLOR, [0.8, 0.8, 0.8, 1], 20):g.newPen(g.PenType.SOLID_COLOR, [0.1, 0.1, 0.1, 1], 20); // this is the font color
  var myPen = g.newPen(g.PenType.SOLID_COLOR, [0.8, 0.8, 0.8, 1], 20); // this is the font color
  var shortcutFont = ScriptUI.newFont("Tahoma","BOLD",14);
  g.foregroundColor = myPen
  g.disabledForegroundColor = myPen;
  try{g.font = ScriptUI.newFont("Berlin Sans FB","REGULAR",14)}catch(err){g.font = ScriptUI.newFont("Tahoma","REGULAR",14)};
  // g.font = ScriptUI.newFont("Tahoma","REGULAR",18);
  win.opacity =.95;
  win.spacing = 0;
  win.indent = 0;
  win.orientation='column';
  var BCMIntro = " These scripts allows you to save a brush to a layer, so you can get the exact brush  with the same color in a future time.\
  Also the brushes will be saved with your photoshop file so anyone who will open the document will be able to use the same brush.\
  You need to be aware that this can happen only with the same photoshop version. You can't retreve the brushes that where saved with CS5 and later with CS4.\
  For fast interraction you can press one of the keys that you see in the top left corner of the button and the respective button's command will be triggered.\
  By right clicking on the buttons you can set it's options." ;
  win.BCM_helpTip = BCMIntro;
  win.tempB = win.add('button',undefined,'');
  win.tempB.preferredSize = [1,1];
  win.tempB.visible = false;
  win.ee = win.add('statictext', undefined, " ");

  win.g1 = win.add('group');
  win.g1.orientation = "row";
  win.g1.alignChildren = 'top';

 //============================== add Button
  win.addPnl = win.g1.add('panel', undefined, '', {borderStyle:'none'});
  if(parseInt(app.version)<= 12){
    win.addPnl.graphics.font = ScriptUI.newFont("Tahoma","BOLD",14);
    win.addPnl.text = 'A';
  }

  win.addGr = win.addPnl.add('group', {x:15, y:15, width:150, height:150});

    var imgFileAdd = parseInt(app.version)>12?File($.fileName).path + "/extras/addLBL.png":File($.fileName).path + "/extras/addLBLDark.png"
    win.addB = win.addGr.add('iconbutton',{x:0, y:0, width:150, height:150}, imgFileAdd); 
    win.addB.name = 'addLBL';
    	win.addB.onClick = function(){
  		win.close();
      addLBL();
    };
    win.addB.BCM_helpTip = " Link the selected brush to the selected layer. You can link more than one brushes.\
Beside the brush, the script will save the current tool and the foreground and background colors.\
Right clik on the button to set the options for it.\
\
      By pressing: 'A' on your keyboard the button's command will be triggered" ;

      win.addLB = win.addGr.add('statictext', {x:0, y:125, width:150, height:10}, 'Add');
      win.addLB.justify = 'center';
      win.addLB.enabled = false;
      win.addSH = win.addGr.add('statictext', {x:15, y:7, width:20, height:20}, 'A');
      win.addSH.enabled = false;
      win.addSH.graphics.font = shortcutFont;


 //============================== get Buttonf
  win.getPnl = win.g1.add('panel', undefined, '', {borderStyle:'none'});
  if(parseInt(app.version)<= 12){
    win.getPnl.graphics.font = ScriptUI.newFont("Tahoma","BOLD",14);
    win.getPnl.text = 'S';
  }
  win.getGr = win.getPnl.add('group', {x:15, y:15, width:150, height:150});

    var imgFileGet = parseInt(app.version)>12?File($.fileName).path + "/extras/getLBL.png":File($.fileName).path + "/extras/getLBLDark.png"
    win.getB = win.getGr.add('iconbutton',{x:0, y:0, width:150, height:150},imgFileGet);
    win.getB.preferredSize=[150, 150];
    win.getB.name = 'getLBL';
    	win.getB.onClick = function(){
        win.close();
    		getLBL();
  		};
    win.getB.BCM_helpTip = " Change your brush with the one attached to the selected layer. If there are more than one brushes attached to the layer, every time you will press the button you will get the next brush .\
Beside the brush, the script will get the saved tool and the foreground and background colors.\
You can change the options to get whatever you need by right clicking on the button.\
\
      By pressing: 'S' on your keyboard the button's command will be triggered" ;

    win.getLB = win.getGr.add('statictext', {x:0, y:125, width:150, height:10}, 'Get');
    win.getLB.justify = 'center';
    win.getLB.enabled = false;
    win.getSH = win.getGr.add('statictext', {x:15, y:7, width:20, height:20}, 'S');
    win.getSH.enabled = false;
    win.getSH.graphics.font = shortcutFont;

 //============================== del Button
  win.delPnl = win.g1.add('panel', undefined, '', {borderStyle:'none'});
  if(parseInt(app.version)<= 12){
    win.delPnl.graphics.font = ScriptUI.newFont("Tahoma","BOLD",14);
    win.delPnl.text = 'D';
  }
  win.delGr = win.delPnl.add('group', {x:15, y:15, width:150, height:150});

    var imgFiledel = parseInt(app.version)>12?File($.fileName).path + "/extras/delLBL.png":File($.fileName).path + "/extras/delLBLDark.png"
    win.delB = win.delGr.add('iconbutton',{x:0, y:0, width:150, height:150},imgFiledel);
    win.delB.preferredSize=[150, 150];
    win.delB.name = 'delLBL';
      win.delB.onClick = function(){
        win.close();
        delLBL();
      };
    win.delB.BCM_helpTip = " Delete the linked brushes from the selected layer. You have the option to delete all or the current brush.\
Right clik on the button to set the options for it.\
\
      By pressing: 'D' on your keyboard the button's command will be triggered" ;

    win.delLB = win.delGr.add('statictext', {x:0, y:125, width:150, height:10}, 'Delete');
    win.delLB.justify = 'center';
    win.delLB.enabled = false;
    win.delSH = win.delGr.add('statictext', {x:15, y:7, width:20, height:20}, 'D');
    win.delSH.enabled = false;
    win.delSH.graphics.font = shortcutFont;

 //============================== repl Button
  win.replPnl = win.g1.add('panel', undefined, '', {borderStyle:'none'});
  if(parseInt(app.version)<= 12){
    win.replPnl.graphics.font = ScriptUI.newFont("Tahoma","BOLD",14);
    win.replPnl.text = 'F';
  }
  win.replGr = win.replPnl.add('group', {x:15, y:15, width:150, height:150});

    var imgFilerepl = parseInt(app.version)>12?File($.fileName).path + "/extras/replLBL.png":File($.fileName).path + "/extras/replLBLDark.png"
    win.replB = win.replGr.add('iconbutton',{x:0, y:0, width:150, height:150},imgFilerepl);
    win.replB.preferredSize=[150, 150];
    win.replB.name = 'replLBL';
      win.replB.onClick = function(){
        win.close();
        replLBL();
      };
    win.replB.BCM_helpTip = " Replace the linked brushes for the selected layer with the selected brush. You can replace all the brushes or just the current one.\
Right clik on the button to set the options for it.\
\
      By pressing: 'F' on your keyboard the button's command will be triggered" ;

    win.replLB = win.replGr.add('statictext', {x:0, y:125, width:150, height:10}, 'Replace');
    win.replLB.justify = 'center';
    win.replLB.enabled = false;
    win.replSH = win.replGr.add('statictext', {x:15, y:7, width:20, height:20}, 'F');
    win.replSH.enabled = false;
    win.replSH.graphics.font = shortcutFont;

    win.ee1 = win.add('statictext', undefined, " ");
    win.hlpPnl = win.add('panel', undefined, 'Help: ');
    win.hlpPnl.alignment = 'left';
    win.hlpPnl.indent = parseInt(app.version)>11?15:0;
    // for(var a in win.replPnl){alert(a + " is: "+ win.replPnl[a])};
    win.hlpPnl.preferredSize = [ 200, 100];
      win.hlp = win.hlpPnl.add('statictext', undefined, BCMIntro, {multiline:true });
      try{win.hlp.graphics.font = ScriptUI.newFont("Calibri","REGULAR",15)}catch(err){win.hlp.graphics.font = ScriptUI.newFont("Arial","REGULAR",15)}
      win.hlp.preferredSize = [ 200, 150];
      win.hlp.justify = 'center';

  win.tempB.active = true;
  addEvents();
  win.onShow = function(){// setting the helpPanel size
    // for(var a in win.g1){alert(a + " is: "+ win.g1[a])};
    win.hlpPnl.bounds.width = parseInt(app.version)>11?win.g1.bounds.width - 30:win.g1.bounds.width;
    win.hlp.bounds.width = win.hlpPnl.bounds.width - 30;
  };
  win.show();

  function pressed (k){
		// the shortcut keys
		switch(k.keyName)
		{
			case "A":
				win.addB.notify('onClick');
				break;
			case "S":
  			win.getB.notify('onClick');
  			break;
      case "D":
        win.delB.notify('onClick');
        break;
      case "F":
        win.replB.notify('onClick');
        break;
		}
	}
  function clicked (k){
    if(k.button == 2){
      if(k.target.type == 'iconbutton'){
        switch(k.target.name)
        {
          case 'addLBL':
            alert( 'there are no options to for this button');
            break;
          case 'getLBL':
            optionsWin(k.screenX, k.screenY, _BCM_getLBLOptions, k.target.name);
            break;
          case 'replLBL':
            optionsWin(k.screenX, k.screenY, _BCM_replaceLBLOptions, k.target.name);
            break;
          case 'delLBL':
            optionsWin(k.screenX, k.screenY, _BCM_deleteLBLOptions, k.target.name);
            break;
        }
        // alert(k.target.type);
        
      }
    }
  }
  function over(k){
    if(k.target.BCM_helpTip){
      win.hlp.text = k.target.BCM_helpTip;
    }
  }
  function addEvents(){win.addEventListener('keydown', function (kd){pressed (kd)});
                          win.addEventListener('mousedown', function (kd){clicked (kd)});
                          win.addEventListener('mouseover', function (kd){over (kd)});
                        };
  function optionsWin(x, y, options, btnTxt){
    var win2 = new Window( 'dialog', '',undefined, {resizeable:true,closeButton:true, borderless:true});
    g2 = win2.graphics;
    var myBrush1 = g2.newBrush(g2.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
    g2.backgroundColor = myBrush1;
    win2.alignChildren = 'left';
    win2.orientation='column';
    
    // win2.g1 = win2.add('group');
    win2.et0 = win2.add('statictext', undefined, '');
    // win2.et = win2.add('statictext', undefined, 'options for '+ btnTxt +' button');

    win2.pnl = win2.add('panel');
    win2.pnl.orientation='column';
    win2.pnl.alignChildren = 'left';

    win2.location = [x, y];
    for( var as in options){
      var textC = as.toString();
      textC = textC.replace(/_/g, " ");
      win2.check = win2.pnl.add( 'checkbox',undefined, textC );
      win2.check.value = options[as];
    }

    win2.g2 = win2.add('group');
    win2.g2.orientation  = 'row';

    win2.btCancel = win2.g2.add('button',undefined,  'Cancel');
    win2.btCancel.preferredSize = [50, 20];
    win2.btCancel.alignement = 'left';
    win2.btCancel.onClick = function(){
                                  win2.close();
                                };

    win2.btOk = win2.g2.add('button', undefined, 'Ok');
    win2.btOk.preferredSize = [50, 20];
    win2.btOk.alignement = 'right';
    win2.btOk.onClick = function(){ saveOptions(btnTxt);
                                  win2.close();
                                };

    win2.cancelElement = win2.btCancel;
    win2.defaultElement =  win2.btOk;
    win2.show();
    function saveOptions(btnTxt){
      var strObj = "{";
      for( var chI = 0; chI<win2.pnl.children.length; chI++){
        var textCH = win2.pnl.children[chI].text;
        textCH = textCH.replace(/ /g, "_");
        strObj += textCH +":"+win2.pnl.children[chI].value +", ";
      }
      strObj = strObj.substring(0, strObj.length - 2);
      strObj += "}";

      var _varName = "";
      switch(btnTxt)
        {
          case 'getLBL':
            _varName = "_BCM_getLBLOptions";
            break;
          case 'replLBL':
            _varName = "_BCM_replaceLBLOptions";
            break;
          case 'delLBL':
            _varName = "_BCM_deleteLBLOptions";
            break;
        }
      strObj = _varName+ " = " + strObj;
      eval(strObj);

      // write options
      var thisFile = File($.fileName);
      var thisFileName = thisFile.fsName;
      var thisFilePath = thisFile.path;
      var optFile = new File(thisFilePath+"/extras/options.jsi");

      var strTW = "var _BCM_getLBLOptions = "+ _BCM_getLBLOptions.toSource() +";\
var _BCM_replaceLBLOptions = "+_BCM_replaceLBLOptions.toSource() +";\
var _BCM_deleteLBLOptions = "+_BCM_deleteLBLOptions.toSource()+";";
      
      // alert(strTW);
      optFile.open('w');
      optFile.write(strTW);
      optFile.close();
    }
  }
}

