import json

def ordCity(city):
    return city['nome']


def ordInfo(info):
    return info['city']['nome']

# Reads the json file into dictionary
file = open('./data/mapa.json')
map = json.load(file)

cities = map['cidades']
cities.sort(key=ordCity)

conections = map['ligações']

cityInfo = {}

for city in cities:
    cityInfo[city['id']] = { 
        'city': city,
        'conections': [] 
    }

for conection in conections:
     cityInfo[conection['origem']]['conections'].append(conection)


pageHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8">
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <!-- Coluna do indice -->
                <td style="vertical-align: top;" width="30%">
                    <h3>Índice</h3>
                    <ol>
"""

for city in cities:
    pageHTML += f"\t\t\t\t\t\t<li><a href='#{city['id']}'>{city['nome']}</a></li>\n"

pageHTML += """
</ol>
                </td>
                <!-- Coluna do conteudo -->
                <td width="70%">
"""

for info in cityInfo.values():
    pageHTML += f"""
    <a name="{info['city']['id']}"/>
                    <h3>{info['city']['nome']}</h3>
                    <p><b>Distrito:</b> {info['city']['distrito']}</p>
                    <p><b>População:</b> {info['city']['população']}</p>
                    <p><b>Descrição:</b> {info['city']['descrição']}</p>
                    <p><b>Ligações:</b></p>
                    <ul>
    """
    for conection in info['conections']:
            pageHTML += f"""
                        <li>
                            <p>
                                <a href='#{conection['destino']}'>{cityInfo[conection['destino']]['city']['nome']}</a>
                                <br>
                                {conection['distância']}
                            </p>

                        </li>
                """
    
    pageHTML += """
            </ul>
            """


pageHTML += """
                </td>
            </tr>
        </table>
        
    </body>
</html>
"""

print(pageHTML)