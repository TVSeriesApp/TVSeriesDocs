# Info

## Beschreibung

Entwicklungsziel ist eine Android-App, die es ermöglicht nach Serien zu suchen, Ergebnisse 
anzuzeigen und in einer Detailansicht weitere Informationen darzustellen. Gefundene Serien können 
nun der Organisation halber auf eine eigene „Watching-Liste“ hinzugefügt werden, und sobald eine 
neue Folge einer Serie auf der eigenen Liste erscheint, wird der Nutzer durch eine [Push-Notification](android.md#Notifications) 
darüber benachrichtigt.

Dies wird ermöglicht durch den [API](api.md#API)-Zugriff auf die Datenbank von thetvdb.com und die Cloud-
Messaging Funktion des Google-Dienstes Firebase, sowie die App-Entwicklungsumgebung Android 
Studio und den extern bei Heroku gehosteten Node.js-Server.
Das Kostenziel beträgt 0€ (bei Nicht-Publizierung der App im PlayStore).

>Anwendungsbeispiel
Konrad guckt die Serie Frauentausch und möchte über neue Veröffentlichungen auf dem Laufenden gehalten werden. Er benutzt die App, um sich Benachrichtigungen schickeb zu lassen, sobald eine neue Folge publiziert wird. Dies tut er indem er in der Suchansicht die Detailseite der Serie aufruft, und sie zu seiner persönlichen "Watchlist" hinzufügt.


## Anforderungen

### Muss:
* Erstellen eines lauffähigen App-Grundgerüstes
* Anzeige eines Suchfelds für Serien
* Ergebnisanzeige für Suchanfragen mit Ergebnissen aus der „thetvdb.com“-Datenbank
* Gestaltung der App nach Grundlagen des Material Design
* Empfangen von Push-Notifications (und Anzeigen derselben über den Push-Service)

### Soll:
* Mögliches Hinzufügen von Serien auf eine persönliche „Watching-Liste“
* Automatisiertes Empfangen von Push-Notifications je nach individueller Serienliste und Air Time neuer Folgen von auf dieser Liste enthaltenen Serien
* Teilen der eigenen Serienliste über verschiedene Medien mithilfe eines „Share-Buttons“
* Konrad sollte auch mal was machen

### Kann:
* Veröffentlichung der App im Google PlayStore
* Implementierung eines Einstellungsmenüs mit u.A. den folgenden Optionen:
    * Löschen des Suchverlaufes
    * Ändern des Farbschemas
    * Nutzerregistrierung bzw. Accountspezifische Listen
* Serienempfehlungen auf der Startseite der App (z.B. bestbewertete Serien diesen Monat)


## App-Download

Die App ist momentan nur auf [Github](https://github.com/massenmensch/TheTVSeriesApp/releases) herunterzuladen.
