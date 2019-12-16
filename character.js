var selected_player_one = null;
var selected_player_two = null;
var last_player_selected = null;
var final_char_length = 0;

function init(char_length) {
    final_char_length = char_length;
}

function _drop_dead(characters) {
    for (var x = 0; x < characters.length; x++) {

        var char = characters[x];
        if (char.hp <= 0)
            $("#container-" + char.id).css('display', 'none');
    }
}

function selectPlayer(player) {
    for (var x = 0; x < final_char_length; x++) {
        var id = x + 1;
        $("#tb-" + id).css('background-color', ' #f2f2f2');
    }

    if (selected_player_one == null) {
        selected_player_one = player;
        last_player_selected = 'one';
    } else if (selected_player_two == null) {
        selected_player_two = player;
        last_player_selected = 'two';
    } else if (last_player_selected == 'two') {
        selected_player_one = player;
        last_player_selected = 'one';
    } else {
        selected_player_two = player;
        last_player_selected = 'two';
    }

    if (selected_player_one != null) $("#tb-" + selected_player_one.id).css('background-color', '#b3d9ff')
    if (selected_player_two != null) $("#tb-" + selected_player_two.id).css('background-color', '#b3d9ff')
}

function get_players() {
    if (selected_player_one != null && selected_player_two != null) {
        return [selected_player_one, selected_player_two];
    } else {
        return -1;
    }
}

