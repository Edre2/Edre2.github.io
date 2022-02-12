function update_car() {
    let a = document.getElementById("caracteristiques");
    let b = document.getElementById("bouton-automatique");
    b.innerHTML = "";
    a.innerHTML = "";

    if(document.getElementById("cesar").checked) {
        a.innerHTML = '<label for="mot" class="joli-texte">Lettre avec lequelle coder :</label><input type="test" id="mot" name="methode" placeholder="m" onkeyup="coder()">';
    } 
    else if( document.getElementById("vigenere").checked) {
        a.innerHTML = '<label for="mot" class="joli-texte">Mot avec lequel coder :</label><input type="test" id="mot" name="methode" placeholder="" onkeyup="coder()">';
    }
    else if( document.getElementById("decesar").checked) {
        a.innerHTML = '<label for="mot" class="joli-texte">Lettre avec lequelle coder :</label><input type="test" id="mot" name="methode" placeholder="m" onkeyup="coder()">';
        b.innerHTML = '<button id="automatique" onclick="automatique()" >Automatique</button>';
    }
    else if (document.getElementById("devigenere").checked) {
        a.innerHTML = '<label for="mot" class="joli-texte">Mot avec lequel coder :</label><input type="test" id="mot" name="methode" placeholder="mot" onkeyup="coder()">';
        b.innerHTML = '<button id="automatique" onclick="automatique()" >Automatique</button>';
    }
    else if(document.getElementById("enigma").checked) {
        a.innerHTML = '<div class="milieu espace-haut-bas"><label for="nb_de_rotors">Nombre de rotors :</label><input id="nb_de_rotors" type="text" class="texte-centre" placeholder="5" maxlength="2" onkeyup="update_nb_rotors()" autofocus></div><div class="milieu espace-haut-bas" id="rotors"></div><div class="milieu espace-haut-bas"><label for="reflecteur">Reflecteur :</label><input id="reflecteur" type="text" class="texte-centre"></div>';
        update_nb_rotors();
    }
    coder();
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
        document.getElementById("rotors").innerHTML += '<label for="rotor-"'+j+'>Rotor '+ (j +1)+' :</label><input type="text" id="rotor-' + j + '" class="espace-caracters"></input><br/>';
    }
}

function coder_enigma(texte) {
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

    return a.coder(texte);
}

function analyser(texte) {
    let a = analyse(texte);
    let texte_analyse = "";
    let tot = a.reduce(function (x, y) {
        return x + y;
      }, 0);
    for(let i = 0; i < a.length; i++) {
        if (a[i] != 0) {
            texte_analyse += String.fromCharCode(65 + i) + " : " + a[i] + " soit " + a[i] / tot * 100 + "%<br/>";
        }
    }
    return texte_analyse;
}

let result = "";

function coder() {
    let texte = document.getElementById("texte_a_coder").value;
    let texte_code = "";

    if(texte == "") {
        return ;
    }

    if(document.getElementById("cesar").checked) {
        let mot = document.getElementById("mot").value;
        if(mot == "") {
            return ;
        }
        texte_code = codagev(texte, mot[0]);
    } 
    else if(document.getElementById("vigenere").checked) {
        let mot = document.getElementById("mot").value;
        if(mot == "") {
            return ;
        }
        texte_code = codagev(texte, mot);
    }
    else if(document.getElementById("decesar").checked) {
        let mot = document.getElementById("mot").value;
        if(mot == "") {
            return ;
        }
        texte_code = decodagev(texte, mot[0]);
    } 
    else if(document.getElementById("devigenere").checked) {
        let mot = document.getElementById("mot").value;
        if(mot == "") {
            return ;
        }
        texte_code = decodagev(texte, mot);
    }
    else if(document.getElementById("enigma").checked) {
        texte_code = coder_enigma(texte);
    }
    else if(document.getElementById("analyse").checked) {
        texte_code = analyser(texte);
    }

    document.getElementById("result").innerHTML = "<p class=\"texte-blanc\">" + texte_code + "</p>" + '<img id="copy" src="copy.png" alt="copy icon" style="width:25px;height:25px;" onclick="copyResultOnClipboard()" >';

    result = texte_code;
}

function automatique() {
    let texte = document.getElementById("texte_a_coder").value;
    if(texte == "") {
        return ;
    }
    let mot = "";
    if(document.getElementById("decesar").checked) {
        mot = decodage_automatique_v(texte);
    } 
    else if(document.getElementById("devigenere").checked) {
        mot = decodage_automatique_v(texte);
    }
    document.getElementById("mot").value = mot;
    coder();
}

