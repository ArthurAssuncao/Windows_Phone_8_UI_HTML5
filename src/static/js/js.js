$(document).ready(function(){
    clicar_tile();
});

function clique_tile(){
    var tile = this;
    console.log(tile.className);
    var tam = tile.className.length;
    var tipo = parseInt(tile.className.substring(tam-1, tam))+1;
    if(tipo % 4 == 0){
        tipo = 1;
    }
    tile.className = tile.className.substring(0, tam-1)+(tipo);
    console.log(tile.className);
}

function clicar_tile(){
    var tiles = document.getElementsByClassName('tile');
    for(i=0; i < tiles.length; i++){
        var tile = tiles[i];
        //console.log(tile);
        tile.onclick = clique_tile;
    }
}
function allowDrop(ev){
    ev.preventDefault();
}
function drag(ev){
    ev.dataTransfer.setData("imagem", ev.target.id);
}
function drop(ev){
    ev.preventDefault();
    var id_data = ev.dataTransfer.getData("imagem");
    ev.target.appendChild(document.getElementById(id_data));
}
