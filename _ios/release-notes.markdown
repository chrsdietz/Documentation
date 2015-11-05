---
layout: page
title: XAPP SDK iOS Release Notes
---

## 3.11.1-thick (10-28-2015)

* 3.11.1 without App Thinning Enabled

## 3.11.1 (10-28-2015)

* XAI-831 Configure ability to perform custom action workflow on touch
* XAI-832 Configure ability to disable in-app browser

## 3.11.0-thick (10-23-2015)

* XAI-828 Version without App Thinning Enabled

## 3.11.0 (10-23-2015)

* XAI-806 Report Touch Location to XACS and XAAdResult
* XAI-807 Add UIProgressView to XAAdView to Communicate Elapsed/Remaining Time
* XAI-815 Display Elapsed and Remaining Time in Text View
* XAI-817 Expansion Initialized not Reporting Correctly (bug created by XAI-807)
* XAI-820 Crash when calling adViewTouched and Cancel Tapped (bug created by XAI-806)
* XAI-823 Infinite Loop on adPresented Call during Playback

## 3.10.0 (10-13-2015)

* XAI-769 Push Artifacts to S3 for Release
* XAI-770 Update Pod Spec with S3 as Source
* XAI-771 Bundle License with Framework
* XAI-772 Update Public Headers with Browse Wrap Agreement Link
* XAI-773 Link to Browse Wrap Agreement in Appledocs
* XAI-783 Compile with Xcode 7 and iOS 9
* XAI-787 Convert all Remaining default addresses with HTTP to HTTPS
* XAI-801 AFNetworking Duplicate Symbol
* XAI-804 Failure on bulk ad request does not alert delegate method
* XAI-809 Package README with release bundle
* XAI-812 Addition of CHANGELOG.md to release package

## 3.9.0 (9-4-2015)

### New

* Added ability to send targeting parameters to ad server

#### _Note_
This version was fully regression tested against iOS 9 Beta 5

## 3.8.0 (7-27-2015)

### New

* In-App Browser - Go To Page Actions leverage built in in-app browser
* Image Dismissed on 'X' - Full Screen Interstitial ad audio continues when cancel button is pressed
* Code Cleaning - We have removed some internal code paths that are no longer used

### Bug Fixes

* AdView would sometimes return that is was ready to be displayed after it played
* Better redundancy on session start failure logic

#### _Note_
We skipped 3.7.0 version number to better align with our Android SDK

## 3.6.2 (5-27-2015)

### Bug Fixes
* Fixed bug for when apps don't restrict the layout orientation, the interstitial could be displayed portrait in landscape.  It now is restricted to portrait.

## 3.6.1 (5-27-2015)

### Bug Fixes
* Fixes bug in build script which didn't optimize the framework for size

## 3.6.0 (5-11-2015)

### New

* Updated documentation for new appledoc template
* Opened up following classes to public facing API: `XKMeterView` & `XAAction`
* Clicking on the image no longer stops playback of the ad
* New hook for getting decibel level reads for voice recognition, can be used for custom mic animations

### Bug Fixes

* Better control of starting and stopping resource load handling
* Better deallocation of voice recognizer object

## 3.5.2 (4-10-2015)

### New

* We now lazy load the ad images to reduce the payload of the ad.  The image is only loaded if:
   1. We move from background to foreground during ad playback
   2. The ad is in the foreground after the other resources have finished loaded

### Bug Fixes

* Fixed bug in client side ad type resolution that prevented custom actions or ads with just an expansion from functioning properly

## 3.4.7 (12-15-2014)

### New

*  Build of 3.4.6 with armv7s slice

## 3.5.1 (12-12-2014)

### New
*  Modified XADFPAdapter method to include callbacks for `adWillPresent` and `adWillLeaveApp`.

```

/**
 *  Play the ad as a full screen interstitial within the supplied root view
 *
 *  @param adView                     The XAAdView associated with the advertisement
 *  @param viewController             The root view controller for the
 *  @param adWillPresentBlock         Block called when the ad will present
 *  @param adWillLeaveAppWithUrlBlock Block called when the ad will leave the application with a URL
 *  @param adFinishedBlock            Block called when the ad is finished
 */
- (void)playAdAsInterstitial:(XAAdView *)adView
      withRootViewController:(UIViewController *)viewController
               adWillPresent:(XAAdWillPresentCallback)adWillPresentBlock
       adWillLeaveAppWithUrl:(XAAdWillLeaveAppWithURLCallback)adWillLeaveAppWithUrlBlock
                  adFinished:(XAAdFinishedCallback)adFinishedBlock;

```

