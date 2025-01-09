# Samostalni zadatak za Vježbu 6
Izradite novi poslužitelj `movie-server` na proizvoljnom portu te implementirajte sljedeće rute:

1. `GET /movies` - vraća listu filmova u JSON formatu
2. `GET /movies/:id` - vraća podatke o filmu s određenim `id`-om
3. `POST /movies` - dodaje novi film u listu filmova (in-memory)
4. `PATCH /movies/:id` - ažurira podatke o filmu s određenim `id`-om
5. `GET /actors` - vraća listu glumaca u JSON formatu
6. `GET /actors/:id` - vraća podatke o glumcu s određenim `id`-om
7. `POST /actors` - dodaje novog glumca u listu glumaca (in-memory)
8. `PATCH /actors/:id` - ažurira podatke o glumcu s određenim `id`-om

Podaci za filmove:
```json 
[ 
    { 
        "id": 4222334, 
        "title": "The Shawshank Redemption", 
        "year": 1994, 
        "genre": "Drama", 
        "director": "Frank Darabont" 
        
    }, 
    { 
        "id": 5211223, 
        "title": "The Godfather", 
        "year": 1972, 
        "genre": "Crime", 
        "director": "Francis Ford Coppola" 
    }, 
    { 
        "id": 4123123, 
        "title": "The Dark Knight", 
        "year": 2008, 
        "genre": "Action", 
        "director": "Christopher Nolan"
    }
] 
``` 
Podaci za glumce:
```json 
[ 
    { 
        "id": 123, 
        "name": "Morgan Freeman", 
        "birthYear": 1937, 
        "movies": [4222334] 
    }, 
    { 
        "id": 234, 
        "name": "Marlon Brando", 
        "birthYear": 1924, 
        "movies": [5211223] },
    { 
        "id": 345, 
        "name": "Al Pacino", 
        "birthYear": 1940, 
        "movies": [5211223]
    }
] 
```
Implementirajte *middleware* koji će se upotrebljavati za pretraživanje filmova i glumaca po `id`-u. Kada korisnik pošalje zahtjev na rutu koja ima route parametar `id` na resursu `/movies`, *middleware* će provjeriti postoji li taj film u listi filmova. Napravite isto i za glumce, dodatnim *middlewareom*. Odvojite rute u zasebne router instance te implementacije middlewareova u zasebne datoteke unutar `middleware` direktorija. 

Dodajte novi *middleware* na razini Express aplikacije koji će logirati svaki dolazni zahtjev na konzolu usljedećm formatu:
```sh
[movie-server] [2024-06-01 12:00:00] GET /movies
```

**Za svaki zahtjev morate logirati:**
- naziv aplikacije
- trenutni datum i vrijeme
- HTTP metodu zahtjeva
- URL zahtjeva


Instalirajte `express-validator` biblioteku te implementirajte sljedeće validacije za odgovarajuće rute:
- `POST /movies` - validirajte jesu li poslani `title`, `year`, `genre` i `director`
- `PATCH /movies/:id` - validirajte jesu li poslani `title`, `year`, `genre` ili `director`
- `POST /actors` - validirajte jesu li poslani `name` i `birthYear`
- `PATCH /actors/:id` - validirajte jesu li poslani `name` ili `birthYear`
- `GET /movies/:id` - validirajte je li `id` tipa integer
- `GET /actors/:id` - validirajte je li `id` tipa integer
- `GET /movies` - dodajte 2 query parametra `min_year` i `max_year` te validirajte jesu li oba tipa integer. Ako su poslani, provjerite jesu li `min_year` i `max_year` u ispravnom rasponu (npr. `min_year` < `max_year`). Ako je poslan samo jedan parametar, provjerite je li tipa integer.
- `GET /actors` - dodajte route parametar `name` te provjerite je li tipa string. Uklonite prazne znakove s početka i kraja stringa koristeći odgovarajući *middleware*.

Obradite greške za svaku rutu slanjem objekta s greškama koje generira `express-validator` biblioteka.
Osigurajte sve rute od reflektiranog XSS napada koristeći odgovarajući *middleware*.
