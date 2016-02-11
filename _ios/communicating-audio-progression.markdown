---
layout: page
sidebar: true
sdk_agreement: true
title: Communicating Audio Progression
categories:
 - iOS
---

# Progress Bar

A customized [UIProgressView](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIProgressView_Class/) can be added to a XAAdView once received up until before it is played.  It will be placed over the image creative and track the progress of the audio.

The following example creates a custom progress view that is gray and dark gray in color and is full width of the image placed at the bottom of the image.

## Example with Progress Bar

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

# Elapsed and Remaining Time

In addition to adding a progress bar, elapsed and remaining time can be added to the XAAdView by setting [UILabels](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UILabel_Class/index.html) on `elapsedTimeLabel` and `remainingTimeLabel`.

Same as with the progress bar, the labels must be added before the ad is played and can be styled (font, color, size) to better fit the aesthetics of your app.  

__Note__ The time labels can only be used in conjunction with a progress bar, not without.  

## Example with Progress Bar and Time Labels

```objective-c
- (void)adRequest:(XAAdRequest *)request didFinishLoadWithView:(XAAdView *)view {

  //Setup the UIProgressView
  UIProgressView *customProgressView = [[UIProgressView alloc] initWithProgressViewStyle:UIProgressViewStyleBar];
  customProgressView.trackTintColor = [UIColor grayColor];
  customProgressView.progressTintColor = [UIColor darkGrayColor];

  view.durationProgressView = customProgressView; //set the progress view on the XAAdView
  view.durationProgressViewVertialPosition = 1.0f; //display at the bottom of the creative
  view.durationProgressViewWidth = 1.0f; //display full length

  //Setup the UILabels
  UILabel *elapsedTimeLabel = [[UILabel alloc] init];
  elapsedTimeLabel.textColor = [UIColor grayColor];
  elapsedTimeLabel.font = [UIFont systemFontOfSize:10];

  UILabel *remainingTimeLabel = [[UILabel alloc] init];
  remainingTimeLabel.textColor = [UIColor grayColor];
  remainingTimeLabel.font = [UIFont systemFontOfSize:10];

  view.elapsedTimeLabel = elapsedTimeLabel;
  view.remainingTimeLabel = remainingTimeLabel;

}
```
