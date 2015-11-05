---
layout: page-with-sidebar
title: Style Guide
---

# Basic Styles

normal text

~~strikethrough~~

*italics*

__bold__

~~all three;__bold, *italics* & strikethrough__~~

>  Block quote

---

### Unordered List
- Item 1
- Item 2
- Item 3

### Ordered List
1. Item 1
1. Item 2
1. Item 3

[Hyperlink](http://www.xappmedia.com)

[Anchorlink](#code)

# H1

H1s will be placed in the side navigation bar.  H1s should be used to designate sections.

## H2

The H2s are also placed in the side navigation bar.  H2s should be used to designate sub-sections.

### H3

H3s are not placed in the side navigation bar but still have anchor tags.

#### H4

H4s are also not placed in the side navigation bar but still have anchor tags.


# Alerts

<div class="alert alert-info" role="alert">
  <b>Note:</b> Info Level
</div>

# Code

Code blocks can be designated by either inline with backticks: `` `code` `` or blocks surrounded by three backticks ```` ``` ````.  The language type can be included to provide syntax highlighting, for example ```` ```java ````.

## Java
```java
//Java code block
import xappmedia.sdk.XappAds;

if (context == null) {
    throw new IllegalArgumentException("Parameter [context] cannot be null. Please provide a valid context.");
}

```

## Objective-C
```objective-c
//Objective-C code block
#import <UIKit/UIKit.h>

- (void)playAsInterstitial {

    [XappAds playAdAsInterstitial:self.receivedAd withRootViewController:[self.tabBarController.viewControllers objectAtIndex:0]];

    self.playStatus.text = [NSString stringWithFormat:@"Play %@ Interstitial", self.receivedAd.adName];
}

```
