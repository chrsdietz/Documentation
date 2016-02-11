---
layout: page
sidebar: true
sdk_agreement: true
title: Audio Sessions
categories:
 - iOS
 - AudioSession
---

# Recommended Audio Session Settings

You can set the session to either AVAudioSessionCategoryPlayback or AVAudioSessionPlayAndRecord with option AVAudioSessionCategoryOptionDefaultToSpeaker.  We do use AVAudioSessionPlayAndRecord however we will set it if it is not set at the time of ad playback.

As of iOS 7, use of the microphone by an application requires the user to grant permission.  If you do use AVAudioSessionPlayAndRecord, it will immediately ask the user for permission on the first time the app is used.  To the end user, seeing a microphone permission request may be unexpected.  We recommend creating a custom workflow that explains to the user why you need use of the microphone.  Please see [Microphone Permission](https://github.com/XappMedia/XappAds-iOS/wiki/Microphone-Permission) for example code on how to request permission.  If microphone permission is not granted before an ad request is made, the request will fail.

# Plugin Audio Session Manipulation

Immediately before the plugin begins to play an advertisement, the plugin checks to see if the proper audio session category, options, and mode are set.  If the audio session is already in AVAudioSessionPlayAndRecord, no action is taken.  If not, the category is changed and set active.

At the end of ad playback, if the audio session category was different than AVAudioSessionPlayAndRecord at the start of playback the category will be changed back.  

# Audio Session Category Option AVAudioSessionCategoryOptionMixWithOthers

We have found that having AVAudioSessionCategoryOptionMixWithOthers set as an option, audio will not prepare properly when in the background.  We recommend not setting AVAudioSessionCategoryOptionMixWithOthers as an option if you expect background playback.

# Audio Sessions and Bluetooth

If you do decide to use AVAudioSessionPlayAndRecord, be careful with the option AVAudioSessionCategoryOptionAllowBluetooth.  If the end user is connected to a bluetooth device with this category and option, it will automatically force the playback into a hands free profile that has lower quality audio playback.  
