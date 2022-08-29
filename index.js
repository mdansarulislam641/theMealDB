
const loadMeals = (search) =>{
    const mealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(mealUrl)
    .then(res=>res.json())
    .then(data=>displayMeals(data.meals))
}

const displayMeals = meals =>{
    const container = document.getElementById('container');
    container.innerText=``;
    meals.forEach(meal=>{
        const divcontainer = document.createElement('div');
        divcontainer.classList.add('col');
        divcontainer.innerHTML=`
        <divclass="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="loadMealDetail(${meal.idMeal})" class="card">
        <img src="${meal.strMealThumb}" class="card-img-top img" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal} </h5>
          <p class="card-text">${meal.strInstructions.slice(0, 200)} </p>
          
        </div>
      </div>
        `;
        container.appendChild(divcontainer)
        // console.log(meal)
    })
}

const searchFood = ()=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    
    loadMeals(searchText);
    searchField.value = "";
}

const loadMealDetail = (idMeal) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>mealDisplay(data.meals[0]))

}

const mealDisplay = (meals)=>{
    const modalContainer = document.getElementById('mealDetails');
    modalContainer.innerHTML=`
    <div class="modal-content">
    <div class="modal-body">
    <img class="w-100  modal-image" src="${meals.strMealThumb}">
    <h5 class="modal-title h2" id="staticBackdropLabel">${meals.strMeal} </h5>
    <p class="card-text">${meals.strInstructions.slice(0, 200)} </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary">Understood</button>
    </div>
  </div>
    `
   

}

loadMeals('fish');
