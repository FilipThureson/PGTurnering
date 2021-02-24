var addBTN = document.getElementById('addBTN');
var playerOutput = document.getElementById('playerOutput');
var allplayers = JSON.parse(localStorage.getItem("players")) ?? [];

if(allplayers != null){
    allplayers.forEach(player=> {
        playerOutput.innerHTML += `<div><h3>${player.name}:${player.elo}</h3></div>`;
    });
}
addBTN.addEventListener('click',()=>{

    let name = document.getElementById('name').value;
    let elo = document.getElementById('elo').value;

    if(allplayers.includes(name)){
        alert("Already Exists");
    }else{
        allplayers.push({name,elo});
        localStorage.setItem("players", JSON.stringify(allplayers));
        playerOutput.innerHTML += `<div><h3>${name}:${elo}</h3></div>`;
        console.log(allplayers)
    }
});