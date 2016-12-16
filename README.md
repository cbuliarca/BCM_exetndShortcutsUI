# BCM_exetndShortcutsUI
Collection of Photoshop scripts accesed with an UI. 

Just download the reopsitory extract it somewhere on your computer. Then create a shortcut for the BCM_exetndShortcutsUI folder and copy it
into your Photoshop Installation Folder/Presets/Scripts the default path is this:("c:\Program Files\Adobe\Adobe\Adobe Photoshop CC 2017\Presets\Scripts")

Works with Photoshop CS4 >>> CC 2017

These are some help videos:
The videos are old, and the ui tool has been changed a bit but the ideea is the same...

https://www.youtube.com/watch?v=2_x1LerZfek

https://www.youtube.com/watch?v=EkQXvMXDdX4


Scripts in the collection:

1. **Adjustment Layers** - just for fast acces of some adjustment Layer creation. I find it faster to use shortcuts, then to go click in the interface

2. **Change Color** - change foreground color with mouse gestures : https://www.youtube.com/watch?v=vIG2D9nRwaA, or with the shortcuts

3. **Saves**
  * **Save** - simple save
  * **Save as** - simple save As
  * **Backup** - create an .7zip archive for the current .psd file and incermental rename it
  * **Save Major**- add two suffixes like "_v01_v01" ,increment the first one and set the second one to 01
  * **Save Minor**- add two suffixes like "_v01_v01" and increment the last one

  * **BCM Panel Save Maps** - save main groups by some rules: https://www.youtube.com/watch?v=tG2tQT7KpIo&t=2s
  * **BCM Panel Customize**- https://www.youtube.com/watch?v=tG2tQT7KpIo&t=2s
  * **BCM Panel Albedo Check**- https://www.youtube.com/watch?v=tG2tQT7KpIo&t=2s
  * **BCM PAnel Delete Albedo Check**- https://www.youtube.com/watch?v=tG2tQT7KpIo&t=2s

4. **Select layers by Color**- select all layers that have the same color in the layer palette

5. **Special Layers**: set some layers as special and use some scripts for them even if they are not selected:
  * **SET** : set selected layers as special
  * **Append**: append selected layers to the special layers list
  * **Tgl Vis**: toggle visibility for the special layers
  * **Select one by one**: 
  * **Select all special layers**:
  * **Show one by one**:

6. **Special Sets**: it's like linking some layers and use some scripts for them. This is to be used when you have the same layer duplicated in other places and you want that layer to be updated
    https://www.youtube.com/watch?v=HHHVc4588f0

7. **Tools**:
  * **Show Only Sel**: shows only the selected layers, it's a toggle
  * **tgl Vis**: toggle visibility for the selected layers
  * **selParent**: select the parent group
  * **TglVisMainParent**: this toggles visibility for the mmain parent group.
  * **tglGroup**: this opens and close the group
  * **grpClipLayers**: when you press Alt + Click between some layers, the layer above will be clipped by the layer below,
  *    this script takes the selected layers and clip them by the layer below them.
  * **openMayaUvs**: just open the default outUV.tga saved from Maya
  * **to Smart Object**: takes selected layers and convert them into a Smart Object Layer
  * **select Brush by Name**:
  * **select Layers By Name**: - search into layers by name and select them
  * **rename**: rename the selected layer. Not my script. Don't know the author. If it's yours please let me know to credit you :)
  * **only sibilings**: selects only the layers and groups on the same level with the selected layer
  * **add sibilings**: add to selection only the layers and groups on the same level with the selected layer
  * **sel Backward**: select the Backward layer even it is hidden
  * **sel Forward**: select the Forward layer even it is hidden
  * **add Backward**: add to selection the Backward layer even it is hidden
  * **add Forward**: add to selection the Forward layer even it is hidden
  * **SolidColor**: create a solid color layer
  * **Color Picker**: opens the color picker for the selected -Solid Color, if there is a normal layer selectd, or a mask, the color Picker will change the foreground color
  * **Split Colors**: - split the selected layers to multiple Solid Colors, used for spliting ID maps, you can use it to bild like a posterize effect.... 
  * **overlay Date&Time from Metadata**: 
  * **BCMPanel Array**- duplicate and transform the current layer: https://www.youtube.com/watch?v=JMLNMlKIBrE

8. **Link Brush To Layer**: take the selected Brush and attche it to the layer, so when you come back to that layer you can 
    get that brush again, also the color you used with it

9. **Mask Uitils**: basicaly mask options for multiple selected layers.
  * **Apply Masks**: apply the mask to all the selected layers
  * make Masks: make masks for all the selected layers, if there is something selected the masks will be created from selection, if not it will create an white masks
  * **select from masks**: like Ctrl+Click on the mask, but this for multiple layers selected
  * **delete masks**: delete all the masks for the selected layers
  * **create masks from transparency**: create masks from each selected layer transparency
  * **toggleDisableMasks**: for the selected layers
  * **toggle link masks**: for the selected layers

10. **Event Magic Wand**: using a hot layer for the magic wand, even it is not selected
    https://www.youtube.com/watch?v=Lrrs1YDh7fw

11. **Presentation**: 
  * **ImportFolder**: import files from a folder, adding a mask. Ex: if there is a folder with some renders named BPR_Render1.jpg and BPR_Mask1.jpg, the tool will copy the BPR_Mask1.jpg into the mask for BPR_Render1.jpg, the condition is that the first two fileds in the ui should be _Render and _Mask. If there is not specified the mask filed, it will make a mask from the Alpha1 channel. Done to use it for charater sheet presentation

12. **Other's scripts from the WEB**: -not my scripts, I can't take credit for them. You can contribute with your scripts   here.
  * **Materials Masks by passerby**: cool scripts used basically for duplicating and updating layers from one main group(Material) to another, for games texturing. 
  *   Created by Chris Cunningham
  *   http://polycount.com/discussion/135456/psmasksync-photoshop-script
  * **Corner Editor** - cool script to adjust the corner of a shape, works only with 4 corners. 
  *   Created by David Jensen @
  *   http://photoshopscripts.wordpress.com/
  * **Split To Layers**: This script will separate each contiguous group of pixels to its own layer.
  *   Created by David Jensen @
  *   http://photoshopscripts.wordpress.com/

