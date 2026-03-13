import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

export default function VideoPlayer() {
  const { courseId, lessonId } = useParams();

  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");

  const playerRef = useRef(null);

  const progressKey = `progress-${courseId}-${lessonId}`;
  const notesKey = `notes-${courseId}-${lessonId}`;

  const savedProgress = localStorage.getItem(progressKey);
  const initialPlaybackTime = savedProgress ? parseFloat(savedProgress) : 0;

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

    const storedNotes = localStorage.getItem(notesKey);
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }

    window.getInitialPlaybackTime = () => initialPlaybackTime;

    window.videoPlayer = {
      togglePlay: () => setPlaying((p) => !p),
      toggleMute: () => setMuted((m) => !m),
      isPlaying: () => playing,
      isMuted: () => muted,
    };

    const handleKey = (e) => {
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }

      if (e.key === "m") {
        setMuted((m) => !m);
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
      delete window.videoPlayer;
      delete window.getInitialPlaybackTime;
    };
  }, [courseId, lessonId, playing, muted]);

  const handleProgress = (state) => {
    localStorage.setItem(progressKey, state.playedSeconds);
  };

  const addNote = () => {
    if (!noteText) return;

    const newNote = {
      time: playerRef.current.getCurrentTime(),
      text: noteText,
    };

    const updated = [...notes, newNote];

    setNotes(updated);

    localStorage.setItem(notesKey, JSON.stringify(updated));

    setNoteText("");
  };

  if (!course || !currentLesson) return <div>Loading...</div>;

  return (
    <div data-testid="video-player-page">

      <div data-testid="video-player-container">

        <ReactPlayer
          ref={playerRef}
          url={currentLesson.videoUrl}
          controls
          width="100%"
          playing={playing}
          muted={muted}
          onProgress={handleProgress}
          config={{
            file: {
              attributes: {
                onLoadedMetadata: (e) => {
                  if (initialPlaybackTime > 0) {
                    e.target.currentTime = initialPlaybackTime;
                  }
                },
              },
            },
          }}
        />

      </div>

      {/* Notes */}
      <div>

        <input
          data-testid="note-input"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write note..."
        />

        <button data-testid="add-note-button" onClick={addNote}>
          Add Note
        </button>

        <ul data-testid="notes-list">
          {notes.map((n, i) => (
            <li key={i}>
              {Math.floor(n.time)}s - {n.text}
            </li>
          ))}
        </ul>

      </div>

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