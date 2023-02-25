import json

file = open('../../TPC1/cities/data/mapa.json','r')
map = json.load(file)
file.close()

cities = map['cidades']

for city in cities:
    strHTML = f"""
        <h1>{city['nome']}</h3>
        <p><b>Distrito:</b> {city['distrito']}</p>
        <p><b>População:</b> {city['população']}</p>
        <p><b>Descrição:</b> {city['descrição']}</p>
        <address>[<a href="/">Back to index</a>]</address>
    """
    
    file = open(f"{city['id']}.html", 'w')
    file.write(strHTML)
    file.close()