# Disclaimer

Questo progetto è stato realizzato esclusivamente come esercizio didattico per testare e approfondire le seguenti competenze tecniche:

- **Middleware Express** (autenticazione, autorizzazione, validazione)
- **API REST** (CRUD operations, routing, gestione errori)
- **Database MySQL** (schema design, query ottimizzate, connection pooling)
- **Autenticazione JWT** (token generation, cookie HttpOnly, verifica middleware)
- **Architettura MVC** (separazione controllers, routes, middleware, config)
- **Template engine EJS** (server-side rendering, partials, layout)
- **Frontend vanilla JS** (fetch API, DOM manipulation, modal interactions)

## Sicurezza

**Questo software è fornito "COSÌ COM'È" (AS IS), senza alcuna garanzia.** L'autore **NON si assume alcuna responsabilità** per:

- Utilizzo in ambiente di produzione
- Protezione dei dati sensibili
- Vulnerabilità di sicurezza non mitigate
- Perdita o compromissione di dati
- Qualsiasi danno diretto o indiretto derivante dall'uso di questo software

Le pratiche di sicurezza implementate (JWT, bcrypt, HttpOnly cookies) sono **minime e a scopo dimostrativo**. Per qualsiasi utilizzo reale è necessario:

- Validare e sanificare tutti gli input utente
- Implementare rate limiting e protezione CSRF
- Utilizzare HTTPS in produzione
- Proteggere le variabili d'ambiente (.env)
- Aggiornare regolarmente le dipendenze
- Applicare il principio del minimo privilegio al database
- Implementare logging e monitoring

**NON utilizzare questo progetto in produzione così com'è.**
