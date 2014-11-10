---
comments: true
date: 2011-06-29 16:00:00
layout: post
slug: how-to-quickly-offer-a-preview-of-your-work-using-dropbox
title: How to quickly offer a preview of your work using Dropbox
wordpress_id: 126
categories:
- Quick tips
tags:
- Dropbox
- process
- Workflow
---

Have you ever needed to give a colleague or client a web-based preview of your current project?  Have you found the trudge of setting up some hosting, uploading the files and keeping them up-to-date to be a pain?  I have, and recently I found myself in a position where I had no hosting available so needed to find an alternative way to offer a preview of my work.<!-- more -->


### Dropbox my saviour


I was tipped off by my good friend Nick – [http://www.twitter.com/makeusabrew](http://www.twitter.com/makeusabrew) – that Dropbox’s public folder would allow me to get a URL for any files contained within it.  I use Dropbox almost religiously as my work folder so the ability to preview straight from it was brilliant _– and I can’t believe I’ve never used this feature before!_

Rather than copy the files over to the Public folder, I’ve simply used a bit of Terminal magic to set up a symbolic link to the preview files:







    
    ln <span class="argument">-s</span> ~<span class="other">/</span>Dropbox<span class="other">/</span>work<span class="other">/</span>project<span class="other">/</span>parent_folder<span class="other">/</span> ~<span class="other">/</span>Dropbox<span class="other">/</span>Public<span class="other">/</span>preview<span class="other">/</span>








From there, it’s just a case of right-clicking the newly created preview folder and choosing Dropbox > Browse On Dropbox Website.


### Getting the preview link


Once you’re viewing your folder on the Dropbox website, choose the file you want to showcase (in my case it was an index.html) and click ‘Copy public link’ (if you can’t find it, click the down facing arrow on the far right hand side).

You can then either copy the full link or create a shortened version that you can send on to whomever you like.

That’s it! A preview that is always up-to-date and publicly available without the need to set up hosting or ftp files.

_Just a note, obviously this puts your work on a public URL (although it’s not going to be indexed by google) so be careful about how you share the link if you have commercially sensitive work to preview!_
