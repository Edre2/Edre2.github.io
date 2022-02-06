association_ms = [[""], ["thé","toit","dé"], ["âne","nez"], ["ami","mat","semer"], ["rat"], ["lion"], ["chat"], ["quai"], ["fou"], ["épée"], ["danser","tasse"], ["tante","tata"], ["tonneau"], ["dame"], ["taureau"], ["talon"], ["Tuches"], ["taguer"], ["étoffe","dauphin"], ["taper","tapis"], ["noce"], ["Nathan"], ["naine"], ["nem","nam"], ["noir"], ["Noël"], ["neige"], ["Naka","Nakamura"], ["naïf","navet","navire"], ["nappe"], ["masser"], ["maths"], ["mine"], ["maman"], ["sous-marin"], ["malle"], ["manger","magie"], ["magasin"], ["muffin"], ["myope"], ["raser"], ["route"], ["ruine"], ["rame"], ["rire"], ["râler"], ["ruche"], ["raquette"], ["ravin"], ["robot","rap"], ["lasso"], ["latte"], ["lune"], ["lama"], ["lire"], ["lilas","soleil"], ["luge"], ["lac"], ["lave","laver"], ["lapin"], ["chasser"], ["château"], ["chaîne"], ["chameau"], ["char"], ["châle"], ["juge"], ["échec"], ["cheveu"], ["jeep","jupe","chapeau"], ["gaz","caisse"], ["gâteau"," cadeau"], ["gainer","canon"], ["Camus","camion"], ["craie"], ["gueuler","clou","colle"], ["cage"], ["caca"], ["café"], ["cape"], ["vase","fusée"], ["fête","foot"], ["vanne","Vienne"], ["affamé","fumée"], ["phare"], ["vallée","vélo","valet"], ["vache"], ["phoque"], ["fève"], ["vampire"], ["bus"], ["patte","batte"], ["panneau"], ["puma","pomme"], ["purée","Paris"], ["palais","pelle"], ["poncho","page"], ["paquet","pâques"], ["paver","baver","baffer"], ["bébé"]]


document.onkeyup = function(e) {
    if (e.which == 13) {
      verifier_association();
    }
  };

function verifier_association()
{
    let nombre = document.getElementById("nombre").innerHTML;
    let mot = document.getElementById("mot").value.toUpperCase().replace(/\s+/g, '');


    let possible = association_ms[nombre];

    let correct = false;

    for (let i = 0; i < possible.length; i++)
    {
      if (possible[i].toUpperCase() == mot)
      {
         correct = true;
      }
    }

    if (correct)
    {
      document.getElementById("correction").innerHTML ="C'est correct";
    }
    else
    {
      document.getElementById("correction").innerHTML ="C'est faux !<br />";
      document.getElementById("correction").innerHTML += nombre.toString() +" est associé à : ";
      for (let i = 0; i < possible.length; i++)
      {
        document.getElementById("correction").innerHTML += possible[i];
        if (i != possible.length - 1)
        {
          document.getElementById("correction").innerHTML +=", ";
        }
      }
    }

    document.getElementById("mot").value ="";
    document.getElementById("nombre").innerHTML =Math.floor( (Math.random() * 99) + 1 );
}

function random_number()
{
  document.getElementById("nombre").innerHTML =Math.floor( (Math.random() * 99) + 1 );
}