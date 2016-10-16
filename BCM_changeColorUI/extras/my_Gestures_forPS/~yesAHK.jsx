// alert('yes');
var desc2MB = new ActionDescriptor();
desc2MB.putString(0, "YES"); 
app.putCustomOptions('6dbf01a0-a36b-11e4-bcd8-0800200c9a66', desc2MB, false );
var gestFile00 = new File( File($.fileName).path + '/Gestures.ahk' );// when runned for the first time set gestures on
gestFile00.execute();