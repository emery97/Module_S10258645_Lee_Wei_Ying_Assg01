var slideIndex = 1;
var timer = null;
showSlides(slideIndex);

function plusSlides(n) {
  clearTimeout(timer);
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  clearTimeout(timer);
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n==undefined){n = ++slideIndex}
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  timer = setTimeout(showSlides, 2000);
} 

var searchContainer = document.getElementById("search-container");
        var toggleButton = document.getElementById("toggleButton");

        function toggleSearchBar() {
            searchContainer.style.display = "block";
            toggleButton.classList.add("hidden");
        }

        function search() {
            // Add your search logic here
            alert("Search performed!");
        }

        document.addEventListener("click", function (event) {
            var isClickInsideSearchContainer = searchContainer.contains(event.target);
            var isClickInsideToggleButton = toggleButton.contains(event.target);

            if (!isClickInsideSearchContainer && !isClickInsideToggleButton) {
                searchContainer.style.display = "none";
                toggleButton.classList.remove("hidden");
            }
        });