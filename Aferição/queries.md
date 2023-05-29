# Quantos exames estao registados?

```db.exames.count()````
Resultado: 300

# Quantos exames tiveram resultado válido?

Supondo que só existem dois resultados possíveis, true ou false.
```
db.exames.find(
    {
        resultado: { $in: [false, true] }
    }
).count()
```
Resultado: 300

Supondo que por válido se entende que o resultado é true.
```
db.exames.find(
    {
        resultado: true
    }
).count()
```
Resultado: 138

# Qual a distribuição de exames por genero?

```
db.exames.aggregate([
    {
        $group: {
            _id: "$genero",
            count: { $sum: 1 }
        }
    }
])
```