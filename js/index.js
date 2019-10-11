let pageNum = 1
const countOfMonsterDisplay = 3
let url = `http://localhost:3000/monsters/?_limit=${countOfMonsterDisplay}&_page=${pageNum}`
let monsterContainer = document.getElementById('monster-container')
// const allMonsters = []


function main() {
  document.addEventListener('DOMContentLoaded', () => {
    monsterList()
    buttons()
    createNewMonster()
  })
}

// Create Monster List

function monsterList() {
  console.log(url)
  fetch(url)
  .then(resp => resp.json())
  .then(monsObj => renderMonsters(monsObj))
}

function renderMonsters(monsters) {
  // console.log(monsters)
  monsterContainer.innerHTML = ""
  monsters.forEach(monster => {
    renderMonster(monster)
  })
}

function renderMonster(monster) {
  // console.log(monsterContainer)
  const monsterCard = document.createElement('div')
  monsterCard.dataset.id = monster.id

  const monsterP = document.createElement('h3')
  monsterP.textContent = `Name: ${monster.name}`

  const monsterAge = document.createElement('p')
  monsterAge.textContent = `Age: ${monster.age}`

  const monsterDescrip = document.createElement('p')
  monsterDescrip.textContent = `Description: ${monster.description}`

  monsterCard.append(monsterP, monsterAge, monsterDescrip)
  monsterContainer.append(monsterCard)
  // console.log(monsterCard)
}

// Bottom Show Buttons

function buttons() {

  nextButtonListener()
  previousButtonListener()
  // lastPage()
}

function nextButtonListener() {
  const nextBtn = document.getElementById('forward')
  nextBtn.addEventListener('click', (event) => {
    event.preventDefault
    // console.log(event)
    nextPage()
  })
}

function nextPage() {
  pageNum = pageNum + 1
  // console.log(monsterContainer.innerHTML)
  buttonConditionals(pageNum)
  url = `http://localhost:3000/monsters/?_limit=${countOfMonsterDisplay}&_page=${pageNum}`
  // console.log(pageNum)
  monsterList(pageNum)
}

function previousButtonListener() {
  const nextBtn = document.getElementById('back')
  nextBtn.addEventListener('click', (event) => {
    event.preventDefault
    // console.log(event)
    previousPage()
  })
}

function previousPage() {
  pageNum = pageNum - 1
  buttonConditionals(pageNum)
  url = `http://localhost:3000/monsters/?_limit=${countOfMonsterDisplay}&_page=${pageNum}`
  monsterList()
}

function buttonConditionals(pageNum) {
  if (pageNum > 1) {
    document.getElementById("back").disabled = false;
  } else {
    document.getElementById("back").disabled = true;
  }

  if (monsterContainer.innerHTML === "") {
    document.getElementById("forward").disabled = true;
  } else if (monsterContainer.innerHTML !== "") {
    document.getElementById("forward").disabled = false;
  }

}

// Create New Monster

function createNewMonster() {
  const newMonsterForm = document.querySelector('#create-monster-form')
  newMonsterForm.addEventListener('submit', (event) => {
    event.preventDefault()
    // console.log(newMonsterForm)
    postNewMonster(event)
  })

function postNewMonster(event) {
  // console.log(event.target[0].value)
  // console.log(event.target[1].value)
  // console.log(event.target[2].value)

      const reqObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: event.target[0].value,
          age: event.target[1].value,
          description: event.target[2].value
        })
      }
      fetch('http://localhost:3000/monsters', reqObj)
      .then(resp => resp.json())
      .then(monsObj => renderMonster(monsObj))
      clearForm(event)
}

function clearForm(event) {
  if (event.target[0].value || event.target[1].value || event.target[2].value) {
    event.target[0].value = "",
    event.target[1].value = ""
    event.target[2].value = ""
  }
}


}

main()
