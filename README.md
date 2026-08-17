# Paper Story Builder：让 AI 帮你制作手绘纸片故事网站

这是一个给普通用户准备的 Agent Skill，也附带一套可以直接运行的空白 Three.js 模板。

你不需要先学会 Three.js、角色绑定或 3D 建模。只要准备好自己的故事、照片或画面想法，就可以让 Codex 等支持 Agent Skills 的编程助手，帮你把内容整理成一个可以滚动浏览的手绘纸片故事网站。

它适合制作：

- 旅行回忆、情侣纪念或家庭相册；
- 儿童故事、成长记录或毕业纪念；
- 品牌故事、活动回顾或轻量互动叙事；
- 任何需要“人物一直往前走，场景不断展开”的纸片剧场。

## 它能帮你做什么

Paper Story Builder 会指导 AI 完成一套比较完整的制作流程：

1. 把一段长故事整理成 5–8 个清楚的场景。
2. 先做一张“黄金样张”，确认人物、纸张和笔触风格，再批量生产素材。
3. 把人物、建筑、云朵、车辆、轮子等拆成可以独立运动的透明纸片。
4. 处理人物连续行走、换装、上车、下车和场景衔接。
5. 检查白边、身体断开、轮子错位、图层闪烁、阴影和触发时机等常见问题。
6. 在浏览器里逐幕验收，而不是只看代码有没有编译通过。

Skill 不会替你预置固定人物，也不会把某个案例的角色、地点或故事写死。每个使用者都应该放入自己的内容，生成自己的素材。

## 小白推荐：从空白模板开始

先把仓库下载到电脑：

```bash
git clone https://github.com/FerryCorleone/threejs-paper-story-skill.git my-paper-story
cd my-paper-story
npm install
```

再用开源的 `skills` CLI，把仓库里的 Skill 安装给 Codex：

```bash
npx skills add . --skill paper-story-builder -a codex -y
```

然后在 Codex 里用普通话描述你的需求即可，例如：

```text
使用 paper-story-builder，把我的旅行故事制作成一个手绘纸片网站。
先整理场景和素材清单，做一张黄金样张给我确认，再继续完成整站。
```

本地预览：

```bash
npm run dev -- --port 4173
```

浏览器打开 [http://127.0.0.1:4173](http://127.0.0.1:4173)。交付或发布前运行：

```bash
npm run verify
```

## 已有自己的项目：只安装 Skill

在你的项目目录中运行：

```bash
npx skills add FerryCorleone/threejs-paper-story-skill --skill paper-story-builder -a codex -y
```

常用管理命令：

```bash
# 查看已经安装的 Skill
npx skills list -a codex

# 更新到仓库中的最新版本
npx skills update paper-story-builder -p -y

# 从当前项目移除
npx skills remove paper-story-builder -a codex -y
```

`npx skills` 是 [Vercel Labs 开源的 Agent Skills 管理工具](https://github.com/vercel-labs/skills)。默认安装在当前项目，适合和项目一起管理；只有确定希望所有项目都能使用时，才考虑加 `-g` 做全局安装。

## 你需要准备什么

准备素材很简单：**每个景点或主要场景，尽量提供至少一张有用的照片。**

最好是人物露脸的全身照，能同时看出人物的大概形象、当天穿搭和周围环境。一张合照也可以同时作为两位人物的参考，不需要另外准备正脸、侧脸或多角度照片。这里做的是有意保留瑕疵的手绘卡通，不追求写真级的人脸一致性。

如果景点比较小众，或者只看名称很难知道地标长什么样，再补至少一张单独的风景或地标照片。常见景点没有现场照片时，也可以提供地点名称，由 AI 查找公开参考后重新生成手绘素材。

照片可以直接作为对话附件，也可以放进项目根目录的 `.private-inputs/`。这个目录已经被 Git 忽略，不会跟着仓库提交。不要把私人照片放进 `public/` 或 `public/story-assets/`。

完全没有照片也能开始：写清人物关系、大概外形、穿搭和地点即可，AI 会制作虚构的卡通人物与场景，只是人物相貌和小众地标不会像有照片时那么准确。

喜欢的参考网站、插画画风、音乐情绪或明确不想出现的效果都可以补充，但不是开工的必填项。

完整故事信息通常包括：

- 故事发生的顺序；
- 主要人物是谁；
- 每个地点或场景最重要的标志；
- 希望人物怎么移动，例如步行、开车、骑车或坐缆车；
- 哪些内容必须准确，哪些内容允许艺术化处理。

涉及真人照片时，请先确认本人同意。发布前还要检查图片、音乐和字体的使用授权。

## 隐私说明

这个开源仓库只包含通用 Skill、空白模板、示例配置和检查脚本，不包含任何真实用户的：

- 照片、姓名、联系方式或账号信息；
- 私人旅行故事、情侣故事或家庭故事；
- 已生成的人物、建筑、音乐和成品网站素材；
- 本地文件路径、部署地址、令牌或登录凭据。

你自己制作的网站内容只应该保存在你自己的项目里。准备公开发布时，请再次检查 Git 历史和待提交文件，不要只检查当前页面。

## 项目结构

- `skills/paper-story-builder/`：Skill 本体、制作规范、示例输入和预检脚本。
- `src/Experience/models/PaperWorld.jsx`：程序化纸张舞台。
- `src/Experience/Scene.jsx`：镜头、灯光和首尾循环。
- `src/story/story.config.js`：替换成自己故事的主要配置入口。
- `docs/template-boundaries.md`：哪些内容只改配置，哪些情况才需要改引擎。

## 感谢与来源说明

特别感谢 Andrew Woan 开源的 [Mr. Panda's Psychologically Safe Portfolio](https://github.com/andrewwoan/mr-pandas-psychologically-safe-portfolio)。它的镜头跟随、纸片舞台和首尾循环方式，为这个项目提供了重要参考和启发。

本仓库保留了原项目的 MIT 许可声明，并在此明确致谢。当前模板的纯 Three.js 纸张舞台、Skill 工作流和验收标准是在此基础上的重新整理与扩展；仓库不包含原项目的人物、贴图、模型，也不包含任何私人案例素材。

也感谢 [Vercel Labs Skills CLI](https://github.com/vercel-labs/skills)，让用户可以用统一的 `npx skills` 命令安装和管理 Agent Skills。

## 许可

本项目使用 [MIT License](LICENSE.md)。使用第三方素材或真人肖像时，仍需分别遵守对应授权与隐私要求。
