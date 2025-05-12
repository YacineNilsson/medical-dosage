Doseringsapp för barn
En applikation som hjälper barnläkare att snabbt och säkert räkna ut läkemedelsdoser baserat på vikt eller kroppsyta. Appen är framtagen som ett examensarbete och består av en React Native-baserad frontend och en backend byggd med Java Spring Boot.

🚀 Funktioner
Beräkning av dosering baserat på vikt eller BSA (Mosteller / Du Bois)

Två alternativ: använd läkemedel från databas eller mata in egna värden

Inloggning med JWT och skyddade API:er

Möjlighet att spara patientdata (namn, vikt, längd m.m.)

Kommunikation mellan frontend och backend via CORS

🧱 Teknikstack
Frontend: React Native (Expo)

Backend: Java 21, Spring Boot (Spring Security, Spring Data JPA)

Databas: PostgreSQL (körs via Docker)

Övrigt: Docker, pgAdmin, GitHub

⚙️ Hur man kör projektet lokalt

1. Klona repot
   
3. Backend (Spring Boot)
Starta PostgreSQL i Docker

docker run --name dosing-postgres -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=dosingapp -p 5432:5432 -d postgres

Starta backend-applikationen
Öppna backend-projektet i t.ex. IntelliJ IDEA

Kör Application.java (Spring Boot startpunkt)

Backend körs på http://localhost:8080

3. Frontend (React Native + Expo)
Installera beroenden

cd frontend
npm install

Starta utvecklingsserver (Expo)
npx expo start

Öppna Expo i webbläsaren, använd QR-kod eller kör appen i Android/iOS-simulator

Frontend kommunicerar med backend på http://localhost:8080 (se till att CORS är aktiverat)

🔐 Inloggning och säkerhet
Projektet använder JWT-baserad autentisering. Se DataSeeder i backend för inloggningsuppgifter till testanvändare eller skapa en ny profil. 
Endast inloggade användare kan använda funktionerna för beräkning och patienthantering.

📄 Övrigt
Mediciner seedas automatiskt vid uppstart av backend
All doseringslogik ligger i backend (servicelager)
Dosresultat avrundas till två decimaler
Projektet är endast avsett som prototyp för utbildningssyfte

📚 Licens
Detta projekt är skapat inom ramen för ett examensarbete och är fritt att använda och vidareutveckla i icke-kommersiella syften. Ange gärna källa om du använder koden i andra sammanhang.


