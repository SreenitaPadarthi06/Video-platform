import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

export default function VideoPlayer() {
  const { courseId, lessonId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  useEffect(() => {
    fetch(`/api/course_${courseId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        const lesson = data.lessons.find(
          (l) => String(l.id) === String(lessonId)
        );
        setCurrentLesson(lesson);
      });
  }, [courseId, lessonId]);

  if (!course || !currentLesson) return <div>Loading...</div>;

  return (
    <div data-testid="video-player-page">
      <div data-testid="video-player-container">
        <ReactPlayer
          url={currentLesson.video_url}
          controls
          width="100%"
        />
      </div>
      <button
        onClick={() =>
            setCompletedLessons((prev) =>
            prev.includes(lessonId) ? prev : [...prev, lessonId]
            )
        }
        >
        Mark as Completed
        </button>


      <aside>
        <h3>Lessons</h3>
        <ul>
          {course.lessons.map((lesson) => (
            <li
              key={lesson.id}
              data-testid={
                lesson.id === Number(lessonId)
                  ? "current-lesson-item"
                  : undefined
              }
            >
              <Link to={`/courses/${courseId}/lessons/${lesson.id}`}>
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
