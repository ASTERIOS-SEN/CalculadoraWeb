function valor(x) {
    document.getElementById('Display').value += x;
}

function borrarDisplay(y) {
    document.getElementById('Display').value = y;
}

function cal_rel() {
    var relsutado = eval(document.getElementById('Display').value);
    document.getElementById('Display').value = relsutado;
}