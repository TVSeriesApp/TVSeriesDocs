# API

---

## Einführung

> Um die benötigten Informationen über die Serien unsere App zu bekommen, benutzen wir die für uns kostenlose [tv-db API](https://api.thetvdb.com/swagger). Hinter dieser API (Appilcation Programming Interface, dt. Schnittstelle zur Anwenderprogrammierung) steht die Datenbank von [www.thetvdb.com](https://www.thetvdb.com), welche eine große Anzahl an Datensätze über viele verschiedene Serien enthält.

> Allerdings hatte wir Probleme die API direkt zu benutzen, aufgrund des sogenannten [CORS](https://de.wikipedia.org/wiki/Cross-Origin_Resource_Sharing) Protokolls.  Also stellten wir [eine Frage auf der Q&A Seite Stackoverflow](https://stackoverflow.com/questions/48272135/how-do-i-avoid-getting-the-http-status-code-405). Die erhaltenen Antoworten halfen uns sehr bei der Lösung des Problems

> Um das Problem zu lösen entschied ich mich dazu einen eigenen Server zu erstellen, welcher die Anfragen an die TVDB Server weiterleitet. 

Wir entschieden uns für die Plattform [node.js][node] und das [framework][frame] [express.js][http://expressjs.com/], da Arda einerseits schon [ein wenig Erfahrung][Disbot] mit node.js hatte und andererseits express.js sehr einsteigerfreundlich erschien. 

> Bei der Interaktion mit der Datenbank entschieden wir uns für die Benutzung eines [API-wrappers für die TVDB API](https://www.npmjs.com/package/node-tvdb). Bei einem API wrapper handelt es sich um eine Programmbibliothek, welche den Umgang mit der API vereinfacht.

> Eine weitere Aufgabe des Servers sollte die Sendung von Push Notifications an bestimmte Geräte senden. Dies ist mithilfe des [Firebase Admin SDKs][firebase] möglich ist.

> Der Server wird auf [heroku](https://heroku.com) gehostet, damit er über das Internet erreichbar ist. Wir entschieden uns für heroku, da die Plattform einsteigerfreundlich ist und einen guten kostenlosen Plan anbietet. Die URL des Servers lautet [tvdb-rest.herokuapp.com](https://tvdb-rest.herokuapp.com/).

> Parameter für GET Anfragen werden mithilfe von [Query Strings][strings] an den Server übermittelt.

Beispiel:

> https://tvdb-rest.herokuapp.com/getSeriesByName?series_name=young%20sheldon

> Bei POST Anfragen schicken wir ein [JSON][json] Objekt mit bestimmten Parametern. [JSON][json] (JavaScriptObjecNotation) besteht aus Attributen und Attributwerten.

Ein Beispiel für JSON :

```javascript
{
    "name": "John", 
    "age": 30, 
    "car": null 
}

```

Der Server sendet als Ant

## Endpoints für die API

### Interaktion mit thetvdb.com

#### /getSeriesByName

**GET**

Sucht nach einer Serie mithilfe des Parameters series_name. Beispiel:

> https://tvdb-rest.herokuapp.com/getSeriesByName?series_name=young%20sheldon

> Antowrt bestehend aus einem [JSON][json] Objekt, welches aus einem Array aus gefundenen Ergebnissen besteht.

```javascript
[
    {
        "aliases": /*Liste aus Alias*/,
        "banner": /*URL einer Grafik, die als Teaser-Banner dient*/,
        "firstAired": /*Datum der erstmaligen Austrahlung*/,
        "id": /*ID der Serie*/,
        "network": /*Fernsehnetzwerk der Serie*/,
        "overview": /*Überblick über den Inhalt der Serie*/,
        "seriesName": /*Name der Serie*/,
        "status": /*Status der Series: "fortlaufend" oder "beendet"*/
    },
    //...
    //weitere Ergebnisse
]
```

#### /getSeriesById

**GET**

Sucht nach einer Serie mithilfe des Parameters series_id.

Beispiel:

> https://tvdb-rest.herokuapp.com/getSeriesById?series_id=328724

[JSON][json] Objekt welches mithilfe von POST geschickt wird.

```javascript
{
    "series_id":/*ID der Serie*/
}
```

Antowrt bestehend aus einem [JSON][json] Objekt, welches detaillierte Informationen zu der, der Serien ID entsprechenden Serie, enthält.

```javascript
{
    "id": /*ID der Serie*/,
    "seriesName": /*Name der Serie*/,
    "aliases": /*Liste aus Alias*/,
    "banner": /*URL einer Grafik, die als Teaser-Banner dient*/,
    "seriesId": /*ID der Serie*/,
    "status": /*Status der Serie: "fortlaufend" oder "beendet"*/,
    "firstAired": /*Datum der Erstausstrahlung*/,
    "network": /*Fernsehnetzwerk der Serie*/,
    "networkId": /*ID des Fernsehnetzwerk der Serie*/,
    "runtime": /*Laufzeit der Serie pro Episode*/,
    "genre": /*Liste der Genres*/,
    "overview": /*Überblick über den Inhalt der Serie*/,
    "lastUpdated": /*Datum des letzten Updates dieses Dokuments*/,
    "airsDayOfWeek": /*Wochentag, an dem die Serie läuft*/,
    "airsTime": /*Uhrzeit, zu der die Serie läuft*/,
    "rating": /*Bewertung in der Internet Movie Database*/,
    "imdbId": /*ID in der Internet Movie Database*/,
    "zap2itId": /*ID in der Zap2 database*/,
    "added": /*Datum, an dem die Serie zur Datenbank hinzugefügt wurde*/,
    "addedBy": /*ID des Benutzers, der die Serie zur Datenbank hinzugefügt hat*/,
    "siteRating": /*Bewertung auf thetvdb.com*/,
    "siteRatingCount": /*Anzahl der Bewertungen auf tvdb.com*/
}
```

#### /getEpisodesBySeriesId

**POST**

Sucht nach einer Serie mithilfe des Parameters series_id.

[JSON][json] Objekt welches mithilfe von POST geschickt wird.

```javascript
{
    "series_id":/*ID der Serie*/
}
```

Response [JSON][json] bestehend aus einem Array aus Episoden.

```javascript
{
    [
        {
            "absoluteNumber": /*Episodennummer*/,
            "airedEpisodeNumber": /*Nummer der Episode, die als letztes erschienen ist*/,
            "airedSeason": /*Die Staffel, in der die Episode erschienen ist*/,
            "airedSeasonID": /*ID der Staffel*/,
            "dvdEpisodeNumber": /*DVD Episodennummer*/,
            "dvdSeason": /*DVD Staffel*/,
            "episodeName": /*Name der Episode*/,
            "firstAired": /*Datum der Erstausstrahlung dieser Episode*/,
            "id": /*ID der Episode*/,
            "language": {
                "episodeName": /*Sprache des Episodennamens*/,
                "overview": /*Sprache des Überblicks über den Inhalt*/
            },
            "lastUpdated": /*Zeitpunkt des letzten Updates*/,
            "overview": /*Überblick über die Handlung*/        
        },
        //...
        //weitere Episoden
    ]
}
```
#### /getLatestEpisodeById

**POST**

Sucht nach der Episode einer Serie, die am nächsten in der Zukunft ausgestrahlt wird.

[JSON][json] Objekt welches mithilfe von POST geschickt wird.

```javascript
{
    "series_id":/*ID der Serie*/
}
```

Response [JSON][json] bestehend aus einer Episode

```javascript
{
            "absoluteNumber": /*Episodennummer*/,
            "airedEpisodeNumber": /*Episodennummer*/,
            "airedSeason": /*Staffel*/,
            "airedSeasonID": /*ID der Staffel*/,
            "dvdEpisodeNumber": /*DVD Episodennummer*/,
            "dvdSeason": /*DVD Staffel*/,
            "episodeName": /*Name der Episode*/,
            "firstAired": /*Datum der erstmaligen Austrahlung*/,
            "id": /*ID der Episode*/,
            "language": {
                "episodeName": /*Sprache des Episodennames*/,
                "overview": /*Sprache des Überblicks*/
            },
            "lastUpdated": /*Zeitpunkt des letzten Updates*/,
            "overview": /*Überblick über die Handlung der Episode*/        
}
```

### Interaktion mit Firebase

#### /fcm

**POST**

Schickt eine Benachrichtigung mithilfe von [fcm](https://firebase.google.com/products/cloud-messaging/).

[JSON][json] Objekt welches mithilfe von POST geschickt wird.

```javascript
{
    "token":/*ID der Serie*/,
    "title":/*Titel der Benachrichtigung*/,
    "body":/*Inhalt der Benachrichtigung*/,
    "priority":/*Priorität ("high" oder "low")*/
}
```

Rückmeldung bei erfolgreichem Senden der Benachrichtigung.

```
{
   Message sent!                 
}
```
[node]:https://nodejs.org/de/
[Disbot]:https://github.com/ayykamp/discbot
[frame]:https://de.wikipedia.org/wiki/Framework
[firebase]:https://firebase.google.com/docs/admin/setup
[json]:https://www.json.org/json-de.html
