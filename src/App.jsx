import { useCallback, useState } from "react";
import Experience from "./Experience/Experience";
import StoryOverlay from "./components/story/StoryOverlay";
import { storyConfig } from "./story/story.config";
import "./App.scss";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleProgress = useCallback((nextProgress) => {
    setProgress(nextProgress);
  }, []);

  return (
    <main
      className="storybook-shell"
      style={{
        "--ink": storyConfig.theme.ink,
        "--paper": storyConfig.theme.paper,
        "--accent": storyConfig.theme.accent,
      }}
    >
      <Experience enabled={entered} onProgress={handleProgress} />
      <StoryOverlay
        config={storyConfig}
        entered={entered}
        progress={progress}
        onEnter={() => setEntered(true)}
      />
    </main>
  );
}
