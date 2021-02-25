//AUTHOR FILIP THURESSON
var addBTN = document.getElementById('addBTN');
var createBTN = document.getElementById('teamsCreate');
var removePlayerList = document.getElementById('playerListClear')
var playerOutput = document.getElementById('playerOutput');
var allplayers = JSON.parse(localStorage.getItem("players")) ?? [];
const Creator = "FILIP THURESSON"; 
if(allplayers != null){
    allplayers.forEach(player=> {
        playerOutput.innerHTML += `<div id="${player.name}DivId"><strong>${player.name} : ${player.elo}</strong><button id="${player.name}">-</button></div>`;
    });
}
// IF PLAYER WAS ADDED BEFORE CURRENT STATE
allplayers.forEach(player=>{
    removePlayer(player)
});

addBTN.addEventListener('click',()=>{

    let name = document.getElementById('name').value;
    let elo = Number(document.getElementById('elo').value);

    if(allplayers.includes(name)){
        alert("Already Exists");
    }else{
        allplayers.push({name,elo});
        localStorage.setItem("players", JSON.stringify(allplayers));
        playerOutput.innerHTML += `<div id="${name}DivId"><strong>${name} : ${elo}</strong><button id="${name}">-</button></div>`;
    }

    allplayers.forEach(player=>{
        removePlayer(player)
    });
});

removePlayerList.addEventListener('click', ()=>{
    localStorage.removeItem("players");
    allplayers = [];
    playerOutput.innerHTML = "";
})

createBTN.addEventListener('click', ()=>{
    var allElo = 0;
    allplayers.forEach(player=>{
        allElo += player.elo;
    });
    var medel = allElo/allplayers.length;
    if(allplayers.length < 10){
        alert('Please add up to 10 players');
    }else{
        let amoutofteams = allplayers.length/5;
        createTeams(amoutofteams, medel);
    }
});


function createTeams(Teams, medelElo){
    var teamsArray = []
    for(let i = 0; i< Teams; i++) {
        teamsArray[i]= [];    
    }
    console.log(medelElo);
    console.log(teamsArray);
}

function removePlayer(player){
    let removePlayer = document.getElementById(`${player.name}`);
    removePlayer.addEventListener('click',()=>{
            allplayers = allplayers.filter(remove => remove.name != player.name);
            document.getElementById(`${player.name}DivId`).style.display = "none";
            localStorage.setItem("players", JSON.stringify(allplayers));
    });
}