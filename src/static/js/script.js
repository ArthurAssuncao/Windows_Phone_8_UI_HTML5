$(document).ready(function(){
    configurar_tiles();
});

function clique_tile(){
    var tile = this;
    console.log(tile);
    
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

function criar_tile(id, tam, titulo, texto){
    var tile = '<div class="tile azul tile_tam_' + tam + '" id="' + id + '">' + '<span class="tile_titulo">' + titulo + '</span><span class="tile_texto">' + texto + '</span><img class="tile_icon" src="static/img/file_icon.png"></img>' + '</div>';
    $tile = $(tile);
    //$tile.onclick = clique_tile;
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
    $wp8 = $('#wp8');
    $wp8.attr('draggable', 'true');
    $wp8.attr('ondrop', 'return dragDrop(event)');
    $wp8.attr('ondragstart', 'dragStart(event)');
    $wp8.attr('ondragenter', 'return dragEnter(event)');
    $wp8.attr('ondrop', 'return dragDrop(event)');
    $wp8.attr('ondragover', 'return dragOver(event)');
    $wp8.attr('ondragend', 'return dragEnd(event)');
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

/*
    Evento disparado ao cancelar o drag and drop, soltar o botao do mouse.
*/
function dragEnd(ev) {
    console.log("dragEnd()");
    ev.dataTransfer.clearData("tile_id");
    finalizar_drag_and_drop();
    return true;
}

/*
    Evento disparado ao entrar em uma area de soltura
*/
function dragEnter(ev) {
    console.log("dragEnter()");
    ev.preventDefault();
    return true;
}

/*
    Evento disparado ao movimento o objeto sobre uma area de soltura
*/
function dragOver(ev) {
    //console.log("dragOver()");
    return false;
}

/*
    Evento disparado ao iniciar o arrastar
*/
function dragStart(ev){
    console.log("dragStart()");
    iniciar_drag_and_drop(ev.target.id);
    ev.dataTransfer.effectAllowed='move';
    ev.dataTransfer.setData("tile_id", ev.target.id);
    ev.dataTransfer.setDragImage(ev.target, 0, 0);
    return true;
}

/*
    Evento disparado ao soltar um objeto sobre uma area de soltura
*/
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

        var tile = criar_tile(arquivo.name.replace('.', '_'), 2, arquivo.name, arquivo.type);
        $(tile).insertBefore($(ev.target));
        $('#' + arquivo.name.replace('.', '_'))[0].onclick = clique_tile;
    }
    
    ev.stopPropagation();
    finalizar_drag_and_drop();
    return false;
}
