import $ from "jquery";
//window.$ = $;

$(document).ready(function() {
  // Navbar shrink on scroll
  $(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
      $(".header__nav").addClass("js-shrink");
    } else {
      $(".header__nav").removeClass("js-shrink");
    }
  });

  $(function() {
    $("a[href*=#]:not([href=#])").click(function() {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top + 70
            },
            1200
          );
          return false;
        }
      }
    });
  });

  var sections = $("section"),
    nav = $("nav"),
    nav_height = nav.outerHeight();

  $(window).load(checkState);
  $(window).on("scroll", checkState);

  checkState();

  function checkState() {
    var cur_pos = $(this).scrollTop();

    sections.each(function() {
      var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        nav.find("a").removeClass("header__link--active");
        //sections.removeClass('header__link--active');

        //$(this).addClass('header__link--active');
        nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .addClass("header__link--active");
      }
    });
  }

  function hasTouch() {
    return (
      "ontouchstart" in document.documentElement ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  if (hasTouch()) {
    // remove all :hover stylesheets
    try {
      // prevent exception on browsers not supporting DOM styleSheets properly
      for (var si in document.styleSheets) {
        var styleSheet = document.styleSheets[si];
        if (!styleSheet.rules) continue;

        for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
          if (!styleSheet.rules[ri].selectorText) continue;

          if (styleSheet.rules[ri].selectorText.match(":hover")) {
            styleSheet.deleteRule(ri);
          }
        }
      }
    } catch (ex) {}
  }

  // Lazyloading
  if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll("img.lazyload");
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Dynamically import the LazySizes library
    let script = document.createElement("script");
    script.async = true;
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js";
    document.body.appendChild(script);
  }
});
