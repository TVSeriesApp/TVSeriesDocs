
# App

---

## Benachrichtigungen
TODO ..?

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

Im folgenden werden die Methoden der in dieser App zu 99% sichtbaren Activity "MainActivity" kurz erklärt und vorgestellt (Es gibt noch zwei andere Activities, die jedoch nur aktiv sind, wenn man sich anmeldet.). Hierbei ist anzumerken, dass das Verwenden einer einzelnen Activity für die gesamte grafische Oberfläche (Anmeldung ausgenommen) nicht sinnvoll ist und die einzelnen "Bildschirme" eher in einzelne Activities oder [Fragments](https://developer.android.com/guide/components/fragments.html) ausgelagert werden sollten. Da wir dies zum Beginn der Implementierung nicht wussten, wurde unser Ansatz aus Zeitgründen fortgesetzt.

### Attribute der Klasse MainActivity

```java
MenuItem menuItemSearch;
MenuItem menuItemOptions;
FloatingActionButton fabWatchlist;
```
Die hier deklarierten Attribute sind MenuItems und ein ActionButton und werden beim Öffnen der App erstellt und dann später weiterverwendet, um z.B. deren Sichtbarkeit zu verändern. Deswegen müssen diese Variablen in der gesamten Klasse als Attribute aufrufbar sein.

```java
boolean searchActive = false;
```
Die Suche ist anfangs nicht aktiv, sodass die Suchansicht auch nicht gezeigt werden soll. Dafür wird hier searchActive auf false gesetzt, was dann in onCreateOptionsMenu abgefragt wird, sobald die App startet und das obere Menü erscheint.

```java
String lang = \"en\"
```

Dieser String beeinflusst durch die Verwendung in anderen Methoden die Anfragen an die API. In diesem Fall wird die Sprache auf Englisch gesetzt, was in der App in einem Menüpunkt geändert werden kann.

### Methode onCreate(Bundle savedInstanceState);
Diese Methode wird aufgerufen, sobald die App startet und die MainActivity (welche die einzige Activity in der App ist) aufgerufen wird. Dort werden die Menüs erstellt:
```java
//Seitenmenü
DrawerLayout drawer = findViewById(R.id.drawer_layout);
ActionBarDrawerToggle toggle = new ActionBarDrawerToggle( this, drawer, toolbar, R.string.navigation_drawer_open,
  R.string.navigation_drawer_close);
drawer.addDrawerListener(toggle);
toggle.syncState();

//Navigationsmenü im Seitenmenü
NavigationView navigationView = findViewById(R.id.nav_view);
navigationView.setNavigationItemSelectedListener(this);
navigationView.getMenu().getItem(0).setChecked(true);
```
...und die Layoutelemente initialisiert:
```java
//Layout-XML
setContentView(R.layout.activity_main);

//Hinweistext
TextView textViewWatchlist = findViewById(R.id.textViewWatchlist);
textViewWatchlist.setVisibility(View.VISIBLE);
```

### Methode onBackPressed()
In dieser Methode wird festgelegt, was bei einem Druck auf die Zurücktaste des Smartphones passiert. Normalerweise wird das mithilfe eines sogenannten "BackStacks" gelöst. Das ist ein Stapel, auf den die vorherigen Ansichten abgelegt werden und dann beim Druck auf Zurück "von oben heruntergenommen" werden. Diese Implementierung ist sinnvoller als so wie hier geschehen jeden Fall einzeln zu berücksichtigen, wurde jedoch aus Zeitgründen nicht mehr umgesetzt.
```java
//Zeige die Suchergebnisse, verstecke die Detailansicht, wenn die Detailansicht gerade 
//sichtbar ist. Schließe die Seitenleiste, falls sie offen ist.
ListView lvD = findViewById(R.id.listViewDetailedS); //Detailansicht
ListView lvR = findViewById(R.id.listViewResultsS); //Suchergebnisse-Ansicht
drawer = findViewById(R.id.drawer_layout); //Seitenmenü

if (lvD.getVisibility() == View.VISIBLE) {
    lvD.setVisibility(View.INVISIBLE);
    lvR.setVisibility(View.VISIBLE);
    fabWatchlist.setVisibility(View.INVISIBLE);
} else if (drawer.isDrawerOpen(GravityCompat.START)) {
    drawer.closeDrawer(GravityCompat.START);
} else if (lvR.getVisibility() == View.VISIBLE) {
    this.startActivity(new Intent(this, MainActivity.class));
    fabWatchlist.setVisibility(View.INVISIBLE);
} else {
    super.onBackPressed();
```
### Methode onCreateOptionsMenu(final Menu menu)
Diese Methode wird aufgerufen, sobald das Menü in der oberen Leiste erstellt wird. Hier wird durch Abfragen von searchActive sichergestellt, dass die Suche, welche hier mit dem [MenuInflater](https://developer.android.com/reference/android/view/MenuInflater.html) aufgebaut wird,und das Suchmenü nur im Menüpunkt Suche angezeigt werden. 
```java
MenuInflater inflater = getMenuInflater();
inflater.inflate(R.menu.menu_search, menu);
menuItemSearch = menu.findItem(R.id.menuSearch);
menuItemOptions = menu.findItem(R.id.action_settings);

if(!searchActive){
    menuItemSearch.setVisible(false);
    menuItemSearch.getActionView().setVisibility(View.INVISIBLE);
    menuItemOptions.setVisible(false);
} else {
    menuItemSearch.setVisible(true);
    menuItemSearch.getActionView().setVisibility(View.VISIBLE);
    menuItemOptions.setVisible(true);
    }
```

Auch der QueryTextListener wird an dieser Stelle gesetzt. Dieser Listener ist für die Weitergabe der Texteingaben im Suchfeld zu den API-Endpoints (siehe [API-Dokumentation](http://www.tvseriesapp.tk/#/api)) zuständig.
```java
public boolean onQueryTextSubmit(String s) {

    Toast.makeText(getApplicationContext(), s, Toast.LENGTH_LONG).show(); //Gib den übermittelten Text als Toast-Nachricht aus
    try {
        postNewSeriesByName(getApplicationContext(), s); //Rufe die Suche nach Seriennamen auf mit dem übermittelten Text
    } catch (JSONException e) {
        Toast.makeText(getApplicationContext(), "Fehler mit der API.", Toast.LENGTH_LONG).show();
}
```

### Methode onNavigationItemSelected(MenuItem item)
In dieser Methode wird das Auswählen von Menüpunkten in der linken Navigationsleiste verarbeitet. Dabei wird die ID, welche von der Navigationsleiste übergeben wird mit der ID des Menüpunktes verglichen und bei Überstimmung eine Abfolge an Methodenaufrufen ausgeführt, die das neue Layout (bzw. die neue Ansicht) laden und sichtbar machen. Die Funktion gibt true zurück, wenn ein Menüpunkt in der Seitenleiste angetippt wurde.

```java
public boolean onNavigationItemSelected(@NonNull MenuItem item) {
    int id = item.getItemId();
    
    if (id == R.id.nav_search) {
        //... Hier steht der Code, der beim Tippen auf den Eintrag "Suche/Search" im Seitenmenü tippt.
    } else if (id == R.id.nav_watchlist) {
        //...
    } else if (id == R.id.nav_share) {
        //...
    } 
    //usw...
    DrawerLayout drawer = findViewById(R.id.drawer_layout);
    drawer.closeDrawer(GravityCompat.START);
    return true;
}
```
## Authentifizierung
TODO!
