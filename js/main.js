//AUTHOR FILIP THURESSON
var addBTN = document.getElementById('addBTN');
var createBTN = document.getElementById('teamsCreate');
var removePlayerList = document.getElementById('playerListClear')
var playerOutput = document.getElementById('playerOutput');
var output = document.getElementById('output');
var playersNum = document.getElementById('test');
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
    updateAmoutOfPlayers()
});

removePlayerList.addEventListener('click', ()=>{
    localStorage.removeItem("players");
    allplayers = [];
    output.innerHTML ="";
    playerOutput.innerHTML = "";
    updateAmoutOfPlayers()
})

createBTN.addEventListener('click', ()=>{
    var allElo = 0;
    allplayers.forEach(player=>{
        allElo += player.elo;
    });
    medel = allElo/allplayers.length;
    if(allplayers.length < 10){
        alert('Please add up to 10 players');
    }else{
        amoutOfTeams = allplayers.length/5;
        createTeams(amoutOfTeams, medel);
        displayTeams();
    }
});
updateAmoutOfPlayers()
function updateAmoutOfPlayers(){
    playersNum.innerHTML = "Players " + allplayers.length; 
}

function displayTeams(){
    let lag = 0;
    document.getElementById('teamsNum').innerHTML = "Teams " + amoutOfTeams;
    output.innerHTML = "";
    for (let i = 0; i < amoutOfTeams; i++) {     
        output.innerHTML += `<div id="${i}"><h3>Lag:${i+1} Snittelo:${returnObj[0].Teams[i][5].snittElo}`;
        for (let j = 0; j < returnObj[0].Teams[i].length-1; j++) {
            document.getElementById(i).innerHTML += `<ul><li>${returnObj[0].Teams[i][j].player.name} : ${returnObj[0].Teams[i][j].player.elo}<li></ul>`
        }
        
    }
}






function removePlayer(player){
    let removePlayer = document.getElementById(`${player.name}`);
    removePlayer.addEventListener('click',()=>{
            allplayers = allplayers.filter(remove => remove.name != player.name);
            document.getElementById(`${player.name}DivId`).style.display = "none";
            localStorage.setItem("players", JSON.stringify(allplayers));
            updateAmoutOfPlayers()
    });
}

function snittElo(teamNumber){
    teamElo = 0;
    let playerNum;
    teamsArray[teamNumber].forEach(player=>{
        teamElo += player.player.elo;
        playerNum++;
    });
    return teamElo/5;
}


function createTeams(Teams, medelElo){
    let bestOrder = [];
    for (let j = 0; j < 1000; j++) {
        if(allplayers.length%5 == 0){
            teamsArray = []
            for(let i = 0; i< Teams; i++) {
                teamsArray[i]= [];    
            }
            usedPlayers = [];
            for (let i = 0; i < teamsArray.length; i++) {
                for (let j = 0; j < 5; j++) {
        
                    let currentPlayer = randomPlayer(j);
                    teamsArray[i].push({player: currentPlayer});   
                    usedPlayers.push(currentPlayer);
                }
                teamsArray[i].push({snittElo:Math.floor(snittElo(i))})
            }
            checkDiff();
            bestOrder.push({"Teams":teamsArray, "diff":diff[j]});

        }else(
            alert("please right amout of players so it will be 5 people per team")
        )
    }

    bestCase(bestOrder)
    displayTeams();
};

function randomPlayer(j){
    let takenPlayer = true;
    while(takenPlayer){
        returnPlayer = allplayers[getRandomInt(0,allplayers.length-1)];
        if(usedPlayers.includes(returnPlayer)){
            takenPlayer = true;
        }else{
            takenPlayer = false;
        }
    }
    return returnPlayer;
};
diff = [];
function checkDiff(){
    for (let i = 0; i < teamsArray.length-1; i++) {
        currentTeam = teamsArray[i];
        nextTeam = teamsArray[i+1];
      diff.push(currentTeam[5].snittElo - nextTeam[5].snittElo);
    }
    return diff;
}
function bestCase(arr){
    SlutgiltigaLag = [];
    returnObj = [];
    for(var x = 0; x < arr.length-1; x++){
        if(x == 0){
            SlutgiltigaLag = arr[x];
            SlutgiltigaLag.diff += 100000;
        }else{
            if(arr[x].diff < SlutgiltigaLag.diff && arr[x].diff >0){
                SlutgiltigaLag = arr[x];
            } 
        }   
    }
    returnObj.push(SlutgiltigaLag);
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
