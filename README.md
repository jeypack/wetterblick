# Wetterblick

**Wetterblick** ist eine responsive Wetteranwendung mit React. Wetterdaten können für verschiedene Orte gesucht, detailliert betrachtet und als Favoriten gespeichert und miteinander verglichen werden.

Das Projekt wurde als Abschlussprojekt im **Modul 3** entwickelt.

## Screenshots

### Dashboard

![Wetterblick Dashboard](docs/images/screenshot-weather.jpg)

Suche nach Orten mit Autovervollständigung sowie Übersicht der zuletzt aufgerufenen Orte.

### Wetterdetails

![Wetterdetails](docs/images/screenshot-weather-2.jpg)

Stündliche Wetterentwicklung und Vorhersage für die kommenden Tage.

### Favoriten

![Favoritenvergleich](docs/images/screenshot-weather-3.jpg)

Gespeicherte Orte können miteinander verglichen werden.

## Features

* Orts-Suche mit Autovervollständigung
* Aktuelle Wetterdaten und Vorhersagen
* Stündliche Wetterübersicht
* Vorhersage für kommende Tage
* Favoriten und Ortsvergleich
* Verwaltung zuletzt aufgerufener Orte
* Nutzung ohne Benutzerkonto möglich
* Registrierung und Login
* Speicherung persönlicher Daten
* Responsive Benutzeroberfläche

## Tech Stack

**Frontend**

* React
* React Router
* Vite
* Tailwind CSS
* Headless UI

**Daten & Backend-Services**

* Open-Meteo API
* Firebase Authentication
* Cloud Firestore

**Weitere Tools**

* React Hook Form
* Yup
* Recharts
* Vitest
* Testing Library
* ESLint
* JSDoc

## Technische Umsetzung

Die Anwendung nutzt mehrere React Contexts zur zentralen Verwaltung von Authentifizierung, Benutzerdaten und Wetterdaten.

```text
AuthProvider
      │
      ▼
UserDataProvider
      │
      ▼
WeatherDataProvider
      │
      ├── Firebase Authentication
      ├── Firestore
      └── Open-Meteo
```

Wetterdaten werden über **Open-Meteo** geladen und für die Darstellung aufbereitet. Angemeldete Benutzer können Favoriten und zuletzt aufgerufene Orte über **Firestore** speichern.

Die Wetterentwicklung wird mit **Recharts** visualisiert.

## Projektstruktur

```text
.
├── docs/
│   └── images/
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   └── utils/
├── jsdoc.json
├── package.json
└── README.md
```

## Entwicklung

Das Projekt basiert auf **JavaScript / JSX** und wird mit Vite entwickelt.

```bash
npm install
npm run dev
```

Weitere Entwicklungsbefehle:

```bash
npm run build
npm test
npm run lint
npm run docs
```

## Ausblick

Eine mögliche Weiterentwicklung ist die vollständige Migration der Anwendung auf **TypeScript**, um die Datenstrukturen und Schnittstellen der Anwendung statisch zu typisieren.
