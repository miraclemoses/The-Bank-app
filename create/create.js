//event listeners - will be invoked after DOM Content is loaded
function eventListeners(){
const container = document.getElementsByClassName("container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const form = document.getElementById("question-form");
const feedback = document.querySelector("#error");
const categoryname = document.getElementById("category");
const sort = document.getElementById("categoryList");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");
const showBtn = document.querySelector(".card");
const questionList = document.querySelector(".card-list-container");

let editBool = false;


let id;


    //new ui instance
    const ui = new UI();
    //retrieve questions from local storage
    let data = ui.retrieveLocalStorgage();
    if (data.length > 0){
        id = (data[(data.length-1)].id)+1;
    } else {
        id = 1;
    }
    data.forEach(function(question){
        ui.addQuestion(questionList, question);
    }) 
    //show question form
    addQuestion.addEventListener('click', function(){
        ui.showQuestion(addQuestionCard);
    });
    //hide question form
    closeBtn.addEventListener('click', function(){
        ui.hideQuestion(addQuestionCard);
    });
  
  
    //add question
    form.addEventListener('submit', function(event){
        event.preventDefault();

        const questionValue = question.value;
        const answerValue = answer.value;
        const categoryValue = categoryname.value

        if(questionValue === '' || answerValue === ''){
          feedback.classList.add('showitem', 'alert-danger');
            feedback.textContent = 'cannot add empty values';
          setTimeout(function(){
            feedback.classList.remove("alert-danger", 'showitem');    
        }, 3000)
        } else {
            const question =  new Question(id, categoryValue, questionValue, answerValue);
            data.push(question);
            ui.addToLocalStorage(data);
            id++;
            ui.addQuestion(questionList, question)
            ui.clearFields(question, answer);
            ui.hideQuestion(addQuestionCard);
            
        }
      });

    //work with a question
    questionList.addEventListener('click', function(event){
        event.preventDefault();
    if(event.target.classList.contains('delete')){
        let id = event.target.dataset.id;

        questionList.removeChild(event.target.parentElement.parentElement.parentElement);
        // rest of data
        let tempData = data.filter(function(item){
            return item.id !== parseInt(id);
        });
        data = tempData;
        ui.addToLocalStorage(data);

    } else if (event.target.classList.contains('answer-div')){
            event.target.nextElementSibling.classList.toggle('showitem');
    } else if (event.target.classList.contains('edit')){
        //delete question from DOM
        let id = event.target.dataset.id;
        questionList.removeChild(event.target.parentElement.parentElement.parentElement);

        //show question in question card
        ui.showQuestion(addQuestionCard);
        //find specific question clicked
        const tempQuestion = data.filter(function(item){
            return item.id === parseInt(id);
        });
        // rest of data
        let tempData = data.filter(function(item){
            return item.id !== parseInt(id);
        });
        data = tempData;
        question.value = tempQuestion[0].title;
        answer.value = tempQuestion[0].answer;
        categoryname.value = tempQuestion[0].categoryname;
        
    }  
    });
    
// sort according to category
sort.addEventListener('click', () => {
const sortBy = document.getElementById('lists').value

let detached = document.querySelectorAll('[category]');
let detachedArray = Array.from(detached);

detachedArray.forEach(e => {
  
  if(e.getAttribute("category") != sortBy) {
  
    document.querySelector(".card-list-container").removeChild(e)
    console.groupCollapsed('not found')
      console.log(`not found but ${e.getAttribute("category")} can be found` )
    console.groupEnd()
    // sort() slow sorting
    
    
  }else  {
    console.groupCollapsed('found')
      console.log(`${e.getAttribute("category")} found` )
    console.groupEnd()
    
    
    console.log(e)
    document.querySelector(".card-list-container").append(e)
    
  }
  
    
  });
  
});




//Add question when user clicks 'Add Flashcard' button
addQuestion.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  categoryname = "";
  addQuestionCard.classList.remove("hide");
});

//Hide Create flashcard Card
closeBtn.addEventListener(
  "click",
  (hideQuestion = () => {
    container.classList.remove("hide");
    addQuestionCard.classList.add("hide");
    if (editBool) {
      editBool = false;
      submitQuestion();
    }
  })
);



}



//Constructor function responsible for each question
function Question(id, categoryname, title, answer){
  this.id = id;
  this.categoryname = categoryname
  this.title = title;
  this.answer = answer;
  
}


// dom event listener to run when content is loaded
document.addEventListener('DOMContentLoaded', function(){
  eventListeners();
});




//Card Generate
//Contructor function responsible for the display
  function UI(){
      //show question card
      UI.prototype.showQuestion = function(element){
          element.classList.add('showitem');
      }
      
      //hide question card
      UI.prototype.hideQuestion = function(element){
          element.classList.remove('showitem');
      }
      //add question
      UI.prototype.addQuestion = function(element, question){
        const div = document.createElement('div');
        div.classList.add(`col-md-4-`);
        div.setAttribute('category',`${question.categoryname}`);
        
        
      div.innerHTML = `<div class="question-div">${question.title}</h4>
      <a href="#" class="show-hide-btn answer-div">Show/Hide Answer</a>
      <h5 class="answer mb3">${question.answer}</h5>
      <div class="flashcard-btn d-flex justify-content-between">
 
      <a href="#" id="edit-flashcard" class="edit" data-id="${question.id}">edit</a>
         <a href="#" id="delete-flashcard" class="delete" data-id="${question.id}">delete</a>
        </div>
       </div>`;
       element.appendChild(div);
      }
  //add to Local Storage
UI.prototype.addToLocalStorage = function(data){
  localStorage.clear();
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('flash-questions', dataJSON)
}
//retrieve from localStorage
UI.prototype.retrieveLocalStorgage = function(){

  let savedQuestions = localStorage.getItem('flash-questions');
  if (savedQuestions){
      const savedQuestionsParsed = JSON.parse(savedQuestions);
      return savedQuestionsParsed;
  } else {
      return savedQuestions = [];
  }
  
}
//clear fields
UI.prototype.clearFields = function(question, answer){
  question.value = '';
  answer.value = '';
}
}





// dark and light mode
document.querySelector('.night').onclick = nightMode


let click = 1
function nightMode() {
  const question = document.querySelectorAll("#card-con");
  const questionarray = Array.from(question);
  console.log(questionarray)
    if (click%2 == 0) {
        document.querySelector('body').classList.toggle('nightmode');
        document.querySelector('.night').innerHTML = 'night-mode';
        questionarray.classList.toggle('nightmode');

    }else {
        document.querySelector('body').classList.toggle('nightmode')
        document.querySelector('.night').innerHTML = 'day-mode';
        questionarray.classList.toggle('nightmode');
        
    }
    click +=1;
    // console.log(click)
}
  
// only cards
// document.querySelector('#viewcards').addEventListener('click', viewCards) 

// function viewCards() {
//   document.querySelector('.add-flashcard-con').classList.add('hide')
// }