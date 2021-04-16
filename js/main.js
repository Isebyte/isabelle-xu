window.onload = function () {
    console.log("Window onload");
    addSmoothScrolling();
    fadeInOnScroll();
}

// Add smooth scrolling to all <a> tags
function addSmoothScrolling() {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            let hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });
}

function fadeInOnScroll() {
    $(window).scroll(function () {
        $('.fade').each(function (i) {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window > bottom_of_object) {
                $(this).animate({
                    'opacity': '1'
                }, 1000);
            }
        });
    });
}