---
comments: true
date: 2010-01-20 14:57:00
layout: post
slug: performance-test-with-as3-and-thousands-of-particles
title: Performance test with AS3 and thousands of particles
wordpress_id: 53
categories:
- General
---


    

I've never experimented with using bitmapData and the copyPixels() method to increase performance when animating a large number of particles so I thought I'd have a quick play to see what could be achieved. 

This demo has 2000 particles that bounce off the walls, have gravity and friction and are given a small motion blur and it manages a nice 24/25 fps (see the stats). <!-- more -->





[![](http://ianthomasnet.files.wordpress.com/2010/06/unknown.png?w=48)](http://www.ian-thomas.net/performance-test-with-as3-and-thousands-of-pa)



**emergentBehaviour2.swf**
[Download this file](http://posterous.com/getfile/files.posterous.com/anatomic/AcYszZEpiMnii3m3M8LtfYUHz9iazvEgFxvum3tsUzRbQeRopXNL6UTECjUc/emergentBehaviour2.swf)











  
As I said above, this is a first proper experiment where I've tried to bypass the Flash Player vector renderer and I'm amazed by the results! 

Click your mouse to restart the animation.


  
