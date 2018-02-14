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

### /getSeriesByName


**POST**

Sucht nach einer Serie mithilfe des Parameters series_name.

JSON Objekt welches mithilfe von POST geschickt wird.

```javascript
{
    "series_name":/*Name der Serie*/
}
```

Response JSON bestehend aus einem Array aus Ergebnissen.

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
### /getSeriesById

**POST**

Sucht nach einer Serie mithilfe des Parameters series_id.

JSON Objekt welches mithilfe von POST geschickt wird.

```javascript
{
    "series_id":/*ID der Serie*/
}
```

Response JSON bestehend aus detaillierter Information zur Serie.

```javascript
{
    "id": 278339,
    "seriesName": "seriesName": /*Name der Serie*/,,
    "aliases": /*Array aus Alias*/,
    "banner": /*URL zu einer Banner Graphik*/,
    "seriesId": /*ID der Serie*/,
    "status": "status": /*Status der Series: "continuing" oder "ended"*/,
    "firstAired": /*Datum der erstmaligen Austrahlung*/,
    "network": /*Fernsehnetzwerk der Serie*/,
    "networkId": /*ID des Fernsehnetzwerk der Serie*/,
    "runtime": "60",
    "genre": [],
    "overview": "overview": /*Überblick zum den Inhalt der Serie*/,
    "lastUpdated": 1446420667,
    "airsDayOfWeek": "Friday",
    "airsTime": "10:00 PM",
    "rating": "",
    "imdbId": "tt3780362",
    "zap2itId": "",
    "added": "2014-02-08 19:49:27",
    "addedBy": 40611,
    "siteRating": 7.3,
    "siteRatingCount": 4
}
```


