/*
<javascriptresource>
  <name>BCM17> createBackup...</name>
  <category>BCM</category>
</javascriptresource>
*/
//create a .7z archive of the current document in the backup folder
main();

function main(){
// 	CD /d F:\work\_arkane\_BSP
// "C:\Program Files\7-Zip\7zG.exe" a -t7z "F:\work\_arkane\_BSP\backup\Teeth_d.7z" Teeth_d.tga
	
	var doc = app.activeDocument;
	try{ doc.save()}catch(err){alert('the document is not saved yet');return};
	var docF = new File( doc.fullName );
	var theBackupFld = new Folder(doc.path + "/backup");
	var copyedFile = new File(theBackupFld+"/"+doc.name);
	docF.copy( copyedFile );


	var fsPth =  new Folder(doc.path).fsName;
	var docNm = doc.name.substring(0,doc.name.lastIndexOf("."));	

	var theBackupFld = new Folder(doc.path + "/backup");
	var nb0 = 0;

	if( theBackupFld.exists ){
		var theExistFiles = theBackupFld.getFiles("*.7z");
		for( var i = 0; i<theExistFiles.length; i++){
			var nmArr = theExistFiles[i].name.split("_bv_");
			if( nmArr[0] == docNm){
				var nb1 = parseFloat(nmArr[1].substring(0, nmArr[1].lastIndexOf(".")));
				if( nb1 > nb0){
					nb0 = nb1;
				}
			}
		}
	}
	else{
		theBackupFld.create();
	}
	// alert(copyedFile.name);
	nb0 = nb0+1;
	var cmdStr = "CD /d " +doc.path.fsName+ "\\backup\n";
	cmdStr += ('"C:\\Program Files\\7-Zip\\7zG.exe" a -t7z "'+doc.path.fsName+'\\backup\\'+ docNm +'_bv_'+ nb0 +'.7z" '+copyedFile.name+'\n');
	cmdStr +=('DEL '+copyedFile.name);

	var batF = new File(Folder.temp + "/bakup.bat");
	batF.open('w');
	batF.write(cmdStr);
	batF.close();
	batF.execute();

}