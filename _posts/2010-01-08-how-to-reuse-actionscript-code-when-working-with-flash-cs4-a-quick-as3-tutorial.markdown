---
comments: true
date: 2010-01-08 15:55:00
layout: post
slug: how-to-reuse-actionscript-code-when-working-with-flash-cs4-a-quick-as3-tutorial
title: How to reuse actionscript code when working with Flash CS4 - a quick AS3 tutorial
wordpress_id: 55
categories:
- General
---


    

Just a quick one this, hopefully showcasing how to use classes with MovieClips in Flash CS4.  I'll cover two basic methods, one ties different MovieClips to a base class and the other re-uses a button class.







**Making a reusable button**







To keep it quick and easy this will be a simple fade in and out effect on a button so start off by making a button design that contains a dynamic text field with an instance name of 'label'.





![Picture_34](http://ianthomasnet.files.wordpress.com/2010/01/picture_34.png?w=300)








Once our MovieClip is created, it needs to be setup to export for ActionScript.





![Picture_35](http://ianthomasnet.files.wordpress.com/2010/01/picture_35.png?w=214)











First, open the properties for the symbol in the Library, then tick the 'Export for ActionScript' box and fill in the correct linkage. 





[![Picture_36](http://ianthomasnet.files.wordpress.com/2010/01/picture_36.png?w=279)](http://ianthomasnet.files.wordpress.com/2010/01/picture_36.png)








Notice here that for the class I've typed in net.anatomicdesign.Button - this is something that I'd encourage any developer to do as it is industry best-practice.  For small things like this it doesn't make too much sense, but on larger projects organising your classes into proper packages is really important so it's good to get into good habits.







From here, create a new ActionScript3 document called Button.as and save it in the folder net/anatomicdesign/ (or whatever the package names are that you choose to use).








[![Picture_37](http://ianthomasnet.files.wordpress.com/2010/01/picture_37.png?w=300)](http://ianthomasnet.files.wordpress.com/2010/01/picture_37.png)








Now it's just a case of filling in the code.  I normally start off by deciding what I want to happen in a class and then building up functionality from there so, for the button class we'll typically need event listeners for mouse over, out and click.  From here, you can go on to insert the code needed to animate the button (perhaps using a Tweening library such as TweenLite) in the correct functions.  Note that if the button needs any setting up, that code should be added to the constructor (the function that is given the same name as the class).  For this example, I'm adding a parameter to the button that sets the button's label and I'm also going to alpha out the button slightly.








[![Picture_41](http://ianthomasnet.files.wordpress.com/2010/01/picture_41.png?w=300)](http://ianthomasnet.files.wordpress.com/2010/01/picture_41.png)











To use the button you can either place instances on the stage and set the labels using timeline code (using the setLabel function) or you can simply delete the instance from the stage and add the button using code such as







`var buttonA:Button = new Button('First Button');`







**Giving different button designs the same functionality**







A slight twist on the previous example is using a base class to provide the same functionality to different MovieClips.





[![Picture_39](http://ianthomasnet.files.wordpress.com/2010/01/picture_39.png?w=300)](http://ianthomasnet.files.wordpress.com/2010/01/picture_39.png)








Instead of linking the Class to the Button.as, we'll leave the name the same as the Symbol name and instead set the Base Class to be Button.as








[![Picture_40](http://ianthomasnet.files.wordpress.com/2010/01/picture_40.png?w=279)](http://ianthomasnet.files.wordpress.com/2010/01/picture_40.png)








Doing this, Flash will create a unique class for the button at runtime, but it will inherit the super class' functions.  So if Button.as (at its most basic) looked something like the code below, any button that had the Base Class set to Button.as would be  ready with listeners setup for mouse over, out and click.  This could be taken further if you wanted them to have the same animation/tweened properties by adding the appropriate code to the relevant functions.











[![Picture_42](http://ianthomasnet.files.wordpress.com/2010/01/picture_42.png?w=300)](http://ianthomasnet.files.wordpress.com/2010/01/picture_42.png)











Hope this helps out some people that are just getting to grips with Object Oriented Programming within Flash using ActionScript 3.  AS3 is really powerful and a lot faster than AS2 so keep plugging away if you're struggling, it'll all be worth it in the end!!








  