function Character(nombre, char_length, lvl) {
    var plusStats = 0;
    var MD5 = function(d) {
        result = M(V(Y(X(d), 8 * d.length)));
        return result.toLowerCase()
    };

    function M(d) {
        for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++) _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _);
        return f
    }

    function X(d) {
        for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
        for (m = 0; m < 8 * d.length; m += 8) _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
        return _
    }

    function V(d) {
        for (var _ = "", m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255);
        return _
    }

    function Y(d, _) {
        d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
        for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
            var h = m,
                t = f,
                g = r,
                e = i;
            f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e)
        }
        return Array(m, f, r, i)
    }

    function md5_cmn(d, _, m, f, r, i) {
        return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m)
    }

    function md5_ff(d, _, m, f, r, i, n) {
        return md5_cmn(_ & m | ~_ & f, d, _, r, i, n)
    }

    function md5_gg(d, _, m, f, r, i, n) {
        return md5_cmn(_ & f | m & ~f, d, _, r, i, n)
    }

    function md5_hh(d, _, m, f, r, i, n) {
        return md5_cmn(_ ^ m ^ f, d, _, r, i, n)
    }

    function md5_ii(d, _, m, f, r, i, n) {
        return md5_cmn(m ^ (_ | ~f), d, _, r, i, n)
    }

    function safe_add(d, _) {
        var m = (65535 & d) + (65535 & _);
        return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m
    }

    function bit_rol(d, _) {
        return d << _ | d >>> 32 - _
    }
    var variable = MD5(unescape(encodeURIComponent(nombre + "-" + new Date().toString())));
    if (lvl % 2 == 0) {
        plusStats = lvl / 2;
    }
    var job = parseInt(variable.substring(0, 8), 16);
    var sexo = parseInt(variable.substring(8, 16), 16);
    var element = parseInt(variable.substring(16, 24), 16);
    var weapon = parseInt(variable.substring(24, 32), 16);

    if (job % 2 == 0) {
        this.clase = "Guerrero";
        this.str = Math.floor(Math.random() * 3) + 3;
        this.def = Math.floor(Math.random() * 2) + 1;
        this.spd = Math.floor(Math.random() * 2);
        this.hp = Math.floor(Math.random() * 3) + 1;
    } else if (job % 5 == 0) {
        this.clase = "Ranger";
        this.str = Math.floor(Math.random() * 2) + 1;
        this.def = Math.floor(Math.random() * 2);
        this.spd = Math.floor(Math.random() * 3) + 3;
        this.hp = Math.floor(Math.random() * 3) + 1;
    } else {
        this.clase = "Hechicero";
        this.str = Math.floor(Math.random() * 2);
        this.def = Math.floor(Math.random() * 3) + 1;
        this.spd = Math.floor(Math.random() * 2) + 1;
        this.hp = Math.floor(Math.random() * 3) + 3;
    }

    if (sexo % 2 == 0) {
        this.sex = "Male";
    } else {
        this.sex = "Female";
    }

    this.final_hp = this.hp;

    if (element % 2 == 0) {
        this.element = "Piro";
    } else if (element % 5 == 0) {
        this.element = "Aqua";
    } else {
        this.element = "Electro";
    }
    this.index = char_length;
    this.id = this.index + 1;
    this.name = nombre;
    this.statPoints = 10 + plusStats;
    this.weapon = new Weapon(weapon, this.clase);
    this.exp = 0;


    this.hp = 5;
    this.lvl = lvl;

    this.draw = function() {
        var container = document.getElementById("container-" + this.id);
        var disabled = (this.statPoints <= 0) ? "disabled" : "";
        var disabledBecauseDead = (this.hp <= 0) ? "disabled" : "";
        var state = (this.hp <= 0) ? "Muerto" : "Vivo";
        var html = "<table class='table' id='tb-" + this.id + "' style='background-color: #f2f2f2;'><thead><tr><td colspan=3 style='text-align: center;'><b><h4>" + this.name + "</h4></b></td></tr><tbody>" +
            "<tr><td><b>Clase</b></td>" +
            "<td>" + this.clase + "</td>" + "<td></td></tr>" +
            "<tr><td><b>Nivel</b></td>" +
            "<td>" + this.lvl + "</td>" + "<td></td></tr>" +
            "<tr><td><b>Elemento</b></td>" +
            "<td>" + this.element + "</td>" + "<td></td></tr>" +
            "<tr><td><b>Arma</b></td>" +
            "<td><button class='btn' onclick='characters[" + (this.index) + "].weapon.resume()'>Ver</button></td>" + "<td></td></tr>" +
            "<tr><td ><b>Estado</b></td><td>" + state + "</td><td></td></tr>" +
            "<tr><td ><b>Puntos Exp.</b></td><td>" + this.statPoints + "</td><td></td></tr>" +
            "<tr><td><b>Fuerza</b></td><td>" + this.str + "</td><td><button class='btn btn-default' style='width: 100%;' onclick=" +
            "'characters[" + (this.index) + "].addPointStr()' " + disabled + ">+</button></td></tr>" +
            "<tr><td ><b>Defensa</b></td><td>" + this.def + "</td><td><button class='btn btn-default' style='width: 100%;' onclick=" +
            "'characters[" + (this.index) + "].addPointDef()' " + disabled + ">+</button></td></tr>" +
            "<tr><td><b>Velocidad</b></td><td>" + this.spd + "</td><td><button class='btn btn-default' style='width: 100%;' onclick=" +
            "'characters[" + (this.index) + "].addPointSpd()' " + disabled + ">+</button></td></tr>" +
            "<tr><td ><b>Vida</b></td><td>" + this.hp + "</td><td><button class='btn btn-default' style='width: 100%;' onclick=" +
            "'characters[" + (this.index) + "].addPointHp()' " + disabled + ">+</button></td></tr>" +
            "<tr><td colspan=3><button onclick='selectPlayer(characters[" + (this.index) + "])' class='btn btn-default' style='width: 100%;' " + disabledBecauseDead + ">Seleccionar</button></td></tr></tbody></table>";
        container.innerHTML = html;
    }
    this.resume = function() {
        console.group(this.name);
        console.log("Clase: ", this.clase);
        console.log("Fuerza: ", this.str);
        console.log("Defensa: ", this.def);
        console.log("Velocidad: ", this.spd);
        console.log("Vida: ", this.hp);
        console.log("Elemento: ", this.element);
        console.log("Puntos de habilidad: ", this.statPoints);
        console.groupEnd();
        this.weapon.resume();
    }
}

Character.prototype.addPointStr = function() {
    if (this.statPoints > 0) {
        this.str++;
        this.statPoints--;
        this.draw();
    } else {
        console.log("No te quedan puntos.");
    }
}

Character.prototype.addPointDef = function() {
    if (this.statPoints > 0) {
        this.def++;
        this.statPoints--;
        this.draw();
    } else {
        console.log("No te quedan puntos.");
    }
}

