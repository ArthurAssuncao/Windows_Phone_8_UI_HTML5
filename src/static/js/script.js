$(document).ready(function(){
    configurar_tiles();
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

function configurar_tiles(){
    $.each($('.tile'), function(i, tile){
        //console.log(tile);
        tile.onclick = clique_tile;
        $tile = $(tile)
        $tile.attr('draggable', 'true');
        $tile.attr('ondragstart', 'dragStart(event)');
        $tile.attr('ondragenter', 'return dragEnter(event)');
        $tile.attr('ondrop', 'return dragDrop(event)');
        $tile.attr('ondragover', 'return dragOver(event)');
    });
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
   var tile_id = ev.dataTransfer.getData("tile_id");
   var tile = $('#'+tile_id);
   tile.insertBefore($(ev.target));
   ev.stopPropagation();
   return false;
}
