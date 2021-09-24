window.onload = function () {
    console.log("Window onload");
    showPage("home");
    addSmoothScrolling();
    fadeInOnScroll();
    initNavLinks();
    window.addEventListener("load", isInView);
    window.addEventListener("scroll", isInView);

}

function initNavLinks() {
    let pages = document.getElementsByClassName("page");
    let navLinks = document.getElementsByClassName("navLink");
    for (let i = 0; i < pages.length; ++i) {
        console.log("init " + pages[i].id);
        let targetId = pages[i].id;
        navLinks[i].onclick = function (ev) {
            console.log(targetId + " clicked");
            showPage(targetId);
            isInView();
            if(targetId == "cs") ev.preventDefault(); // prevent extra scroll
        }
    }

    // init home (Isabelle Xu)
    document.getElementsByClassName("logo")[0].onclick = function () {
        console.log("logo clicked");
        showPage("home");
    }
}

/**
 * Single page design implementation.
 * Show page with given id and hide all other pages with a fade transition.
 * @argument id
 */
function showPage(id) {
    // hide all pages
    $(".page").hide();
    removeTimeline();
    // show page with input id
    $("#" + id).fadeIn();
}

// Add smooth scrolling to all elements of class "smoothA"
function addSmoothScrolling() {
    let smoothIds = document.getElementsByClassName("smoothA");
    for (let i = 0; i < smoothIds.length; ++i) {
        $(smoothIds[i]).on('click', function (event) {
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

// -------------- Timeline Interactivity --------------------
function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

var items = document.querySelectorAll(".timeline li");

// code for the isElementInViewport function
function isInView() {
    let items = document.querySelectorAll(".timeline li");
    for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
            items[i].classList.add("in-view");
        }
    }
}

function removeTimeline() {
    let items = document.querySelectorAll(".timeline li");
    for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
            items[i].classList.remove("in-view");
        }
    }
}