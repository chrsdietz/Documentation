---
layout: page-with-sidebar
title: XAPP for Streaming
summary:
categories:
  - iOS
---
<div class="alert alert-warning" role="alert">
  <b>Warning:</b> This documentation is preliminary and for a feature that is not yet released
</div>

<div class="alert alert-info" role="alert">
  Streaming support is currently only available for iOS
</div>

In addition to on-demand internet radio experiences, XAPPs can also be injected to live streams.  If you have a streaming solution with ad injection, you can also inject XAPP Interactive audio.  

# Requirements

* Streaming Server with Ad Injection
* Ad Injection can accommodate VAST/DAAST redirects or third party creatives
* XAPP SDK integration within the app


# XAPP SDK Integration

<div class="alert alert-info" role="alert">
  <b>Important:</b> This documentation assume you have already added the XappAds SDK to your project, if you haven't go <a href="/ios/get-the-sdk">here</a> first.
</div>

## Implement the XAStreamingDelegate

The [XAStreamingDelegate](/ios/sdk/3.12.0-RC3/html/Protocols/XAStreamingDelegate.html) receives callbacks from the XAPP SDK on events that occur during XAPP playback.

```objc

#import <XappAds/XAStreamingMonitor.h>

//Declare that your class implements the XAStreamingDelegate protocol
@interface WXAPViewController () <XAStreamingDelegate>

@end

#pragma mark - XAStreamingDelegate Protocol

- (void)mute {
    //During the listening period, mute will be called to ensure the stream is quiet
    [self.stream mute];
}

- (void)unmute {
    //At the end of the listening, the stream can be unmuted
    [self.stream unmute];
}

- (void)stop {
    //After the listening period, if the action requested by the user will
    //  conflict with the live stream, the monitor will request that the stream
    //  be stopped to prevent a bad user experience
    [self.stream stop];
}

- (void)restart {
    //If the stream was requested to be stopped, it will then be requested to restart
    // when the monitor has finished all the actions.  
    [self.stream play];
}

```

## Initialize the Streaming Monitor

The SDK must be initialized with your credentials to in order to have access to the XAPP creative.  Place the following to trigger early in your app's startup workflow:

```objc

[XAStreamingMonitor initMonitorWithAPIKey:apiKey
                       withApplicationKey:appKey
                          withAdsDelegate:self
                             withUserData:nil];

//The in-app browser is displayed for interactions that load a website,
//  a root view controller is needed to display the browser from
[XAStreamingMonitor setRootViewControllerForInAppBrowser:self];

```

## Listen for Metadata

The audio for the XAPP is already built into the stream however relies on metadata that is passed along in the stream to trigger loading the data (actions, trailing audio, etc.) associated with the XAPP.  The basic workflow is as follows:

1. Metadata from the stream is parsed and determined if it is for XAPP.
  An example is `Xapp-20.920-Flowers` where `Xapp` is the prefix to differentiate the ad, `20.920` is the length of time from start of play to when the listening period is and `Flowers` is the name of the creative.
1. The XAPP metadata is used to create a `XAStreamingAd` and passed to the `XAStreamingMonitor`
1. The streaming monitor controls loading the data associated with the XAPP and start listening for speech from the user
1. Most actions the user can perform do not require stopping the stream however if the action takes longer than the filler audio, the monitor will alert the stream to stop through the delegate

```objc
//Metadata is received, parsed immediately and used to build a XAStreamingAd
XAStreamingAd *streamingAd = [XAStreamingAd alloc] initWithAdName:adName]; //adName is 'Flowers'
streamingAd.adStartMark = marker; //marker is 20.920

//Pass the ad to the streaming monitor
[XAStreamingMonitor onXappMark:streamingAd
                      loadXapp:^(NSError *error, BOOL success) {
                          //XAPP is loaded
                      } startedPlayback:^(NSError *error, BOOL success) {
                          //XAPP Started Playback
                      } xappComplete:^(NSError *error, BOOL success, XAAdResult *result) {
                          //XAPP is complete
                      }];
```
