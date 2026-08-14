import { useProgress } from "@react-three/drei";

export default function StoryOverlay({ config, entered, progress, onEnter }) {
  const loading = useProgress();
  const ready = loading.total === 0 || loading.progress >= 99.5;
  const displayProgress = ready ? 100 : loading.progress;

  return (
    <>
      {entered && (
        <>
          <div className="story-brand" aria-label={config.meta.title}>
            <span className="story-brand__seal">{config.meta.seal ?? "纸"}</span>
            <span>{config.meta.shortTitle}</span>
          </div>
          <p className="story-hint">滚动 · 拖动 · 方向键</p>
          <div className="story-progress" aria-hidden="true">
            <div style={{ transform: `scaleX(${progress})` }} />
          </div>
        </>
      )}

      <section className={`intro-screen ${entered ? "is-hidden" : ""}`}>
        <div className="intro-screen__content">
          <p className="intro-screen__kicker">Procedural Three.js paper stage</p>
          <h1>{config.meta.shortTitle}</h1>
          <p>{config.meta.subtitle}</p>
          <div className="intro-screen__loading" aria-label="素材加载进度">
            <span style={{ transform: `scaleX(${displayProgress / 100})` }} />
          </div>
          <button type="button" disabled={!ready} onClick={onEnter}>
            {ready ? "打开空白模板" : `装订中 ${Math.round(displayProgress)}%`}
          </button>
          <small>{config.meta.prompt}</small>
        </div>
      </section>
    </>
  );
}
