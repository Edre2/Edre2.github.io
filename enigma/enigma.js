import { Rotor } from "./rotor";
import { Reflecteur } from "./reflecteur";

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

export { Enigma, Rotor, Reflecteur };