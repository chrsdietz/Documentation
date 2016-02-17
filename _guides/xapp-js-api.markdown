---
layout: page
sidebar: true
sdk_agreement: true
title: XAPP.js API
categories:
  - SDK
  - iOS
  - Android

---

<div class="alert alert-danger"><strong>Warning:</strong> XAPP.js is still undergoing development and the API is subject to change.  This documentation is for XAPP internal use only.</div>

<div class="alert alert-info"><strong>Info:</strong> XAPP.js is currently only available on iOS SDK 3.9.0 and up</div>

XAPP.js is a JavaScript library that can be used within the XAPP SDK webview to interact directly with the SDK to receive hooks for XAPP life-cycle events.

# Importing
To import the library, add the following HTML to your creative:

```HTML
<script src="https://s3.amazonaws.com/xapp-web/xapp-js/xapp.js"></script>
```

XAPP.js uses a global `xapp` object as a prefix for the public API.  Avoid the use of `xapp` to limit namespace collisions.

# Event Callbacks
The event hooks give your creative notifications of certain XAPP and app life-cycle events.

## xapp.onReady()
`onReady()` is the first event that is called and is called as soon as the webview and it's contents have loaded.

### `xapp.onReady(callback);`
<div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Param</th>
            <th>Type</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>callback</td>
            <td><span class="label label-success">function</span></td>
            <td>Provide a callback to be called when the webview's content is ready, it takes an optional parameter <code>data</code> which contains initial information on the audio's and app's state</td>
          </tr>
        </tbody>
      </table>
</div>

### Example

```JavaScript

//Register callback to handle the event
xapp.onReady(function(data) {
  //Code that kicks off initial creative setup

  //Check the metaData if the app is in foreground/background
  // at the time the creative is presented
  if (adMetadata.inBackground === 'NO') {
      //Creative is in the foreground
  }

});
```

## xapp.onMetaData()
Currently, `onMetaData()` is not used.  It is reserved for passing app or audio specific metadata to the creative.  If metadata exists, it is called directly after `xapp.onReady()`.  

### `xapp.onReady(callback);`
<div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Param</th>
            <th>Type</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>callback</td>
            <td><span class="label label-success">function</span></td>
            <td>Provide a callback to be called when the meta is available</td>
          </tr>
        </tbody>
      </table>
</div>

## xapp.onEnteredForeground()
`onEnteredForeground()` is an event callback that is called if the app makes the transition from background to foreground.  Background is any app state where the app does not have primary focus on the screen.  

### `xapp.onEnteredForeground(callback);`
<div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Param</th>
            <th>Type</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>callback</td>
            <td><span class="label label-success">function</span></td>
            <td>Callback for when app transitions from background to foreground</td>
          </tr>
        </tbody>
      </table>
</div>

## xapp.onEnteredBackground()
`onEnteredBackground()` is an event callback that is called if the app makes the transition from foreground to background.  Background is any app state where the app does not have primary focus on the screen.    

### `xapp.onEnteredBackground(callback);`
<div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Param</th>
            <th>Type</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>callback</td>
            <td><span class="label label-success">function</span></td>
            <td>Callback for when app transitions from foreground to background</td>
          </tr>
        </tbody>
      </table>
</div>

## xapp.onEvent()
`onEvent()` provides a callback that subscribes to all possible events.  

### `xapp.onEvent(callback);`
<div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Param</th>
            <th>Type</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>callback</td>
            <td><span class="label label-success">function</span></td>
            <td>Callback that is fired when an event is received.  The callback takes an optional parameter <code>event</code>, which is a string of the event.</td>
          </tr>
        </tbody>
      </table>
</div>

### Possible Events
The possible events returned through the callback `xapp.onEvent()` parameter are defined in `xapp.constants.events;`.

All of the following events have corresponding callback methods.  
<div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Value</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td>xapp.constants.event.READY</td>
            <td><span class="label label-default">"xapp.event.ready"</span></td>
            <td>The webview is ready, see <code>xapp.onReady()</code> callback.</td>
          </tr>

          <tr>
            <td>xapp.constants.event.METADATA</td>
            <td><span class="label label-default">"xapp.event.metadata"</span></td>
            <td>If metadata is available, this event is sent with the metadata after the the <code>xapp.constants.event.READY</code> event, see <code>xapp.onMetadata()</code> callback.</td>
          </tr>

          <tr>
            <td>xapp.constants.event.FOREGROUND</td>
            <td><span class="label label-default">"xapp.event.foreground"</span></td>
            <td>The app transitioned from background to foreground, see <code>xapp.onForeground()</code> callback.</td>
          </tr>

          <tr>
            <td>xapp.constants.event.BACKGROUND</td>
            <td><span class="label label-default">"xapp.event.background"</span></td>
            <td>The app transitioned from foreground to background, see <code>xapp.onBackground()</code> callback.</td>
          </tr>

          <tr>
            <td>xapp.constants.event.ALL</td>
            <td><span class="label label-default">"xapp.event.all"</span></td>
            <td>Used internally to XAPP.js to subscribe to all events.</td>
          </tr>

        </tbody>
      </table>
</div>

# Open a URL
In order to open a URL external to the SDK's webview, you must call `xapp.openURL()` which requests the URL be opened by the SDK.

## `xapp.openUrl(url);`
<div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Param</th>
            <th>Type</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>url</td>
            <td><span class="label label-default">string</span></td>
            <td>Opens a URL natively on the platform.</td>
          </tr>
        </tbody>
      </table>
</div>

# Example Usage

## Samples

### Download App Action

The Coca-cola creative demo shows how to use XAPP.js to

* Automatically open the iTunes Store if the user is in foreground when the action is requested
* Automatically redirects the user to the iTunes Store when they have returned to the app if they requested the action while in the background.

<a href="view-source:https:s3.amazonaws.com/xapp-web/xapp-js/coca-cola-freestyle.html" target="_new">View Example Source</a>

## Creative Template with XAPP.js

```HTML
<!doctype html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title>Creative Template</title>
  <meta name="description" content="Template for creative leveraging XAPP.js">
  <meta name="HandheldFriendly" content="True">
  <meta name="MobileOptimized" content="320">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="cleartype" content="on">
</head>

<body>

  <!-- Add creative content below, before the script import -->

  <!-- Import XAPP.js -->
  <script src="https://s3.amazonaws.com/xapp-web/xapp-js/xapp.js"></script>

  <script>
    //Register a callback for when the creative is ready
    xapp.onReady(function(metadata) {
       //Place your initialization code here.
    });

    //Register a callback for when the app moves from foreground to background
    xapp.onEnteredBackground(function() {
       //This code executes when the state transitions
    });

    //Register a callback for when the app moves from background to foreground
    xapp.onEnteredForeground(function() {
       //This code executes when the state transitions
    });

  </script>
</body>
</html>
```
