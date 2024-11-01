![image](https://github.com/user-attachments/assets/aa3826e1-14fd-4684-84a4-6b68590bfb32)
![image](https://github.com/user-attachments/assets/2f09e5f7-c19f-42b1-b96f-579ec077294f)


# Guestbook Application: Project 1 of the FullStack Course

A simple guestbook web application built with Node.js and Express. This application allows users to submit messages, which are stored in a JSON file and can be viewed on the guestbook page. It also supports AJAX submissions for a smoother user experience.

## Live Demo

You can view the live application at: [https://xmas-guestbook.onrender.com/](https://xmas-guestbook.onrender.com/)

## Features

- Submit messages via a form.
- View all submitted messages on the guestbook page.
- AJAX support for message submissions without page reloads.
- Simple JSON file-based storage for messages.

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript templating)
- jQuery (for AJAX functionality)
- HTML/CSS for front-end

```
/guestbook-app
├── public
│   └── (static files like CSS and JavaScript)
├── views
│   ├── index.ejs
│   ├── guestbook.ejs
│   ├── newmessage.ejs
│   └── ajaxmessage.ejs
├── messages.json
├── app.js
├── package.json
└── README.md
```
