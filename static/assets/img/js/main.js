(function ($) {
    "use strict";
    /*=================================
      JS Index Here
    ==================================*/
    /*
    On Load Function
    Preloader
    Mobile Menu Active
    Sticky fix
    Scroll To Top
    Global Slider
    Custom Animaiton For Slider
    Search Box Popup
    Popup Sidemenu
    Magnific Popup
    Filter
    Counter Up
    Shape Mockup
    Progress Bar Animation
    Indicator
  */
    /*=================================
      JS Index End
  ==================================*/
    /*

  /*---------- 01. On Load Function ----------*/
    $(window).on("load", function () {
        $(".preloader").fadeOut();
    });

    $(window).on('resize', function () {
        $(".slick-slider").slick("refresh");
    });

    /*---------- 05. Scroll To Top ----------*/
    // progressAvtivation
    if($('.scroll-top')) {    
        var scrollTopbtn = document.querySelector('.scroll-top');
        var progressPath = document.querySelector('.scroll-top path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);	
        var offset = 50;
        var duration = 750;
        jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(scrollTopbtn).addClass('show');
            } else {
                jQuery(scrollTopbtn).removeClass('show');
            }
        });				
        jQuery(scrollTopbtn).on('click', function(event) {
            event.preventDefault();
            jQuery('html, body').animate({scrollTop: 0}, 1);
            return false;
        })
    }

    /*----------- 07. Global Slider ----------*/
    $(".global-carousel").each(function () {
        var carouselSlide = $(this);

        // Collect Data
        function d(data) {
            return carouselSlide.data(data);
        }

        // Custom Arrow Button
        var prevButton =
                '<button type="button" class="slick-prev"><i class="' +
                d("prev-arrow") +
                '"></i></button>',
            nextButton =
                '<button type="button" class="slick-next"><i class="' +
                d("next-arrow") +
                '"></i></button>';

        // Function For Custom Arrow Btn
        $("[data-slick-next]").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $($(this).data("slick-next")).slick("slickNext");
            });
        });

        $("[data-slick-prev]").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $($(this).data("slick-prev")).slick("slickPrev");
            });
        });

        // Check for arrow wrapper
        if (d("arrows") == true) {
            if (!carouselSlide.closest(".arrow-wrap").length) {
                carouselSlide.closest(".container").parent().addClass("arrow-wrap");
            }
        }

        carouselSlide.slick({
            dots: d("dots") ? true : false,
            fade: d("fade") ? true : false,
            arrows: d("arrows") ? true : false,
            speed: d("speed") ? d("speed") : 1000,
            sliderNavfor: d("slidernavfor") ? d("slidernavfor") : false,
            autoplay: d("autoplay") == false ? false : true,
            infinite: d("infinite") == false ? false : true,
            slidesToShow: d("slide-show") ? d("slide-show") : 1,
            adaptiveHeight: d("adaptive-height") ? true : false,
            centerMode: d("center-mode") ? true : false,
            autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 8000,
            centerPadding: d("center-padding") ? d("center-padding") : "0",
            focusOnSelect: d("focuson-select") == false ? false : true,
            pauseOnFocus: d("pauseon-focus") ? true : false,
            pauseOnHover: d("pauseon-hover") ? true : false,
            variableWidth: d("variable-width") ? true : false,
            vertical: d("vertical") ? true : false,
            verticalSwiping: d("vertical") ? true : false,
            prevArrow: d("prev-arrow")
                ? prevButton
                : '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
            nextArrow: d("next-arrow")
                ? nextButton
                : '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
            rtl: $("html").attr("dir") == "rtl" ? true : false,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        arrows: d("xl-arrows") ? true : false,
                        dots: d("xl-dots") ? true : false,
                        slidesToShow: d("xl-slide-show")
                            ? d("xl-slide-show")
                            : d("slide-show"),
                        centerMode: d("xl-center-mode") ? true : false,
                        centerPadding: d("xl-center-padding") ? d("xl-center-padding") : "0",
                    },
                },
                {
                    breakpoint: 1400,
                    settings: {
                        arrows: d("ml-arrows") ? true : false,
                        dots: d("ml-dots") ? true : false,
                        slidesToShow: d("ml-slide-show")
                            ? d("ml-slide-show")
                            : d("slide-show"),
                        centerMode: d("ml-center-mode") ? true : false,
                        centerPadding: d("ml-center-padding") ? d("ml-center-padding") : "0",
                    },
                },
                {
                    breakpoint: 1200,
                    settings: {
                        arrows: d("lg-arrows") ? true : false,
                        dots: d("lg-dots") ? true : false,
                        slidesToShow: d("lg-slide-show")
                            ? d("lg-slide-show")
                            : d("slide-show"),
                        centerMode: d("lg-center-mode")
                            ? d("lg-center-mode")
                            : false,
                            centerPadding: d("lg-center-padding") ? d("lg-center-padding") : "0",
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        arrows: d("md-arrows") ? true : false,
                        dots: d("md-dots") ? true : false,
                        slidesToShow: d("md-slide-show")
                            ? d("md-slide-show")
                            : 1,
                        centerMode: d("md-center-mode")
                            ? d("md-center-mode")
                            : false,
                        centerPadding: 0,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: d("sm-arrows") ? true : false,
                        dots: d("sm-dots") ? true : false,
                        slidesToShow: d("sm-slide-show")
                            ? d("sm-slide-show")
                            : 1,
                        centerMode: d("sm-center-mode")
                            ? d("sm-center-mode")
                            : false,
                        centerPadding: 0,
                    },
                },
                {
                    breakpoint: 576,
                    settings: {
                        arrows: d("xs-arrows") ? true : false,
                        dots: d("xs-dots") ? true : false,
                        slidesToShow: d("xs-slide-show")
                            ? d("xs-slide-show")
                            : 1,
                        centerMode: d("xs-center-mode")
                            ? d("xs-center-mode")
                            : false,
                        centerPadding: 0,
                    },
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ],
        });
    });

    /*----------- 08. Custom Animaiton For Slider ----------*/
    $('[data-ani-duration]').each(function () {
        var durationTime = $(this).data('ani-duration');
        $(this).css('animation-duration', durationTime);
    });
    
    $('[data-ani-delay]').each(function () {
        var delayTime = $(this).data('ani-delay');
        $(this).css('animation-delay', delayTime);
    });
    
    $('[data-ani]').each(function () {
        var animaionName = $(this).data('ani');
        $(this).addClass(animaionName);
        $('.slick-current [data-ani]').addClass('slider-animated');
    });
    
    $('.global-carousel').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $(slick.$slides).find('[data-ani]').removeClass('slider-animated');
        $(slick.$slides[currentSlide]).find('[data-ani]').addClass('slider-animated');
    })

    /*----------- 21. Price Slider ----------*/
    $(".price_slider").slider({
        range: true,
        min: 10,
        max: 100,
        values: [10, 75],
        slide: function (event, ui) {
          $(".from").text("$" + ui.values[0]);
          $(".to").text("$" + ui.values[1]);
        }
      });
      $(".from").text("$" + $(".price_slider").slider("values", 0));
      $(".to").text("$" + $(".price_slider").slider("values", 1));


    /*---------- 19. Circle Progress ----------*/
    function animateElements() {
        $('.counter-circle .progressbar').each(function () {
            var elementPos = $(this).offset().top;
            var topOfWindow = $(window).scrollTop();
            var percent = $(this).find('.circle').attr('data-percent');
            var percentage = parseInt(percent, 10) / parseInt(100, 10);
            var animate = $(this).data('animate');
            if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
                $(this).data('animate', true);
                $(this).find('.circle').circleProgress({
                startAngle: -Math.PI / 2,
                value: percent / 100,
                size: 135,
                thickness: 7,
                emptyFill: "#2C2C2C",
                fill: {
                    color: '#F41E1E'
                }
                }).on('circle-animation-progress', function (event, progress, stepValue) {
                $(this).find('.circle-num').text((stepValue*100).toFixed(0) + "%");
                }).stop();
            }
        });
    }

    /*---------- 11. Search Box Popup ----------*/
    function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
        $($searchOpen).on("click", function (e) {
            e.preventDefault();
            $($searchBox).addClass($toggleCls);
        });
        $($searchBox).on("click", function (e) {
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
        $($searchBox)
            .find("form")
            .on("click", function (e) {
                e.stopPropagation();
                $($searchBox).addClass($toggleCls);
            });
        $($searchCls).on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
    }
    popupSarchBox(
        ".popup-search-box",
        ".searchBoxToggler",
        ".searchClose",
        "show"
    );

    /*---------- 12. Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
        // Sidebar Popup
        $($sideMunuOpen).on('click', function (e) {
        e.preventDefault();
        $($sideMenu).addClass($toggleCls);
        });
        $($sideMenu).on('click', function (e) {
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls)
        });
        var sideMenuChild = $sideMenu + ' > div';
        $(sideMenuChild).on('click', function (e) {
        e.stopPropagation();
        $($sideMenu).addClass($toggleCls)
        });
        $($sideMenuCls).on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls);
        });
    };
    popupSideMenu('.sidemenu-wrapper', '.sideMenuToggler', '.sideMenuCls', 'show');

    /*----------- 13. Magnific Popup ----------*/
    /* magnificPopup img view */
    $(".popup-image").magnificPopup({
        type: "image",
        mainClass: 'mfp-zoom-in', 
        removalDelay: 260,
        gallery: {
            enabled: true,
        },
    });

    /* magnificPopup video view */
    $(".popup-video").magnificPopup({
        type: "iframe",
        mainClass: 'mfp-zoom-in', 
        removalDelay: 260,
    });

    /* magnificPopup video view */
    $(".popup-content").magnificPopup({
        type: "inline",
        midClick: true,
    });

    $(".popup-content").on("click", function () {
        $(".slick-slider").slick("refresh");
    });

    /*----------- 15. Filter ----------*/
    $(".filter-active").imagesLoaded(function () {
        var $filter = ".filter-active",
            $filterItem = ".filter-item",
            $filterMenu = ".filter-menu-active";

        if ($($filter).length > 0) {
            var $grid = $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
            });

            // filter items on button click
            $($filterMenu).on("click", "button", function () {
                var filterValue = $(this).attr("data-filter");
                $grid.isotope({
                    filter: filterValue,
                });
            });

            // Menu Active Class
            $($filterMenu).on("click", "button", function (event) {
                event.preventDefault();
                $(this).addClass("active");
                $(this).siblings(".active").removeClass("active");
            });
        }
    });

    $(".masonary-active").imagesLoaded(function () {
        var $filter = ".masonary-active",
            $filterItem = ".filter-item",
            $filterMenu = ".filter-menu-active";

        if ($($filter).length > 0) {
            var $grid = $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                },
            });

            // filter items on button click
            $($filterMenu).on("click", "button", function () {
                var filterValue = $(this).attr("data-filter");
                $grid.isotope({
                    filter: filterValue,
                });
            });

            // Menu Active Class
            $($filterMenu).on("click", "button", function (event) {
                event.preventDefault();
                $(this).addClass("active");
                $(this).siblings(".active").removeClass("active");
            });
        }
    });

    // Active specifix
    $('.filter-active-cat1').imagesLoaded(function () {
        var $filter = '.filter-active-cat1',
        $filterItem = '.filter-item',
        $filterMenu = '.filter-menu-active';

        if ($($filter).length > 0) {
            var $grid = $($filter).isotope({
                itemSelector: $filterItem,
                filter: '.cat1',
                masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: 1
                }
            });

            // filter items on button click
            $($filterMenu).on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                filter: filterValue
                });
            });

            // Menu Active Class 
            $($filterMenu).on('click', 'button', function (event) {
                event.preventDefault();
                $(this).addClass('active');
                $(this).siblings('.active').removeClass('active');
            });
        };
    });

    /*----------- 16. Counter Up ----------*/
    $(".counter-number").counterUp({
        delay: 10,
        time: 1000,
    });

    /*----------- 18. Shape Mockup ----------*/
    $.fn.shapeMockup = function () {
        var $shape = $(this);
        $shape.each(function () {
            var $currentShape = $(this),
                shapeTop = $currentShape.data("top"),
                shapeRight = $currentShape.data("right"),
                shapeBottom = $currentShape.data("bottom"),
                shapeLeft = $currentShape.data("left");
            $currentShape
                .css({
                    top: shapeTop,
                    right: shapeRight,
                    bottom: shapeBottom,
                    left: shapeLeft,
                })
                .removeAttr("data-top")
                .removeAttr("data-right")
                .removeAttr("data-bottom")
                .removeAttr("data-left")
                .parent()
                .addClass("shape-mockup-wrap");
        });
    };

    if ($(".shape-mockup")) {
        $(".shape-mockup").shapeMockup();
    }

    /*----------- 20. Progress Bar Animation ----------*/
    $('.progress-bar').waypoint(function() {
        $('.progress-bar').css({
        animation: "animate-positive 1.8s",
        opacity: "1"
        });
    }, { offset: '75%' });

    /*----------- 23. Indicator ----------*/
    // Indicator
    $.fn.indicator = function () {
        var $menu = $(this),
            $linkBtn = $menu.find("a"),
            $btn = $menu.find("button");
        // Append indicator
        $menu.append('<span class="indicator"></span>');
        var $line = $menu.find(".indicator");
        // Check which type button is Available
        if ($linkBtn.length) {
            var $currentBtn = $linkBtn;
        } else if ($btn.length) {
            var $currentBtn = $btn;
        }
        // On Click Button Class Remove
        $currentBtn.on("click", function (e) {
            e.preventDefault();
            $(this).addClass("active");
            $(this).siblings(".active").removeClass("active");
            linePos();
        });
        
        function linePos() {
            var $btnActive = $menu.find(".active"),
                $height = $btnActive.css("height"),
                $width = $btnActive.css("width"),
                $top = $btnActive.position().top + "px",
                $left = $btnActive.position().left + "px";

            $(window).on('resize', function () {
                $top = $btnActive.position().top + "px",
                $left = $btnActive.position().left + "px";
            });

            $line.get(0).style.setProperty("--height-set", $height);
            $line.get(0).style.setProperty("--width-set", $width);
            $line.get(0).style.setProperty("--pos-y", $top);
            $line.get(0).style.setProperty("--pos-x", $left);

        }
        linePos();
    };

    // Call On Load
    if ($(".indicator-active").length) {
        $(".indicator-active").indicator();
    }

    // Quantity Plus Minus ---------------------------

    $(".quantity-plus").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val());
            if (!isNaN(currentVal)) {
                $qty.val(currentVal + 1);
            }
        });
    });

    $(".quantity-minus").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val());
            if (!isNaN(currentVal) && currentVal > 1) {
                $qty.val(currentVal - 1);
            }
        });
    });




    // ======================================== Home Seven Js Start ==================================
    // Banner Slider
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        centeredSlides: false,
        slidesPerGroupSkip: 1,
        grabCursor: true,
        effect: "fade",
        autoplay: true,
        speed: 1500,
        keyboard: {
            enabled: true,
        },
        breakpoints: {
            769: {
                slidesPerView: 1,
                slidesPerGroup: 1,
            },
        },
        scrollbar: {
            el: ".swiper-scrollbar",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });


    // Features Slider Js Start
    $('.features-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        speed: 1500,
        dots: false,
        pauseOnHover: true,
        arrows: true,
        draggable: true,
        rtl: $('html').attr('dir') === 'rtl' ? true : false,
        speed: 900,
        infinite: true,
        nextArrow: '#features-next',
        prevArrow: '#features-prev',
        responsive: [
        {
            breakpoint: 1199,
            settings: {
            slidesToShow: 2,
            arrows: false,
            }
        },
        {
            breakpoint: 767,
            settings: {
            slidesToShow: 1,
            arrows: false,
            }
        },
        {
            breakpoint: 575,
            settings: {
            slidesToShow: 1,
            arrows: false,
            }
        },
        ]
    });  
    // Features Slider Js End

    // Brand Slider Js Start 
    $('.brand-slider').slick({
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1500,
        dots: false,
        pauseOnHover: true,
        arrows: false,
        draggable: true,
        rtl: $('html').attr('dir') === 'rtl' ? true : false,
        speed: 900,
        infinite: true,
        nextArrow: '#brand-next',
        prevArrow: '#brand-prev',
        responsive: [
        {
            breakpoint: 1399,
            settings: {
            slidesToShow: 6,
            arrows: false,
            }
        },
        {
            breakpoint: 992,
            settings: {
            slidesToShow: 5,
            arrows: false,
            }
        },
        {
            breakpoint: 767,
            settings: {
            slidesToShow: 4,
            arrows: false,
            }
        },
        {
            breakpoint: 424,
            settings: {
            slidesToShow: 2,
            arrows: false,
            }
        },
        {
            breakpoint: 359,
            settings: {
            slidesToShow: 2,
            arrows: false,
            }
        },
        ]
    });  
    // Brand Slider Js End 
    
    // Features Slider Js Start
    $('.testimonials-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        speed: 1500,
        dots: false,
        pauseOnHover: true,
        arrows: true,
        draggable: true,
        rtl: $('html').attr('dir') === 'rtl' ? true : false,
        speed: 900,
        infinite: true,
        nextArrow: '#testi-next',
        prevArrow: '#testi-prev',
        responsive: [
        {
            breakpoint: 1199,
            settings: {
            slidesToShow: 2,
            arrows: false,
            }
        },
        {
            breakpoint: 767,
            settings: {
            slidesToShow: 1,
            arrows: false,
            }
        },
        {
            breakpoint: 575,
            settings: {
            slidesToShow: 1,
            arrows: false,
            }
        },
        ]
    });  
    // Features Slider Js End

    // ***********************  Progress Css Start *********************** 
    // Select all progress containers
    const progressContainers = document.querySelectorAll('.progress-container');

    function setPercentage(progressContainer) {
        const percentage = progressContainer.getAttribute('data-percentage') + '%';
        
        const progressEl = progressContainer.querySelector('.progress');
        const percentageEl = progressContainer.querySelector('.percentage');
        
        progressEl.style.width = percentage;
        percentageEl.innerText = percentage;
        percentageEl.style.insetInlineStart = percentage;
    }

    // Intersection Observer to trigger progress animation when section is in view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is in view, start the progress animation
                const progressContainer = entry.target;
                setPercentage(progressContainer);
                progressContainer.querySelector('.progress').classList.remove('active');
                progressContainer.querySelector('.percentage').classList.remove('active');
                observer.unobserve(progressContainer); // Stop observing once animation is triggered
            }
        });
    }, {
        threshold: 0.5 // Adjust this value as needed (0.5 means half the section needs to be visible)
    });

    // Start observing all progress containers
    progressContainers.forEach(progressContainer => {
        observer.observe(progressContainer);
    });
    //***********************  Progress Css End *********************** 

    // ======================================== Home Seven Js End ==================================
    

    /*===========================================
	=         Marquee Active         =
    =============================================*/
    if ($(".marquee_mode").length) {
        $('.marquee_mode').marquee({
            speed: 100,
            gap: 0,
            delayBeforeStart: 0,
            direction: 'left',
            duplicated: true,
            pauseOnHover: true,
            startVisible:true,
        });
    }

    /*===========================================
	=         Marquee Active         =
    =============================================*/
    if ($(".marquee_mode2").length) {
        $('.marquee_mode2').marquee({
            speed: 100,
            gap: 0,
            delayBeforeStart: 0,
            direction: 'right',
            duplicated: true,
            pauseOnHover: true,
            startVisible:true,
        });
    }
    
})(jQuery);


