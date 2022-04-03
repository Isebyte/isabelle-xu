
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
