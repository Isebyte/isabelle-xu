
let currSlide = 0; // default slide set to 0

/**
 * Attaches eventlisteners to every gallery image to open the corresponding slide in the modal carosel
 */
function initImgCaroselToggle() {
    let galleryImgs = document.getElementsByClassName("gallery-img");
    for (let i = 0; i < galleryImgs.length; i++) {
        galleryImgs[i].addEventListener("click", function(){setSlide(i)});
    }
}

/**
 * Sets the gallery carosel to show slide # i
 * @param {*} i the slide number to show
 */
function setSlide(i) {
    console.log("Showing slide #" + i);
    // remove active class from previous shown slide
    let prevSlide = document.getElementById(currSlide);
    prevSlide.classList.remove("active");
    let nextSlide = document.getElementById(i);
    nextSlide.classList.add("active");
    currSlide = i;
}