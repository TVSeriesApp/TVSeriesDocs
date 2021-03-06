
# App

---

## Benachrichtigungen

### Einführung

>Push-Benachrichtigungen sind Meldungen, die ohne das Öffnen der jeweiligen App auf dem Smartphone angezeigt werden.

>Notifications, d.h. Benachrichtigungen über den Zeitpunkt des Erscheinens der neuesten Folge einer ausgewählten Serie, werden über [FCM](#FCM NOtifications) (Firebase Cloud Messaging) realisiert.

>Die Kommunikation mit der API zur Abfrage von Serieninformationen funktioniert über HTTP-Abfragen (siehe [API](server.md#API)).

### FCM Notifications

>Damit Benutzer der App Benachrichtigungen erhalten können, muss der im Hintergrund laufende Benachrichtigungs-Service von Android angesprochen werden. Dies geschieht mithilfe von Firebase Cloud Messaging, einem Online-Service bereitgestellt von Google, welcher neben anderen hilfreichen Werkzeugen ein Framework für das Erstellen und Senden von Push-Nachrichten bereitstellt.

Wenn aus der App eine Anfrage für eine Benachrichtigung (z.B. durch das Hinzufügen einer Serie in die eigene Watchlist) an unseren Server über eine HTTP-POST-Anfrage gesendet wird, reagiert dieser durch eine eigene Push-Benachrichtigung via Firebase.

Im Falle einer Anfrage von Nutzenden mit eigenem Account, wird zuerst eine Anfrage an die Firebase Datenbank gestellt, um die persönliche Watchlist zu aktualisieren. Mit dem erhaltenen Token wird nun eine Anfrage an den Server gestellt, die Benachrichtung via FCM auszustellen. Zum Füllen ebendieser Benachrichtigung mit den richtigen Daten, bzw. um die korrekte Überlieferungszeit zu gewährleisten, fragt der Server diese Informationen durch weitere Anfragen wie [getSeriesbyId](server.md#getSeriesById) ab, und die Benachrichtigung wird mit dem gewollten Inhalt zur richtigen Zeit über FCM ausgestellt.

Dabei bietet Google die Firebase Console GUI zum vereinfachten Testen dieses Vorganges, auch ohne eigenen Server. Diese Funktion kann auch benutzt werden, um einfach und schnell an bestimmte Nutzergruppen der App Benachrichtigungen zu versenden, z.B. nur an Nutzer in bestimmten Ländern oder Altersgruppen.
![](https://firebase.google.com/docs/cloud-messaging/images/messaging-overview.png)

---

## GUI

Bei der GUI gibt es zwei Teilgebiete. Zum einen die [Layout-XML](https://developer.android.com/guide/topics/ui/declaring-layout.html) (= Extensible Markup Language) Dateien, welche den Aufbau, also Abstände, Farben, Icons und andere Initialwerte beinhalten, und zum anderen die [Activities](https://developer.android.com/guide/components/activities/index.html), welche die dynamischen Aspekte abdecken, also Nutzereingaben und Änderungen der Layouts sowie Bereitstellen der Daten für die Layouts.

Im folgenden werden die Methoden der in dieser App zu 99% sichtbaren Activity "MainActivity" kurz erklärt und vorgestellt (Es gibt noch zwei andere Activities, die jedoch nur aktiv sind, wenn man sich anmeldet.). Hierbei ist anzumerken, dass das Verwenden einer einzelnen Activity für die gesamte grafische Oberfläche (Anmeldung ausgenommen) nicht sinnvoll ist und die einzelnen "Bildschirme" eher in einzelne Activities oder [Fragments](https://developer.android.com/guide/components/fragments.html) ausgelagert werden sollten. Da wir dies zum Beginn der Implementierung nicht wussten, wurde unser Ansatz aus Zeitgründen fortgesetzt.

### Attribute der Klasse MainActivity

```java
MenuItem menuItemSearch;
MenuItem menuItemOptions;
FloatingActionButton fabWatchlist;
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
Diese Methode wird aufgerufen, sobald das Menü in der oberen Leiste erstellt wird. Hier wird durch Abfragen von searchActive sichergestellt, dass die Suche, welche hier mit dem [MenuInflater](https://developer.android.com/reference/android/view/MenuInflater.html) aufgebaut wird, und das Suchmenü nur im Menüpunkt Suche angezeigt werden. 
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
In dieser Methode wird das Auswählen von Menüpunkten in der linken Navigationsleiste verarbeitet. Dabei wird die ID, welche von der Navigationsleiste übergeben wird mit der ID des Menüpunktes verglichen und bei Überstimmung eine Abfolge an Methodenaufrufen ausgeführt, die das neue Layout (bzw. die neue Ansicht) laden und sichtbar machen. Die Funktion gibt, nachdem das Seitenmenü geschlossen wird, true zurück, wenn ein Menüpunkt in der Seitenleiste angetippt wurde.

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

### Methode onOptionsItemSelected(MenuItem item)
Diese Methode ist zuständig für das Ändern der Sprache der Ansteuerung der API (und damit auch der Suche). Diese wird zwischen Deutsch Englisch und Spanisch durchgewechselt, wenn der_die Nutzer_in auf den Menüeintrag "Change Language" im oberen Menü tippt. Dabei wird zur Rückmeldung eine Toast-Nachricht mit der aktuellen Sprache gezeigt.

```java
public boolean onOptionsItemSelected(MenuItem item) {
    switch (item.getItemId()) {
        case R.id.action_settings:
            if (lang.equals("en")) {
                lang = "de";
                Toast.makeText(getApplicationContext(), "Sprache wurde auf Deutsch geändert", Toast.LENGTH_LONG).show();
            }
            else if (lang.equals("de")) {
                lang = "es";
                Toast.makeText(getApplicationContext(), "Changed Language to English", Toast.LENGTH_LONG).show();
            }
            else if (lang.equals("es")) {
                lang = "en";
                Toast.makeText(getApplicationContext(), "Cambió el idioma al español.", Toast.LENGTH_LONG).show();
            }
             return true;
        default:
            return super.onOptionsItemSelected(item);
    }
}
```

### Methode getSeriesById(Context context, final String seriesID)
Diese Methode steuert einen API-Endpunkt (siehe [API-Dokumentation](http://www.tvseriesapp.tk/#/server?id=getseriesbyid)) an, welcher bei Übergabe der Serien-ID (eindeutige Nummer zur Identifikation einer Serie in der Datenbank) Informationen über diese Serie in Form eines JSONObjects liefert. In dieser Methode wird außerdem eine detaillierte Listenansicht zur Anzeige einzelner Suchergebnisse nach Antippen eines Eintrags in der Suchergebnisliste (weiter unten erklärt) erstellt und angezeigt, was aus Zeitgründen nicht in einer eigenen Methode realisiert wurde. Für die Listenansicht wird hier zuerst eine ArrayList des Typs String erstellt und diese dann durch einen sogenannten [Adapter](https://developer.android.com/reference/android/widget/ArrayAdapter.html) auf die Listenansicht (ListView) übertragen. Das funktioniert vereinfacht so: Der Adapter "kennt" die Daten und "weiß", wie ein Listeneintrag für einen Datensatz aussehen muss, wird der Adapter also auf die Listenansicht angewendet passiert das Erstellen von Einträgen automatisch.
```java
final ListView lvD = findViewById(R.id.listViewDetailed); //Die Listenansicht ListViewDetailed finden und in Variable speichern

ArrayList<String> arrayDetails = new ArrayList<>();
arrayDetails.add("Title: " + (notNull((String) responseObject.get("seriesName")) ? responseObject.get("seriesName").toString() : "not provided"));
arrayDetails.add("Alias: " + (aliases));
arrayDetails.add("Overview: " + (notNull((String) responseObject.get("overview")) ? responseObject.get("overview").toString() : "not provided"));
//... Strings für einzelne Informationen zur ArrayList hinzufügen 

ArrayAdapter<String> adapterDetails = new ArrayAdapter<>(MainActivity.this, android.R.layout.simple_list_item_1, arrayDetails); 
//Dem Adapter das gewünschte Layout für einen Listeneintrag sowie die ArrayList übergeben
adapterDetails.notifyDataSetChanged();
lvD.setAdapter(adapterDetails); // Den Adapter auf die Listenansicht anwenden
```

### Methode postNewSeriesByName(Context context, final String seriesName)
Diese Methode steuert einen API-Endpunkt (siehe [API-Dokumentation](http://www.tvseriesapp.tk/#/server?id=getseriesbyname)) an, welcher bei Übergabe eines Such-Strings Serien mit zur Suchphrase passenden Titel in Form eines JSONArrays liefert. In dieser Methode wird außerdem Listenansicht zur Anzeige aller Suchergebnisse mit Titel und Handlungsübersicht erstellt und angezeigt, was aus Zeitgründen nicht in einer eigenen Methode realisiert wurde. Auch hier wird wieder ein Adapter verwendet ([simpleAdapter](https://developer.android.com/reference/android/widget/SimpleAdapter.html)), der ähnlich wie bei getSeriesById arbeitet, jedoch auch zwei oder mehr Daten pro Listeneintrag anwenden kann, die er aus einer [Hashmap](https://docs.oracle.com/javase/7/docs/api/java/util/HashMap.html) bekommt. Der Listenansicht wird hier solange ein neuer Eintrag hinzugefügt, bis die Länge des JSONArrays und damit auch das Ende der Suchergebnisse erreicht ist.
```java
List<Map<String, String>> data = new ArrayList<>();
for (int j = 0; j<arr.length();) {

    Map<String, String> datum = new HashMap<>(7);

    datum.put("seriesName", arr.getJSONObject(j).getString("seriesName"));
    datum.put("overview", arr.getJSONObject(j).getString("overview"));
    datum.put("id", arr.getJSONObject(j).getString("id"));
    datum.put("network", arr.getJSONObject(j).getString("network"));
    datum.put("firstAired", arr.getJSONObject(j).getString("firstAired"));
    datum.put("status", arr.getJSONObject(j).getString("status"));
    data.add(datum);


    j++;
}

SimpleAdapter sAdapter = new SimpleAdapter(MainActivity.this, data,
        android.R.layout.simple_list_item_2, // Vorlage für den Listeneintrag
        new String[] {"seriesName", "overview"},
        new int[] {android.R.id.text1, android.R.id.text2});
```

### Methode getWatchlist
Die Methode getWatchlist wird bei jedem Besuch des Watchlist-Tabs, also auch bei Appstart ausgeführt. Sie fragt
die nutzereigene, auf dem Server gespeicherte Watchlist ab, und lässt diese zugleich in einer ListView anzeigen.
Außerdem wird auch ein FloatingActionButton zum Entfernen von Serien von der Watchlist erstellt bzw. als nicht
sichtbar eingesetzt, je nachdem ob die Detailansicht ausgewählt ist oder nicht. Dabei fungiert sie im Rahmen des
Watchlist-Tabs ähnlich wie postNewSeriesByName.
```java
findViewById(R.id.loadingPanel).setVisibility(View.GONE);
                findViewById(R.id.textViewWatchlistLoadingInfo).setVisibility(View.GONE);
                fabWatchlistR = findViewById(R.id.fabremoveFromWatchlist);
                fabWatchlistR.setVisibility(View.INVISIBLE);
                fabWatchlistR.setOnClickListener(new View.OnClickListener() {
                    public void onClick(View v) {
                        try {
                            removeWatchlistItem(getApplicationContext(), currentSeriesId);
                            FirebaseUser currentFirebaseUser = FirebaseAuth.getInstance().getCurrentUser();
                            if (currentFirebaseUser != null) {
                                Toast.makeText(getApplicationContext(), "Successfully removed from Watchlist", Toast.LENGTH_LONG).show();
                            } else {
                                Toast.makeText(getApplicationContext(), "An error occurred. Please try to log in again.", Toast.LENGTH_LONG).show();
                            }
                        } catch (JSONException e) {
                            Log.e("REMOVE", "Unable to remove WatchlistItem: " + e.toString());
                        }
                    }
                });
                
```

### Methode postWatchlist
Die Methode postWatchlist ist für das Hinzufügen einer momentan in der Detailansicht der Suche dargestellten
Serie zuständig. Sie wird durch einen FloatingActionButton in der Detailansicht aufgerufen und stellt eine Anfrage
an den Endpoint /addWatchlistItem mithilfe von Nutzeridentifikations-ID und der gewünschten Serien-ID,
im Anwendungsfall stets der ID der zurzeit betrachteten Serie.
```java
            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<>();
                //Festlegung der Parameter
                params.put("wl_item", seriesID);
                try {
                    params.put("uid", FirebaseAuth.getInstance().getCurrentUser().getUid());
                } catch (NullPointerException e) {
                    Log.e("postWatchlist failed", e.toString());
                }
                params.put("lang", lang);
                return params;
            }
```
### Methode postToken
Diese Methode sendet ein Firebase-Device-Token, d.h. die Identifizierung einer Instanz der App auf einem Gerät.
Dabei hat jedes Gerät sein eigenes Device-Token, und dient somit in Kombination mit der ID des Nutzers in der
Datenbank (der UID) als eindeutige Identifizierung und folglich Verknüpfung von Benutzern und ihren Geräten.
Benutzt wird die Methode um die erfolgreiche Herstellung einer weiteren Kommunikation zwischen Server und App
zu gewährleisten. Wie auch bei anderen HTTP-Anfrage-Methoden wird auch hier die Methode bei Fehlschlag bis zu vier
Male erneut aufgerufen, um sicherzustellen dass der Server sich nicht mehr im Sleep-Modus befindet, d.h. inaktiv ist.
```java
@Override
            public void onErrorResponse(VolleyError error) {
                Log.e("POST", error.toString());

                if (tolerance < 4) {
                    try {
                        postToken(getApplicationContext());
                    } catch (JSONException e) {
                        Log.e("POST", e.toString());
                    }
                    tolerance++;
                } else {
                    Log.e("Too many Volley Errors, stopped trying", error.toString());
                }

            }
```

### Methode postNewCustomFCM
Inzwischen befindet sich die Methode postNewCustomFCM nicht mehr in aktueller Benutzung, sondern ist nur
noch für Debug-Zwecke relevant. Theoretisch ermöglicht sie das Senden angepasster Push-Nachrichten über
den Umweg über den Server (an den Endpoint /fcm), jedoch wurde sie bisher nur mit einer Testnachricht genutzt.
```java
@Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<>();
                params.put("token", FirebaseInstanceId.getInstance().getToken());
                params.put("title", "T E S T");
                params.put("body", content);
                params.put("priority", "high");
                params.put("timetolive", "345600");

                return params;
            }
```



    
    
## Authentifizierung
Die Authentifizierung innerhalb der App ist umgesetzt mithilfe von drei Methoden. Diese sind nach dem offiziellen Beispiel von Google entworfen, und sind unterteilt in einen Benachrichtigungshelfer, eine Optionsseite (bzw. Klasse), und eine Aktivität zur Beschreibung der tatsächlichen Anzeige bei erfolgreicher Anmeldung.

### Klasse AuthUIActivity
Diese Activity (bzw. Klasse) dient der Koordination des Einlogmechanismus d.h. ihre Funktion ist die Festlegung
der für die mit Google, spezifischer unserem Firebase-Projekt, benötigten Parametern, sowie der
Weiterleitung auf andere Activites.
```java
//beispielhafte Methode
public void signIn2() {
        startActivityForResult(
                AuthUI.getInstance().createSignInIntentBuilder()
                        .setTheme(R.style.AppTheme)
                        .setLogo(R.drawable.ic_live_tv_black_24dp)
                        .setAvailableProviders(getSelectedProviders2())
                        .setTosUrl(FIREBASE_TOS_URL)
                        .setPrivacyPolicyUrl(FIREBASE_PRIVACY_POLICY_URL)
                        .setIsSmartLockEnabled(true,
                                true)
                        .build(),
                RC_SIGN_IN);
    }
```
### Klasse SignedInActivity
Diese Activity (bzw. Klasse) legt den in signed_in_layout angezeigten Inhalt fest, wie zum Beispiel die Account-Informationen des Nutzers. Dabei wird hier auch schon ein Nutzer-Token an den Server gesendet (siehe postToken).
```java
@Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        FirebaseUser currentUser = FirebaseAuth.getInstance().getCurrentUser();
        if (currentUser == null) {
            startActivity(AuthUiActivity.createIntent(this));
            finish();
            return;
        }

        mIdpResponse = getIntent().getParcelableExtra(EXTRA_IDP_RESPONSE);
        mSignedInConfig = getIntent().getParcelableExtra(EXTRA_SIGNED_IN_CONFIG);

        setContentView(R.layout.signed_in_layout);
        ButterKnife.bind(this);
        populateProfile();
        try {
            postTokenPLS(getApplicationContext());
        } catch (JSONException e) {
            Log.e("POST","Unable to post Token: "+e.toString());
        }
    }
```

### Klasse SignInResultNotifier
Diese Klasse kann unabhängig von Aufrufdauer und folglich Lebenszeit einzelner Aktivitäten aufgerufen
werden und wird für die Anzeige erfolgreicher oder fehlgeschlagener Authentifizierung genutzt.
```java
public class SignInResultNotifier implements OnCompleteListener<AuthResult> {
    private Context mContext;

    public SignInResultNotifier(Context context) {
        mContext = context.getApplicationContext();
    }

    @Override
    public void onComplete(@NonNull Task<AuthResult> task) {
        if (task.isSuccessful()) {
            Toast.makeText(mContext, R.string.signed_in, Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(mContext, R.string.anonymous_auth_failed_msg, Toast.LENGTH_LONG).show();
        }
    }
}
```
