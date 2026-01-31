# 🎓 Video Course Platform (React + Vite)

A modern **video course learning platform** built using **React, Vite, and React Router**.  
The application allows users to browse courses, watch lesson videos, track progress, and download a certificate upon completion.

---

## 🚀 Features

- 📚 Course Catalog with search functionality  
- 🧱 Course cards with clean UI and hover effects  
- 🎬 Lesson-based video player  
- 📂 Sidebar navigation (Udemy/Netflix-style layout)  
- ⏩ Smooth lesson switching  
- 📊 Progress tracking per course (localStorage)  
- 🏆 Certificate download after course completion  
- ⚡ Fast development using Vite  

---

## 🛠️ Tech Stack

- **Frontend:** React, JavaScript (ES6)
- **Routing:** React Router DOM
- **Build Tool:** Vite
- **Styling:** CSS
- **PDF Generation:** jsPDF
- **Storage:** Browser localStorage

---

## 📁 Project Structure

video-course-platform/
├── public/
│ ├── api/
│ │ ├── courses.json
│ │ └── course_1.json
│ ├── videos/
│ │ ├── react_lesson_1.mp4
│ │ └── react_lesson_2.mp4
│ └── images/
│ └── react-thumb.png
│
├── src/
│ ├── components/
│ │ ├── Sidebar.jsx
│ │ └── VideoPlayer.jsx
│ ├── pages/
│ │ ├── Catalog.jsx
│ │ └── CourseDetail.jsx
│ ├── styles/
│ │ └── course.css
│ ├── App.jsx
│ └── main.jsx
│
├── package.json
└── README.md


---
## ▶️ How to Run the Project
## 1️⃣ Clone the repository
```bash
git clone https://github.com/SreenitaPadarthi06/Video-platform.git
cd video-course-platform
```
## 2️⃣ Install dependencies
```bash 
npm install
```
## 3️⃣ Start the development server
```bash
npm run dev
```
## 4️⃣ Open in browser
http://localhost:5173
---
## 📄 Sample Course Data (JSON)

Courses and lessons are loaded from static JSON files.

{
  "id": 1,
  "title": "Introduction to React",
  "description": "Learn the fundamentals of React.",
  "lessons": [
    {
      "id": 101,
      "title": "Component Basics",
      "duration": "3:45",
      "videoUrl": "/videos/react_lesson_1.mp4"
    }
  ]
}

## 🧠 Learning Outcomes

-Through this project, you gain hands-on experience with:

-React functional components and hooks

-Client-side routing using React Router

-State management and derived state

-UI layout using Flexbox and CSS

-Working with JSON-based APIs

-Progress persistence using localStorage

-Building a real-world LMS-style application
---
## 🏁 Future Enhancements

-User authentication

-Backend integration (Node / Firebase)

-Admin panel for uploading courses

-Dark mode support

-Mobile-first responsive design

## 👩‍💻 Author

P.K. Sreenita