function copyResultOnClipboard()
{
    navigator.clipboard.writeText(result)
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////// LES FONCTIONS POUR CODER ET TT :  ///////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function supprimerAccents(message) {
    return (message.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
}

function mettreMaj(message) {
    return message.toUpperCase();
}

function garderLettres(message) {
    return message.replace(/[^a-zA-Z]+/g, '');
}

function addl(char1, char2) {
    return String.fromCharCode((char1.charCodeAt(0) + char2.charCodeAt(0) - 130) % 26 +65 );
}

function sousl(char1, char2) {
    return String.fromCharCode((char1.charCodeAt(0) - char2.charCodeAt(0)+26) % 26 +65 );
}

function codagev(message, mot) {
    message = mettreMaj(supprimerAccents(message));
    mot = mettreMaj(supprimerAccents(mot));

    let l = mot.length;

    let messageCode = "";

    let nb_lettres_cryptes = 0;

    for(let i = 0; i < message.length; i++) {
        if ( message.charCodeAt(i) > 64 && message.charCodeAt(i) < 91) {
            messageCode += addl(message[i], mot[nb_lettres_cryptes % l]);
            nb_lettres_cryptes++;
        }
        else {
            messageCode += message[i];
        }
    }

    return messageCode;
}

function decodagev(message, mot) {
    message = mettreMaj(supprimerAccents(message));
    mot = mettreMaj(supprimerAccents(mot));

    let l = mot.length;

    let messageCode = "";

    let nb_lettres_cryptes = 0;

    for(let i = 0; i < message.length; i++) {
        if ( message.charCodeAt(i) > 64 && message.charCodeAt(i) < 91) {
            messageCode += sousl(message[i], mot[nb_lettres_cryptes % l]);
            nb_lettres_cryptes++;
        }
        else {
            messageCode += message[i];
        }
    }

    return messageCode;
}

function decodage_automatique_v(message, taille_max = 20) {
    message = garderLettres(mettreMaj(supprimerAccents(message)));

    let mots_possibles = new Array();
    for(let i = 0; i < taille_max; i++) {
        mots_possibles.push("");
    }

    let freq_e_min = new Array()
    freq_e_min.push(0);
    for(let i = 1; i < taille_max; i++) {
        freq_e_min.push(100);
    }

    let l = message.length;

    for(let i = 0; i < taille_max; i++) {
        for(let j = 0; j < i; j++) {

            let compte = new Array();
            for(let a = 0; a < 26; a++) {
                compte.push(0);
            }

            for(let a = 0; i * a + j < l; a++) {
                compte[message.charCodeAt(i*a+j)-65]++;
            }

            let max = Math.max(...compte);
            let max_pos = compte.indexOf(max);
            let tot = compte.reduce(function (a, b) {
                return a + b;
              }, 0);

            let freq_max = max / tot * 100;

            if (freq_max < freq_e_min[i]) {
                freq_e_min[i] = freq_max;
            }

            mots_possibles[i] += String.fromCharCode((max_pos - 4 + 26) % 26 + 65);
        }
    }

    return mots_possibles[freq_e_min.indexOf(Math.max(...freq_e_min))];
}

function analyse(message) {
    message = garderLettres(mettreMaj(supprimerAccents(message)));

    let alphabet = new Array();
    for(let i = 0; i < 26; i++) {
        alphabet.push(0);
    }

    for(let i = 0; i < message.length; i++) {
        alphabet[message.charCodeAt(i)-65]++;
    }

    return alphabet;
}

function convertBase(value, from_base, to_base) {
    var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
    var from_range = range.slice(0, from_base);
    var to_range = range.slice(0, to_base);
    
    var dec_value = value.split('').reverse().reduce(function (carry, digit, index) {
      if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `'+digit+'` for base '+from_base+'.');
      return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
    }, 0);
    
    var new_value = '';
    while (dec_value > 0) {
      new_value = to_range[dec_value % to_base] + new_value;
      dec_value = (dec_value - (dec_value % to_base)) / to_base;
    }
    return new_value || '0';
  }

  function estPrems(n) {
    // Corner cases
    if (n <= 1)
        return false;
    if (n <= 3)
        return true;
  
    // This is checked so that we can skip
    // middle five numbers in below loop
    if (n % 2 == 0 || n % 3 == 0)
        return false;
  
    for (let i = 5; i * i <= n; i = i + 6)
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
  
    return true;
  }

  function diviseurs(nombre) {
      nb_diviseurs = new Array();
      for(let i = 0; i < nombre; i++) {
          if(nombre % i == 0) {
              nb_diviseurs.push(i);
          }
      }
      return nb_diviseurs;
  }

  function NbsPremsjusquaN(nombre) {
      nbprems = new Array();
      nbprems.push(2);

      for(let i = 3; i <= nombre; i++) {
          let estprems = true;
          let nb2 = 0;
          let sqrt_num = Math.sqrt(i);

          while(estprems && (nb2 < nbprems.length) && (nbprems[nb2] <= sqrt_num)) {
              if( i % nbprems[nb2] == 0 ) {
                  estprems = false;
              }
              nb2++;
          } 

          if (estprems) {
              nbprems.push(i);
          }
      }

      return nbprems;
  }

  function farey_approximation(nombre, precision) {
    let nb_int = Math.floor(nombre);
    let nb2 = nombre - nb_int;
    let num_below = 0, den_below = 1, num_above = 1, den_above = 1, num_mediant = 1, den_mediant = 2;

    while (num_mediant < precision && den_mediant < precision)
    {
        if(nb2 > num_mediant/den_mediant)
        {
            num_below = num_mediant;
            den_below = den_mediant;
            num_mediant = num_mediant + num_above;
            den_mediant = den_mediant + den_above;
        }
        else
        {
            num_above = num_mediant;
            den_above = den_mediant;
            num_mediant = num_mediant + num_below;
            den_mediant = den_mediant + den_below;
        }
    }

    return (num_mediant + nb_int*den_mediant).toString() + "/" + (den_mediant).toString();
  }

  function pgcd(a,  b)
{
    if (b == 0)
        return a;
    return pgcd(b,a%b);
}

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
        while ((this.rotor_rotation[i] % this.N == 0) && (i != this.N_rotors - 1)) {
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