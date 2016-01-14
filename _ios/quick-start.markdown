---
layout: page-with-sidebar
title: Quick Start
summary: Everything you need to know to get started on iOS
categories:
  - iOS
  - Quick Start
---

# Adding XappAds to your Project

## Using Cocoapods

Add the pod to the desired target:

```ruby
pod 'XappAds'
```

## Alternate methods

See our [guide](/ios/get-the-sdk) for alternate methods for integrating the SDK to your project.

# Basic Usage
In addition to these basic usage instructions, please see the example code.

## Implement the Delegate

Set up an object that implements the XappAdsDelegate protocol.  More often than not this will be your primary UIViewController.  Within the header file (.h), import the delegate from XappAds.framework:

```objective-c
#import <XappAds/XappAds.h>
```

Declare that the class implements the XappAdsDelegate protocol:

```objective-c
@interface UIMainViewController : UIViewController <XappAdsDelegate>
```

Implement the required methods:

```objective-c

#pragma mark - XappAdsDelegate Methods

#pragma mark - Initialization

- (void)onXappAdsStarted {
    NSLog(@"XappAds started");
}

- (void)onFailedXappAdsStart:(NSError *)error {
    NSLog(@"XappAds failed %@", error ? [NSString stringWithFormat:@"with error: %@", error.localizedDescription] : @"");
}

#pragma mark - Ad Requests

- (void)adRequest:(XAAdRequest *)request didFinishLoadWithView:(XAAdView *)view {
    NSLog(@"Ad Request received");
}

- (void)adRequest:(XAAdRequest *)request didFailLoadWithError:(NSError *)error {
    NSLog(@"Ad request failed %@", error ? [NSString stringWithFormat:@"with error: %@", error.localizedDescription] : @"");
}

#pragma mark - Ad Lifecycle

- (void)adFinishedPlayBack:(XAAdView *)adView withResult:(XAAdResult *)result andError:(NSError *)error {
    NSLog(@"Ad finished playback");
}

```

## Setup for Deferred Actions

Implement the deferred action workflow for backgrounded actions, for more information see XADeferredManager.  In your UIApplicationDelegate:

```objective-c
#import <XappAds/XADeferredManager.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    [XADeferredManager fulfillOnLaunch:launchOptions];

    return YES;
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
  [XADeferredManager fulfillOnActive];
}

- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
   // Fulfill the notification
   [XADeferredManager fulfillOnNotification:notification];
}
```

## Start the Session

Start XappAds:

```objective-c
NSString *myAPIKey = <#API Key#>; //Replace with your key
NSString *myApplicationKey = <#Application Key#>; //Replace with your key
//Start XappAds
[XappAds startWithAPIKey:myAPIKey
      withApplicationKey:myApplicationKey
         withAdsDelegate:self
            withUserData:nil];
```

## Request an Ad

 After the method onXappAdsStarted is called on your XappAdsDelegate, request an Advertisement:

```objective-c
XAAdRequest *request = [XAAdRequest adRequestWithAdTag:<#Tag#>];
[XappAds requestAd:request];
```

 Once an advertisement is loaded, the XappAdsDelegate delegate method adRequest:didFinishLoadWithView: is called with an XAAdView:

```objective-c
//XappAds Delegate called when Advertisement is ready
- (void)adRequest:(XAAdRequest *)request didFinishLoadWithView:(XAAdView *)view {
  //Keep a reference to display the ad when ready
  self.adView = view; //Assuming @property XAAdView *adView is declared
}
```

## Play the Ad

Display the Advertisement, display as an interstitial, which takes up the entire screen:

```objective-c
- (void)displayCurrentAd {
  //The rootViewController is a reference to the UIViewController you want the ad to display in
  [XappAds playAdAsInterstitial:adView withRootViewController:self];
}
```

Or display the ad inside a confined tile:

```objective-c
- (void)displayCurrentAd {
  //The containing view is the view for the advertisement to display within.  It must inherit from UIView.
  [XappAds playAdAsInTunerTile:adView withContainingView:tileImageView];
}
```

Instead of storing the XAAdView locally, you can retrieve the next advertisement from XappAds through:

```objective-c
if ([XappAds adAvailable]) {
  XAAdView * nextAd = [XappAds nextAd];
  [XappAds playAdAsInTunerTile:nextAd withContainingView:tileImageView];
}
```
