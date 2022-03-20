// JavaScript Document


!(function ($) {
    "use strict";
/**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });



    // Hero typed
    if ($('.typed').length) {
        var typed_strings = $(".typed").data('typed-items');
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    // Smooth scroll for the navigation menu and links with .scrollto classes
    $(document).on('click', '.nav-menu a, .scrollto', function (e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            e.preventDefault();
            var target = $(this.hash);
            if (target.length) {

                var scrollto = target.offset().top;

                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu, .mobile-nav').length) {
                    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                }
                return false;
            }
        }
    });

    // Activate smooth scroll on page load with hash links in the url
    $(document).ready(function () {

    });

    $(document).on('click', '.mobile-nav-toggle', function (e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
    });

    $(document).click(function (e) {
        var container = $(".mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            if ($('body').hasClass('mobile-nav-active')) {
                $('body').removeClass('mobile-nav-active');
                $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            }
        }
    });

    // Navigation active state on scroll
    var nav_sections = $('section');
    var main_nav = $('.nav-menu, .mobile-nav');

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop() + 100;

        nav_sections.each(function () {
            var top = $(this).offset().top,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                if (cur_pos <= bottom) {
                    main_nav.find('li').removeClass('active');
                }
                main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
            }
            if (cur_pos < 200) {
                $(".nav-menu ul:first li:first").addClass('active');
            }
        });
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });

    // Skills section
    $('.skills-content').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {
        offset: '50%'
    });

    // Porfolio isotope and filter
    $(window).on('load', function () {
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        $('#portfolio-flters li').on('click', function () {
            $("#portfolio-flters li").removeClass('filter-active');
            $(this).addClass('filter-active');

            portfolioIsotope.isotope({
                filter: $(this).data('filter')
            });
             AOS.init({
      duration: 1000,
      easing: 'ease-in-out'
//      once: true,
//      mirror: false
    })
        });

        // Initiate venobox (lightbox feature used in portofilo)
        $(document).ready(function () {
            $('.venobox').venobox();
        });
    });



    $(".btm").click(function () {
        $('html, body').animate({
            scrollTop: $("#about").offset().top
        }, 1200);
    });

     $(".square").click(function () {
        $('html, body').animate({
            scrollTop: $("#about").offset().top
        }, 1200);
    });
    
     $(".square1").click(function () {
        $('html, body').animate({
            scrollTop: $("#contact").offset().top
        }, 1200);
    });

  
})(jQuery); // JavaScript Document

jQuery(document).ready(function ($) {
    //define store some initial variables
    var halfWindowH = $(window).height() * 0.5,
        halfWindowW = $(window).width() * 0.5,
        //define a max rotation value (X and Y axises)
        maxRotationY = 5,
        maxRotationX = 3,
        aspectRatio;

    //detect if hero <img> has been loaded and evaluate its aspect-ratio
    $('.cd-floating-background').find('img').eq(0).load(function () {
        aspectRatio = $(this).width() / $(this).height();
        if ($('html').hasClass('preserve-3d')) initBackground();
    }).each(function () {
        //check if image was previously load - if yes, trigger load event
        if (this.complete) $(this).load();
    });

    //detect mouse movement
    $('.cd-background-wrapper').each(function () {
        $(this).on('mousemove', function (event) {
            var wrapperOffsetTop = $(this).offset().top;
            if ($('html').hasClass('preserve-3d')) {
                window.requestAnimationFrame(function () {
                    moveBackground(event, wrapperOffsetTop);
                });
            }
        });
    });

    //on resize - adjust .cd-background-wrapper and .cd-floating-background dimentions and position
    $(window).on('resize', function () {
        if ($('html').hasClass('preserve-3d')) {
            window.requestAnimationFrame(function () {
                halfWindowH = $(window).height() * 0.5,
                    halfWindowW = $(window).width() * 0.5;
                initBackground();
            });
        } else {
            $('.cd-background-wrapper').attr('style', '');
            $('.cd-floating-background').attr('style', '').removeClass('is-absolute');
        }
    });

    function initBackground() {
        var wrapperHeight = Math.ceil(halfWindowW * 2 / aspectRatio),
            proportions = (maxRotationY > maxRotationX) ? 1.1 / (Math.sin(Math.PI / 2 - maxRotationY * Math.PI / 180)) : 1.1 / (Math.sin(Math.PI / 2 - maxRotationX * Math.PI / 180)),
            newImageWidth = Math.ceil(halfWindowW * 2 * proportions),
            newImageHeight = Math.ceil(newImageWidth / aspectRatio),
            newLeft = halfWindowW - newImageWidth / 2,
            newTop = (wrapperHeight - newImageHeight) / 2;

        //set an height for the .cd-background-wrapper
        $('.cd-background-wrapper').css({
            'height': wrapperHeight,
        });
        //set dimentions and position of the .cd-background-wrapper		
        $('.cd-floating-background').addClass('is-absolute').css({
            'left': newLeft,
            'top': newTop,
            'width': newImageWidth,
        });
    }

    function moveBackground(event, topOffset) {
        var rotateY = ((-event.pageX + halfWindowW) / halfWindowW) * maxRotationY,
            yPosition = event.pageY - topOffset,
            rotateX = ((yPosition - halfWindowH) / halfWindowH) * maxRotationX;

        if (rotateY > maxRotationY) rotateY = maxRotationY;
        if (rotateY < -maxRotationY) rotateY = -maxRotationY;
        if (rotateX > maxRotationX) rotateX = maxRotationX;
        if (rotateX < -maxRotationX) rotateX = -maxRotationX;

        $('.cd-floating-background').css({
            '-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
            '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
            '-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
            '-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
            'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        });
    }
});

/* 	Detect "transform-style: preserve-3d" support, or update csstransforms3d for IE10 ? #762
	https://github.com/Modernizr/Modernizr/issues/762 */
(function getPerspective() {
    var element = document.createElement('p'),
        html = document.getElementsByTagName('html')[0],
        body = document.getElementsByTagName('body')[0],
        propertys = {
            'webkitTransformStyle': '-webkit-transform-style',
            'MozTransformStyle': '-moz-transform-style',
            'msTransformStyle': '-ms-transform-style',
            'transformStyle': 'transform-style'
        };

    body.insertBefore(element, null);

    for (var i in propertys) {
        if (element.style[i] !== undefined) {
            element.style[i] = "preserve-3d";
        }
    }

    var st = window.getComputedStyle(element, null),
        transform = st.getPropertyValue("-webkit-transform-style")
        || st.getPropertyValue("-moz-transform-style")
        || st.getPropertyValue("-ms-transform-style")
        || st.getPropertyValue("transform-style");

    if (transform !== 'preserve-3d') {
        html.className += ' no-preserve-3d';
    } else {
        html.className += ' preserve-3d';
    }
    document.body.removeChild(element);

})();


  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });


  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out'
//      once: true,
//      mirror: false
    })
  });
