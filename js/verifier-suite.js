document.onkeyup = function(e) {
    if (e.which == 13) {
      verifier_suite();
    }
  };

function verifier_suite()
{
    let suite = document.getElementById("suite").innerHTML.replace(/ \| /g, '');
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
    else
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
}

function random_sequence()
{
  document.getElementById("suite").innerHTML = "";
  
  for (let i = 0; i < 10; i++)
  {
    document.getElementById("suite").innerHTML += Math.floor( (Math.random() * 9) + 1 );

    if ( i % 2 == 1 && i != 9)
    {
      document.getElementById("suite").innerHTML += " | ";
    }
  }
}

function cacher_suite()
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