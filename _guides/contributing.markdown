---
layout: page
title: Contributing
---

## Basics

Write your content in markdown, jekyll then converts it to HTML based on predefined templates.

## Getting Started

1. Clone the repo
1. Branch
  - `$ git checkout -b helpful-concise-branch-name`
1. Install dependencies with bower
  - `$ bower install`
1. Serve locally
  - `$ jekyll serve`
  - Open <a href="http://localhost:4000/" target="_blank">localhost:4000</a>
1. Make your changes
  - See the style-guide.markdown for example markdown
1. Commit and create a pull request

## Guide vs Article

The guides are kept in their respective categorical directories; `_ios`, `_android`, and the general `_guides`.  All articles are within `_posts`.  Guides are directly related to our products and are reference material while articles can be related to to any topic and typically not used as primary reference material for our products.

## Writing a Guide

Guides should be considered reference material for our products and are organized by platform.  They are typically named after the title of the guide.  They are based on the `page` template.  If they are related to the SDK, they require the SDK license agreement notice to be shown: set `sdk_agreement: true`.  Thus, typical guide header YML starts with:

```
---
layout: page
sidebar: true
sdk_agreement: true
---

```  

## Writing an Article

All articles are in the `_post` directory.  They must have the follow the naming convention:

```
YEAR-MONTH-DAY-title.markdown
```

The articles take the `post` layout and can also take an `author` attribute.  You will need to add yourself to `_data/authors.yml` in order to add yourself as an author.

```
---
layout: post
author: my_name
---
```
