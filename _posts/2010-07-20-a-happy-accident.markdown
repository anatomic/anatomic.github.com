---
comments: true
date: 2010-07-20 22:19:00
layout: post
slug: a-happy-accident
title: A happy accident
wordpress_id: 19
categories:
- General
tags:
- Actionscript
- AS3
- Flash
- HYPE
- Particles
---


    

Whilst playing with extending the HYPE framework I stumbled across this happy accident. It's not really what I'd intended the piece to do, but I think it looks really cool anyway.<!-- more -->





[![](http://ianthomasnet.files.wordpress.com/2010/07/unknown.png?w=48)](http://www.ian-thomas.net/a-happy-accident-0)



**Main.swf**
[Download this file](http://posterous.com/getfile/files.posterous.com/anatomic/wQYKnbiXYVVTWmdJ5qQrqxdzeqKhC89fgktP1pcAHygBMyQrsdDKI2o382hU/Main.swf)











I'm using the ObjectPool along with some customised swarm code to move 50000 pixel particles around the screen. Not that you can tell from this, but there is an underlying shape from which each particle gets a target point. Each particle is drawn to a bitmap which has a slight colorTransform applied to give the fade and colourise effect. 

Currently the particles are given a randomly generated colour, but this will be extended to use custom colours. The next step, however, will be to use multiple bitmaps and apply funky blend modes, check back later for a bit more of that! 

This example was coded in the brilliant FDT 4 M3 (I really recommend people get hold of this if they haven't already) and Flash Pro CS5. I'm becoming firmly convinced that this setup is the best Flash/Actionscript workflow you can have (probably another post about that though!).


  
