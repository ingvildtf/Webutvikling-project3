# A Recipe for Success - Gruppe 47

## For å starte prosjektet:
Viktig å være tilkoblet VPN/ NTNU sitt nett.
* Kjør ```cd backend && npm install && node server.ts ``` i en terminal
* Kjør ```cd Frontend && npm install && npm start ``` i en annen terminal

<br>

## For å kjøre tester:
* Enhetstesting: `npm test` i backend mappen
* End-to-end-testing: Cypress kjøres `npm run cy:open` i frontend-mappen  


<br>

## Om nettsiden
A Recipe for Success er en nettside som lar en søke på oppskrifter og filtrere oppskriftene på dinner, breakfast og dessert. Når bruker kjører prosjektet, navigeres en til startsiden hvor de første femten oppskriftene lastes inn i alfabetisk rekkefølge, helt ufiltrert. Da vises navn, bilde og gjennomsnitlig rating for oppskriftene. Femten nye oppskrifter lastes dynamisk inn dersom bruker scroller ned til bunnen (pagination). Når bruker trykker på en av oppskriftene dukker det opp en modal som viser flere detaljer om oppskriften som ingredienser og fremgangsmåte. Inne i modalen kan bruker gi oppskriften en rating basert på et system med fem stjerner, hvor fem er best. Nettsiden har en gjennomgående fargepalett og et gjennomtenkt responsivt design. 



