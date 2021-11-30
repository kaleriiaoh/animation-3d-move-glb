jQuery(document).ready(function($) {

    (function() {
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
            $('.site-header').addClass('sticky');
            if ($('body').hasClass('home-page')) {
                var logo = $('.site-header .logo');
                logo.attr('src', 'img/logo-black.png');
            }
        }
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll > 100) {
                $('.site-header').addClass('sticky');
                if ($('body').hasClass('home-page')) {
                    var logo = $('.site-header .logo');
                    logo.attr('src', 'img/logo-black.png');
                }
            } else {
                $('.site-header').removeClass('sticky');
                if ($('body').hasClass('home-page')) {
                    var logo = $('.site-header .logo');
                    logo.attr('src', 'img/logo-white.png');
                }
            }
        });
    })();

    $('.nav-toggle-open').click(function() {
        var menu = $('.vertical-menu');
        if (!menu.hasClass('opened')) {
            menu.addClass('opened');
            $('body').addClass('stop-scroll');
            $('.site-header').addClass('blur');
            $('.page-wrapper').addClass('blur');
        }
    });
    $('.nav-toggle-close').click(function() {
        var menu = $('.vertical-menu');
        if (menu.hasClass('opened')) {
            menu.removeClass('opened');
            $('body').removeClass('stop-scroll');
            $('.site-header').removeClass('blur');
            $('.page-wrapper').removeClass('blur');
        }
    });

    
    $('a[href^="#"').on('click', function(e) {
        e.preventDefault();
        if ($(this).attr('href') === '#') {
            return false;
        }
        let href = $(this).attr('href');
        if ($(href).length) {
            $('html, body').animate({
                scrollTop: $(href).offset().top
            }, {
                duration: 1000,
            });
        }
        return false;
    });

    $('.today-filter .search-button').click(function() {
        var search = $('.search-block');
        if (!search.hasClass('opened')) {
            search.addClass('opened');
            $('.site-header').addClass('blur');
            $('.page-wrapper').addClass('blur');
        }
    });
    $('.search-close-button').click(function() {
        var search = $('.search-block');
        if (search.hasClass('opened')) {
            search.removeClass('opened');
            $('.site-header').removeClass('blur');
            $('.page-wrapper').removeClass('blur');
        }
    });

    $('.tab').click(function() {
        var data_category = $(this).data('category'),
            curent_list = $('.news-list[data-category="' + data_category + '"]');
        $('.tab.curent').removeClass('curent');
        $('.news-list.curent').removeClass('curent');
        $(this).addClass('curent');
        curent_list.addClass('curent');
    });

    if ($(window).width() > 767) {
        if ($('.readers-block').length) {
            (function() {
                gsap.registerPlugin(ScrollTrigger);
        
                let sections = gsap.utils.toArray(".readers-slide-list .readers-slide");
        
                gsap.to(sections, {
                    xPercent: -100 * (sections.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".readers-block-wrapper",
                        pin: true,
                        start: "top +=0px",
                        markers: false,
                        scrub: 1,
                        snap: {
                        snapTo: 1 / (sections.length - 1),
                        duration: {min: 0.2, max: 0.3},
                        delay: 0
                        },
                        // Base vertical scrolling on how wide the container is so it feels more natural.
                        end: () => "+=" + (document.querySelector(".readers-slide-list").offsetWidth / 2)
                    }
                });
            })();
        }
        if ($('.publishers-block').length) {
            (function() {
        
                gsap.registerPlugin(ScrollTrigger);
        
                let sections = gsap.utils.toArray(".publishers-slide-list .publishers-slide");
        
                gsap.to(sections, {
                    xPercent: -100 * (sections.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".publishers-slide-list-wrapper",
                        pin: true,
                        start: "top +=0px",
                        markers: false,
                        scrub: 1,
                        snap: {
                        snapTo: 1 / (sections.length - 1),
                        duration: {min: 0.2, max: 0.3},
                        delay: 0
                        },
                        // Base vertical scrolling on how wide the container is so it feels more natural.
                        end: () => "+=" + (document.querySelector(".publishers-slide-list").offsetWidth / 3)
                    }
                });
            })();
        }
        if ($('.text-image-blocks-list').length) {
            (function() {
                

                gsap.registerPlugin(ScrollTrigger);

                let sections = gsap.utils.toArray(".publishers-slide-list .publishers-slide")
        
                gsap.to(sections, {
                    scrollTrigger: {
                        trigger: ".text-image-fixed",
                        start: "top 66px",
                        onEnter: () => $('.text-image-fixed').addClass('fixed'),
                        // onLeave: () => $('.text-image-fixed').removeClass('fixed'),
                        // onEnterBack: () => $('.test-block').addClass('active'),
                        onLeaveBack: () => $('.text-image-fixed').removeClass('fixed'),
                        end: "bottom",
                    }
                });
                
                gsap.to(sections, {
                    scrollTrigger: {
                        trigger: ".text-image-block-last",
                        start: "center center",
                        onEnter: () => $('.text-image-fixed').removeClass('fixed').addClass('absolute-bottom'),
                        // onLeave: () => $('.text-image-fixed').removeClass('fixed'),
                        // onEnterBack: () => $('.test-block').addClass('active'),
                        onLeaveBack: () => $('.text-image-fixed').removeClass('absolute-bottom').addClass('fixed'),
                        end: "bottom",
                    }
                });
        
                $('.text-image-block').each(function(e) {
                    
                    gsap.to(sections, {
                        scrollTrigger: {
                            trigger: ".text-image-block-" + e,
                            start: "top center",
                            onEnter: function() {
                                $('.text-image-fixed .image-wrapper.active').removeClass('active');
                                $('.text-image-fixed .image-wrapper-' + e).addClass('active');
                            },
                            onEnterBack: function() {
                                $('.text-image-fixed .image-wrapper.active').removeClass('active');
                                $('.text-image-fixed .image-wrapper-' + e).addClass('active');
                            },
                            end: "bottom center",
                        }
                    });
                });
            })();
        }
    }
    
    $(window).on('load', function() {
        if ($(window).width() > 767) {
            heightReadersImage();
        }
    });
    
    $(window).resize(function() {
        if ($(window).width() > 767) {
            heightReadersImage();
        }
    });
    
    function heightReadersImage() {
        var max_text_height = 0;
        $('.readers-block .readers-slide-2 .text-wrapper').each(function() {
            var text_height = $(this).outerHeight();
            if (max_text_height < text_height) {
                max_text_height = text_height;
            }
        });
        var block_height = $('.readers-slide-2 .slide-wrapper').height(),
            image_height = block_height - max_text_height;
        
        $('.readers-block .readers-slide-2 .image-wrapper').each(function() {
            $(this).height(image_height);
        });
        
    }
});
