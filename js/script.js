let rowdata = document.getElementById("rowdata");
let searchcontact = document.getElementById("searchcontact");


//loading

$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading-screen").fadeOut(500); // Use "fadeOut" instead of "fadeout"
    $("body").css("overflow", "visible");
    $("inner.loading-screen").fadeOut(500)
  });
});







function opensidenave(){

  $(".side-nav-menu").animate({left:0}, 500)

  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
  for(let i=0;i<5;i++){
    $(".links li").eq(i).animate({top:0},(i+5)*100)

  }
}
function closesidenave(){
  let boxwidth =$(".side-nav-menu .nav-tab").outerWidth()
  $(".side-nav-menu").animate({left:-boxwidth}, 500)
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
  $(".links li").animate({top:300},500)

}
closesidenave()
$(".side-nav-menu i.open-close-icon").click(() => {


   if($(".side-nav-menu").css("left")=="0px"){

  closesidenave()
   }
   else{

 opensidenave()
  
   }
 
 
})

// =======================================api===============================================================================

//searchby name
async function searchByName(term) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  response = await response.json();
  console.log(response.meals);
  displayMeals(response.meals); // Pass the meals array to displayMeals function
}

function displayMeals(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) { // Corrected 'lenght' to 'length'
    cartona += `
      <div class="col-lg-3 g-3">
        <div onclick="getmealdetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
          <img src="${arr[i].strMealThumb}" class="w-100">
          <div class="meal-layer position-absolute d-flex align-items-center text-black p-3">
            <h3>${arr[i].strMeal}</h3>
          </div>
        </div>
      </div>`;
  }
  rowdata.innerHTML = cartona;
}




// ============================================================================================

//get categories
async function getcategories(){
  $(".inner.loading-screen").fadeIn(500)
  searchcontact.innerHTML =""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  response = await response.json();
  console.log(response.categories);
displaycategories(response.categories)
}
function displaycategories(arr) {
  $(".inner.loading-screen").fadeOut(500)
  let cartona = "";
  for (let i = 0; i < arr.length; i++) { // Corrected 'lenght' to 'length'
    cartona += `
      <div class="col-lg-3 g-3">
        <div onclick="getcategorymeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2">
          <img src="${arr[i].strCategoryThumb
          }" class="w-100">
          <div class="meal-layer position-absolute text-center text-black p-3">
            <h3>${arr[i].strCategory}</h3>
            <P>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</P>
          </div>
        </div>
      </div>`;
  }
  rowdata.innerHTML = cartona;
}
// ===================================================================================================
//area
async function getarea(){
  searchcontact.innerHTML =""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  response = await response.json();
  console.log(response.meals);
  displayarea(response.meals)
}
function displayarea(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) { // Corrected 'lenght' to 'length'
    cartona += `
      <div class="col-lg-3 g-3 ">
        <div onclick="getareameals('${arr[i].strArea}')" class="text-center rounded-2 p-3 ">
         
       
          <i class="fa-solid fa-4x fa-house-laptop"></i>
            <h3>${arr[i].strArea}</h3>
    
        </div>
      </div>`;
  }
  rowdata.innerHTML = cartona;
}

// =============================================================================================================
//ingredient

async function getingredient(){
  searchcontact.innerHTML =""
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  response = await response.json();
  console.log(response.meals);
  displayingredient(response.meals.slice(0,20))
}
function displayingredient(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) { // Corrected 'lenght' to 'length'
    cartona += `
      <div class="col-lg-3 g-3 ">
        <div onclick="getingredientmeals('${arr[i].strIngredient}')" class="text-center rounded-2 p-3  cursor-pointer">
         
        <i class="fa-solid  fa-4x fa-bowl-food" style="color: #eceff3;"></i>

            <h3>${arr[i].strIngredient}</h3>
    <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
      </div>`;
  }
  rowdata.innerHTML = cartona;
}
// ===================================================================================================
//filter category
async function getcategorymeals(category){
  let response = await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  response = await response.json();
  console.log(response);
  // displayfiltercategories(response.categories.slice(0,20))
  displayMeals(response.meals.slice(0,20))
}

// ================================================================================================
//filter area
//www.themealdb.com/api/json/v1/1/filter.php?a=Canadian
async function getareameals(area){
  let response = await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  response = await response.json();
  console.log(response);
  // displayfiltercategories(response.categories.slice(0,20))
  displayMeals(response.meals)
}
//========================================================================================================
//filter ingredient
async function getingredientmeals(ingredient){
  let response = await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  response = await response.json();
  console.log(response);
  // call
  displayMeals(response.meals)
}
// =====================================================================================
//www.themealdb.com/api/json/v1/1/lookup.php?i=52772

async function getmealdetails(idMeal) {
  searchcontact.innerHTML =""
  let response = await fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  response = await response.json();
  // Call displaymealdetails
  displaymealdetails(response.meals[0]);
}

