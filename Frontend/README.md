# A Recipe for Success - Gruppe 47

## For å starte prosjektet:

Viktig å være tilkoblet VPN/ NTNU sitt nett.

- Kjør `cd backend && npm install && npm install body-parser && node server.ts ` i en terminal
- Kjør `cd Frontend && npm install && npm start ` i en annen terminal

<br>

## For å kjøre tester:

- Enhetstesting: `npm test` i backend mappen
- End-to-end-testing: Cypress kjøres `npm run cy:open` i frontend-mappen

<br>

## Om nettsiden

A Recipe for Success er en nettside som lar en søke på oppskrifter og filtrere oppskriftene på dinner, breakfast og dessert. Når bruker kjører prosjektet, viser startsiden de første femten oppskriftene som lastes inn i alfabetisk rekkefølge, helt ufiltrert. Hver oppskrift vises med tittel, bilde og gjennomsnitlig rating. Femten nye oppskrifter lastes dynamisk inn dersom bruker scroller ned til bunnen (pagination). Når bruker trykker på en av oppskriftene dukker det opp en modal som viser flere detaljer som ingredienser og fremgangsmåte. Inne i modalen kan brukeren gi oppskriften en rating basert på et system med fem stjerner, hvor fem er best. Nettsiden har en gjennomgående fargepalett og et gjennomtenkt responsivt design.

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
**cypress:** rammeverk for å utføre ende-til-ende-testing av frontend.
**graphql:** spørrespråk for å laste data fra APIet til applikasjonen.
**react-bottom-scroll-listener:** lytter etter når siden er scrollet til bunnen (brukt til pagination).
**react-focus-lock:** låser fokuset til å være på modalen mens den er åpen.
**"@apollo/client":** administrere data med GraphQL.
<br>

### Redux

Redux er en global state manager som wrappes rundt hele appen, slik at staten kan hentes hvor som helst i appen. Redux blir brukt til å håndtere søk og filtrering, der hele resultatsettet blir sortert til tross for dynamisk innlasting av oppskriftene. Dette er gjort ved å hente riktig query som skal kjøres for innhenting av de forskjellige oppskriftene. Vi har forskjellige queries for å hente alle oppskrifter, middagsoppskrifter, frokostoppskrifter og oppskrifter via søk. I tillegg har vi brukt den til å håndtere pagination, ved at den håndterer sidetall og offset, og for å håndtere id’en til den aktive oppskriften. Det kan diskuteres hvor hensiktsmessig det er å bruke redux i dette prosjektet. På grunn av størrelse og begrenset antall filer som behøvde lagring av state, ville man kunne brukt react props eller useContext for å lagre staten.

<br>

### MongoDB

Vi har brukt MongoDB sammen med tredjeparts biblioteket mongoose, som modellerer applikasjonsdataen. MongoDB er en NoSQL database, hvor vi har lagret recipe data. Vi har tilkoblet databasen (fooddatabase) i backend, i server.ts, ved bruk av mongoose.

<br>

## Recipe Data fra et offentlig API

For å få tilstrekkelig med data i databasen vår, har vi hentet inn roppskrifter fra det offentlige og ikke minst gratise API-et TheMealDB. For å hente ut data fra dette API-et ble vi nødt til å lage et script som benyttet seg av fetch for å hentet ut de ulike informasjonsfeltene vi ønsket. API-et var svært uorganisert noe som resulterte i mye arbeid for å forstå seg på strukturen. Etter å ha hentet ut feltene benyttet vi oss av en csv-writer for å lage en .csv fil som vi senere lastet opp direkte i MongoDB.

<br>

## REST og GraphQL

Vi har brukt GraphQL for å lettere hente ut nøyaktig data som vi ønsker å bruke.I backend er dette gjort i GraphQl mappen, hvor det er laget et schema og en resolver. I schema har vi Recipes som stemmer overens med mongoose skjemaet. I resolvers er logikken for å hente ut den forskjellige informasjonen fra databasen. I server filen settes også opp logikk for å bruke graphql.

