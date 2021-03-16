'use strict';

const seatContainer = document.querySelector('.seat-container');
const movieSelect = document.getElementById('movie');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('.count');
const total = document.querySelector('.total');
const allTheSeats = document.querySelectorAll('.seat-container .seat');
let selectedSeats;

// buttons

const btn1 = document.querySelector('.btn--mod1');
const btn2 = document.querySelector('.btn--mod2');
const btn3 = document.querySelector('.btn--mod3');
const btn4 = document.querySelector('.btn--mod4');

populateUI();

let ticketPrice = +movieSelect.value;

// FUNctions//////////////////////////////////////////////

function dataAboutMovie(movieIndex, moviePrice) {
  localStorage.setItem('movieIndex', movieIndex);
  localStorage.setItem('moviePrice', moviePrice);
}

// Update count and total
function updateCountAndTotal() {
  selectedSeats = document.querySelectorAll('.row .selected');
  const selectedSeatsAmount = selectedSeats.length;

  count.innerText = selectedSeatsAmount;
  total.innerText = selectedSeatsAmount * ticketPrice;
}

// Get data from local storage
function populateUI() {
  const seatsInStorage = JSON.parse(localStorage.getItem('selectedIndex'));

  if (seatsInStorage !== null && seatsInStorage.length > 0) {
    seats.forEach((seat, i) => {
      if (seatsInStorage.indexOf(i) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const movieIndexStorage = localStorage.getItem('movieIndex');
  const moviePriceStorage = localStorage.getItem('moviePrice');

  movieSelect.selectedIndex = movieIndexStorage;
}

// EventListeners/////////////////////////////////////////

seatContainer.addEventListener('click', function (e) {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  )
    e.target.classList.toggle('selected');
  updateCountAndTotal();
});

movieSelect.addEventListener('change', function (e) {
  ticketPrice = +e.target.value;
  updateCountAndTotal();

  dataAboutMovie(e.target.selectedIndex, e.target.value);
});

updateCountAndTotal();

// buttons in action

// use LocalStorage

btn1.addEventListener('click', function () {
  // set value in LocalStorage
  const selectedSeatsIndex = [...selectedSeats].map(seat =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem('selectedIndex', JSON.stringify(selectedSeatsIndex));
});

btn2.addEventListener('click', function () {
  seats.forEach(seat => {
    if (seat.classList.contains('selected')) {
      seat.classList.remove('selected');
    }

    location.reload();
  });

  localStorage.clear();
  updateCountAndTotal();
});

btn3.addEventListener('click', function () {
  // allTheSeats = document.querySelectorAll('.seat-container .seat');
  allTheSeats.forEach((seat, i) => {
    if (
      allTheSeats[i].classList.contains('occupied') &&
      !allTheSeats[i - 1].classList.contains('occupied') &&
      !allTheSeats[i + 1].classList.contains('occupied')
    ) {
      allTheSeats[i - 1].classList.add('selected');
      allTheSeats[i + 1].classList.add('selected');
    }
  });
  updateCountAndTotal();
});

btn4.addEventListener('click', function () {
  allTheSeats.forEach(seat => {
    if (seat.classList.contains('occupied')) {
      seat.classList.remove('occupied');
      seat.classList.add('selected');
    }
  });
  updateCountAndTotal();
});
