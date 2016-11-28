psMaskSync
==========

Keeps layerSet masks in sync in Photoshop. This is desgined to work within a PBR workflow,
to make painting material masks easier.

Installation
------------
For Photoshop CS4:
Double click the ```psMaskSync_CS4.mxp``` package, to let Adobe Extension Manager install it.

For Photoshop CS5 or higher:
Double click the ```psMaskSync_CS5Plus.zxp``` pacakge to let Adobe Extension Manager install it.

Install Actions:
If you want access to these scripts in the actions pallet, go to 
```File > Scripts > psMaskSync - Install Actions```

Usage
-----
All the scripts can be accessed via the scripts menu in.
```File > Scripts```

For the “Sync All” and “Sync Selective” commands to work you must have a layerSet selected with a mask applied,
and it will take the mask and copy it into the layerSet masks of any layers in your document that share the same name.

The “Create Material” command is just for easily create multiple layerSets at a time, within the right hierarchy.
