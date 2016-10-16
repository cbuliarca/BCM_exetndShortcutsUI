#include "../testColorChange.jsxinc";
#include "chProcent.jsxinc";
var cl = app.foregroundColor;
// alert(cl);
chColor( 'red', mb_Procc);

app.foregroundColor.hsb.saturation = cl.hsb.saturation;
app.foregroundColor.hsb.brightness = cl.hsb.brightness;

var cl2 = app.foregroundColor;
