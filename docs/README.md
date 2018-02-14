# API

---

## Einführung

> Um die benötigten Daten für unsere App zu bekommen benutzen wir die für die kostenlos benutzbare [tv-db API](https://api.thetvdb.com/swagger). 

> Allerdings hatten wir Probleme die API direkt zu benutzen, aufgrund des sogenannten [CORS](https://de.wikipedia.org/wiki/Cross-Origin_Resource_Sharing) Protokolls. 
> Dies liegt daran, das der tv-db Server bei  HTTP requests keine CORS Header sendet.

> Um dieses Problem zu umgehen entschieden wir uns dazu eine eigene API (die CORS header sendet) zu schreiben, die nur als Umleitung zu der tv-db API dient.

Die API wird auf [heroku](https://heroku.com) gehostet. Die URL lautet [tvdb-rest.herokuapp.com](https://tvdb-rest.herokuapp.com/).

Beispiel:

> https://tvdb-rest.herokuapp.com/getSeriesByName

## Endpoints für die API

***

### /getSeriesByName


**POST**

Sucht nach einer Serie mithilfe des Parameters series_name.

```javascript
{
    "series_name":/*Name der Serie*/
}
```

```javascript
[
    {
        "aliases": /*Array aus Alias*/,
        "banner": /*URL zu einer Banner Graphik*/,
        "firstAired": /*Datum der erstmaligen Austrahlung*/,
        "id": /*ID der Serie*/,
        "network": /*Fernsehnetzwerk der Serie*/,
        "overview": /*Überblick über den Inhalt der Serie*/,
        "seriesName": /*Name der Serie*/,
        "status": /*Status der Series: "continuing" oder "ended"*/
    },
    //...
    //weitere Ergebnisse
]
```








