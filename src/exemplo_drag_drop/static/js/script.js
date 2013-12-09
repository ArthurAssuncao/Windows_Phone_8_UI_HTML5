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
    return true;
}

/*
    Evento disparado ao movimentar o objeto sobre uma area de soltura
*/
function dragOver(ev) {
    console.log("dragOver()");
    ev.dataTransfer.dropEffect = 'move'; //da um feedback pro usuario, no caso, o mouse muda para indicar que é uma movimentacao, none, move, copy ou link
    // Por padrao arquivos e elementos não podem ser soltos em outros elementos, entao tem q tirar a acao padrao
    ev.preventDefault(); //evita que o objeto volte para o seu lugar, evita que chame apenas o dragEnd e não chame o drop.
    return false;
}

/*
    Evento disparado ao iniciar o arrastar
*/
function dragStart(ev){
    console.log("dragStart()");
    ev.dataTransfer.effectAllowed = 'move'; //se for diferente do dropEffect do dragOver, ele nao dropa. Permitido none, copy, copyLink, copyMove, link, linkMove, move, all e uninitialized
    ev.dataTransfer.setData("objeto", ev.target.id);
    ev.dataTransfer.setDragImage(ev.target, 0, 0);
    return true;
}

/*
    Evento disparado ao soltar um objeto sobre uma area de soltura
*/
function dragDrop(ev){
    console.log("dragDrop()");
    // por padrao arquivos sao abertos no navegador ao soltar, tem q prevenir essa acao
    ev.preventDefault();
    if(ev.dataTransfer.files.length == 0){
        var objeto = ev.dataTransfer.getData("objeto");
        console.log('id do objeto: ', objeto);
        ev.target.appendChild(document.getElementById(objeto));
    }
    else{
        var arquivo = ev.dataTransfer.files[0];
        console.log('Data modificacao: ', arquivo.lastModifiedDate);
        console.log('Nome arquivo: ', arquivo.name);
        console.log('Tamanho arquivo em bytes: ', arquivo.size);
        console.log('Tipo do arquivo: ', arquivo.type);
        ev.target.innerHTML = ev.target.innerHTML + '<span>' + arquivo.name + '</span>';
    }

    return false;
}

/*
    Evento disparado quando o mouse deixa a area original do objeto
*/
function dragLeave(ev){
    console.log("dragLeave()");
    return false;
}

/*
    Evento disparado toda vez que o objeto é movimentado
*/
function drag(ev){
    console.log("drag()");
    return false;
}