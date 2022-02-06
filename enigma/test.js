// import { Enigma, Rotor, Reflecteur } from "./enigma.js";

class Rotor {
    constructor(rotor_position) {
        rotor_position = rotor_position.toUpperCase();

        this.N = rotor_position.length;

        for (let i = 0; i < this.N; i++) {
            if (!rotor_position.includes(String.fromCharCode(i+65))) {
                alert("Erreur : la position du rotor devrait contenir " + String.fromCharCode(i+65));
                throw new Error("Erreur : la position du rotor devrait contenir " + String.fromCharCode(i+65));            }
        }

        this.rotor_position = new Array();

        for (let i = 0; i < this.N; i++) {
            this.rotor_position.push(rotor_position.charCodeAt(i)-65)
        }
    }

    tourner() {
        let nouveau_rotor = new Array();

        for(let i = 0; i < this.N; i++) {
            nouveau_rotor.push((this.rotor_position[i]-1+this.N) % this.N);
        }
        for (let i = 0; i < this.N - 1; i++) {
            this.rotor_position[i] = nouveau_rotor[i+1];
        }
        this.rotor_position[this.N - 1] = nouveau_rotor[0];
    }

    coder(nombre) {
        return this.rotor_position[nombre];
    }

    decoder(nombre) {
        return this.rotor_position.indexOf(nombre);
    }
}

class Reflecteur {
    constructor(reflecteur_position) {
        reflecteur_position = reflecteur_position.toUpperCase();

        this.N = reflecteur_position.length;

        for (let i = 0; i < this.N; i++) {
            if (!reflecteur_position.includes(String.fromCharCode(i+65))) {
                alert("Erreur : la position du rotor devrait contenir " + String.fromCharCode(i+65));
                throw new Error("Erreur : la position du rotor devrait contenir " + String.fromCharCode(i+65));            }
        }

        this.reflecteur_position = new Array();

        for (let i = 0; i < this.N; i++) {
            this.reflecteur_position.push(reflecteur_position.charCodeAt(i)-65)
        }

        for (let i = 0; i < this.N; i++) {
            if (this.reflecteur_position[i] != this.reflecteur_position[this.reflecteur_position[this.reflecteur_position[i]]]) {
                alert("Erreur dans le reflecteur : la lettre " + String.fromCharCode((this.reflecteur_position[i]+65)) + " est codée en  " + String.fromCharCode((this.reflecteur_position[this.reflecteur_position[i]]+65)) + " et cette lettre est codée elle-même en " + String.fromCharCode((this.reflecteur_position[this.reflecteur_position[this.reflecteur_position[i]]]+65)) + " alors qu'elle devrait être codée en " + String.fromCharCode((this.reflecteur_position[i]+65)))
                throw new Error("Erreur dans le reflecteur : la lettre " + String.fromCharCode((this.reflecteur_position[i]+65)) + " est codée en  " + String.fromCharCode((this.reflecteur_position[this.reflecteur_position[i]]+65)) + " et cette lettre est codée elle-même en " + String.fromCharCode((this.reflecteur_position[this.reflecteur_position[this.reflecteur_position[i]]]+65)) + " alors qu'elle devrait être codée en " + String.fromCharCode((this.reflecteur_position[i]+65)));
            }
        }
    }


    coder(nombre) {
        return this.reflecteur_position[nombre];
    }
}

class Enigma {
    constructor(rotors, reflecteur) {
        this.rotors = new Array();
        this.rotor_rotation = new Array();

        this.N = rotors[0].length;
        this.N_rotors = rotors.length;

        for(let i = 0; i < this.N_rotors; i++) {
            if (rotors[i].length != this.N) {
                alert("Les rotors doivent faire la même taille !");
                throw new Error("Les rotors doivent faire la même taille !");
            }
            this.rotors.push(new Rotor(rotors[i]));
            this.rotor_rotation.push(0);
        }

        if( reflecteur.length != this.N) {
            alert("Les rotors  et le reflecteur doivent faire la même taille !");
            throw new Error("Les rotors  et le reflecteur doivent faire la même taille !");
        }

        this.reflecteur = new Reflecteur(reflecteur);
    }

    tourner() {
        this.rotors[0].tourner();
        this.rotor_rotation[0]++;
        
        let i = 0;
        while ((this.rotor_rotation[i] % this.N == 0) && (i != self.N_rotors)) {
            this.rotor_rotation[i] = 0;
            this.rotors[i+1].tourner();
            this.rotor_rotation[i+1]++;
            i++;
        }
    }

    coder(text) {
        let texte_code = "";
        text = text.toUpperCase();

        for (let i = 0; i < text.length; i++) {
            let lettre_codee = text.charCodeAt(i) - 65;
            if(lettre_codee >= 0 && lettre_codee <= 25) {
                for(let j = 0; j < this.N_rotors; j++) {
                    lettre_codee = this.rotors[j].coder(lettre_codee);
                }

                lettre_codee = this.reflecteur.coder(lettre_codee);

                for(let j = this.N_rotors - 1; j >= 0; j--) {
                    lettre_codee = this.rotors[j].decoder(lettre_codee);
                }

                texte_code += String.fromCharCode(65 + lettre_codee);

                this.tourner();
            }
            else {
                texte_code += String.fromCharCode(65 + lettre_codee);
            }
        }

        return texte_code;
    }

    position_initiale() {
        for(let i = 0; i < this.N_rotors; i++) {
            for( let j = 0; j < (this.N - this.rotor_rotation[i]) % this.N; j++) {
                this.rotors[i].tourner();
            }
            this.rotor_rotation[i] = 0;
        }
    }
}

function update_nb_rotors() {
    document.getElementById("rotors").innerHTML = "";

    let nb_de_rotors = 5;
    if (! isNaN(Number(document.getElementById("nb_de_rotors").value)) && document.getElementById("nb_de_rotors").value != "")
    {
        nb_de_rotors = Number(document.getElementById("nb_de_rotors").value);
    }

    for (let j = 0; j < nb_de_rotors; j++)
    {
        document.getElementById("rotors").innerHTML += '<div class="ligne espace-haut-bas"><label for="rotor-"'+j+'>Rotor '+ (j +1)+' :</label><input id="rotor-' + j + '" class="espace-caracters fill"></input></div>';
    }
}

function coder() {
    let nb_de_rotors = 5;
    if (! isNaN(Number(document.getElementById("nb_de_rotors").value)) && document.getElementById("nb_de_rotors").value != "")
    {
        nb_de_rotors = Number(document.getElementById("nb_de_rotors").value);
    }

    let rotors = new Array();

    for(let i = 0; i < nb_de_rotors; i++) {
        rotors.push(document.getElementById("rotor-"+i).value);
    }

    let reflecteur = document.getElementById("reflecteur").value;

    let a = new Enigma(rotors, reflecteur);

    let text = document.getElementById("texte_a_coder").value;

    document.getElementById("texte_code").innerHTML = "<p>" + a.coder(text) + "</p>"
}