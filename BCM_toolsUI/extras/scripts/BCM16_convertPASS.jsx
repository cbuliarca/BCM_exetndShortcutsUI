/*
<javascriptresource>
  <name>BCM16> convertPASS...</name>
  <category>BCM</category>
</javascriptresource>
*/

main();

function d2h(d) {
    return d.toString(16);
}
function h2d (h) {
    return parseInt(h, 16);
}
function h2decimal (h) {
    return parseInt(h, 10);
}
function stringToHex (tmp) {
    var str = '', tmp_len = tmp.length,c;
    // var cPorgress = progressWindow.bar.value;


    for (i=0; i < tmp_len; i += 1) {
		c = tmp.charCodeAt(i);
		if(d2h(c).toUpperCase().length == 1)
		{
			str += "0"+d2h(c).toUpperCase() + '';
			
		}
		else{
			str += d2h(c).toUpperCase() + '';
		}
		// alert("__c :"+c.toString().length+" __str: "+str);
		// progressWindow.updateProgress(cPorgress + i*(17/tmp_len));
    }
    return str;
}
function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function cvt(mode, mbFile){
	// var pp_1 = new File(File($.fileName).path +"/pp_1.txt");
	if(mode == 'decode'){

		var pp_1 = mbFile;
		var pp_2 = new File(mbFile.path +"/pp_decoded.txt");

		pp_1.open('r');
		var ss = pp_1.read();
		pp_1.close();
		var ss2 = hex2a(ss);

		pp_2.open('w');
		pp_2.write(ss2);
		pp_2.close();
		pp_2.execute();

	}
	if(mode == 'encode'){
		var pp_2 = mbFile;
		var pp_1 = new File(mbFile.path +"/pp_encoded.txt");

		pp_2.open('r');
		var ss = pp_2.read();
		pp_2.close();
		var ss2 = stringToHex(ss);

		pp_1.open('w');
		pp_1.write(ss2);
		pp_1.close();

	}
}

// cvt('decode');
// main('encode');
function main(){
	var win = new Window( 'dialog', 'cvtPass',undefined,{resizeable:true,closeButton:true,borderless:false});
	g = win.graphics;
  	var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.1, 0.1, 0.1, 1]);
  	g.backgroundColor = myBrush;
  	g.disabledBackgroundColor = myBrush;
  	var myPen = g.newPen(g.PenType.SOLID_COLOR, [0.8, 0.8, 0.8, 1], 20); // this is the font color
	g.foregroundColor = myPen;
	g.disabledForegroundColor = myPen;
		win.opacity =.95;
		win.spacing = 0;
		win.indent = 0;
		win.orientation='column';
		win.preferredSize = [200,200];

		win.g1 = win.add('group');
		win.r1 = win.g1.add('radiobutton', undefined, 'decode');
		win.r2 = win.g1.add('radiobutton', undefined, 'encode');
		win.r1.value = true;

		win.b1 = win.add('button', undefined, 'browse');
		win.b1.alignment = 'fill';
		win.b1.onClick = function(){
			var mbFF = new File(app.openDialog());
			if(mbFF){
				if(win.r1.value == true){
					cvt('decode',mbFF);
				}
				else{
					cvt('encode',mbFF);
				}
				win.close();
			}
		}

	win.show();
}
