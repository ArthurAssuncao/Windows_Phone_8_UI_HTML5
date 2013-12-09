$(document).ready(function(){
    
});

/*
    Evento disparado ao cancelar o drag and drop, soltar o botao do mouse.
*/
function dragEnd(ev) {
    console.log("dragEnd()");
    ev.dataTransfer.clearData("objeto");
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
    Evento disparado ao movimentar o objeto sobre uma area de soltura
*/
function dragOver(ev) {
    console.log("dragOver()");
    ev.preventDefault();
    return false;
}

/*
    Evento disparado ao iniciar o arrastar
*/
function dragStart(ev){
    console.log("dragStart()");
    ev.dataTransfer.effectAllowed='move';
    ev.dataTransfer.setData("objeto", ev.target.id);
    ev.dataTransfer.setDragImage(ev.target, 0, 0);
    return true;
}

/*
    Evento disparado ao soltar um objeto sobre uma area de soltura
*/
function dragDrop(ev){
    console.log("dragDrop()");
    if(ev.dataTransfer.files.length == 0){
        var objeto = ev.dataTransfer.getData("objeto");
        console.log('id do objeto: ', objeto);
        ev.target.appendChild(document.getElementById(objeto));
    }
    else{
        var arquivo = ev.dataTransfer.files[0];
        console.log(arquivo.lastModifiedDate);
        console.log(arquivo.name);
        console.log(arquivo.size);
        console.log(arquivo.type);
        ev.target.innerHTML(ev.target.innerHTML() + '<span>' + arquivo.name + '</span>');
    }
    
    ev.stopPropagation();
    return false;
}
