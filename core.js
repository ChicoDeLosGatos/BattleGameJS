/* 
[OBJECT][ARRAY]

    Uno de los elementos más importantes del juego es el vector de personajes.
    En contra de lo que se pueda pensar, este vector se encuentra en la clase
    [Core] ya que es la que se encarga del flujo del juego. 
*/
var characters = [];

/* 
[OBJECT][PROMISE]

    Una promesa encargada de contener todos los métodos necesarios para generar
    el nombre de un personaje aleatorio.
    
[RETURNS]
    
    [STRING]
*/
var util = {
    vocales: ['a', 'e', 'i', 'o', 'u'],
    consonantes: ['b', 'c', 'd', 'e', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'v', 'x', 'z'],
    generate_name: function() {
        var init = Math.floor(Math.random() * 99);
        var name = '';
        if (init % 2 == 0) {
            name = util.vocales[Math.floor(Math.random() * util.vocales.length)].toUpperCase();
            name += util.consonantes[Math.floor(Math.random() * util.consonantes.length)];
            name += util.vocales[Math.floor(Math.random() * util.vocales.length)];
            name += util.consonantes[Math.floor(Math.random() * util.consonantes.length)];
            name += util.vocales[Math.floor(Math.random() * util.vocales.length)];
            name += init + Math.floor(Math.random() * init);
        } else {
            name = util.consonantes[Math.floor(Math.random() * util.consonantes.length)].toUpperCase();
            name += util.vocales[Math.floor(Math.random() * util.vocales.length)];
            name += util.consonantes[Math.floor(Math.random() * util.consonantes.length)];
            name += util.vocales[Math.floor(Math.random() * util.vocales.length)];
            name += util.consonantes[Math.floor(Math.random() * util.consonantes.length)];
            name += util.vocales[Math.floor(Math.random() * util.vocales.length)];
            name += init + Math.floor(Math.random() * init);
        }

        return name;
    }
}

/*
[FUNCTION]
    
    Inicializa el elemento <table> con la clase "battlefield" para empezar una nueva batalla.
*/
function init_battlefield() {
    var battlefield = document.getElementById('battlefield');
    battlefield.innerHTML = "";
}

/*
[FUNCTION]
    
    Única función autorizada a tocar el elemento <table> de "battlefield", a excepción de la función
    de inicialización. Añade un evento (<tr>) a la tabla, funcionando como log.
*/
function addAction(text, color) {
    var battlefield = document.getElementById('battlefield');
    var html = (color) ? "<tr style='background-color:" + color + ";'><td>" + text + "</td></tr>" : "<tr><td>" + text + "</td></tr>";
    battlefield.innerHTML += html;
}

/*
[FUNCTION]
    
    Da inicio a la batalla, escogiendo a los dos personajes que se han elegido anteriormente.
    Si los dos personajes existen, y ambos están vivos ([Character].hp > 0), mientras esto
    continúe así, se calcularán las velocidades de ambos personajes basándose en un su velocidad
    como personaje, sumado a la velocidad que le pueda sumar su arma. El personaje con más
    velocidad iniciará primero la batalla. En el caso de que tengan la misma velocidad, se utilizará un
    valor aleatório como Booleano para dictaminar cual de los dos ataca primero. En el caso de que uno
    mate a otro antes de que el otro pueda atacar, el otro no podrá atacar ya (por razones obvias).
*/
function startBattle() {

    init(characters.length);
    init_battlefield();
    var chars = get_players();
    if (chars != -1) {
        var char1 = characters[chars[0].index];
        var char2 = characters[chars[1].index];



        if (char1 != null && char2 != null) {
            if (char1.hp > 0 && char2.hp > 0) {
                alert(char1.name + " VS " + char2.name);
                console.group(char1.name + " VS " + char2.name)
                console.log("Empieza la batalla");
                while (char2.hp > 0 && char1.hp > 0) {
                    var spd1 = char1.spd + char1.weapon.getWeaponSpd();
                    var spd2 = char2.spd + char2.weapon.getWeaponSpd();

                    if (spd1 > spd2) {
                        if (char1.hp > 0) char1.attack(char2);
                        if (char2.hp > 0) char2.attack(char1);
                    } else if (spd1 < spd2) {
                        if (char2.hp > 0) char2.attack(char1);
                        if (char1.hp > 0) char1.attack(char2);
                    } else {
                        if (Math.floor(Math.random() * 10) % 2 == 0) {
                            if (char1.hp > 0) char1.attack(char2);
                            if (char2.hp > 0) char2.attack(char1);
                        } else {
                            if (char2.hp > 0) char2.attack(char1);
                            if (char1.hp > 0) char1.attack(char2);
                        }

                    }
                }
            } else {
                alert("Al menos, uno de los dos luchadores está muerto.");
                char1.resume();
                char2.resume();
            }
        } else {
            alert("Al menos, uno de los dos luchadores no existe.");
        }

    } else {
        alert("Debes seleccionar al menos dos personajes.");
    }
}

/*
[FUNCTION]
    
    Finaliza la batalla aunque solo es un método que se usaría a bajo nivel y 
    gráficamente no representa nada.
*/
function endBattle() {
    console.log("La batalla ha finalizado.");
    console.groupEnd();
}

/*
[FUNCTION]
    
    Llama a la función _drop_dead de [Character], que, por razones de orden de código,
    no ha podido añadirse en el [Core].
*/
function drop_dead() {
    _drop_dead(characters);
}

/*
[FUNCTION]
    
    Llama al método constructor de [Character] para generar un personaje nuevo.
    Una vez lo ha hecho, lo dibuja en pantalla y lo dispone todo para que sea
    manejable de una forma intuitiva.
*/
function create_character() {
    var tablero = document.getElementById("tablero");
    var html = "";
    var char = new Character(util.generate_name(), characters.length, 1);
    if (characters.length % 4 == 0 && characters.length != 0) {
        html += "<div class='col-sm-3' style='margin-left: 2em; margin-right: 2em;' id='container-" + char.id + "'></div>";
    } else if (characters.length == 0) {
        html += "<div class='col-sm-3' style='margin-left: 2em; margin-right: 2em;' id='container-" + char.id + "'></div>";
    } else {
        html += "<div class='col-sm-3' style='margin-left: 2em; margin-right: 2em;' id='container-" + char.id + "'></div>";
    }
    tablero.innerHTML += html;
    characters.push(char);
    char.draw();
}
