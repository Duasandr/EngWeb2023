import json

def ordDistrict(city):
    return city['distrito']

file = open('../TPC1/cities/data/mapa.json','r')
map = json.load(file)
file.close()

cities = map['cidades']
cities.sort(key=ordDistrict)

districts = {}

# makes a dictionary with the districts as keys and the respective city list as values
for city in cities:
    
    if city['distrito'] not in districts:
        districts[city['distrito']] = []
    
    districts[city['distrito']].append(city)

# generates the html file
strHTML = """
<!DOCTYPE html>

<html>

    <head>
        <meta charset="UTF-8">
        <title>TPC2</title>
    </head>

    <body>
        <a name="top"></a>
"""

# iterate over the dictionary (key, item) tuple and add
for district in districts.items():
    strHTML += f"""
        <h1>{district[0]}</h1>
        <lu>
"""
    # iterate over the list of cities
    for city in district[1]:
        strHTML += f"""
            <li><a href="/{city['id']}">{city['nome']}</a></li>
"""

    strHTML += """
        </lu>
"""

strHTML += """
        <br>
        <address>[<a href="#top">Back to top</a>]</address>
    </body>

</html>
"""

file = open('index.html','w')
file.write(strHTML)
file.close()