## 3.5.0 (10-28-2014)

### New
* New interface when working with VAST & DFP to serve XAPP Ads (`XADFPAdapter.h`, `XADFPClient.h`, `XAVASTDataModel.h`

## 3.4.6 (10-13-2014)

### Bug Fixes
*  Fixed compilation issues when compiling the framework using the `-force_load path/to/XappAds.framework/Versions/3/XappAds` flag instead of the `-ObjC` flag

## 3.4.5 (9-26-2014)

### Bug Fixes
* Fixed custom Go To URL issue creating a deferred action in the background

## 3.2.3 (9-18-2014)

### Bug Fixes
* Fixed compile time warning for DWARF debug symbols

## 3.4.3 (9-12-2014)

### Bug Fixes
* Support for iOS 8

### New
* Ability to shut off playback on AirPlay

## 3.2.1 (9-10-2014)

### HOTFIX for iOS 8

* Fixed error in recognition code that would not properly connect with the XAPP Voice Cloud on iOS 8

## 3.4.2 (8-25-2014)

### New
* Added string constants for event reporting `XADiagnosticEvents.h`

## 3.4.1 (8-25-2014)

### Bug Fixes
* Fixed weak reference bug on loading ad resources

## 3.4.0 (8-22-2014)

### Enhanced Bluetooth Playback Capabilities

In addition to our existing bluetooth playback mode in previous versions (< 3.4.0), we have developed two more possible playback modes for bluetooth.  Each has its tradeoffs with the default playback mode configurable from the server per bluetooth device if needed.  These new modes do not affect playback over wired headphones or through the device speaker.

### Bluetooth Playback Configurations
1. **Hands Free Profile (Config 1, previous default)**
The entire ad playback is in bluetooth hands free profile mode which is lower quality audio and appears as a phone call on automobile stereo systems.  It has one delay in the beginning for switching into hands free profile mode.

2. **Mix Hands Free Profile and A2DP (Config 2)**
Leverages A2DP for higher fidelity audio playback and switches to hands free profile for voice recognition, leveraging the bluetooth device's microphone.  A delay is introduced from switching bluetooth profiles between the audio and the start listening cue.  The listening period still appears as a phone call on automobile stereo systems.

3. **A2DP (Config 3, new default)**
Keeps playback in A2DP and uses the device microphone as the input route for the listening period.  There are no perceived delays and never looks like a phone call on automobile stereo systems.  Depending on the location of the phone (if it is isolated in the center console for instance), recognition rates can be less than optimal.

The two new playback modes also have the ability to be fine tuned from the server for individual devices.  We will monitor recognition rates for individual bluetooth devices (JAMBOX by Jawbone vs Beats headphones for example) and fine tune the mode to the device if there is an issue.

A2DP (Config 3) provides the best user experience over bluetooth and we can continually improve the recognition rates with its ability to be fine tuned thus it is the new default.  The other two modes are fallback options and if a device proves to be problematic on config 3 we can set the device to run on either two of the alternate configurations.  

### Added Diagnostics Capabilities

To ease integration with third party ad servers, we can now send diagnostic events to the XAPP Diagnostic Server to track events received from these tools.  This will provide better transparency through the entire ad playback process, starting with ad serving and mediation.

Two new methods have been added to `XappAds.h` that facilitate sending the events.  We have also provided initial event types for posting diagnostic information for Double Click for Publishers events.  

For example:

```
#pragma mark GADInterstitialDelegate

- (void)interstitial:(GADInterstitial *)ad didFailToReceiveAdWithError:(GADRequestError *)error
{
    NSLog(@"GAD Interstitial Failed %@", [error debugDescription]);

    //Report the error from DFP on the ad request failure
    [XappAds post:error forEvent:XADiagnosticEventDFPAdRequestFailure callback:nil];
}

- (void)interstitialDidReceiveAd:(GADInterstitial *)ad
{
    NSLog(@"GAD Interstitial Received...");
    //Report an ad request was successful
    [XappAds postForEvent:XADiagnosticEventDFPAdRequestSuccess callback:nil];
}

- (void)interstitialWillPresentScreen:(GADInterstitial *)ad
{
    NSLog(@"GAD Interstitial will present");
    //Report ad will play
    [XappAds postForEvent:XADiagnosticEventDFPAdWillPlay callback:nil];
}

- (void)interstitialDidDismissScreen:(GADInterstitial *)ad {
    NSLog(@"GAD Interstial did dismiss");
    //Report ad did dismiss
    [XappAds postForEvent:XADiagnosticEventDFPAdComplete callback:nil];
}

```

### Better AirPlay Support
Due to the similar playback characteristics of AirPlay and bluetooth, we now treat AirPlay like a bluetooth device however it is fine tuned.

### Additional Changes

### New
* Better reporting capabilities for voice recognition
* Removed built in two syllable additional phrases for expansion audio
* Redefined bad ad request based errors received from the server from 3005 Generic Ad Request error to a 3008 Ad Request Invalid Request error

## 3.3.0 (7-22-2014)

### New
*  Better configurability from the server
* Custom Actions Support
* Better handling of bad network conditions when sending ad responses
* New method in XappAdsDelegate `adFinishedPlayback` with results object
* Added new data to the  XAAdResult
* Multiple Configurations for handling bluetooth connections with new default

### New adFinishedPlayback Delegate Method and more comprehensive XAAdResult information

In an effort to improve the interactions between the SDK API and host application, we have created a new delegate method to serve as a single point of exit for when an advertisement finishes.  

```
- (void) adFinishedPlayBack: (XAAdView *)adView withResult: (XAAdResult *)result andError: (NSError *)error;
```

Previously we had two methods, `-(void)onAdResult:(XAAdResult*)result` and `-(void)adFinishedPlayback:(NSError*)error`, which would split the ad finished logic into two methods.  Bifurcated logic was particularly troublesome if you wanted to leverage `+ (void)setGoToCallbackURLSchemeFilter:(NSString*)scheme`.  You could potentially have two logic paths that would be called when the ad finished, `- (void)gotoActionRecognizedWithURL:(NSURL*)url;` for when a 'Go To' action was recognized that matches your URL scheme filter and `-(void)adFinishedPlayback:(NSError*)error` for your normal ad finished logic.  To help with this particular problem, we have enriched the XAAdResult object.  The exact same data that is provided by `-(void)gotoActionRecognizedWithURL:(NSURL)url` can now be found on the XAAdResult object, which can then be accessed in the new `-(void)adFinishedPlayback` delegate method.

```
//XAAdResult.h

@property (nonatomic, strong) NSURL *customGoToUrl; /** Custom GoTo Url scheme info */

/*!
 * This method returns yes if a custom GOTO phrase/keyword was
 * recognized, else returns no
 *
 * @returns BOOL
 *
 */
- (BOOL) isCustomGoToActionRecognized;
```

### Custom Actions

Custom actions provide the ability to pass data back to the app when a particular phrase is uttered by the end user.  They are set at the ad level.  When one of the custom actions is recognized, the method `isCustomActionRecognized` will return true in the XAAdResult object that is passed in `adFinishedPlayback`.  The property `customActionMetadata` will contain the information set on the ad.

```
//XAAdResult.h

@property (nonatomic, strong) NSString *customActionMetadata; /** Meta data for custom action */

/*!
 * This method returns yes if a custom action phrase/keyword was
 * recognized, else returns no
 *
 * @returns BOOL
 *
 */
- (BOOL) isCustomActionRecognized;

```

### Bluetooth Configurations

We have modified the way the ads play when connected on bluetooth to provide a better user experience (with the ability to change back to the old method).  The new method keeps the audio in A2DP playback, ensuring high quality audio, and then uses the microphone on the device.   

## 3.2.0 (6-9-2014)

#### _Please Note_
The `MediaPlayer.framework` was added as a dependency in this version to facilitate lock screen controls

### New
* Internal HTTP Client consolidation
* XAPP Voice Cloud enhancements for configurability and recognition optimizations
* Support for 'Now Playing Text' to display on lock screen
* Lock screen, media center, and bluetooth controls now pause/play the ad and skip (if canceling the ad is enabled)

### Bug Fixes
* Better support for custom transition on interstitials

### Lock Screen and Bluetooth Controls

When an interstitial ad is displayed, it now uses the `[MPNowPlayingInfoCenter defaultCenter]` to set the ad image under the key `MPMediaItemPropertyArtwork` and the now playing text under the key `MPMediaItemPropertyTitle`.

The interstitial also will respond to lock screen and bluetooth controls through the following implementation:

```
//Within XAInterstitialViewController

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];

    // Turn on remote control event delivery
    [[UIApplication sharedApplication] beginReceivingRemoteControlEvents];

    // Set itself as the first responder
    [self becomeFirstResponder];
}

- (void)viewWillDisappear:(BOOL)animated
{
    // Turn off remote control event delivery
    [[UIApplication sharedApplication] endReceivingRemoteControlEvents];

    // Resign as first responder
    [self resignFirstResponder];

    //Call super
    [super viewWillDisappear:animated];
}

- (BOOL)canBecomeFirstResponder
{
    return YES;
}

- (void)remoteControlReceivedWithEvent:(UIEvent *)receivedEvent {

    if (receivedEvent.type == UIEventTypeRemoteControl) {

        switch (receivedEvent.subtype) {

            //iOS 6
            case UIEventSubtypeRemoteControlTogglePlayPause:
            {
                //Handle toggle play pause
                break;
            }

            case UIEventSubtypeRemoteControlPlay:
            {
                //Handle play
                break;
            }


            case UIEventSubtypeRemoteControlPause:
            {
                //Handle pause
                break;
            }

            case UIEventSubtypeRemoteControlPreviousTrack:
            {
                //no-op
                break;
            }

            case UIEventSubtypeRemoteControlNextTrack:
            {
                //Handle if the cancel button is currently displayed on the ad.
                break;
            }

            default:
            {
                //Unknown event
                break;
            }
        }
    }
}


```


## 3.1.0 (5-19-2014)

### New
* Modified audio preparation logic so it does not fail the ad loading
* Updates to XAPP Voice Recognizer for configuration and better performance

### Bug Fixes
* Fixed bug where on a speech recognition timeout or cancellation during recognition, the audio session wouldn't clean up properly and would appear to be recording constantly
* Fixed bug that would not allow the speech recognition to timeout on the second recognition period during an ad

## 3.0.1 (4-22-2014)

### Bug Fixes
* Cleaned up unloading state for new recognizer
* Fixed race condition on start session

## 3.0.0 (4-21-2014)

### New
* Voice Recognition now powered by the XAPP Voice Cloud
  * Scalable
  * Faster performance
  * Ad playback no longer checks with 'The Throttler'
* Tracking touch clicks vs voice clicks
* Tracking ad cancellations, how they are cancelled and when they are cancelled
* 'Go To' action delegate method with custom scheme filtering
* Support for custom phrases on actions
* New error codes to better determine where the error occurred

### Bug Fixes
* When setting `setDisplayCloseButtonAdAudio:afterSeconds:`, the timer starts at the beginning of the ad instead of the beginning of the ad audio.
* Cleaned up ad dismissal methods

#### Go To Action Delegate with Configurable Filter
To override the default behavior of opening an external browser on 'Go To' actions, a custom scheme can be registered and a delegate implemented so that when a 'Go To' action is recognized and the scheme of the URL associated with the action matches the provided scheme filter, the delegate method is called passing the URL to the host application.  

This can be used to open all links in an in-app web view (by using 'http' as the scheme) or to pass custom data by parsing the URL.

See `+ (void)setGoToCallbackURLSchemeFilter:(NSString*)scheme;` in `XappAds.h` and `- (void)gotoActionRecognizedWithURL:(NSURL*)url;` in `XappAdsDelegat.h` for more information.

## 2.4.0 (4-14-2014)

### New

* Cues are stored locally to limit retrieval
* Default close image converted to bezier path so it is no longer retrieved and cached
* Default microphone animation image converted to bezier path to it is no longer retrieved and cached
* Configurable cropping location for full screen creatives on 3.5 inch screens

### Bug Fixes

* No longer clears the cache on Ad service start which is believed to be the source of the mmapFileDeallocate

#### Configurable Cropping Location

To enable centered cropping, no action is needed as the default is centered.  

```
// XappAds.h
/**
 *  Configure cropping location for when 1136 x 640 creative is displayed on devices with screen size 960 x 640.   
 *
 *   For interstitial advertisements with a image creative 1136 x 640, full screen on iPhone 5, 5C, 5S and iPod Touch 5g,
 *   the location can be set for which where part of the image will be cropped when such creatives are served on devices that have
 *   screen size 960 x 640, iPhone 4, 4s and iPod Touch 4g.
 *      
 *   Possible values:
 *      Default value, center the creative on screen, cropping top and bottom: CGRectMake(0.0, 88.0, 640.0, 960.0)
 *      Remove the bottom off the creative: CGRectMake(0.0, 0.0, 640.0, 960.0)
 *      Remove the top off the creative: CGRectMake(0.0, 176.0, 640.0, 960.0)
 *
 *   @param cropLocation
 */
+ (void)set1136CreativeCropLocationFor960Screens:(CGRect)cropLocation;
```

## 2.3.0 (3-22-2014)

### New

* Reference to ad image on XAAdView
* Reference to XAAdRequest on XAAdView

### Bug Fixes

* Introductory cue now pausable
* Introductory cue related crash fix
* Reduction of false utterances
* Removed red recording bar while backgrounded  when ad cancelled during recognition
* ASR authentication error fix

### DFP Adapter Updates
To account for an ad not being served after it was told to present (can occur when there is no internet connection for ASR, the ASR does not have capacity, or the device does not have the capability to play the ad), the sample code was updated so that if this were to occur it would not count as an impression in DFP.  The following changes were made:

XADFPAd.h
```
//willPresent is called if the ad can play and thus notifies DFP
- (void)willPresent;
```

XADFPInterstitialAd.m
```
- (void)willPresent
{
    //Notifies DFP the ad will present, thus counting as an interstitial
    [self.delegate customEventInterstitialWillPresent:self];
}
```

XADFPAdapter.m
```
// This delegate method is called right before the ad is presented as an interstitial,
// this then notifies DFP the ad will count as an impression.
// If the ad cannot play after it is told to present, xaDfPAd finished is called which cancels
// the ad with DFP by calling customEventInterstitialDidDismiss
- (void)interstitialAd:(XAAdView *)adView willPresentinViewController:(UIViewController *)viewController
{
    id<XADFPAd> xaDfpAd = [self.customEventByRequest objectForKey:adView.request.uuid];

    [xaDfpAd willPresent];
}
```




## 2.2.4 (3-16-2014)

### New Features

* Rate Limiter for ASR service limitations
* New error failure reason: `XAErrorFailureReasonSpeechRateLimitExceeded `

### Rate Limiter

To check if enough resources are available to complete the speech recognition required for ad playback, a rate limit check occurs right after the ad is told to play and before the ad begins playback.  If resources are not available, the delegate method `-(void)adFinishedPlayback:(NSError*)error` is called and provides an error with code `XAErrorCodeSpeechRecognitionError` and failure reason `XAErrorFailureReasonSpeechRateLimitExceeded`.

## 2.2.3 (3-13-2014)

### Bug Fixes

* Fixed bug which would restart the base audio when an outgoing call was placed

## 2.2.2 (3-10-2014)

### Bug Fixes

* Fixed bug which when setting a custom frame on the microphone, would not update the frame for the microphone overlay image

## 2.2.1 (3-7-2014)

### Bug Fixes

* Fixed bug which caused single view controller apps to not display root view controller correctly after dismissal of interstitial ads
* Fixed bug which would not allow you to play the tell me more audio more than once
* Fixed bug on interstitials that are not full size that would not line up the microphone overlay and the bezier path correctly



## 2.2.0 (3-6-2014)

### New Features

* Better Local Notifications and Deferred Actions handling
  * Cleaned up implementation and code required however small API change, see below
  * Added prompt on active functionality
  * Local Notification Message can be customized from the Ad builder UI
* Production credentials for speech recognition
  * Increased throughput and response time
* Ability to customize microphone animation
  * Set the background color
  * Set the progress color
  * Set the bezier path for the animation
  * Remove/replace the image overlay
* New delegate method to give reference to Interstitial View Controller
  * See below for more information
* Update XappServer interface to allow better logging on ad response calls

### Bug Fixes

* Fixed issue that would cause an ad to not properly deallocate after playback complete
* Cleaned out remaining NSLogs left from development

### Microphone Animation Customization

The following methods were added to aid in microphone animation customization.  Please see the example implementation in [XMViewController setupForCustomInterstitial](https://github.com/XappMedia/XappAds-iOS/blob/master/Examples/XappMedia%20Sample/XappMedia%20Sample/XMViewController.m) for guidance.

```
/**
 *  The microphone overlay can be toggled OFF so it does not display.  This is desirable when a custom bezier path is being used.  YES is the default behavior.
 *
 *  @param displayMicrophoneImage NO to turn off the microphone image overlay
 */
+ (void)setDisplayMicrophoneImageOverlay:(BOOL)displayMicrophoneImage;

/**
 *  The default microphone overlay image can be replaced to create a custom microphone animation.
 *
 *  @param microphoneImage UIImage to replace the default microphone image
 */
+ (void)setMicrophoneImage:(UIImage *)microphoneImage;

/**
 *  The microphone progress is the current decibel level on the microphone input.  The progress moves up and down the bezier path and is in front of the background color.  The default color is red.
 *
 *  @param progressColor UIColor to set on the microphone input progress bar during the microphone animation
 */
+ (void)setMicrophoneProgressColor:(UIColor *)progressColor;

/**
 *  The microphone background color is the static background of the bezier path.  The default color is white.
 *
 *  @param backgroundColor UIColor to set for the background color of the bezier path microphone animation
 */
+ (void)setMicrophoneBackgroundColor:(UIColor *)backgroundColor;

/**
 *  Microphone Image and Bezier Path are displayed in the same frame which is then place over the Advertisement image.  When changing the bezier path or microphone image, the frame must be updated to account for the new size and locations.  The default frame is 75 pts by 75 pts and is centered at the bottom of the ad image.
 *
 *  @param frame CGRect to account for the new bezier path and/or microphone image
 */
+ (void)setMicrophoneFrame:(CGRect)frame;

/**
 *  The microphone bezier path is the outline of the microphone image animation.  It has a static background color with a dynamic progress level that corresponds to the current decibel level on the microphone.  The bezier path is only displayed during speech recognition.
 *
 *  @param bezierPath UIBezierPath for the microphone animation
 */
+ (void)setMicrophoneBezierPath:(UIBezierPath *)bezierPath;

```

#### Handle to Interstitial View Controller

A new delegate method was added to provide a handle to the interstitial view controller that is displayed during an interstitial advertisement.  

```
/**
 *  Implement this delegate method when custom overlays are required on interstitial advertisements.  A pause/play button or custom cancel/skip button can be added through [viewController.view addSubview:].  This delegate method is called right before the interstitial is presented.
 *
 *  @param adView         XAAdView of the current interstitial ad
 *  @param viewController UIViewController of the interstitial advertisement
 */
- (void)interstitialAd:(XAAdView *)adView willPresentinViewController:(UIViewController *)viewController;
```

Please see  [XMViewController interstitialAd:(XAAdView *)adView willPresentinViewController:(UIViewController *)viewController](https://github.com/XappMedia/XappAds-iOS/blob/master/Examples/XappMedia%20Sample/XappMedia%20Sample/XMViewController.m) for example usage.

#### Local Notifications

Local Notifications were refactored for easier implementation as well as a new feature to prompt the user to complete the action when the app returns to the foreground (`[XADeferredManager fulfillOnActive]` within `- (void)applicationDidBecomeActive:`).  Please note the following changes required in your AppDelegate:

```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // Override point for customization after application launch.

    [XADeferredManager fulfillOnLaunch:launchOptions];

    return YES;
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    [XADeferredManager fulfillOnActive];
}

-(void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
    [XADeferredManager fulfillOnNotification:notification];
}

```

## 2.1.1-RC2 (2-12-2014)

### Bug Fix

* Fixed duplicate symbol errors on Reachability
