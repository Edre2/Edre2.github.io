document.onkeyup = function(e) {
    if (e.which == 13) {
      random_suites();
    }
  };

function verifier_suites()
{
    let suites = document.getElementsByName("suite").innerHTML.replace(/ \| /g, '');
    let mot = document.getElementById("suite-memoire").value.replace(/\s+/g, '');

    console.log(mot, suite);

    let correct = true;

    for (let i = 0; i < suite.length; i++)
    {
      if (suite[i] != mot[i])
      {
         correct = false;
      }
    }

    if (correct)
    {
      document.getElementById("correction").innerHTML ="Bravo, vous avez bien retenu la suite " + suite;
    }
    else if (mot != "")
    {
      document.getElementById("correction").innerHTML ="C'est faux !<br />";
      document.getElementById("correction").innerHTML += "Vous avez répondu : ";
      for (let i = 0; i < mot.length; i++)
      {
        if ( suite[i] == mot[i] )
        {
          document.getElementById("correction").innerHTML += mot[i];
        }
        else
        {
          document.getElementById("correction").innerHTML += "<span class=\"red\">" + mot[i] + "</span>";
        }
      }
      document.getElementById("correction").innerHTML += "<br />Au lieu de : " + suite;

    }

    random_sequence();
    document.getElementById("suite").classList.remove("text-invisible");
    document.getElementById("suite-memoire").value = "";
}

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
    document.getElementById("suites").innerHTML += '<div class="milieu espace-haut-bas"><label for="suite-memoire-'+j+'" id="suite-' + j+ '" class="espace-caracters fill">';
    
    document.getElementById("suites").innerHTML += '</label></div>';
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
  console.log(document.getElementById("suite").classList);
  if (document.getElementById("suite").classList.contains("text-invisible"))
  {
    document.getElementById("suite").classList.remove("text-invisible");
  }
  else
  {
    document.getElementById("suite").classList.add("text-invisible");
  }
}