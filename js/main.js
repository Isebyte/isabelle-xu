
/**
 * Attaches eventlisteners to every gallery image to open the corresponding slide in the modal carosel
 */
function initImgCarouselToggle() {
    let galleryImgs = document.getElementsByClassName("gallery-img");
    let myCarouselEl = document.getElementById('carousel');
    let carousel = new bootstrap.Carousel(myCarouselEl);
    console.log(carousel);
    for (let i = 0; i < galleryImgs.length; i++) {
        galleryImgs[i].addEventListener("click", function(){
            console.log("Showing slide %s", i);
            carousel.to(i);
        });
    }
}

/**
 * Add smooth scrolling to all elements of class "smoothA"
 */ 
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
