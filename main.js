
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
function searchMeal(){
    
    const term = search.value;
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res=>res.json())
        .then(data=> {
            console.log(data);
            //result heading
            resultHeading.innerHTML=`<h2>Search result for '${term}':</h2>`;
            if(data.meals===null){
                resultHeading.innerHTML=`<p>There is no  result for '${term}':</p>`
                meals.innerHTML="";
            }
            else{
                meals.innerHTML=data.meals.map(meal=>`
                    <div class="meal">
                    
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                        
                        <div class="meal-info" data-mealId="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                            
                        </div>
                    </div>`).join("")
            }
        })
        search.value="";
    }
    else{
        alert('Please input meal name to search')
    }
    
}
//submitButton event listener
submitButton.addEventListener('click',searchMeal);


///single meal event listener
    //get id
    meals.addEventListener('click', function(e){
        e= e||window.event;
        const mealInfo = e.path.find(item=>{
            console.log(item)
        })
    })