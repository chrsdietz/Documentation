---
layout: page-with-sidebar
title: Quick Start
summary: Everything you need to know to serve a XAPP on Android
categories:
  - Android
---

# Adding XappAds to your Project

In your `build.gradle`, add the link to our maven repository and add XappAds as a dependency:

```groovy
repositories {
    mavenCentral()
    maven { url "https://repo.xappmedia.com/nexus/content/groups/xapp-android/" }
}

dependencies {
      compile 'com.xappmedia:xapp-ads:3.10.2'
}

```

Your credentials for accessing the repos will be provided to you.

# AndroidManifest.xml Modifications

## Permissions

Add the following permissions, typically right before the `<Application>` tag:

```xml
<!--//BLUETOOTH - Necessary for reporting users audioroute.-->
<uses-permission android:name="android.permission.BLUETOOTH" />
<!--//ACCESS_NETWORK_STATE - Necessary for network optimization and diagnostics.-->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<!--//INTERNET - Necessary for HTTP access-->
<uses-permission android:name="android.permission.INTERNET" />
<!--//READ_PHONE_STATE - Necessary for handling phone calls in certain situations-->
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<!--//RECORD_AUDIO - Necessary for performing voice recognition-->
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<!--//WRITE_EXTERNAL_STORAGE - Necessary for storing stock audio for XappAds on certain devices-->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<!-- Optional -->
<!--//CALL_PHONE - Necessary to enable "Call Now" actions-->
<!--<uses-permission android:name="android.permission.CALL_PHONE" /> -->
```
<div class="alert alert-info" role="alert">
  <b>Note:</b> For versions prior to 3.10.2, the GET_TASKS permission is also required.
</div>

## Activities

Add the following two lines to your AndroidManifest.xml within the `<Application>` tag:

```xml
// allows us to launch the activity for a full screen interstitial.
<activity android:name="xappmedia.sdk.PlayAdActivity"
          android:screenOrientation="portrait"
          android:configChanges="keyboardHidden|orientation"></activity>
// allows us to launch an in-app browser to handle touched ads, and certain ad actions.
<activity android:name="xappmedia.sdk.inappbrowser.WebViewActivity"
          android:screenOrientation="portrait"
          android:configChanges="keyboardHidden|orientation"></activity>
```

# Basic Usage

## Implement the XappAdsListener

Add import statements, `implements XappAdsListener` after your class name, and override all of the XappAdsListener methods in your activity.  

A simple interaction is as follows:

```java

import android.util.Log;

import xappmedia.sdk.AdRequest;
import xappmedia.sdk.Advertisement;
import xappmedia.sdk.XappAds;
import xappmedia.sdk.XappAdsListener;
import xappmedia.sdk.model.AdResult;
import xappmedia.sdk.model.Error;

public class XappAdsAdapter extends Activity implements XappAdsListener {

    String TAG = "XAPP";
    XappAds xappAds;

    @Override
    public void onCreate(Bundle savedInstanceState) {

      super.onCreate(savedInstanceState);
      setContentView(R.layout.<yourLayout>);

      xappAds = new XappAds();
      xappAds.start(<yourAPIKey, <yourAPPKey>, userData /** or null */, location /** or null */, <yourContext>, <yourXappAdsListener>);

    }

    /**
     * XappAds Listener Methods
     */
    @Override
    public void onXappAdsStarted () {
        //Request an ad once XappAds has been initialized
        AdRequest adRequest = new AdRequest();
        xappAds.requestAd(adRequest);
    }

    @Override
    public void onXappAdsFailed(Error error) {
        Log.e(TAG, "XappAds failed: " + error.getLocalizedMessage());
    }

    @Override
    public void onXappAdsTerminated() {
        Log.d(TAG, "XappAds terminated");
    }

    @Override
    public void onAdRequestFailed(AdRequest adRequest, Error error) {
        Log.e(TAG, "Ad request failed " + error.getLocalizedMessage());
    }

    @Override
    public void onAdRequestCompleted (final Advertisement advertisement) {
        Log.d(TAG, "Ad received");
        //Plays the ad as an interstitial
        xappAds.playAsInterstitial(advertisement);

    }

    @Override
    public void onAdStarted(Advertisement advertisement) {
        Log.d(TAG, "Ad started");
    }

    @Override
    public void onAdCompleted(AdResult adResult) {
        Log.d(TAG, "Ad Complete");
    }

    @Override
    public void onAdFailed(Error error) {
        Log.e(TAG, "Ad failed " + error.getLocalizedMessage());
        //Failed to get audioFocus or ad failed to play for some other reason described in the error message
    }
//    ...
}  
```

## Start a Session

The API Key and APP key will be provided by your contact person at XappMedia.

```java
 xappAds = new XappAds();
 xappAds.start(<yourAPIKey, <yourAPPKey>, userData /** or null */, location /** or null */, <yourContext>, <yourXappAdsListener>);
```

The last parameter to the start call is the instance that implements `XappAdsListener`, which is assumed to be the calling class.  Wait for `XappAdsListener` method `onXappAdsStarted` to request an ad.

## Request an Ad

Request an ad:

```java
//Request an ad once XappAds has been initialized
AdRequest adRequest = new AdRequest();
xappAds.requestAd(adRequest);
```

The `XappAdsListener` method `onAdRequestCompleted` will be called when the ad is ready for playback.

# Important Notes

It is important that the Context and `XappAdsListener` provided are
fresh when you use the SDK. If either of these would be destroyed
during normal application lifecycle, you *must* currently:

1. Call `xappAds.terminate()`,
1. Create a new instance of `XappAds`
1. Call `xappAds.start()` with a fresh context and listener.

In the above example, this would need to occur any time:

1. You or someone else calls finish() on the activity which
   provides the context.
2. During the default BackPress implementation (which can
   trigger an onDestroy() call)

You can move the XappAds SDK behind a service, and update the
context when refreshing the SDK, but this is beyond the scope of this document.
