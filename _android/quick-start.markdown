---
layout: page-with-sidebar
title: Quick Start
---

# Adding XappAds to your Project

In your `build.gradle`:

```java
repositories {
    mavenCentral()
    maven {
        url "https://repo.xappmedia.com/nexus/content/repositories/xapp-ads"
        credentials {
            username $USERNAME
            password $PASSWORD
        }
    }

    maven {
        url "https://repo.xappmedia.com/nexus/content/repositories/xvr-android/"
        credentials {
            username $USERNAME
            password $PASSWORD
        }

    }
}

dependencies {
      compile 'com.xappmedia:xapp-ads:3.7.2'
      compile 'com.fasterxml.jackson.core:jackson-databind:2.1.4'
      compile 'com.fasterxml.jackson.core:jackson-core:2.1.4'
      compile 'com.fasterxml.jackson.core:jackson-annotations:2.1.4'
}

```

Your credentials for accessing the repos will be provided to you.

# AndroidManifest.xml Modifications

## Permissions

```
<!--//BLUETOOTH - Necessary for reporting users audioroute.-->
<uses-permission android:name="android.permission.BLUETOOTH" />
<!--//ACCESS_NETWORK_STATE - Necessary for network optimization and diagnostics.-->
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<!--//CALL_PHONE - Necessary to enable "Call Now" actions-->
<uses-permission android:name="android.permission.CALL_PHONE" />
<!--//INTERNET - Necessary for HTTP access-->
<uses-permission android:name="android.permission.INTERNET" />
<!--//READ_PHONE_STATE - Necessary for handling phone calls in certain situations-->
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<!--//RECORD_AUDIO - Necessary for performing voice recognition-->
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<!--//WRITE_EXTERNAL_STORAGE - Necessary for storing stock audio for XappAds on certain devices-->
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<!--//GET_TASKS - Necessary for determining if app is in background-->
<uses-permission android:name="android.permission.GET_TASKS" />

 android:screenOrientation="portrait"
 android:configChanges="keyboardHidden|orientation"
```

## Activities

Add the following two lines to your AndroidManifest.xml within the `<Application>` tag:

```
// allows us to launch the activity for a full screen interstitial.
<activity android:name="xappmedia.sdk.PlayAdActivity" ></activity>
// allows us to launch an InApp Browser to handle touched ads, and certain ad actions.
<activity android:name="xappmedia.sdk.inappbrowser.WebViewActivity" ></activity>
```

# Basic Usage

## Implement the XappAdsListener

Add import statements, `implements XappAdsListener` after your class name, and override all of the XappAdsListener methods in your activity.  

A simple interaction is as follows:

```java
import xappmedia.sdk.AdRequest;
import xappmedia.sdk.AdView;
import xappmedia.sdk.Advertisement;
import xappmedia.sdk.XappAds;
import xappmedia.sdk.XappAdsListener;
import xappmedia.sdk.model.Error;
/** Optional Import **/
import xappmedia.sdk.model.AdLength;
import xappmedia.sdk.model.UserData;

public class XappAdsAdapter extends Activity implements XappAdsListener {

XappAds xappAds;

public void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);
    setContentView(R.layout.<yourLayout>);

    //...your code here
  }

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
      //Plays the ad as an interstitial
      xappAds.playAsInterstitial(advertisement);

  }

  @Override
  public void onAdCompleted (Advertisement ad) {
      Log.d(TAG, "Ad complete");
      //Resume normal operation once the ad has completed
      //...
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
 xappAds.start("71bd5a9b-4465-4677-8b22-708673d89037", "93659f7e-0384-4938-bff3-87dea0851cad", userData /** or null */, location /** or null */, <yourContext>, <yourXappAdsListener>);
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
