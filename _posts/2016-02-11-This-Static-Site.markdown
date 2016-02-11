---
layout: post
title:  "This Static Site"
date:   2016-02-11
author: michael_myers
categories:
 - documentation
---

Static site generators have been around for awhile.  They have a great number of use cases but why are they the right choice for *developer.xappmedia.com*?

<!-- more -->

### Leverage Existing Workflow

Documentation is really no different from source code, at their core they are just stylized text files.  Thus we decided to leverage the same workflow we use for developing features and apply it to updating the documentation.     

1. Clone the [Documentation Repository](https://github.com/XappMedia/Documentation)
1. Branch
1. ~~Code~~ Document
1. Submit a pull request
1. Peer Review
1. Merge
1. Deploy

### Easy to Deploy

Jekyll, our static site generator, makes it tremendously easy to compile the CSS, HTML templates, and markdown into a static site.

To build simply run:

```
$ jekyll build
```

Then to deploy to production, we leverage the [AWS CLI](https://aws.amazon.com/cli/) `sync` command:

```
$ aws s3 sync
```

Using these commands, we setup continuous deploy on our build server so whenever we merge a pull request, the production site is instantly updated.  Automating this process allows us to concentrate on the documentation and not have to worry about deploying.

### Customizable

We want the documentation to be easy to use and understand and also aesthetically pleasing.  Since Jekyll leverages commonly used web technologies, we can easily push pixels by tweaking the CSS or quickly bring in a third party library with [bower.io](http://bower.io/).  It is a mature solution with extensive tutorials and articles (now one more), most problems we will face are already solved and documented.

<hr>

### Docs We Love

Documentation often offers you your first impression of a project.  The following served as inspiration for our docs:

* [Firebase Docs](https://www.firebase.com/docs/)
  - Great read on the design https://www.firebase.com/blog/2014-07-29-new-docs.html
* [Parse](https://parse.com/docs)
* [Bootstrap](http://getbootstrap.com/)

## Technology We Use

* [jekyll](http://jekyllrb.com/) | Static Site Generator
* [redcarpet](https://github.com/vmg/redcarpet) | Markdown Parser
* [anchor.js](http://bryanbraun.github.io/anchorjs/) | Great library to create anchor links
* [typed.js](http://www.mattboldt.com/demos/typed-js/) | Provides the fancy typing at the top
* [jQuery](https://jquery.com/) | JavaScript Help
* [animate.css](https://daneden.github.io/animate.css/) | Animation Framework
* [Bootstrap](http://getbootstrap.com/) | UI Framework
* [Font Awesome](https://fortawesome.github.io/Font-Awesome/) | Icons
* [bower.io](http://bower.io/) | Package Manager
* [AWS S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html) | Site Hosting
* [Github](https://github.com/XappMedia/Documentation) | Source Hosting
