import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LessonPlayer from "./LessonPlayer";
import jsPDF from "jspdf";

export default function CourseDetail() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);

  // Fetch course
  useEffect(() => {
    fetch(`/api/course_${courseId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setActiveLesson(data.lessons[0]);
      });
  }, [courseId]);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`course-progress-${courseId}`);
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, [courseId]);

  // Certificate generator
  const generateCertificate = () => {
    if (!course) return;

    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Certificate of Completion", 40, 40);

    doc.setFontSize(14);
    doc.text(`Course: ${course.title}`, 40, 70);
    doc.text("Status: Successfully Completed", 40, 95);

    doc.save("certificate.pdf");
  };

  // Expose certificate function globally for tests
  useEffect(() => {
    window.generateCertificate = generateCertificate;

    return () => {
      delete window.generateCertificate;
    };
  }, [course]);

  if (!course) return <p>Loading...</p>;

  const allLessonsCompleted =
    course.lessons.length > 0 &&
    course.lessons.every((l) => completedLessons.includes(l.id));

  const progressPercentage = Math.round(
    (completedLessons.length / course.lessons.length) * 100
  );

  return (
    <div className="course-detail" data-testid="course-detail-page">
      <h1 data-testid="course-title">{course.title}</h1>
      <p>{course.description}</p>

      {/* Video Player */}
      <LessonPlayer videoUrl={activeLesson?.videoUrl} />

      {/* Progress Bar */}
      <div style={{ margin: "20px 0" }}>
        <strong>Progress: {progressPercentage}%</strong>
        <div style={{ background: "#ddd", height: 10 }}>
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              background: "green",
            }}
          />
        </div>
      </div>

      {/* Lessons List */}
      <h2>Lessons</h2>
      <div className="lesson-list">
        {course.lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card">
            <h3>{lesson.title}</h3>
            <p>⏱ {lesson.duration}</p>

            <Link
              to={`/courses/${courseId}/lessons/${lesson.id}`}
              data-testid={`lesson-link-${lesson.id}`}
            >
              Watch
            </Link>

            <button
              onClick={() => {
                if (!completedLessons.includes(lesson.id)) {
                  const updated = [...completedLessons, lesson.id];
                  setCompletedLessons(updated);

                  localStorage.setItem(
                    `course-progress-${courseId}`,
                    JSON.stringify(updated)
                  );
                }
              }}
            >
              Mark as completed
            </button>

            {completedLessons.includes(lesson.id) && <span> ✅</span>}
          </div>
        ))}
      </div>

      {/* Certificate Button */}
      {allLessonsCompleted && (
        <button
          data-testid="generate-certificate-button"
          style={{
            marginTop: "30px",
            padding: "12px 20px",
            fontSize: "16px",
          }}
          onClick={generateCertificate}
        >
          Download Certificate
        </button>
      )}
    </div>
  );
}