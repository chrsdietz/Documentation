---
layout: page-with-sidebar
title: Communicating Audio Progression
categories:
 - iOS
---
<div class="alert alert-info" role="alert">
  <b>Note:</b> This is for a feature of the SDK that is not yet released
</div>

# UIProgressView on XAAdView

A customized [UIProgressView](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIProgressView_Class/) can be added to a XAAdView once received up until before it is played.  It will be placed over the image creative and track the progress of the audio.

The following example creates a custom progress view that is gray and dark gray in color and is full width of the image placed at the bottom of the image.

```objective-c

- (void)adRequest:(XAAdRequest *)request didFinishLoadWithView:(XAAdView *)view {

  UIProgressView *customProgressView = [[UIProgressView alloc] initWithProgressViewStyle:UIProgressViewStyleBar];
  customProgressView.trackTintColor = [UIColor grayColor];
  customProgressView.progressTintColor = [UIColor darkGrayColor];

  view.durationProgressView = customProgressView; //set the progress view on the XAAdView
  view.durationProgressViewVertialPosition = 1.0f; //display at the bottom of the creative
  view.durationProgressViewWidth = 1.0f; //display full length

}

```
