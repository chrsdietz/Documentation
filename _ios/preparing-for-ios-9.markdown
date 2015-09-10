---
layout: page-with-sidebar
title: Preparing for iOS 9
categories:
 - iOS
---

# iOS 9

A couple of changes introduced in iOS 9 will impact our SDK.  **Apps compiled for iOS 8 do not have a problem with running on iOS 9 devices** _however_ issues arise when attempting to compile with the iOS 9 SDK.

## App Transport Security

When you compile the XAPP SDK with iOS 9 and attempt to request interactive audio, you will see errors printed to your syslog:

```
NSURLSession/NSURLConnection HTTP load failed (kCFStreamErrorDomainSSL, -9802)
```

and requests for interactive audio will fail with an error.  

As of iOS 9, Apple is requiring all web services calls be secure.  We already leverage HTTPS/TLS 1.2 & SHA 256 however our primary CDN is not yet in full compliance with the ATS specifications.  Our CDN expects to resolve this shortly.  

Until then, you will need to modify your app's info.plist with the following:

```
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
  <true/>
</dict>
```

## App Thinning & Bitcode

Apple is optimizing how apps are compiled and distributed through app thinning features that will reduce the overall size and foot print of apps.  

With the official release of iOS 9 and Xcode 7, we will put out a build that supports bitcode however until then you will need to set the compiler flag `ENABLE_BITCODE=NO`

## Additional Reading

* [What's new in iOS 9](https://developer.apple.com/library/prerelease/ios/releasenotes/General/WhatsNewIniOS/Articles/iOS9.html)
* [App Transport Security Technote](https://developer.apple.com/library/prerelease/ios/technotes/App-Transport-Security-Technote/)
* [App Thinning | Bitcode](https://developer.apple.com/library/prerelease/watchos/documentation/IDEs/Conceptual/AppDistributionGuide/AppThinning/AppThinning.html#//apple_ref/doc/uid/TP40012582-CH35-SW2)
