const a = document.createElement('form');
const name = document.createElement('input');
const age = document.createElement('input');
const desc = document.createElement('input');
const submit = document.createElement('button');
a.id = "monster-form";
name.id = "name";
age.id = "age";
desc.id = "description";
name.placeholder = "name...";
age.placeholder = "age...";
desc.placeholder = "description...";
submit.innerHTML = "Create";
a.appendChild(name);
a.appendChild(age);
a.appendChild(desc);
a.appendChild(submit);
document.getElementById("create-monster").appendChild(a);

function main(){
    document.addEventListener('DOMContentLoaded', function(){
        fetchMonsters()
        addFormListener()
      })
}

function fetchMonsters(){
    fetch('http://localhost:3000/monsters') 
    .then(resp => resp.json())
    .then(data => {
        if (data){
            renderMonsters(data.slice(0, 49));
        }
    })
}

function addFormListener(){
a.addEventListener("submit", function(event){
    event.preventDefault();
    const formData ={
        name: event.target[0].value,
        age: event.target[1].value,
        desc: event.target[2].value
    }
    postMonster(formData)
    clearForm(event.target)
})
}

function postMonster(data){
    const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }

      fetch('http://localhost:3000/monsters', reqObj)
      .then(resp => resp.json())
      .then(data => {
        renderMonster(data)
      })
    }

function clearForm(form){
    form[0].value = ''
    form[1].value = ''
    form[2].value = ''
}

function renderMonsters(monsters){
    monsters.reverse();
    monsters.forEach(monsterObj => {
      renderMonster(monsterObj)
    })
  }

  function renderMonster(monsterObj){
    if(monsterObj.name && monsterObj.age){
    const container = document.getElementById('monster-container')
    const nameHeader = document.createElement('h2')
    const ageHeader = document.createElement('h4')
    const descP = document.createElement('p')

    nameHeader.innerText = monsterObj.name;
    ageHeader.innerText = monsterObj.age;
    descP.innerText = `Bio: ${monsterObj.description}`;

    container.prepend(descP);
    container.prepend(ageHeader);
    container.prepend(nameHeader);


    }
  }

main()