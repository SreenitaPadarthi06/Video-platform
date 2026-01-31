export default function LessonPlayer({ videoUrl }) {
  if (!videoUrl) {
    return <p>Video not available</p>;
  }

  return (
    <div className="video-container">
      <video
        src={videoUrl}
        controls
        preload="metadata"
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "500px",
          borderRadius: "12px",
          backgroundColor: "#000",
        }}
      />
    </div>
  );
}
