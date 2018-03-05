# Info

## Beschreibung

Entwicklungsziel ist eine Android-App, die es ermöglicht nach Serien zu suchen, Ergebnisse 
anzuzeigen und in einer Detailansicht weitere Informationen darzustellen. Desweiteren sollen Serien einer Watchlist hinzugefügt werden, damit diese später einfach wiedergefunden werden können. Sobald nun eine 
neue Folge einer Serie erscheint, die auf der eigenen Watchlist steht werden die Nutzenden durch eine [Push-Benachrichtigung](android.md#Notifications) benachrichtigt.

Dies wird ermöglicht durch den [API](api.md#API)-Zugriff auf die Datenbank von thetvdb.com und die Cloud-
Messaging Funktion des Google-Dienstes Firebase sowie die App-Entwicklungsumgebung Android 
Studio und den extern bei Heroku gehosteten Node.js-Server.
Das Kostenziel beträgt 0€ (bei Nicht-Publizierung der App im PlayStore).

>Anwendungsbeispiel

>Die Nutzenden gucken die Serie Game of Thrones und möchte über neue Veröffentlichungen auf dem Laufenden gehalten werden. Sie benutzen die App, um sich Benachrichtigungen schicken zu lassen, sobald eine neue Folge publiziert wird. Dies tun sie, indem sie in der Suchansicht die Detailseite der Serie aufrufen und sie zu ihrer persönlichen "Watchlist" hinzufügen.


## Anforderungen

### Muss:
* Erstellen eines lauffähigen App-Grundgerüstes
* Anzeige eines Suchfelds für Serien
* Ergebnisanzeige für Suchanfragen mit Ergebnissen aus der „thetvdb.com“-Datenbank
* Gestaltung der App nach Grundlagen des Material Design
* Empfangen von Push-Benachrichtigungen (und Anzeigen derselben über den Push-Service)

### Soll:
* Mögliches Hinzufügen von Serien auf eine persönliche „Watchlist“
* Automatisiertes Empfangen von Push-Benachrichigungen, je nach individueller Watchlist und Sendezeit neuer Folgen von auf dieser Liste enthaltenen Serien
* Teilen der eigenen Serienliste über verschiedene Medien mithilfe eines „Share-Buttons“


### Kann:
* Veröffentlichung der App im Google PlayStore
* Implementierung eines Einstellungsmenüs mit u.A. den folgenden Optionen:
    * Löschen des Suchverlaufes
    * Ändern des Farbschemas
    * Nutzerregistrierung bzw. Accountspezifische Listen
* Serienempfehlungen auf der Startseite der App (z.B. bestbewertete Serien diesen Monat)


## App-Download

Die App ist momentan nur auf [Github](https://github.com/massenmensch/TheTVSeriesApp/releases) herunterzuladen.
