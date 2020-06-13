const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const results = document.getElementById('results-heading');
const mealsElement = document.getElementById('meals');
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
        results.innerHTML = `<h2>Search Results for '${term}':</h2>`;

        if (data.meals === null) {
          results.innerHTML = `<p>There are no results for this item. Try another search</p>`;
        } else {
          mealsElement.innerHTML = data.meals
            .map(
              (meal) => `
            <div class='meal'>
              <img src='${meal.strMealThumb}' alt ='${meal.strMeal}'/>
              <div class='meal-info' data-mealID='${meal.idMeal}'>
              <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join('');
        }
      });

    //clear search text
    search.value = '';
  } else {
    alert('Please enter a vlaue');
  }
}

//Fetch meal BY ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDom(meal);
    });
}

//Fetch random Meal
function randomMeal() {
  // clear meals and heading
  mealsElement.innerHTML = '';
  results.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDom(meal);
    });
}

// Add meal to dom
function addMealToDom(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single.innerHTML = `<div class ='single-meal'>
    <h1>${meal.strMeal}</h1>
    <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
    <div class='single-meal-info'>
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class='main'>
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
      </ul>
    </div>
  </div>`;
}

// Event Listener

submit.addEventListener('submit', searchMeals);
random.addEventListener('click', randomMeal);

mealsElement.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealById(mealID);
  }
});
