
# App

---

## Benachrichtigungen
TODO

## Einführung

>Push-Benachrichtigungen sind Meldungen, die ohne das Öffnen der jeweiligen App auf dem Smartphone angezeigt werden.

>Notifications, d.h. Benachrichtigungen über den Zeitpunkt des Erscheinens der neuesten Folge einer ausgewählten Serie, werden über [FCM](#FCM NOtifications) (Firebase Cloud Messaging) realisiert.

>Die Kommunikation mit der API zur Abfrage von Serieninformationen funktioniert über HTTP-GET-Abfragen (siehe [API](api.md#API)).

## FCM Notifications

>Damit Benutzer der App Benachrichtigungen erhalten können, muss der im Hintergrund laufende Benachrichtigungs-Service von Android angesprochen werden. Dies geschieht mithilfe von Firebase Cloud Messaging, einem Online-Service bereitgestellt von Google.

Wenn aus der App eine Anfrage für eine Benachrichtigung (z.B. durch das Hinzufügen einer Serie in die eigene Watchlist) an unseren Server über eine HTTP-POST-Anfrage gesendet wird, reagiert dieser durch eine eigene Push-Benachrichtigung via Firebase.

Im Falle einer Anfrage eines Benutzers mit eigenem Account, wird zuerst eine Anfrage an die Firebase Datenbank gestellt, um die persönliche Watchlist zu aktualisieren. Mit dem erhaltenen Token wird nun eine Anfrge an den Server gestellt, die Benachrichtung via FCM auszustellen. Zum Füllen ebendieser Benachrichtigung mit den richtigen Daten, bzw. um die korrekte Überlieferungszeit zu gewährleisten, fragt der Server diese Informationen durch weitere Anfragen wie [getSeriesbyId](API.md#getSeriesById) ab, und die Benachrichtigung wird mit dem gewollten Inhalt zur richtigen Zeit über FCM ausgestellt.

Dabei bietet Google die Firebase Console GUI zum Vereinfachten Testen dieses Vorganges, auch ohne eigenen Server. Diese Funktion kann auch benutzt werden, um einfach und schnell an bestimmte Nutzergruppen der App Benachrichtigungen zu versenden, z.B. nur an Nutzer in bestimmten Ländern oder Altersgruppen.
![](https://firebase.google.com/docs/cloud-messaging/images/messaging-overview.png)

## GUI

Bei der GUI gibt es zwei Teilgebiete. Zum einen die [Layout-XML](https://developer.android.com/guide/topics/ui/declaring-layout.html) (= Extensible Markup Language) Dateien, welche den Aufbau, also Abstände, Farben, Icons und andere Initialwerte beinhalten, und zum anderen die [Activities](https://developer.android.com/guide/components/activities/index.html), welche die dynamischen Aspekte abdecken, also Nutzereingaben und Änderungen der Layouts sowie Bereitstellen der Daten für die Layouts.

Im folgenden werden die Methoden der einzigen in dieser App vorhandenen Activity "MainActivity" kurz erklärt und vorgestellt. Hierbei ist anzumerken, dass das Verwenden einer einzelnen Activity für die gesamte App nicht sinnvoll ist und die einzelnen "Bildschirme" eher in einzelne Activities oder [Fragments](https://developer.android.com/guide/components/fragments.html) ausgelagert werden sollten. Da wir dies zum Beginn der Implementierung nicht wussten, wurde unser Ansatz aus Zeitgründen fortgesetzt.

### Attribute der Klasse MainActivity

Die hier deklarierten Attribute sind MenuItems und ein ActionButton und werden beim Öffnen der App erstellt und dann später weiterverwendet, um z.B. deren Sichtbarkeit zu verändern. Deswegen müssen diese Variablen in der gesamten Klasse als Attribute aufrufbar sein.

Die Suche ist anfangs nicht aktiv, sodass die Suchansicht auch nicht gezeigt werden soll. Dafür wird hier searchActive auf false gesetzt, was dann in onCreateOptionsMenu abgefragt wird, sobald die App startet und das obere Menü erscheint.

## Authentifizierung
TODO!
