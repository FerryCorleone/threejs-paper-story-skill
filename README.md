# Three.js 作业本纸片剧场

这是一个不带预置故事和人物素材的 3D 叙事网站空白模板。镜头沿横向作业本移动，六页程序化纸张首尾循环；把自己的章节、人物和透明纸片加入项目后，就能做成定制故事网站。

运行时全部由 React、Three.js 和 React Three Fiber 完成。纸张厚度、折边、横线、装订孔、车道、光照、阴影和空间层级均为浏览器内程序化几何；项目不需要 DCC 软件、二进制 3D 模型或纹理转码器。

## 本地运行

```bash
npm install
npm run dev -- --port 4173
```

打开 [http://127.0.0.1:4173](http://127.0.0.1:4173)。提交或发布前运行：

```bash
npm run verify
```

`verify` 会依次检查二进制 3D 资产、模板配置、ESLint 和生产构建。

## 换成自己的故事

定制从 `src/story/story.config.js` 开始。先把故事压缩成 5–8 幕，再为每一幕准备独立的透明 PNG/WebP 纸片；需要素材时，在 `public/story-assets/` 下按故事新建目录。舞台本身无需重新建模。

模板当前只渲染六页空白舞台，不包含任何示例故事、角色、旁白、纸片资产或人物绑定。故事渲染器和角色纸偶应按新项目的真实需要添加，避免把某个案例写死成通用依赖。

详细边界见 [`docs/template-boundaries.md`](docs/template-boundaries.md)。

## 项目内 Skill

仓库内置 `skills/paper-story-builder`，用于把新故事整理成本模板可执行的配置、素材和验收结果。它只属于当前项目，不复制或链接到 `~/.codex/skills`。

在本项目的 Codex 任务中可以直接说明：

```text
读取并使用项目内 skills/paper-story-builder/SKILL.md，把这个故事做成可运行的纸片剧场。
```

项目根目录的 `AGENTS.md` 会要求 Codex 在相关任务中优先读取这份项目级 Skill。

## 技术结构

- `src/Experience/models/PaperWorld.jsx`：程序化纸张舞台。
- `src/Experience/Scene.jsx`：镜头、光照和循环世界。
- `src/story/story.config.js`：空白故事数据入口。
- `scripts/validate_story.mjs`：配置和可选素材引用校验。
- `scripts/check_no_binary_3d.mjs`：纯前端 3D 边界校验。

## 来源与许可边界

镜头跟随、纸片舞台和首尾循环的产品方向参考 Andrew Woan 的 [Mr. Panda's Psychologically Safe Portfolio](https://github.com/andrewwoan/mr-pandas-psychologically-safe-portfolio)。本仓库的纯 Three.js 舞台为独立改造，不复用原项目人物、贴图或模型。加入素材时，请记录生成来源、授权和人物肖像许可。
