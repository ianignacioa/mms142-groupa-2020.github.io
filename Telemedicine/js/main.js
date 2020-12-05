/**
 * @GROUP Worker for animation using jquery
 */

(function ($) {
    "use strict";

    // Preloader (if the #preloader div exists)
    $(window).on("load", function () {
        if ($("#preloader").length) {
            $("#preloader")
                .delay(100)
                .fadeOut("slow", function () {
                    $(this).remove();
                });
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });
    $(".back-to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
        return false;
	});
	

    // Initiate the wowjs animation library
    new WOW().init();

    // Header scroll class
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $("#header").addClass("header-scrolled");
        } else {
            $("#header").removeClass("header-scrolled");
        }
    });


    if ($(window).scrollTop() > 100) {
        $("#header").addClass("header-scrolled");
    }

    // Smooth scroll for the navigation and links with .scrollto classes
    $(".main-nav a, .mobile-nav a, .scrollto").on("click", function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 0;

                if ($("#header").length) {
                    top_space = $("#header").outerHeight();

                    if (!$("#header").hasClass("header-scrolled")) {
                        top_space = top_space - 40;
                    }
                }

                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - top_space,
                    },
                    1500,
                    "easeInOutExpo"
                );

                if ($(this).parents(".main-nav, .mobile-nav").length) {
                    $(".main-nav .active, .mobile-nav .active").removeClass(
                        "active"
                    );
                    $(this).closest("li").addClass("active");
                }

                if ($("body").hasClass("mobile-nav-active")) {
                    $("body").removeClass("mobile-nav-active");
                    $(".mobile-nav-toggle i").toggleClass("fa-times fa-bars");
                    $(".mobile-nav-overly").fadeOut();
                }
                return false;
            }
        }
    });

    // Navigation active state on scroll
    var nav_sections = $("section");
    var main_nav = $(".main-nav, .mobile-nav");
    var main_nav_height = $("#header").outerHeight();

    $(window).on("scroll", function () {
        var cur_pos = $(this).scrollTop();

        nav_sections.each(function () {
            var top = $(this).offset().top - main_nav_height,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                main_nav.find("li").removeClass("active");
                main_nav
                    .find('a[href="#' + $(this).attr("id") + '"]')
                    .parent("li")
                    .addClass("active");
            }
        });
    });

    // jQuery counterUp (used in Whu Us section)
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000,
    });

    // Porfolio isotope and filter
    $(window).on("load", function () {
        var portfolioIsotope = $(".portfolio-container").isotope({
            itemSelector: ".portfolio-item",
        });
        $("#portfolio-flters li").on("click", function () {
            $("#portfolio-flters li").removeClass("filter-active");
            $(this).addClass("filter-active");

            portfolioIsotope.isotope({ filter: $(this).data("filter") });
        });
    });

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1,
    });

    // Clients carousel (uses the Owl Carousel library)
    $(".clients-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 } },
    });
})(jQuery);

var videos = document.getElementsByTagName("iframe"),
    fraction = 0.8;

function checkScroll() {
    for (var i = 0; i < videos.length; i++) {
        var video = videos[i];

        var x = 0,
            y = 0,
            w = video.width,
            h = video.height,
            r, //right
            b, //bottom
            visibleX,
            visibleY,
            visible,
            parent;

        parent = video;
        while (parent && parent !== document.body) {
            x += parent.offsetLeft;
            y += parent.offsetTop;
            parent = parent.offsetParent;
        }

        r = x + parseInt(w);
        b = y + parseInt(h);

        visibleX = Math.max(
            0,
            Math.min(
                w,
                window.pageXOffset + window.innerWidth - x,
                r - window.pageXOffset
            )
        );
        visibleY = Math.max(
            0,
            Math.min(
                h,
                window.pageYOffset + window.innerHeight - y,
                b - window.pageYOffset
            )
        );

        visible = (visibleX * visibleY) / (w * h);

        if (visible > fraction) {
            playVideo();
        } else {
            pauseVideo();
        }
    }
}

var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
        },
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    window.addEventListener("scroll", checkScroll, false);
    window.addEventListener("resize", checkScroll, false);

    //check at least once so you don't have to wait for scrolling for the    video to start
    window.addEventListener("load", checkScroll, false);
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        //console.log("event played");
    } else {
        //console.log("event paused");
    }
}

function stopVideo() {
    player.stopVideo();
}

function playVideo() {
    player.playVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

checkScroll();