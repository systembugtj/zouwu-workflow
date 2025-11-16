# Zouwu Workflow

🌌 驺吾工作流 - 基于 Nx Monorepo 的工作流 Schema 定义和验证系统

📖 **[在线文档](https://systembugtj.github.io/zouwu-workflow/)** | [GitHub](https://github.com/systembugtj/zouwu-workflow)

## 📜 项目概述

Zouwu Workflow 是一个基于 Nx 的 monorepo 项目，提供完整的工作流 Schema 定义、TypeScript 类型生成、运行时验证器和命令行工具。项目采用古代中国仙侠主题，以"驺吾"（五彩斑斓、仁德守护的神兽）命名。

## 🌟 核心特性

- **JSON Schema 定义**：完整的工作流结构定义，支持多种步骤类型
- **TypeScript 类型支持**：自动生成类型定义，提供编译时类型检查
- **运行时验证器**：基于 Ajv 的高性能验证，支持中文错误信息
- **CLI 工具**：提供代码生成、验证和项目管理功能
- **Monorepo 架构**：使用 Nx 管理多包项目，支持代码共享和统一构建

## 📦 项目结构

```
zouwu-workflow/
├── packages/
│   └── @systembug/
│       ├── zouwu-workflow/          # 核心 Schema 包
│       │   ├── schemas/             # JSON Schema 定义
│       │   ├── src/                 # 源代码
│       │   │   ├── schemas/         # Schema 加载器
│       │   │   ├── types/           # TypeScript 类型定义
│       │   │   └── validators/      # 运行时验证器
│       │   └── examples/            # 示例工作流
│       ├── zouwu-cli/               # CLI 工具包
│       │   ├── src/
│       │   │   ├── cli/             # CLI 入口
│       │   │   └── generators/      # 代码生成器
│       │   └── templates/          # 代码生成模板
│       └── zouwu-expression-parser/ # 表达式解析器包
│           └── src/
│               ├── parser.ts        # 表达式解析器
│               ├── validator.ts     # 表达式验证器
│               └── types.ts        # 类型定义
├── .editorconfig              # 编辑器配置（4 空格缩进）
├── .prettierrc                # Prettier 配置
├── .eslintrc.json             # ESLint 配置
└── nx.json                    # Nx 工作区配置
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发命令

```bash
# 格式化代码
npm run format

# 检查代码格式
npm run format:check

# 运行 ESLint
npm run lint

# 自动修复 ESLint 问题
npm run lint:fix
```

### 构建项目

```bash
# 构建所有包
npx nx run-many --target=build --all

# 构建特定包
npx nx build @systembug/zouwu-workflow
npx nx build @systembug/zouwu-cli
```

### 运行测试

```bash
# 运行所有测试
npx nx run-many --target=test --all

# 运行特定包的测试
npx nx test @systembug/zouwu-workflow
```

## 📚 包说明

### @systembug/zouwu-workflow

核心 Schema 包，提供：

- **Schema 定义**：工作流、步骤类型、模板语法的 JSON Schema
- **类型定义**：TypeScript 接口和类型
- **验证器**：运行时工作流验证功能

详细文档请查看 [packages/@systembug/zouwu-workflow/README.md](./packages/@systembug/zouwu-workflow/README.md)

### @systembug/zouwu-cli

命令行工具包，提供：

- **代码生成**：从 Schema 生成 TypeScript 类型和验证器
- **工作流验证**：验证 YAML/JSON 工作流文件
- **项目初始化**：快速创建工作流项目结构

详细文档请查看 [packages/@systembug/zouwu-cli/README.md](./packages/@systembug/zouwu-cli/README.md)

### @systembug/zouwu-expression-parser

表达式解析器包，提供：

- **表达式解析**：解析 `{{...}}` 模板语法
- **变量提取**：提取和识别变量引用
- **表达式验证**：验证变量引用的有效性

详细文档请查看 [packages/@systembug/zouwu-expression-parser/README.md](./packages/@systembug/zouwu-expression-parser/README.md)

## 🔧 开发规范

### 代码风格

- **缩进**：4 空格（所有文件类型，包括 JSON）
- **分号**：使用分号
- **引号**：单引号
- **行宽**：100 字符

### 工具配置

- **EditorConfig**：`.editorconfig` 配置编辑器行为
- **Prettier**：`.prettierrc` 配置代码格式化
- **ESLint**：`.eslintrc.json` 配置代码检查

### 提交规范

提交信息应清晰描述更改内容，建议使用以下格式：

```
type: 简短描述

详细说明（可选）
```

## 📖 相关文档

- **[在线文档](https://systembugtj.github.io/zouwu-workflow/)** - 完整的项目文档和 API 参考
- [工作流规范文档](https://systembugtj.github.io/zouwu-workflow/zouwu-workflow-specification-v1.0) - 工作流规范 v1.0
- [快速开始指南](https://systembugtj.github.io/zouwu-workflow/getting-started) - 快速上手指南
- [核心包文档](https://systembugtj.github.io/zouwu-workflow/packages/zouwu-workflow) - 核心 Schema 包文档
- [CLI 工具文档](https://systembugtj.github.io/zouwu-workflow/packages/zouwu-cli) - CLI 工具使用指南
- [表达式解析器文档](https://systembugtj.github.io/zouwu-workflow/packages/zouwu-expression-parser) - 表达式解析器文档

### 本地文档

- [工作流规范文档](./packages/@systembug/zouwu-workflow/docs/zouwu-workflow-specification-v1.0.md)
- [核心包 README](./packages/@systembug/zouwu-workflow/README.md)
- [CLI 工具 README](./packages/@systembug/zouwu-cli/README.md)

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📄 许可证

MIT License - 详见各包的 LICENSE 文件

## 🌟 致谢

- 感谢 Nx 团队提供的优秀 monorepo 工具
- 感谢所有贡献者的努力

---

🌌 让工作流开发充满古典韵味，同时保持现代化的技术水准！
