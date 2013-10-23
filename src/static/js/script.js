$(document).ready(function(){
    configurar_tiles();
});

function clique_tile(){
    var tile = this;
    
    var result_regex = tile.className.match(/tile_tam_(\d+)/);
    var tile_tam = result_regex[1];
    var indice_resultado = result_regex['index'];

    var tam = tile.className.length;
    tile_tam = parseInt(tile_tam) + 1;
    if(tile_tam % 4 == 0){
        tile_tam = 1;
    }
    tile.className = tile.className.substring(0, indice_resultado + 'tile_tam_'.length) + (tile_tam) + tile.className.substring(indice_resultado + 'tile_tam_'.length + 1, tam);
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