Character.prototype.addExp = function(enemy) {
    this.exp = this.exp + enemy.lvl / this.lvl;
    if (this.exp >= 1) {
        this.exp--;
        this.lvlUp();
        addAction("¡" + this.name + " ha subido de nivel!", '#F1E694');
    }
}

Character.prototype.addPointSpd = function() {
    if (this.statPoints > 0) {
        this.spd++;
        this.statPoints--;
        this.draw();
    } else {
        console.log("No te quedan puntos.");
    }
}

Character.prototype.lvlUp = function() {
    console.warn("¡" + this.name + " ha subido de nivel!")
    this.lvl++;
    this.statPoints++;
    this.hp = this.final_hp + Math.floor(Math.random() * this.final_hp);
    this.final_hp = this.hp;
    this.draw();
}

Character.prototype.addPointHp = function() {
    if (this.statPoints > 0) {
        this.hp++;
        this.final_hp++;
        this.statPoints--;
        this.draw();
    } else {
        console.log("No te quedan puntos.");
    }
}

Character.prototype.attack = function(enemy) {
    var plus = 0;
    switch (enemy.element) {
        case "Piro":
            switch (this.element) {
                case "Piro":
                    plus = Math.floor(Math.random() * this.str / 2);
                    break;
                case "Electro":
                    plus = 0;
                    break;
                case "Aqua":
                    plus = Math.floor(Math.random() * this.str);
                    break;
            }
            break;
        case "Electro":
            switch (this.element) {
                case "Piro":
                    plus = Math.floor(Math.random() * this.str);
                    break;
                case "Electro":
                    plus = Math.floor(Math.random() * this.str / 2);
                    break;
                case "Aqua":
                    plus = 0;
                    break;
            }
            break;
        case "Aqua":
            switch (this.element) {
                case "Piro":
                    plus = 0;
                    break;
                case "Electro":
                    plus = Math.floor(Math.random() * this.str);
                    break;
                case "Aqua":
                    plus = Math.floor(Math.random() * this.str / 2);
                    break;
            }
            break;
    }
    var lvlplus = Math.floor((Math.floor(Math.random() * 2 * this.lvl) + this.lvl / 2));
    if (this.lvl - enemy.lvl > 3) lvlplus = 0.2 * lvlplus;
    var num = Math.floor(Math.random() * this.str) + this.weapon.getWeaponStr() + plus + lvlplus;
    enemy.damage(this, num);
}

Character.prototype.damage = function(attacker, ammount) {
    var lvlplus = Math.floor((Math.floor(Math.random() * 2 * this.lvl) + this.lvl / 2));
    if (this.lvl - attacker.lvl > 3) lvlplus = 0.2 * lvlplus;
    var num = ammount - Math.floor(Math.random() * this.def) + this.weapon.getWeaponDef() + lvlplus;
    num = (num < 0) ? 0 : num;
    this.hp -= num;
    this.hp = (this.hp < 0) ? 0 : this.hp;
    var text = attacker.name + " ha atacado a " + this.name + " y le ha inflingido " + num + " puntos de daño.";
    if (num == 0) {
        if (ammount % 2 == 0)
            text = attacker.name + " ha atacado a " + this.name + ", pero " + this.name + " ha esquivado el ataque.";
        else if (ammount % 5 == 0)
            text = attacker.name + " ha atacado a " + this.name + ", pero " + this.name + " ha desviado el ataque.";
        else
            text = attacker.name + " ha atacado a " + this.name + ", pero " + this.name + " ha bloqueado el ataque.";


        addAction(text, '#ffcce6');
        console.log(text);
    } else {
        addAction(text, '#ffcccc');
        console.log(text);
        addAction("A " + this.name + " le quedan " + this.hp + " puntos de vida.");
        console.warn("A " + this.name + " le quedan " + this.hp + " puntos de vida.");
    }

    this.draw();
    if (this.hp == 0) {
        console.log(this.name + " ha muerto.");
        addAction(this.name + " ha muerto.", '#bfbfbf');
        attacker.addExp(this);
        console.log(attacker.name + " ha ganado este encuentro.");
        addAction(attacker.name + " ha ganado este encuentro.", '#b3b3ff');
        endBattle();
    }
}
