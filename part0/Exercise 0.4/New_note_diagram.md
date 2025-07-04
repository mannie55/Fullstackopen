# 📋 Request-Response Sequence: Classic Notes App (Non-SPA Version)

This document outlines the request-response flow when a user interacts with the classic (non-SPA) version of the Notes app at  
`https://studies.cs.helsinki.fi/exampleapp/notes`.

## 🧭 Overview

The diagram represents how the browser communicates with the server when:

1. The user opens the page
2. A new note is submitted via the form


### Submitting a New Note

1. **User Action:**  
   - Submits the note form.

2. **Browser Sends:**
   - `POST /new_note` with the note content.

3. **Server Responds:**
   - `302 Redirect` back to `/notes`.

4. **Browser Reloads:**
   - Repeats the entire request sequence:
     - HTML → CSS → JS → Updated JSON (now includes the new note)

5. **Browser Re-Renders:**
   - All notes including the newly added one are displayed.

---

## 💡 Notes

- This flow is **page reload–based** (non-SPA).
- Each note submission reloads the entire page and re-fetches resources.
- Efficient for small apps but not optimal for performance in large-scale systems.


```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Enter URL
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->>Browser: server returns HTML document

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>Browser: server returns CSS file
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Server-->>Browser: server returns Javascript file

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: JSON (notes)    [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]

    Browser->>Browser: Render notes via DOM

    User->>Browser: Submit form (new note)
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Server-->>Browser: 302 Redirect to https://studies.cs.helsinki.fi/exampleapp/notes

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->>Browser: server returns HTML document

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->>Browser:  CSS

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Server-->>Browser: JavaScript

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->>Browser: Updated notes JSON JSON (notes)    [{ "content": "Newly dded data", "date": "2023-1-1" }, ... ]

    Browser->>Browser: Re-render notes
```