---
layout: page
title: XAPP SDK Android Release Notes
categories:
  - Android
---

### 3.11.0 (2-29-2016)

*  Release Note 1
*  Release Note 2

### 3.10.4 (1-26-2016)

*  Fix for trying to upload a bitmap without valid width/height

### 3.10.3 (12-14-2015)

*  XAA-657 Remote Logging URL configurable
*  Fix for infinite loop that would occur on a failed start
*  XAA-659 Fix for ad request crash if session doesn't start
*  XAA-661 Fix for pause, resume, cancel crash when ad not running
*  XAA-651 Crash when attempting to play null advertisement

### 3.10.2 (12-8-2015)

* Removed GET_TASKS permission

### 3.10.1

* Removed PHONE_CALL permission from required to optional

### 3.10.0

* Added app licensing to the Java Docs
* Added licensing information to the JAR
* Build simplification in build.gradle around the way we build the JAR
* Code coverage enabled
* Major microphone animation improvements on many devices
* Properly reports versions

### 3.9.0

* Updated many of the examples to include Service and Lifecycle best practices.
* Made InAppBrowser zoomable, and added zoom controls.
* Added DFP Targeting Parameter abilities
* Fixed a number of bugs in the DFP implementations
* Fixed a bug with AudioRouteName not being populated correctly.

### 3.8.11

* Optional Call Permission

### 3.8.10

* Unobfuscated AdImage

### 3.8.9

*  Updates to Voice/Touch Click Reporting

### 3.8.8

*  New DFP Targeting
*  Open Url in External browser now opens page currently displayed in the In App Browser

### 3.8.7

*  Minor Bug Fixes

### 3.8.6

*  DFP Updates, new Model
*  Audio Bugs for note 3 and 5.0 devices
*  Bunch of crash fixes on older devices
*  Ad Image fix for screen rotation

### 3.8.3

*  Back pressed fixes
*  OOM Fixes for large images on old devices
*  Crash fixes for Samsung S5
*  New Obfuscation work
*  Custom Cue implementation

### 3.8.0

*  New Docs
*  Refactored SDK to remove Global
*  Galaxy SII crash fixes
