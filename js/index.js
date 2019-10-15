let pageNum = 1;

function main(){
    document.addEventListener('DOMContentLoaded', () => {
        showMeTheMonsters();
        addClickListener();
        addFormListener();
    });
}

const addFormListener = () => {
    let form = document.getElementById("input-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        getParams(event.target)
    });
}

function getParams(target){
    const name = target[0];
    const age = target[1];
    const description = target[2];

    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "name": name.value,
            "age": age.value,
            "description": description.value
        })
    })
    .then(resp => resp.json())
    .then(json => createMonster(json))

    name.value = "";
    age.value = "";
    description.value = "";
}

function showMeTheMonsters(){
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum}`).then(resp => resp.json()).then(json => displayMonsters(json))
}

function displayMonsters(json){
    const container = document.getElementById('monster-container');
    container.innerHTML = "";
    console.log(json);
    for (const el of json){
        createMonster(el);
    }
}

function createMonster(monsterObj){
    const container = document.getElementById('monster-container');
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');

    h2.innerHTML = monsterObj.name;
    h4.innerHTML = monsterObj.age;
    p.innerHTML = "Bio: " + monsterObj.description;

    div.append(h2, h4, p);
    container.append(div);
}

function addClickListener(){
    document.addEventListener('click', (event) => {
        if(event.target.id === 'forward'){
            pageNum++;
            showMeTheMonsters();
        }
        else if (event.target.id === 'back'){
            pageNum--;
            showMeTheMonsters();
        }
    });
}
main();