// My selectors

let container = document.querySelector(".container");
let movie = document.querySelector("#movie");
let seats = container.querySelectorAll(".row .seat:not(.occupied)");
let count = document.querySelector("#count");
let total = document.querySelector("#total");

populateUI();

// FUNCTION FOR NUMBER OF SEAT/MOVIE SELECTED

let placeCount = () => {
  let seatSelected = container.querySelectorAll(".row .seat.selected");
  let movieIndex = movie.selectedIndex;
  let seatIndex = [...seatSelected].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem("seatAlreadySelected", JSON.stringify(seatIndex));

  localStorage.setItem("movieSelected", movieIndex);
  count.innerHTML = seatSelected.length;
  total.innerHTML = movie.value * seatSelected.length;
};

// FUNCTION IF LOCALSTORAGE => FIND

function populateUI() {
  let previousSelectedSeats = JSON.parse(
    localStorage.getItem("seatAlreadySelected")
  );
  if (previousSelectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (previousSelectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  let previousSelectedMovie = localStorage.getItem("movieSelected");
  if (previousSelectedMovie !== null) {
    movie.selectedIndex = previousSelectedMovie;
  }
}

// EVENT LISTENER

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  placeCount();
});

movie.addEventListener("change", (e) => {
  placeCount();
});

placeCount();
