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
function dragEnter(ev) {
    event.preventDefault();
    return true;
}

function dragOver(ev) {
    return false;
}

function dragStart(ev){
    ev.dataTransfer.effectAllowed='move';
    ev.dataTransfer.setData("tile_id", ev.target.id);
    ev.dataTransfer.setDragImage(ev.target, 0, 0);
    return true;
}

function dragDrop(ev){
   var src = ev.dataTransfer.getData("Text");
   var tile_id = ev.dataTransfer.getData("tile_id");
   $(ev.target).insertBefore($('#'+tile_id));
   ev.stopPropagation();
   return false;
}
