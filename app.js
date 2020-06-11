const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const results = document.getElementById('results-heading');
const meals = document.getElementById('meals');
const single = document.getElementById('single-meal');

// Search Meal and Fetch from API
function searchMeals(e) {
  e.preventDefault();
  // CLear single Meal
  single.innerHTML = '';
  //get search term
  const term = search.value;
  // CHeck for empty input
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  } else {
    alert('Please enter a vlaue');
  }
}

// Event Listener

submit.addEventListener('submit', searchMeals);
