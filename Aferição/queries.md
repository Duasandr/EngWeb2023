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
            _id: "$género",
            count: { $sum: 1 }
        }
    }
])
```

Resultado:
```
{ "_id" : "F", "count" : 158 }
{ "_id" : "M", "count" : 142 }
```

# Qual a distribuição de exames por modalidade?

```
db.exames.aggregate([
    {
        $group: {
            _id: "$modalidade",
            count: { $sum: 1 }
        }
    }
])
```

Resultado:
[
  { _id: 'Andebol', count: 18 },
  { _id: 'Futebol', count: 24 },
  { _id: 'Ténis', count: 10 },
  { _id: 'SUP', count: 16 },
  { _id: 'Atletismo', count: 18 },
  { _id: 'Parapente', count: 19 },
  { _id: 'Triatlo', count: 23 },
  { _id: 'Esgrima', count: 20 },
  { _id: 'Ciclismo', count: 18 },
  { _id: 'Badminton', count: 21 },
  { _id: 'Patinagem', count: 18 },
  { _id: 'BTT', count: 18 },
  { _id: 'Karaté', count: 15 },
  { _id: 'Dança', count: 17 },
  { _id: 'Orientação', count: 19 },
  { _id: 'Equitação', count: 13 },
  { _id: 'Basquetebol', count: 13 }
]

# Quantos atletas federados do GDGoma fizeram EMD?

```
db.exames.aggregate([
    {
        $match: {
            "clube": "GDGoma",
            "federado": true
        }
    },
    {
        $group: {
            _id: "$clube",
            count: { $sum: 1 }
        }
    }
])
```

Resultado:
```
{ "_id" : "GDGoma", "count" : 12 }
```

# Quantos atletas do genero feminino que praticam Triatlo fizeram EMD?

```
db.exames.aggregate([
    {
        $match: {
            "género": "F",
            "modalidade": "Triatlo"
        }
    },
    {
        $group: {
            _id: "$género",
            count: { $sum: 1 }
        }
    }
])
```

Resultado:
```
{ "_id" : "F", "count" : 9 }
```