
//get term from search box
const search = document.getElementById('search-box');
//submit button 
const submitButton = document.getElementById('search-button');

//showing result......../////

//result heading
const resultHeading = document.getElementById('result-heading');
//All meals
const meals = document.getElementById('meals');
//single-meal
const singleMeal = document.getElementById('single-meal');



//search meals and display
function searchMeal() {

    const term = search.value;
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {

                //result heading
                resultHeading.innerHTML = `<h2>Search result for '${term}':</h2>`;
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There is no  result for '${term}':</p>`
                    meals.innerHTML = "";
                }
                else {
                    meals.innerHTML = data.meals.map(meal => `
                    <div onclick="getSingleMeal('${meal.idMeal}')" class="meal">
                    
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                        
                        <div class="meal-info" data-mealId="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                            
                        </div>
                    </div>`).join("")
                }
            })
        search.value = "";
    }
    else {
        alert('Please input meal name to search')
    }

}
//submitButton event listener
submitButton.addEventListener('click', searchMeal);


///single meal event listener
//get id
function getSingleMeal(mealId) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            showSingleMeal(meal);


            // console.log(data, data.meals[0].strIngredient1)
        });
}
//showSingleMeal
function showSingleMeal(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(` ${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]} `);
            meals.innerHTML = "";
            
        } else {
            break;
        }

    }

    meals.innerHTM=""

    singleMeal.innerHTML = `
            <div class="single-meal">
                <h1>${meal.strMeal}</h1>
            </div>
            <img class"single-meal-img " src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>Ingredients:</h2>
            <ol class="single-meal-info">
                ${ingredients.map(ing=>
                    `<li>${ing}</li>`
                ).join('')}
            </ol>
    `
}