function displaymealdetails(meal) {
  let ingredients = "";
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-3 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
    }
  }
  console.log(ingredients);

  let cartona = `
    <div class="col-lg-4">
      <img src="${meal.strMealThumb}" class="w-100 rounded-3">
      <h1 class="text-center py-4">${meal.strMeal}</h1>
    </div>
    <div class="col-lg-8">
      <h2><span class="fw-bolder">Instructions :</span></h2>
      <p>${meal.strInstructions}</p>
      <h4><span class="fw-bolder">AREA :</span>${meal.strArea}</h4>
      <h4><span class="fw-bolder">Category :</span>${meal.strCategory}</h4>
      <h3><span class="fw-bolder">Recipes :</span></h3>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${ingredients}
      </ul>
      <p>You can see the recipe steps</p>
      <a href="${meal.strYoutube}"><i class="fa-brands fa-3x fa-youtube mx-3" style="color: #f50000;"></i></a>
      <a href="${meal.strImageSource}"><i class="fa-solid fa-3x fa-book-open" style="color: #00ff4c;"></i></a>
    </div>
  `;
  rowdata.innerHTML = cartona;
}
// ===========================================================================================================
function showsearchinput(){
  searchcontact.innerHTML = `<section class="hero w-100" id="home">

  <h6>Find a Recipe<br> </h6>
  
  
  
  </section> 
  <div class="container mt-3 d-flex justify-content-center align-items-center">
  <div class="row py-4">
    <div class="col-lg-6">
      <input onkeyup="searchByName(this.value)" class="form-control bg-transparent w-100" type="text" placeholder="Search by name">
    </div>
    <div class="col-lg-6">
      <input onkeyup="searchByflatter(this.value)" lenght="1" class="form-control bg-transparent w-100" type="text" placeholder="Search by first letter">
    </div>
  </div>
</div>

`

}
// ============================================================================================================
//search
//  async function searcchByName (term){
//   let response = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${tarm}`);
//   response = await response.json();
//   // Call displaymealdetails
//   searcchByName(response.meals[0]);

//  }
//byname
 async function searchByName(term) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  response = await response.json();

response.meals ? displayMeals(response.meals) : displayMeals([]) // Pass the meals array to displayMeals function
}
  //by f-latter
  async function searchByflatter(term) {
    term=="" ? term="a":"";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    response = await response.json();
  
  response.meals ? displayMeals(response.meals) : displayMeals([]) // Pass the meals array to displayMeals function
  }

// =============================================================================================
//contact
function contactus(){
  rowdata.innerHTML = `
  <div class="container p-2 ">
  <div class="contact1 bg-body">


    <div class="container form p-3 rounded-4">
      <h1 class="text-center">Contact Me</h1>
      <hr width="3%" size="5" color="black" noshade class="pb-1  mb-5 m-auto ">
      <form class="p-2" id="send" action="#">
        <div class="form-row row">
          <div class="form-group  col-lg-6 ">
            <label for="name">  <h6 >Name</h6></label>
            <input type="text" class="form-control" id="name" placeholder="Your Name..." name="from_name"
              required>
          </div>
          <div class="form-group ">
            <label for="email" for="exampleFormControlInput1" class="form-label"> <h6 >Email</h6></label>
            <input type="email" class="form-control" id="email" placeholder="Your Email..." name="from_email"
              required>
          </div>
        </div>
        <div class="">
          <div class="form-group  ">
            <label for="inputAddress" for="exampleFormControlInput1" class="form-label">
               <h6 >Address</h6></label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"
              name="address" required>
          </div>
        </div>
        <div class="form-group">
          <label for="message" for="exampleFormControlInput1" class="form-label">  <h6 >Message</h6></label>
          <textarea class="form-control" id="Message" rows="3" name="message"
            placeholder="Write Your Message"></textarea>
        </div>
        <button  value="Send Email" type="submit"id="button" class="btn btn-success m-3">send</button>
      
      </form>

      <div class=" bebo   col-lg-6">

        <h2>Get in Touch</h2>
        <hr width="15%" size="5" color="black" noshade class="pb-1  mb-5  ">
        <p>If you want to communicate with me, you can send me a message in this way via e-mail, as well as
          my accounts below.</p>
        
        <p class="vvv">

          (+20) 155 493 </p>
        <p class="vvv">

          contact@gmail.com</p>



        <p>
          <a href="https://www.facebook.com/ahmedgamal.jamey.9">   <i class="bi bi-facebook"></i>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
              class="bi bi-facebook ms-3 me-4 border-primary rounded-circle" viewBox="0 0 16 16">
              <path
                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
            </svg></a>
       
          <a href="https://www.instagram.com/a_7medeid/">  <i class="bi bi-instagram"></i>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
              class="bi bi-instagram me-4 " viewBox="0 0 16 16">
              <path
                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
            </svg></a>
        
<a href="https://twitter.com/Jamy16362789"><i class="bi bi-twitter"></i>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
class="bi bi-twitter me-4" viewBox="0 0 16 16">
<path
d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
</svg></a>
          
<a href="https://www.linkedin.com/in/ahmed-eid-300351240/"><i class="bi bi-linkedin"></i>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
class="bi bi-linkedin me-4  border border-cur   " viewBox="0 0 16 16">
<path
d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
</svg></a>
          







        </p>
      </div>
    </div>

  </div>


</div>
`

}
// document.addEventListener("DOMContentLoaded", function () {
//   const btn = document.getElementById("button");
//   const form = document.getElementById("send");
//       form.addEventListener("submit", function (event) {
//           event.preventDefault();

//           btn.value = "Sending...";

//           const templateID = "template_9e8sjnv";
//           const serviceID = "gmail";

//           emailjs.sendForm(serviceID, templateID, this).then(
//               () => {
//                   btn.value = "Send Email";
//                   event.reset();
//               },
//               (err) => {
//                   btn.value = "Send Email";
//                   alert(JSON.stringify(err));
//               }
//           );
//           form.reset();
//         });
// });

// =============================================================================================
