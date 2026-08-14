export const storyConfig = {
  meta: {
    title: "纸片故事空白模板",
    shortTitle: "纸片故事模板",
    subtitle: "一个等待写入新故事的 Three.js 作业本舞台",
    prompt: "滚动鼠标或拖动画面，检查六页空白舞台",
    seal: "纸",
    templateState: "blank",
  },
  theme: {
    ink: "#3d3a35",
    paper: "#f3f2ec",
    accent: "#c74c51",
  },
  stage: {
    backdropCenterY: 4.52,
    backdropHeight: 8.18,
    backdropZ: -2.82,
    floorY: 0.5,
    floorCenterZ: -0.86,
    floorDepth: 3.92,
    floorThickness: 0.15,
    foldCenterY: 0.16,
    foldHeight: 0.72,
    foldZ: 1.08,
    paperThickness: 0.12,
    pageColors: ["#e6e0b9", "#ceddbf", "#e4d4a5", "#e6c3b7", "#c9d9dc", "#dbe2b2"],
    pageTilts: [-0.004, 0.006, -0.003, 0.005, -0.006, 0.003],
    ruleColor: "#74a7bd",
    marginColor: "#cb6662",
    inkColor: "#4c493f",
    laneColor: "#a9b199",
    laneDashColor: "#f4efd7",
    paperLabelColor: "#eee4c9",
  },
  experience: {
    cameraFov: 35,
    baseScrollSpeed: 0.0085,
    lerpFactor: 0.1,
    enableProceduralMusic: false,
  },
  chapters: [
    { id: "page-01", stageX: -17.2, threshold: 0, number: "01" },
    { id: "page-02", stageX: -9.2, threshold: 0.136, number: "02" },
    { id: "page-03", stageX: 0, threshold: 0.306, number: "03" },
    { id: "page-04", stageX: 9.2, threshold: 0.501, number: "04" },
    { id: "page-05", stageX: 18.4, threshold: 0.603, number: "05" },
    { id: "page-06", stageX: 30.4, threshold: 0.76, number: "06" },
  ],
};

export function chapterIndexForProgress(progress) {
  for (let index = storyConfig.chapters.length - 1; index >= 0; index -= 1) {
    if (progress >= storyConfig.chapters[index].threshold) return index;
  }
  return 0;
}
