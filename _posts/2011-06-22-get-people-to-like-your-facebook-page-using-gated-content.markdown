---
comments: true
date: 2011-06-22 14:45:00
layout: post
slug: get-people-to-like-your-facebook-page-using-gated-content
title: Get people to like your Facebook page using gated content
wordpress_id: 6
categories:
- Social Media
tags:
- Facebook
- iFrame
- Javascript
- php
---

One of the challenges that faces owners of Facebook Pages is the need to get visitors coming back. It can cost a lot of time, energy and money to get users returning to your page but thankfully Facebook has a feature that can make it easier to stay in touch, the like button.

Getting a user to like your page does two things. Firstly it means that updates from your page (such as your status updates or posting of photos) show up in their newsfeed and, secondly, the news that they like your page is shown across their friends' newsfeeds.

Ideally, we want to get a user to like the page and then have them return regularly to post messages or like updates, repeatedly spreading content from your page to their friends which in turn will hopefully lead to more people clicking the like button.

To make liking the page a more enticing offer it is possible to show non-fans a specific tab when they arrive and within that tab offer some exclusive content if they click the like button. In the past I’ve used this technique to show exclusive videos, give access to competitions or show an interview with a celebrity; the content can be anything, it just needs to be attractive enough to get the user to click the button.<!-- more -->


## The old way


Previously creating this gated content (or fan gate) was simply a case of installing the static FBML application to your page, creating your content and using a small bit of FBML to say that if the user didn’t like the page then don’t show the content. Simple!

Sadly, this easy implementation was lost when Facebook retired the static FBML application earlier this year.


## Finding out if a user likes you


Initially on investigating the new iFrame custom tab system it seemed like you would have to request permissions from the user to check through the pages that they have liked. This is a problem as requesting permissions is often a huge barrier to completion and, where possible, I always try to avoid asking.

_Just as a side note, if you do need to request permissions, make sure you only ask for the bare essentials, users are very picky about accepting when you ask for the moon on a stick, especially if they think you stand to gain more than they will._

If your user is viewing your content anywhere other than on your page (i.e. in a Facebook Application or away from Facebook) then you will need to request permissions to check their status. However, when viewing a custom tab we have access to some extra (anonymous) data that tells us exactly what we need to know.


## The signed_request


If you’re read my previous post about the transition from static FBML to iFrames for custom tabs you’ll have seen that Facebook requests our content via a HTTP POST request. In the POST request is a signed_request value that contains information about the user, including data to say if they are already a fan or not!

The big thing here is that it is anonymous, Facebook is giving us an insight into the user but is not telling us who they are. It’s not as simple as the old FBML way, but it’s better than requesting permissions.

To get to the data you need to process the signed_request, below is some example code that I have used previously to find out the status of a user as a fan.







    
    list($encoded_sig, $payload) = explode('.', $_POST['signed_request'], 2);
    
    $sig = base64_decode(strtr($encoded_sig, '-_', '+/'));
    $data = json_decode(base64_decode(strtr($payload, '-_', '+/')), true);
    
    $expected_sig = hash_hmac('sha256', $payload, $your_application_secret, $raw = true);
    if($sig != $expected_sig){
        //oops, the signed_request wasn't what it should be so we can't trust it.
        //need to handle this error gracefully
    }
    else{
        //excellent, the data is valid
        //now check to see if the user is a fan
        if($data['page']['liked']){
            //great, the user likes the page
            //show the extra content
        }
        else{
            //not a fan yet
            //let's dangle the carrot that makes them click like
        }
    }










## What happens when someone clicks like


Depending on how you have decided to allow users to like your page there are a couple of different ways to check their fan status.



	
  1. If a user clicks the main like button at the top of your page, the page will automatically refresh on your application and your code should have seen the change in their fan status through the signed_request and show content accordingly.

	
  2. If, however, you have implemented a second like button, typically with xfbml and the Javascript SDK, you will need to create a Javascript function that listens for the edge_create event. When this event is triggered you can either use Javascript to reveal the content or, as I have done in the past, you can cause the browser to reload the page in a similar fashion to clicking the main like button at the top of the page.


The code to subscribe to the clicking of a like button to become a fan is as follows:







    
    FB.Event.subscribe('edge.create', function(){
        self.parent.location.href='url_to_show';
    });










## In conclusion


There you have it, a quick overview of how to use the data presented by Facebook’s signed_request to see whether a user is a fan or not. As with anything on the net, it is important to consider the intentions of users and try to produce content and interactions that match their motivations. If you have great content that you need people to share, something like a fan gate can be a great way to get your content shared across Facebook.

_If you liked this post please share it!_
