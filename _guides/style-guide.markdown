---
layout: page-with-sidebar
title: Style Guide
---

# Tips

## Markdown and HTML

You can leverage both markdown notation and HTML however markdown within an HTML element will not be parsed.

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

<div class="alert alert-success" role="alert">Success</div>
<div class="alert alert-info" role="alert">Information</div>
<div class="alert alert-warning" role="alert">Warning</div>
<div class="alert alert-danger" role="alert">Oh man, things are bad</div>

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
```objc
//Objective-C code block
#import <UIKit/UIKit.h>

- (void)playAsInterstitial {

    [XappAds playAdAsInterstitial:self.receivedAd withRootViewController:[self.tabBarController.viewControllers objectAtIndex:0]];

    self.playStatus.text = [NSString stringWithFormat:@"Play %@ Interstitial", self.receivedAd.adName];
}

```

# Layout

The site leverages Bootstrap as a base UI framework, thus the full capabilities of its responsive grid system can be leveraged to manage your layout.

## Split Pane

__This example keeps the two panes split regardless of width.__

<div class="row">
  <div class="col-xs-6">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec pulvinar enim. Aliquam venenatis sit amet leo vel imperdiet. Praesent lorem lorem, consequat in rutrum nec, tempor ut sapien. Cras mollis scelerisque rutrum. Mauris id eleifend augue, et ullamcorper magna. Pellentesque scelerisque, diam sit amet lacinia finibus, augue lectus eleifend magna, nec gravida libero ligula id risus. Cras et porttitor nisi, eget pellentesque metus. Morbi cursus justo dolor, ac tempor enim ultricies ac.</p>
  </div>
  <div class="col-xs-6">
    <p>Maecenas id tortor ac nulla ultrices porta consectetur ac quam. Sed pretium, neque sit amet viverra feugiat, est urna sodales leo, ac ultricies ex neque quis leo. Aenean a elit in nisl congue aliquet. Nulla dui odio, consequat vel elit consectetur, aliquet vulputate nibh. Aliquam erat volutpat. Pellentesque aliquam, urna id lacinia aliquam, augue tellus accumsan dui, eu lobortis lectus quam pellentesque lacus. Maecenas cursus commodo lacus, et placerat turpis condimentum ac.</p>
  </div>
</div>

__This example will stack the two columns on mobile devices.__

<div class="row">
  <div class="col-sm-6">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec pulvinar enim. Aliquam venenatis sit amet leo vel imperdiet. Praesent lorem lorem, consequat in rutrum nec, tempor ut sapien. Cras mollis scelerisque rutrum. Mauris id eleifend augue, et ullamcorper magna. Pellentesque scelerisque, diam sit amet lacinia finibus, augue lectus eleifend magna, nec gravida libero ligula id risus. Cras et porttitor nisi, eget pellentesque metus. Morbi cursus justo dolor, ac tempor enim ultricies ac.</p>
  </div>
  <div class="col-sm-6">
    <p>Maecenas id tortor ac nulla ultrices porta consectetur ac quam. Sed pretium, neque sit amet viverra feugiat, est urna sodales leo, ac ultricies ex neque quis leo. Aenean a elit in nisl congue aliquet. Nulla dui odio, consequat vel elit consectetur, aliquet vulputate nibh. Aliquam erat volutpat. Pellentesque aliquam, urna id lacinia aliquam, augue tellus accumsan dui, eu lobortis lectus quam pellentesque lacus. Maecenas cursus commodo lacus, et placerat turpis condimentum ac.</p>
  </div>
</div>
