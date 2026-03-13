import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Catalog.css";

export default function Catalog() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/courses.json")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="catalog-page" data-testid="catalog-page">
      <h1 className="catalog-title">Course Catalog</h1>

      <input
  type="text"
  placeholder="Search courses..."
  className="catalog-search"
  data-testid="search-input"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

      <div className="catalog-grid">
        {filteredCourses.map((course) => (
          <Link
        key={course.id}
        to={`/courses/${course.id}`}
        className="course-card"
        data-testid={`course-card-${course.id}`}
      >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="course-image"
            />
            <div className="course-content">
              <h3>{course.title}</h3>
              <p className="instructor">{course.instructor}</p>
              <p className="description">{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
