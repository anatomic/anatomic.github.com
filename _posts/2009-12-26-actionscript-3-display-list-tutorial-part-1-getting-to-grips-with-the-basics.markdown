---
comments: true
date: 2009-12-26 13:17:00
layout: post
slug: actionscript-3-display-list-tutorial-part-1-getting-to-grips-with-the-basics
title: 'Actionscript 3 Display List Tutorial Part 1: Getting To Grips With The Basics '
wordpress_id: 58
categories:
- General
tags:
- actionscript 3
- Flash
- tutorial
---


    

I've been meaning to write a little introduction to the Display List for quite some time so hopefully this post will provide some very useful tips and tricks for people that are just delving into working with AS3. It's not an advanced tutorial but hopefully there'll be something of use to most Flashers!

 To start with AS3 is different to AS2 in that a display object doesn't have access to the Stage until it is added to the display list. This is a key thing to keep in mind when working with movieclips and sprites in code, especially when trying to initialise a movieclip that needs to know the stage size before it is added to the display list. This might sound weird if you're new to Flash and haven't touched AS2, but if you're coming from AS2 it's an important change to the way everything works. With that out of the way, what is the display list?

 **Display List Basics**  
Think of the Display List like a family tree. Sitting at the top is the Stage, it's the top level display object container and if you want to have something visible to the user then that movieclip (or sprite) needs to be added as a child to the stage. This looks something like this:

 `
  stage.addChild(myDisplayObject);
 `

 With AS3 you don't necessarily need to write that line of code, especially if you are working with a Document Class. Typically you will write the code like this

 `
  this.addChild(myDisplayObject); //when working inside the Document Class
  myDocumentClass.addChild(anotherDisplayObject); //when working with a class that holds a reference to the Document Class
 `

 Now, in this family tree business you don't have everyone with one parent (that would be madness) - you have variations generations of parents and children (who can become parents themselves). The Display List works in a similar way with Movieclips and Sprites having functionality to be parents to other Movieclips (and Sprites) as well as children. In its simplest form this means that you can add Movieclips to other Movieclips as children. The key thing here is that an object can only have one parent, but (unlike the family tree metaphor) that parent can be changed at any time. You can also remove an object from the Display List completely. The following example shows some variations of adding, re-parenting and removing objects from the Display List.

 `
  var a:MovieClip = new MovieClip();
  var b:MovieClip = new MovieClip();
  var c:MovieClip = new MovieClip();
 
  stage.addChild(a); //add the first movieclip to the stage
  b.addChild(c); //add c to b. NOTE: neither of these two clips are on the stage yet, as the parent hasn't been added to the display list
  a.addChild(b); //now all three are visible as a is the parent of b and a has already been added to the display list
 
  a.addChild(c); //we have re-parented c from b to a so both b and c are children of a
 
  a.removeChild(b); //the only items visible now are a and c
 `

 The order that you add children to a parent determines their depth in the list, with the last added child being the highest up in the Display List. This is important to remember if you find that objects are hiding other objects in a way that you don't want. If you find yourself in this situation you can simply add the hidden object again (no need to remove it) and that will move it to the top of its parents list.**

 What Else Can You Do With This?  
**This is working with the display list at its most basic and doesn't really hold much of interest other than getting your objects to be viewable by the user. I'll go over some more advanced techniques in the next part of the tutorial (which starts to look at other functions that allow you to work with the Display List) but as a parting shot I'll just cover some ways to hide objects from view.

 The Flash Player isn't the most performance savvy piece of software so whenever possible you have to lighten it's processing load to get the best possible performance and hiding objects is one little tip that can claw back precious miliseconds of processing. Simply put, setting a Movieclip's alpha value to 0 will still result in a performance hit as it will still be rendered by the Flash Player. Typically if you are going to set alpha to 0, you should also set visible = false for that object so that the Flash Player will ignore that object when doing a render. It doesn't seem like much when you're working on a small project, but if you start working with a large number of Movieclips this sort of optimisation becomes absolutely essential.

 Lastly, if you're not going to need a Movieclip for quite some time (if at all) then it's best to remove it from the Display List altogether. To sum up:

 `
  myClip.alpha = 0; //bad
 
  myClip.alpha = 0;
  myClip.visible = false; //better
 
  stage.removeChild(myClip); //best - substitute stage for the clip's parent
 `


  
