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

function criar_tile(id, tam, texto){
    var tile = '<div class="tile azul tile_tam_' + tam + '" id="' + id + '">' + texto + '</div>';
    $tile = $(tile);
    $tile.onclick = clique_tile;
    $tile.attr('draggable', 'true');
    $tile.attr('ondragstart', 'dragStart(event)');
    $tile.attr('ondragenter', 'return dragEnter(event)');
    $tile.attr('ondrop', 'return dragDrop(event)');
    $tile.attr('ondragover', 'return dragOver(event)');
    $tile.attr('ondragend', 'return dragEnd(event)');
    return tile;
}

function configurar_tiles(){
    $.each($('.tile'), function(i, tile){
        //console.log(tile);
        tile.onclick = clique_tile;
        $tile = $(tile);
        $tile.attr('draggable', 'true');
        $tile.attr('ondragstart', 'dragStart(event)');
        $tile.attr('ondragenter', 'return dragEnter(event)');
        $tile.attr('ondrop', 'return dragDrop(event)');
        $tile.attr('ondragover', 'return dragOver(event)');
        $tile.attr('ondragend', 'return dragEnd(event)');
    });
}

function iniciar_drag_and_drop(tile_id){
    $.each($('.tile'), function(i, tile){
        $tile = $(tile);
        if($tile[0].id != tile_id){
            $tile.css({opacity: 0.7});
        }
    });
}

function finalizar_drag_and_drop(){
    $.each($('.tile'), function(i, tile){
        $tile = $(tile);
        $tile.css({opacity: 1.0});
    });
}

function dragEnd(ev) {
    console.log("dragEnd()");
    ev.dataTransfer.clearData("tile_id");
    return true;
}

function dragEnter(ev) {
    //console.log("dragEnter()");
    ev.preventDefault();
    return true;
}

function dragOver(ev) {
    //console.log("dragOver()");
    return false;
}

function dragStart(ev){
    console.log("dragStart()");
    iniciar_drag_and_drop(ev.target.id);
    ev.dataTransfer.effectAllowed='move';
    ev.dataTransfer.setData("tile_id", ev.target.id);
    ev.dataTransfer.setDragImage(ev.target, 0, 0);
    return true;
}

function dragDrop(ev){
    console.log("dragDrop()");
    if(ev.dataTransfer.files.length == 0){
        var tile_id = ev.dataTransfer.getData("tile_id");
        var tile = $('#'+tile_id);
        tile.insertBefore($(ev.target));
    }
    else{
        var arquivo = ev.dataTransfer.files[0];
        console.log(arquivo.lastModifiedDate);
        console.log(arquivo.name);
        console.log(arquivo.size);
        console.log(arquivo.type);

        var texto = arquivo.name + '\n' + arquivo.type;
        var tile = criar_tile(arquivo.name, 2, texto);
        $(tile).insertBefore($(ev.target));
    }
    
    ev.stopPropagation();
    finalizar_drag_and_drop();
    return false;
}
