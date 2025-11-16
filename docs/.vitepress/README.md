# VitePress 文档配置

本目录包含 VitePress 的配置文件，用于生成 GitHub Pages 文档站点。

## 配置说明

- `config.mjs` - VitePress 主配置文件
- 文档源文件位于 `docs/` 目录
- 构建输出到 `docs/.vitepress/dist/`

## 本地开发

```bash
# 启动开发服务器
npm run docs:dev

# 构建文档
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## GitHub Pages 部署

文档通过 GitHub Actions 自动部署。当推送到 `main` 分支时，会自动构建并部署到 GitHub Pages。

部署地址：`https://systembugtj.github.io/zouwu-workflow/`

## 配置要点

- `base: '/zouwu-workflow/'` - 必须与 GitHub 仓库名称匹配
- `ignoreDeadLinks: true` - 忽略死链接检查（用于外部链接）
- 所有 Markdown 文件中的 `{{...}}` 需要转义为 `\{\{...\}\}`
