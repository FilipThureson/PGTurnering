var addBTN = document.getElementById('addBTN');
var removePlayerList = document.getElementById('playerListClear')
var playerOutput = document.getElementById('playerOutput');
var allplayers = JSON.parse(localStorage.getItem("players")) ?? [];

if(allplayers != null){
    allplayers.forEach(player=> {
        playerOutput.innerHTML += `<div id="${player.name}DivId"><strong>${player.name} : ${player.elo}</strong><button id="${player.name}">-</button></div>`;
    });
}
// IF PLAYER WAS ADDED BEFORE CURRENT STATE
allplayers.forEach(player=>{
    let removePlayer = document.getElementById(`${player.name}`);
    removePlayer.addEventListener('click',()=>{
            allplayers.splice(allplayers.find((item,i)=>{
                if(item.name === player.name){
                    return i;
                }
            }), 1);
            document.getElementById(`${player.name}DivId`).style.display = "none";
            localStorage.setItem("players", JSON.stringify(allplayers));
    });
});

addBTN.addEventListener('click',()=>{

    let name = document.getElementById('name').value;
    let elo = document.getElementById('elo').value;

    if(allplayers.includes(name)){
        alert("Already Exists");
    }else{
        allplayers.push({name,elo});
        localStorage.setItem("players", JSON.stringify(allplayers));
        playerOutput.innerHTML += `<div id="${name}DivId"><strong>${name} : ${elo}</strong><button id="${name}">-</button></div>`;
    }

    allplayers.forEach(player=>{
        let removePlayer = document.getElementById(`${player.name}`);
        removePlayer.addEventListener('click',()=>{
                allplayers = allplayers.filter(remove => remove.name != player.name);
                document.getElementById(`${player.name}DivId`).style.display = "none";
                localStorage.setItem("players", JSON.stringify(allplayers));
        });
    });
});

removePlayerList.addEventListener('click', ()=>{
    localStorage.removeItem("players");
    allplayers = [];
    playerOutput.innerHTML = "";
})

