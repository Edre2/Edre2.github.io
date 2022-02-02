let suites = []

document.onkeyup = function(e) {
    if (e.which == 13) {
      if (document.getElementById("verifier").innerHTML == "Restituer les suites")
      {
        random_suites();
      }
      else if (document.getElementById("verifier").innerHTML == "Valider")
      {
        verifier_suites()
      }
      else if (document.getElementById("verifier").innerHTML == "Apprendre de nouvelles suites")
      {
        apprendre_nouvelles_suites()
      }
    }
  };

function random_suites()
{
  document.getElementById("suites").innerHTML = "";

  let nb_de_suites = 10;
  if (! isNaN(Number(document.getElementById("nb_de_suites").value)) && document.getElementById("nb_de_suites").value != "")
  {
    nb_de_suites = Number(document.getElementById("nb_de_suites").value);
  }

  let nb_de_chiffres = 10;
  if (! isNaN(Number(document.getElementById("nb_de_chiffres").value)) && document.getElementById("nb_de_chiffres").value != "")
  {
    nb_de_chiffres = Number(document.getElementById("nb_de_chiffres").value);
  }
  
  for (let j = 0; j < nb_de_suites; j++)
  {
    document.getElementById("suites").innerHTML += '<div class="milieu espace-haut-bas"><label for="suite-memoire-'+j+'" id="suite-' + j+ '" class="espace-caracters fill"></label></div>';
  }
  for (let j = 0; j < nb_de_suites; j++)
  {
    for (let i = 0; i < nb_de_chiffres; i++)
    {
        document.getElementById("suite-"+j).innerHTML += Math.floor( (Math.random() * 9) + 1 );

        if ( i % 2 == 1 && i != nb_de_chiffres - 1)
        {
        document.getElementById("suite-"+j).innerHTML += " | ";
        }
    }
  }
}

function restituer_suites()
{
  suites = []

  document.getElementById("nb_de_chiffres").setAttribute("readonly", "true");
  document.getElementById("nb_de_suites").setAttribute("readonly", "true");

  let nb_de_suites = 10;
  if (! isNaN(Number(document.getElementById("nb_de_suites").value)) && document.getElementById("nb_de_suites").value != "")
  {
    nb_de_suites = Number(document.getElementById("nb_de_suites").value);
  }

  let nb_de_chiffres = 10;
  if (! isNaN(Number(document.getElementById("nb_de_chiffres").value)) && document.getElementById("nb_de_chiffres").value != "")
  {
    nb_de_chiffres = Number(document.getElementById("nb_de_chiffres").value);
  }

  for (let i = 0; i < nb_de_suites; i++)
  {
    suites.push(document.getElementById("suite-"+i).innerHTML.replace(/ \| /g, ''));
  }

  document.getElementById("suites").innerHTML = "";

  for (let j = 0; j < nb_de_suites; j++)
  {
    document.getElementById("suites").innerHTML += '<div class="milieu espace-haut-bas"><input id="suite-memoire-'+j+'" type="text" class="espace-caracters fill"></label></div>';
  }

  document.getElementById("verifier").innerHTML = "Valider";

  document.getElementById("verifier").setAttribute("onclick", "verifier_suites()")
}

function verifier_suites()
{
    let suites_user = []
    for (let i = 0; i < suites.length; i++)
    {
      suites_user.push(document.getElementById("suite-memoire-"+i).value.replace(/\s/g, ''));
    }

    document.getElementById("suites").innerHTML = "";

    for (let j = 0; j < suites.length; j++)
  {
    document.getElementById("suites").innerHTML += '<div class="milieu espace-haut-bas"><p id="correction-'+j+'"class="espace-caracters fill"></p></div>';
  }
  
    for (let i = 0; i < suites.length; i++)
    {
      for(let j = 0; j < suites[i].length; j++)
      {
          if (suites[i][j] != suites_user[i][j])
          {
            document.getElementById("correction-"+i).innerHTML += "<span class=\"red\">"+suites[i][j]+"</span>";
          }
          else
          {
            document.getElementById("correction-"+i).innerHTML += suites_user[i][j];
          }
      }
    }

    document.getElementById("verifier").innerHTML = "Apprendre de nouvelles suites";

    document.getElementById("verifier").setAttribute("onclick", "apprendre_nouvelles_suites()")
}

function apprendre_nouvelles_suites()
{
  random_suites();

  document.getElementById("verifier").innerHTML = "Restituer les suites";

  document.getElementById("verifier").setAttribute("onclick", "restituer_suites()")
}