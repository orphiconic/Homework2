var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");
var suggestionList = document.getElementById('suggestion')
//used to check if some item in itemList is already active;
var initialActive=0;
//load data from localStorage on page Load
window.addEventListener('load', parseLocalStorage);
// Form submit event
form.addEventListener("submit", addItem);
// Delete event
itemList.addEventListener("click", removeItem);
// Filter event
filter.addEventListener("keyup", filterItems);
// Filter event update sugesstion
filter.addEventListener("keyup",updateSuggestionList);
// Up and down arrow click selection
filter.addEventListener("keyup",selectSuggestion)
//SuggestionList update
suggestionList.addEventListener('click',suggestionClickUpdate);

// Add item
function addItem(e) {
  e.preventDefault();
  //Get input value
  var newItem = document.getElementById("item").value;
  // Create new li element
  var li = document.createElement("li");
  // Add class
  li.className = "list-group-item";
  // Add text node with input value
  li.appendChild(document.createTextNode(newItem));
  // Create del button element
  var deleteBtn = document.createElement("button");
  // Add classes to del button
  deleteBtn.className = "btn btn-danger btn-sm float-right delete";
  // Append text node
  deleteBtn.appendChild(document.createTextNode("X"));
  // Append button to li
  li.appendChild(deleteBtn);
  // Append li to list
  itemList.appendChild(li);
  //update local storage
  updateLocalStorage();
}

// Remove item
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
  updateLocalStorage();
}

// Filter items
function filterItems(e) {
  // convert text to lowercase
  var text = e.target.value.toLowerCase();

  // Get list items
  var items = itemList.getElementsByTagName("li");

  // Convert HTMLCollection to an array
  Array.from(items).forEach(function(item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function updateSuggestionList(){
  var text=filter.value;
  var items=itemList.getElementsByTagName("li");
  suggestionList.innerHTML='';
  if(text){
    Array.from(items).map((item)=>{
      var itemName=item.firstChild.textContent;
      if(itemName.toLowerCase().indexOf(text.toLowerCase())===0){
        var optionElement=document.createElement('h4')
        optionElement.innerHTML=itemName;
        suggestionList.appendChild(optionElement);
      }
    })
  }

}

function suggestionClickUpdate(e){
  filter.value=e.target.innerHTML;
  updateSuggestionList();
  suggestionList.innerHTML=" ";
  text=filter.value;
  var items=itemList.getElementsByTagName("li");
  // Function filter items could not be used
  // because it does not check complete match
  Array.from(items).forEach(function(item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase() === text.toLowerCase()) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

}

function selectSuggestion(e){
  console.log('brate2');
  var suggestionListLength=Array.from(suggestionList.children).length;
    if ((e.which == 38 || e.which==40) && initialActive==0) {
      console.log('tu smo')
      console.log(suggestionList.firstElementChild)
      suggestionList.firstElementChild.classList.add('active');
      initialActive=1;
    }else{
      if(e.which==38 || e.which==40){
        suggestionList.querySelector(`h4:nth-child(${initialActive})`).classList.remove('active');
        initialActive=setInitialActive(suggestionListLength,initialActive,e.which);
        suggestionList.querySelector(`h4:nth-child(${initialActive})`).classList.add('active')
      }else if(e.which==13){
        enterResolve(initialActive);
      }
      else{
        initialActive=0;
      }
    }
    
}

//key direction code up=38 down=40
 function setInitialActive(itemListLength,initialActive,keyDirection){
   if(keyDirection==38){
     if(initialActive-1<=0){
       initialActive=itemListLength;
     }
     else{
       initialActive--;
     }
   }
   else{
     if(initialActive+1>itemListLength){
       initialActive=1;
     }else{
       initialActive++
     }
   }
   return initialActive;
 }

function enterResolve(initialActive){
  filter.value=suggestionList.querySelector(`h4:nth-child(${initialActive})`).innerHTML;
  updateSuggestionList();
  suggestionList.innerHTML=" ";
  text=filter.value;
  var items=itemList.getElementsByTagName("li");
  // Function filter items could not be used
  // because it does not check complete match
  Array.from(items).forEach(function(item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase() === text.toLowerCase()) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  initialActive=0;
}

function updateLocalStorage(){
  var itemsArray=Array.from(itemList.children).map((item)=>{
    return(item.childNodes[0].nodeValue)
})
localStorage.setItem("itemsArray",JSON.stringify(itemsArray))
}

function parseLocalStorage(){
  var itemsArray=JSON.parse(localStorage.getItem("itemsArray"));
  console.log(itemsArray);
  itemsArray.map((item)=>{
  var li=document.createElement('li');
  li.classList='list-group-item';
  var delButton=document.createElement('button')
  delButton.appendChild(document.createTextNode('X'));
  delButton.classList="btn btn-danger btn-sm float-right delete";
  li.appendChild(document.createTextNode(item))
  li.appendChild(delButton);
  itemList.appendChild(li);
})


}