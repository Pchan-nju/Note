注意：所有代码及文档均由ChatGPT-4o生成

# Note App - Tauri + Vue

Note App 是一个基于 **Tauri** 和 **Vue** 构建的桌面应用程序，允许用户创建和管理带有描述和日期的计划。用户可以按日期或名称对计划进行排序，并且计划数据会持久化保存。

## 功能

- 添加新的计划（包含描述和日期）
- 删除计划
- 根据日期自动排序计划
- 计划数据本地持久化存储

## 技术栈

- **Tauri** - 构建轻量级的桌面应用程序
- **Vue 3** - 前端框架
- **TypeScript** - 类型安全的 JavaScript
- **Rust** - 后端逻辑和文件系统处理

## 安装与运行

### 前提条件

- [Node.js](https://nodejs.org/) (建议使用版本 16 或更高)
- [Rust](https://www.rust-lang.org/tools/install) (建议使用最新版)
- [Tauri](https://tauri.app/) 安装依赖：
  - 如果没有安装 `Tauri` 相关的构建工具，请根据 [Tauri 文档](https://tauri.app/v1/guides/getting-started/prerequisites) 安装合适的依赖工具，如 `cargo`, `Xcode (macOS)`, `Visual Studio (Windows)` 等。

### 安装依赖

首先克隆此仓库到本地，并进入项目目录：

```bash
[git clone https://github.com/your-username/note-app-tauri.git](https://github.com/Pchan-nju/Note.git)
cd Note
```

接着安装项目依赖：

```
npm install
```

### 开发模式运行

为了在开发模式下运行项目，可以使用以下命令：

```
npm run tauri dev
```

这将启动 Tauri 应用程序，并且您可以在开发环境中查看应用的变化。

### 构建生产环境应用

要构建生产环境的可执行文件，请运行以下命令：

```
npm run tauri build
```

构建完成后，您可以在 `src-tauri/target/release/bundle/` 目录中找到生成的可执行文件

## 项目结构

```
├── src/
│   ├── assets/          # 静态资源
│   ├── components/      # Vue 组件
│   ├── App.vue          # 应用主组件
│   ├── main.ts          # Vue 应用入口
├── src-tauri/
│   ├── src/
│   │   ├── main.rs      # Rust 后端逻辑
│   ├── tauri.conf.json  # Tauri 配置文件
├── package.json         # 项目配置与依赖
├── tsconfig.json        # TypeScript 配置
└── README.md            # 项目说明文件
```

## 贡献

欢迎对本项目提出建议或贡献代码。如果您有新的想法或发现了问题，可以提交 Issue 或 Pull Request。