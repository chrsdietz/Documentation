var guideHelp = {
  onReady: function() {
    //Add anchors to all the headers in the article section
    anchors.add('article h1, article h2, article h3, article h4');
    anchors.remove('.list-group-item-heading').remove('.no-anchor'); //but not on the list group headers or post links

    //Build up a list of all the anchors
    var sidebarListItems = []

    //Iterate through all the links within the article and add them to the sidebar list
    $('article .anchorjs-link').each(function() {
      //Get the parent by the hash of the anchor
      var parentHeader = $(this.hash)[0];

      //We only add to the sidebar if it is h1 or h2
      if (parentHeader.localName === 'h1' || parentHeader.localName === 'h2') {
        //Add it to the sidebar
        sidebarListItems.push('<li class="list-item-' + parentHeader.localName + '"><a href="' + this.hash + '">' + parentHeader.outerText + '</a></li>');
      }
    });

    //Add the sidebar items
    $('.xm-docs-sidenav').append(sidebarListItems.join(''));
    //Setup bootstrap affix to the sidebar
    $('.xm-docs-sidebar').affix();
    //Setup bootstrap scrollspy
    $('body').scrollspy({
      target: '#sidebar'
    });
  }
}

//On doc ready, fire the JS
$(document).ready(guideHelp.onReady());
