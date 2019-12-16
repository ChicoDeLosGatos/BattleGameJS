/* 
[FUNCTION][CONSTRUCTOR]

    Construye un arma dependiendo de la clase del personaje que se la ha pedido.
    
[PARAMS]
    
    [INTEGER]
    AMMOUNT: Un valor numérico generado a partir del nombre de usuario.
    
    [STRING]
    JOB: Una cadena de texto que contiene la clase del personaje del usuario.
*/
function Weapon(ammount, job) {
    // Se utiliza el valor ammount como un Boolean para ver la rareza del arma.
    if (ammount % 2 == 0) {
        switch (job) {
            case "Guerrero":
                this.name = "Gran espada";
                this.str = 5;
                this.spd = 0;
                this.def = 0;
                break;
            case "Ranger":
                this.name = "Arco";
                this.str = 2;
                this.spd = 2;
                this.def = 1;
                break;
            case "Hechicero":
                this.name = "Bastón Mágico";
                this.str = 3;
                this.spd = 0;
                this.def = 2;
                break;
        }
    } else if (ammount % 5 == 0) {
        switch (job) {
            case "Guerrero":
                this.name = "Espada";
                this.str = 3;
                this.spd = 1;
                this.def = 0;
                break;
            case "Ranger":
                this.name = "Ballesta";
                this.str = 1;
                this.spd = 3;
                this.def = 0;
                break;
            case "Hechicero":
                this.name = "Espada Sagrada";
                this.str = 1;
                this.spd = 0;
                this.def = 3;
                break;
        }
    } else {
        switch (job) {
            case "Guerrero":
                this.name = "Escudo";
                this.str = 0;
                this.spd = 0;
                this.def = 4;
                break;
            case "Ranger":
                this.name = "Daga";
                this.str = 0;
                this.spd = 4;
                this.def = 0;
                break;
            case "Hechicero":
                this.name = "Materia Mágica";
                this.str = 4;
                this.spd = 0;
                this.def = 0;
                break;
        }
    }

    /*
    [SUBFUNCTION]
    
        Imprime por consola un pequeño resumen del arma en cuestión.
    */
    this.resume = function() {
        alert("Nombre: " + this.name + "\n" +
            "+ Fuerza: " + this.str + "\n" +
            "+ Defensa: " + this.def + "\n" +
            "+ Velocidad: " + this.spd
        );
        console.group("Arma: " + this.name);
        console.log("Fuerza: ", this.str);
        console.log("Defensa: ", this.def);
        console.log("Velocidad: ", this.spd);
        console.groupEnd();
    }
}

/*
[FUNCTION][GETTER]

    Devuelve un sumador STR (Fuerza) del arma. Lo hace devolviendo un valor numérico 
    aleatorio comprendido entre 0 y el valor STR del arma.
    
[RETURNS]

    [INTEGER] 
*/
Weapon.prototype.getWeaponStr = function() {
    return Math.floor(Math.random() * this.str);
}

/*
[FUNCTION][GETTER]

    Devuelve un sumador DEF (Defensa) del arma. Lo hace devolviendo un valor numérico 
    aleatorio comprendido entre 0 y el valor STR del arma.
    
[RETURNS]

    [INTEGER] 
*/
Weapon.prototype.getWeaponDef = function() {
    return Math.floor(Math.random() * this.def);
}

/*
[FUNCTION][GETTER]

    Devuelve un sumador SPD (Velocidad) del arma. Lo hace devolviendo un valor numérico 
    aleatorio comprendido entre 0 y el valor STR del arma.
    
[RETURNS]

    [INTEGER] 
*/
Weapon.prototype.getWeaponSpd = function() {
    return Math.floor(Math.random() * this.spd);
}
