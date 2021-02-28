# Week 2

## International week

- Je hebt meegedaan aan International Week. Omschrijf in een korte tekst wat je het meest is bijgebleven aan International week.

De workshop NPO recommender systeem vond ik fijn om gehad te hebben. Er was niet super veel input of theorie, maar je ging zelf aan de slag. 
De conceptfase vind ik sowieso leuk en dit was de eerste keer dat je echt met je nieuwe team aan de slag ging. Daardoor was het een goede test om te kijken hoe je samenwerkt en een beetje een ijsbreker. 
Daarnaast gaf het je de opdracht om goed na te denken over alle manieren waarop we AI in kunnen zetten om de website te verbeteren.

Ook de crashcourse AI x Design vond ik interessant. Om te zien hoe je nou echt ermee aan de slag gaat en wat de eerste stappen zijn was denk ik waardevol.

## Teachable machine

- Plaats code voor de opdracht van week 2 in deze folder.

Het model heb ik getraind zodat hij terug geeft welke kant ik op kijk (links, recht, boven, onder, recht).
De webapp verteld je naar welke kant je moet kijken en wanneer je dit doet wordt weer de "dice" gerolt en veranderd de richting.
Hiervoor heb ik de functie rollDice() geschreven die een tekstje aanpast op de pagina en zo verteld waar je moet kijken. Deze funtie wordt uitgevoerd wanneer er op de start-knop wordt gedrukt en wanneer deze opdracht wordt voldaan.
Checken welke kant ik op kijk wordt gedaan in de functie predict(). Door model.predictTopK() haal ik de best passende prediction op en daar pak ik de classname van. Deze classname check ik met de gerolde dice. Als ze overeenkomen wordt rollDice() aangeroepen en veranderd de opdracht. 
Hij is niet 100% consistent. Hiervoor kan een beter model en/of pas de prediction goedkeuren als hij boven de xx% is, i.p.v. wanneer hij hoger is al de anderen.