# API

---

## Einführung

> Um die benötigten Daten für unsere App zu bekommen benutzen wir die für die kostenlos benutzbare [tv-db API](https://api.thetvdb.com/swagger).

> Allerdings hatten wir Probleme die API direkt zu benutzen, aufgrund des sogenannten [CORS](https://de.wikipedia.org/wiki/Cross-Origin_Resource_Sharing) Protokolls.
> Dies liegt daran, das der tv-db Server bei HTTP requests keine CORS Header sendet.

> Um dieses Problem zu umgehen entschieden wir uns dazu eine eigene API (die CORS header sendet) zu schreiben, die nur als Umleitung zu der tv-db API dient.

Die API wird auf [heroku](https://heroku.com) gehostet. Die URL lautet [tvdb-rest.herokuapp.com](https://tvdb-rest.herokuapp.com/).

Beispiel:

> https://tvdb-rest.herokuapp.com/getSeriesByName

## Endpoints für die API

### Interaktion mit thetvdb.com

#### /getSeriesByName

**POST**

Sucht nach einer Serie mithilfe des Parameters series_name.

JSON Objekt welches mithilfe von POST geschickt wird.

```javascript
{
    "series_name":/*Name der Serie*/
}
```

Response JSON bestehend aus einer Liste aus Ergebnissen.

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
        "status": /*Statu der Series: "fortlaufend" oder "beendet"*/
    },
    //...
    //weitere Ergebnisse
]
```

#### /getSeriesById

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

JSON Objekt welches mithilfe von POST geschickt wird.

```javascript
{
    "series_id":/*ID der Serie*/
}
```

Response JSON bestehend aus einem Array aus Episoden.

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
}
```
#### /getLatestEpisodeById

**POST**

Sucht nach der Episode einer Serie, die am nächsten in der Zukunft ausgestrahlt wird.

JSON Objekt welches mithilfe von POST geschickt wird.

```javascript
{
    "series_id":/*ID der Serie*/
}
```

Response JSON bestehend aus einer Episode

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

JSON Objekt welches mithilfe von POST geschickt wird.

```javascript
{
    "token":/*ID der Serie*/,
    "title":/*Titel der Benachrichtigung*/,
    "body":/*Inhalt der Benachrichtigung*/,
    "priority":/*Priorität ("high" oder "low")*/
}
```

Rückmeldung bei erfolgreichem Senden der Benachrichtigung.

```html
{
   Message sent!                 
}
```
