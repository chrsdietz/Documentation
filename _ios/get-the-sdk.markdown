---
layout: page-with-sidebar
title: Get the SDK
summary: The different ways to integrate the SDK to your project
categories:
 - iOS
---

# Drag & Drop

First, download the latest SDK [here](/ios/sdk/download).

Then drag and drop `XappAds.framework` to your project, selecting 'Copy if needed' to make sure it creates a copy and not a reference.

For your build target, make sure the XappAds.framework is included under 'Link Binary With Libraries' on the 'Build Phrases' tab and also add the following dynamic library dependencies:

 *  Accelerate.framework
 *  AdSupport.framework
 *  AudioToolbox.framework
 *  AVFoundation.framework
 *  CFNetwork.framework
 *  CoreMotion.framework
 *  CoreTelephony.framework
 *  MediaPlayer.framework
 *  MobileCoreServices.framework
 *  QuartzCore.framework
 *  Security.framework
 *  SystemConfiguration.framework

# CocoaPods

[CocoaPods](https://cocoapods.org/) is a dependency manager for iOS, see their [getting started](https://guides.cocoapods.org/using/getting-started.html) on how to install and use.

In your podfile, add the following dependency:

```
pod 'XappAds'
```

then update:

```
pod update
```

# Carthage

We are excited about [Carthage](https://github.com/Carthage/Carthage) but unfortunately cannot provide support for this as a distribution method yet.  Carthage [only supports dynamic frameworks](https://github.com/Carthage/Carthage#supporting-carthage-for-your-framework), which is only iOS 8.0 and up however we still support iOS 7.  We will make the transition to a dynamic framework when we drop iOS 7, which will be when iOS 10 is released.  
