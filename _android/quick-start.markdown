---
layout: page
sidebar: true
sdk_agreement: true
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
    compile ('com.xappmedia:xapp-ads:3.11.0@aar') {
     transitive = true
    }
}

```

### Duplicate files copied in APK META-INF/LICENSE Error

If you get the following error:

```
Error:Execution failed for task ':app:packageDebug'.
> Duplicate files copied in APK META-INF/LICENSE
  	File 1: /Users/user/.gradle/caches/modules-2/files-2.1/com.fasterxml.jackson.core/jackson-core/2.4.3/4cb3dbb0c2f75b51aa7543c53252989785a0c609/jackson-core-2.4.3.jar
  	File 2: /Users/user/.gradle/caches/modules-2/files-2.1/com.fasterxml.jackson.core/jackson-core/2.4.3/4cb3dbb0c2f75b51aa7543c53252989785a0c609/jackson-core-2.4.3.jar
```

Please add to your `android` namespace to the module's `build.gradle` file:

```groovy
packagingOptions {
    exclude 'META-INF/NOTICE' // will not include NOTICE file
    exclude 'META-INF/LICENSE' // will not include LICENSE file
}
```


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

# Permissions API

Since the introduction of Android Marshmellow (API 23), applications are no longer automatically granted the permissions they request on install.  The SDK itself does not request for these permissions if they are not granted.  Instead it will produce the appropriate error and not initialize.  

While optional, the Xapp SDK has a new Permissions API that can be used to easily request permissions from the user. 

The first method of requesting permissions is to use the heaviliy named `RequestPermissionsSoftAskActivity` class. This is a simple `AppCompatActivity` which will produce a dialog to show the user to request permissions. To  use this `Activity`, first declare it in the project's `AndroidManifest.xml` file like so:

```<activity
            android:name="xappmedia.sdk.permissions.ui.RequestPermissionsSoftAskActivity"/>
```

Then provide the collection of permission names to request, for example:

```
Permission recordPermission = Permission.newPermission(Manifest.permission.RECORD_AUDIO)
                                        .rationale("This app would like to use the microphone to listen for Xapp playback.")
                                        .imageResourceDrawable(R.drawable.record_image)
                                        .build();

List<Permission> permissions = new ArrayList();
permissions.add(recordPermission);
RequestPermissionsSoftAskActivity.requestPermission(getActivity(), collection, REQUEST_PERMISSIONS);
```

Then the Activity will present a prompt with the given rationale asking the user for the permission. The Activity accepts a collection of `Permissions` so it is possible to include multiple permissions at once.  If the user accepts, then the Android system prompt will be displayed to actually grant the permissions. The Activity will immediately return if all permissions have already been granted previously.

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
