---
comments: true
date: 2009-10-13 20:28:09
layout: post
slug: consuming-web-services-from-adobe-flash-or-now-you-see-me-now-you-dont
title: "Consuming web services from Adobe Flash (or now you see me, now you \tdon't)"
wordpress_id: 109
categories:
- General
---


    I wonder if I'm missing something here. Today I tried to setup a flash widget to bring in a feed from Twitter, in the Flash IDE this was, of course, no problem.  I got the data, parsed it and displayed it just how I wanted.  This wasn't quite the case when I deployed to the web (of course).  I was greeted by the usual security error when trying to pull in data from another domain.

Freely admitting that I'm not so hot on the intricate details of the Flash security sandbox, I guess this means that Twitter doesn't have a cross domain policy file (seems strange).  So I did the obvious thing, wrote some php that pulled the feed from Twitter so that my little Flash app thought it was coming from my domain.

This little song and dance seems crazy to me, why not just let me get at that xml in the first place? 

I can tell a good few hours reading up on this is required, but it just puzzled me.  The solution was easy enough but it seems wholly unecessary.
  
