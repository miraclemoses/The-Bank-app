document.querySelector('.night').onclick = nightMode
document.querySelector('.lost').onclick = navBar


let click = 1
function nightMode() {
    if (click%2 == 0) {
        document.querySelector('body').classList.toggle('nightmode')
        document.querySelector('.lost').classList.toggle('nightmode')
        document.querySelector('.night').classList.toggle('nightmode')
        document.querySelector('.hidden').classList.toggle('nightmode')
        document.querySelector('.night').innerHTML = 'night-mode'
    }else {
        document.querySelector('body').classList.toggle('nightmode')
        document.querySelector('.lost').classList.toggle('nightmode')
        document.querySelector('.night').classList.toggle('nightmode')
        document.querySelector('.hidden').classList.toggle('nightmode')
        document.querySelector('.night').innerHTML = 'day-mode'
    
    }
    click +=1;
    console.log(click)
}
function navBar() {
    document.querySelector('section').classList.toggle('nav')
    document.querySelector('.lost').classList.toggle('hide')
    document.getElementById('myNav').style.width = "50%"
    
    
}
function closeNav() {
    document.getElementById('myNav').style.width = "0%"
    document.querySelector('.lost').classList.remove('hide')
    
}

// only cards
// document.querySelector('#viewcards').addEventListener('click', viewCards) 

// function viewCards() {
//   document.querySelector('.add-flashcard-con').classList.add('hide')
// }