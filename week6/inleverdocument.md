# Week 6

## Neural Networks II

- Wat kan de classifier wel en niet herkennen? Hoe komt dit?

Sommige dingen doet het heel goed, en anderen slecht. Het ziet bijvoorbeeld wel goed als iets een foto van een scherm is, maar bij een pitbull denkt tie dat hij een muilkorf ziet. Dit laatste komt waarschijnlijk doordat hij bij het trainen van muilkorven allemaal fotootjes heeft gekregen van pitbull-achtige honden met muilkorven. Dit is ook het geval bij muizen en muizenvallen wat ik wel leuk vond.

- Wat is het verschil tussen de pre-trained modellen?

MobileNet en DarkNet zijn op dezelfde manier getrained d.m.v. fotos uit de ImageNet database. MobileNet is geoptimaliseerd voor mobiel en vereist weinig rekenkracht, DarkNet is snel en klein.

DoodleNet is wat anders. Deze is niet getrained op foto's maar op schetsen. Het zijn 345 categorieën met elk 50k schetsen. 

- Is het gelukt om er een game UI omheen te bouwen?

Ja, ik wou eerst dat de gebruiker foto's moest uploaden van katten, maar omdat er meerdere soorten katten zijn getrained werd dat ingewikkelder. Daarom heb ik gekozen om toch maar hamsters te doen. Als je (volgens het model) een hamster upload krijg je een ander tekstje terug als wanneer je een verkeerde foto upload. In deze tekst wordt zijn eerste prediction en z'n confidence in die voorspelling gegeven. De tekst wordt gesproken en in de HTML weergegeven.

Ik heb ook een score toegevoegd. Elke keer als je een juiste foto upload krijg je een puntje erbij.

Ik ben niet meer toegekomen aan het randomiseren van de vraag.

Ook heb ik het op mobiel geopend, ik wist niet dat dat kon! Dat is wel erg handig inderdaad.