- [Teknologi](#teknologi) 
    - [React](#react)
    - [Redux](#redux)
    - [MongoDB](#mongodb)
- [Recipe Data fra et offentlig API](#recipe-data-fra-et-offentlig-api)
- [REST og GraphQL](#rest-og-graphql)
- [Søk, Filtrering og Sortering](#søk,-filtrering-og-sortering)
- [Brukergenerert Data](#brukergenerert-data)
- [Testing](#testing)
- [Bruk av Git](#bruk-av-git)


## Teknologi

### React
For å opprette prosjektet brukte vi “create-react-app . --template typescript”. Her blir en del gjort for oss, blant annet at prosjektet settes opp med typescript. Vi har installert flere pakker for å håndtere de forskjellige kravene:
**react-router-dom:** for navigering på siden.
**styled-components:** for CSS-styling av komponenter.
**mocha og chai:** rammeverk for å utføre enhetstesting av schema i backend. 
**cypress:**  rammeverk for å utføre ende-til-ende-testing av frontend.
**graphql:** spørrespråk for å laste data fra APIet til applikasjonen.
**react-bottom-scroll-listener:** lytter etter når siden er scrollet til bunnen (brukt til pagination).
**react-focus-lock:** låser fokuset til å være på modalen mens den er åpen.
**"@apollo/client":** administrere data med GraphQL.
<br>


### Redux
Redux er en global state manager som wrappes rundt hele appen, slik at staten kan hentes hvor som helst i appen. Redux blir brukt til å håndtere søk og filtrering, der hele resultatsettet blir sortert til tross for dynamisk innlasting av oppskriftene. Dette er gjort ved å hente riktig query som skal kjøres for innhenting av de forskjellige oppskriftene. Da vi har queries for å hente alle oppskrifter, middagsoppskrifter, frokostoppskrifter og oppskrifter via søk. I tillegg har vi brukt den til å håndtere pagination, ved at den håndterer sidetall og offset, og for å håndtere id’en til den aktive oppskriften. Det kan diskuteres hvor hensiktsmessig det er å bruke redux i dette prosjektet. På grunn av størrelse og begrenset antall filer som behøvde lagring av state, ville man kunne brukt react props eller useContext for å lagre staten. 

<br>

### MongoDB
Vi har brukt MongoDB sammen med tredjeparts biblioteket mongoose, som modellerer applikasjonsdataen. MongoDB er en NoSQL database, hvor vi har lagret recipe data. Vi har tilkoblet databasen (fooddatabase) i backend, i server.ts, ved bruk av mongoose.

<br>

## Recipe Data fra et offentlig API
For å få tilstrekkelig med data i databasen vår, bestemte vi oss for å hente inn recipe data fra det offentlige og ikke minst gratise API-et TheMealDB. For å hente ut data fra dette API-et ble vi nødt til å lage et script som benyttet seg av fetch for å hentet ut de ulike informasjonsfeltene vi ønsket. API-et var svært uorganisert noe som resulterte i mye arbeid for å forstå seg på strukturen. Etter å ha hentet ut feltene benyttet vi oss av en csv-writer for å lage en .csv fil som vi senere lastet opp direkte i MongoDB. 


<br>

## REST og GraphQL
Hovedforskjellen på REST og GraphQl er at rest er multiple endpoint api, mens GraphQl er singlepoint. Rest henter også ut all data, mens GraphQL er det mye lettere å hente akkurat nøyaktig data du skal bruke. Vi har dermed valgt å bruke GraphQL i applikasjonen våres. I backend er dette gjort i GraphQl mappen, hvor det er laget et schema og en resolver. I schema har vi Recipes som stemmer overens med mongoose skjemaet. I resolvers er logikken for å hente ut den forskjellige informasjonen fra databasen. I server filen settes også opp logikk for å bruke graphql. 

For å hente data fra backen har vi brukt Apollo Client. Apollo er kompatibel med alle GraphQl servere, og er også enkelt å koble opp med Redux. Ved å bruke innebygde funksjoner som  useQuery og useMutation, kan vi enkelt se innlastingen og håndtere feilmeldinger. I initApollo.tsx  oppretter vi Apollo Client, som wrapper MainPage. 

 <br>

## Søk, Filtrering og Sortering
Vi har mulighet for å søke på oppskrift navn ved å skrive inn tekst i søkefeltet og trykke på søk knappen, det er ikke mulig å trykke på enter, dette er noe vi gjerne skulle fått til, men på grunn av tid ble ikke det prioritert. Vi har også en bug at når man har skrevet noe og trykket på søk, så blir det man har søkt værende i søkefeltet, og man må fjerne det for å søke på nytt. Man kan både søke på deler av navnet til en oppskrift og hele oppskriften, og det må eksistere for å komme opp. 

For filtrering har vi valgt å filtrere på middag, frokost og dessert. Dette gjøres ved å trykke på checkboxes i sidemenyen. Man får da opp oppskrifter i denne kategorien. Kun én av checkboxene kan være huket av på samme tid. 

For Sortering har vi gjort det på samme måte som filtrering ved å ha checkboxes for å filtrere alfabetisk på navn. Vi har en global state, sortDecending, som enten er satt til true. Ved å klikke på en av checkboxene blir staten oppdatert og oppskriftene blir hentet ut i tilsvarende sortering fra backend. 

<br>

## Brukergenerert Data

Vi ønsket å tilrettelegge for brukergenerert data inne i modalen til oppskriften. Dette implementerte vi ved å bruke useMutation-hooken fra Apollo Client, samt å lagre staten ved hjelp av Redux. Dette fikk vi dessverre ikke helt til å tilrettelegge for i frontend, men vi kan legge til vurderinger direkte i databasen. Når man gir vurdering på en oppskrift ved å åpne modalen for oppskriften vil siden kræsje, dette fikk vi dessverre ikke tid til å fikse før fristen og er klar over feilen. Likevel blir reviewen lagt til i databasen og vil vises med stjerner på oversiktssiden på oppskriften. 

<br>
 

## Testing

**Unit test-en** TestSchema ligger i backend og  baserer seg på bruk av rammeverket mocha og chai. Vi har valgt å teste graphql-schema i index.ts. Første test sjekker om en oppskrift returneres med riktig felt, mens andre test sjekker om navnet til en oppskrift inneholder strengen som søkes med. Begge testene bestod. 

<br>

**End-to-end testing** er utført ved bruk av rammeverket Cypress. Filen e2e finnes i mappen integration under cypress. Konfigureringen av dette opplevdes trøblete. Når man kjører testen får man feilmelding om syntax-error som gjør at localhost ikke kjører. Likevel kommer og vinduet for applikasjonen opp og de to tilhørende testene kjører. Første testen sjekker at det er femten oppskrifter som dukker opp når nettsiden åpnes, og at det lastes inn tretti nye når man scroller til bunnen. Neste test sjekker at et søk bare bare returnerer oppskrifter med tilhørende navn og kategori. Begge testene bestod dersom man refresher;) 

<br>

## Bruk av Git
For å samarbeide om prosjektet har vi brukt Git. Git gir mulighet til å lage issues, slik at det er lettere å fordele oppgaver og ha oversikt over progresjon i prosjektet. Vi har nummerert hvert issue og gitt det et beskrivende navn, som vi har branchet ut i fra. Vi har prøvd å følge git standarder og hatt en egen develop branch, som vi brancher ut i fra, og til slutt merget develop inn i master. 
