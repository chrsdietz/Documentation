---
layout: page-with-sidebar
title: Custom Actions
summary:
categories:
  - iOS
  - Android
---

# What are custom actions?

Custom actions provide a way to pass predefined metadata to your app that is triggered a users voice response.  The metadata is passed back at the end of the XAPP playback.  When building the XAPP, a phrase is selected and the metadata is then added for that phrase.  

## Example Usage

Custom actions enable host app functionality to be executed via voice.  Most functions of a host app can be executed through custom actions.  Some examples include but are not limited to the following:

#### Play Content
<blockquote>
  <p>To check out the new top forty countdown after the beep… say, “Listen Now”</p>
</blockquote>
#### Save Track
<blockquote>
  <p>To save this song, after the beep… say, “Save Music”</p>
</blockquote>
#### Add to Favorites
<blockquote>
  <p>To favorite the Chill Evenings playlist, after the beep… say, “Add to Favorites”</p>
</blockquote>
#### Start Free Trial
<blockquote>
  <p>To start a seven day free trial, after the beep… say, “Start Trial”</p>
</blockquote>
#### Like Track
<blockquote>
  <p>To like this song, after the beep… say, “Thumbs It Up”</p>
</blockquote>
#### Enter Contest
<blockquote>
  <p>To enter to win a free trip to Vegas after the beep… say, “Enter Contest”</p>
</blockquote>
#### Social Share
<blockquote>
  <p>To share the Summer Party playlist on Twitter, after the beep… say, “Share On Twitter”</p>
</blockquote>
#### Feature Education
<blockquote>
  <p>To try out our new podcast feature, after the beep… say, “Take Me to Podcasts”</p>
</blockquote>

# Metadata Schemes

Metadata is set and passed back as plain text however we recommend following a predefined format, such as JSON, to make it more easy to parse.  You want to define an action type, then provide the necessary data for that action.

```javascript
{
    "action": "myaction",
    "data": {
        "trackId": "someId"
    }
}

```

If your app already has a registered custom scheme, you can take advantage of existing workflows to complete the action.

```javascript
{
    "url": "my-app-scheme://action/metadata"
}
```
# Implementation

Everything needed to determine if a custom action was recognized and it's corresponding metadata can be retrieved from the result object that is passed at the end of XAPP playback.

## iOS

```objc
- (void)adFinishedPlayBack:(XAAdView *)adView withResult:(XAAdResult *)result andError:(NSError *)error {

    if ([result isCustomActionRecognized]) {
        NSLog(@"%@", result.recognizedAction.data);
    }
}
```

## Android

```java
    @Override
    public void onAdCompleted(AdResult adResult) {

        if (adResult.isCustomActionRecognized()) {
            Log.d(TAG, adResult.getCustomActionMetadata());
        }
    }
```
