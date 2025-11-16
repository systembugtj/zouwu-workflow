import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'Zouwu Workflow',
    description: '驺吾工作流 - 基于 Nx Monorepo 的工作流 Schema 定义和验证系统',
    base: '/zouwu-workflow/',
    lang: 'zh-CN',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '规范文档', link: '/zouwu-workflow-specification-v1.0' },
            { text: '包文档', items: [
                { text: '核心包', link: '/packages/zouwu-workflow' },
                { text: 'CLI 工具', link: '/packages/zouwu-cli' },
                { text: '表达式解析器', link: '/packages/zouwu-expression-parser' },
            ]},
            { text: 'GitHub', link: 'https://github.com/systembugtj/zouwu-workflow' },
        ],
        sidebar: {
            '/': [
                {
                    text: '介绍',
                    items: [
                        { text: '项目概述', link: '/' },
                        { text: '快速开始', link: '/getting-started' },
                    ],
                },
                {
                    text: '规范文档',
                    items: [
                        { text: '工作流规范 v1.0', link: '/zouwu-workflow-specification-v1.0' },
                    ],
                },
                {
                    text: '包文档',
                    items: [
                        { text: '核心包 (zouwu-workflow)', link: '/packages/zouwu-workflow' },
                        { text: 'CLI 工具 (zouwu-cli)', link: '/packages/zouwu-cli' },
                        { text: '表达式解析器 (zouwu-expression-parser)', link: '/packages/zouwu-expression-parser' },
                    ],
                },
            ],
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/systembugtj/zouwu-workflow' },
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024 Systembug',
        },
    },
});