For å hente data fra backen har vi brukt Apollo Client. Apollo er kompatibel med alle GraphQl servere, og er også enkelt å koble opp med Redux. Ved å bruke innebygde funksjoner som useQuery og useMutation, kan vi enkelt se innlastingen og håndtere feilmeldinger. I initApollo.tsx oppretter vi Apollo Client, som wrapper MainPage.

 <br>

## Søk, Filtrering og Sortering

Vi har mulighet for å søke på oppskrift ved navn ved å skrive inn tekst i søkefeltet og trykke på søk knappen, det er ikke mulig å trykke på enter, dette er noe vi gjerne skulle fått til, men på grunn av tid ble ikke det prioritert. Man kan både søke på deler av navnet til en oppskrift og hele oppskriften. Dersom søkeordet ikke eksistere vil siden være helt blank.

Det er mulig å filtrere på middag, frokost og dessert. Dette gjøres ved å trykke på checkboxes i sidemenyen. Man får da opp oppskrifter i denne kategorien. Kun én av checkboxene kan være huket av på samme tid.

For Sortering har vi gjort det på samme måte som filtrering ved å ha checkboxes for å filtrere alfabetisk på navn. Vi har en global state, sortDecending, som enten er satt til true. Ved å klikke på en av checkboxene blir staten oppdatert og oppskriftene blir hentet ut i tilsvarende sortering fra backend. Dette er også mulig også når man har huket av for en kategori.

<br>

## Brukergenerert Data

For brukergenerert data har vi laget en rating-mulighet inne i modalen. Dette implementerte vi ved å bruke useMutation-hooken fra Apollo Client, samt å lagre staten ved hjelp av Redux. Etter at brukeren har gitt en vurdering vil siden bli lastet inn på nytt, og vurderingen vil bli en del av gjennsnitts-ratingen som vises på forsiden. Det er mulgihet til å gi så mange vurderinger man ønsker, noe som kanskje ikke er helt iddelt. Man får heller ikke sett hvilken vurdering man har gitt tidligere, noe som hadde vært fint å implementere, men det rakk vi ikke denne gangen.

<br>

## Testing

**Unit test-en** TestSchema ligger i backend og baserer seg på bruk av rammeverket mocha og chai. Vi har valgt å teste graphql-schema i index.ts. Første test sjekker om en oppskrift returneres med riktig felt, mens andre test sjekker om navnet til en oppskrift inneholder strengen som søkes med. Begge testene bestod.

<br>

**End-to-end testing** er utført ved bruk av rammeverket Cypress. Filen e2e finnes i mappen integration under cypress. Konfigureringen av dette opplevdes trøblete. Når man kjører testen får man feilmelding om syntax-error, som vi ikke finner. Første testen sjekker at det er femten oppskrifter som dukker opp når nettsiden åpnes, og at det lastes inn tretti nye når man scroller til bunnen. Neste test sjekker at et søk bare bare returnerer oppskrifter med tilhørende navn og kategori. Første gangen testene kjøres bruker cypress litt tid på å laste siden. Hvis man kjører testene en gang til vil begge kjøre uten problemer.

<br>

## Bruk av Git

For å samarbeide om prosjektet har vi brukt Git. Git gir mulighet til å lage issues, slik at det er lettere å fordele oppgaver og ha oversikt over progresjon i prosjektet. Vi har nummerert hvert issue og gitt det et beskrivende navn, som vi har branchet ut i fra. Vi har prøvd å følge git standarder og hatt en egen develop branch, som vi brancher ut i fra, og til slutt merget develop inn i master. Vi klarte dessverre å ødelegge develop-branchen rett før levering og hadde ikke tid til å fikse opp i det. Men master-branchen forble urørt, slik at siste steg med å merge develop inni master gjorde vi ikke denne gangen.
