function main() {
  let pageNumber = 1;

  document.addEventListener('DOMContentLoaded', () => {
    getMonsters();
    addFormListener();
    pageNumberListener();
  })

  function addFormListener() {
    formElement = document.getElementById('monster-form')
    formElement.addEventListener('submit', (event) => {
      event.preventDefault()
      const formData = getFormData(event)
      postMonster(formData)
      formElement.reset()
    })
  }

  function getFormData(event) {
    const name = event.target[0].value
    const age = event.target[1].value
    const description = event.target[2].value

    return  {
      name,
      age,
      description
    }

  }

  function postMonster(formData) {
    const reqObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    }

    fetch('http://localhost:3000/monsters', reqObj)
      .then(resp => resp.json())
      .then(monster => {
        renderMonster(monster)
      })
  }

  function renderMonsters(monsters) {
    const monstersContainer = document.getElementById('monster-container');
    monstersContainer.innerHTML = '';
    monsters.forEach(monster => renderMonster(monster))
  }

  function renderMonster(monster) {
    const monstersContainer = document.getElementById('monster-container');
    const divMonster = document.createElement('div');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');

    h3.innerText = monster.name;
    h4.innerText = monster.age;
    p.innerText = monster.description;
    divMonster.append(h3, h4, p)
    monstersContainer.append(divMonster)
  }

  function getMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=10&_page=${pageNumber}`)
      .then(resp => resp.json())
      .then(monsters => {
        renderMonsters(monsters)
      })
  }

  function pageNumberListener() {
    const forward = document.getElementById('forward');
    const back = document.getElementById('back');
    forward.onclick = (event) => {
      pageNumber++;
      getMonsters()
    }

    back.onclick = (event) => {
      pageNumber--;
      getMonsters()
    }
  }
}

main()