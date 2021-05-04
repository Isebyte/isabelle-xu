window.onload = function () {
    console.log("Window onload");
    addSmoothScrolling();
    fadeInOnScroll();
    initNavLinks();

}

function initNavLinks() {
    let pages = document.getElementsByClassName("page");
    let navLinks = document.getElementsByClassName("navLink");
    for (let i = 0; i < pages.length; ++i ) {
        console.log("init " + pages[i].id);
        let targetId = pages[i].id;
        navLinks[i].onclick = function() {
            console.log(targetId + " clicked");
            showPage(targetId);
        } 
    }

    // init home (Isabelle Xu)
    document.getElementsByClassName("logo")[0].onclick = function() {
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
    $( ".page" ).hide();
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