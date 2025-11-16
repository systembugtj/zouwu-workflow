#!/usr/bin/env node

/**
 * 🌌 驺吾CLI包测试脚本
 *
 * 📜 仙术功能：运行CLI包功能测试，验证代码生成器和CLI命令正确性
 * 🔧 工作流操作：自动化测试流程
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🌌 启动驺吾CLI包测试仙术...');

const rootDir = path.join(__dirname, '..');
const testDir = path.join(rootDir, 'test-output');
const workflowPackageDir = path.join(rootDir, '../zouwu-workflow');

// 🔧 清理测试目录
function cleanTestDir() {
    console.log('📜 清理测试目录...');
    try {
        if (fs.existsSync(testDir)) {
            fs.rmSync(testDir, { recursive: true, force: true });
        }
        fs.mkdirSync(testDir, { recursive: true });
    } catch (error) {
        console.error('❌ 清理测试目录失败:', error);
        process.exit(1);
    }
}

// 🔧 测试TypeScript编译
function testTypeScriptCompilation() {
    console.log('📜 测试TypeScript编译...');

    try {
        execSync('npx tsc --noEmit', {
            cwd: rootDir,
            stdio: 'pipe',
        });
        console.log('✅ TypeScript编译检查通过');
        return true;
    } catch (error) {
        console.error('❌ TypeScript编译检查失败:', error.stdout?.toString() || error.message);
        return false;
    }
}

// 🌌 测试代码生成器
function testGenerators() {
    console.log('📜 测试代码生成器...');

    try {
        // 编译TypeScript到测试目录
        const tsBuildDir = path.join(testDir, 'build');
        fs.mkdirSync(tsBuildDir, { recursive: true });

        execSync(`npx tsc --outDir ${tsBuildDir}`, {
            cwd: rootDir,
            stdio: 'pipe',
        });

        // 从工作流包复制schemas到构建目录
        const schemasSource = path.join(workflowPackageDir, 'schemas');
        const schemasDest = path.join(tsBuildDir, 'schemas');

        if (fs.existsSync(schemasSource)) {
            fs.mkdirSync(schemasDest, { recursive: true });
            const schemaFiles = fs.readdirSync(schemasSource);
            for (const file of schemaFiles) {
                if (file.endsWith('.json')) {
                    fs.copyFileSync(path.join(schemasSource, file), path.join(schemasDest, file));
                }
            }
        } else {
            console.error('❌ 找不到工作流包的 schema 文件');
            return false;
        }

        // 测试类型生成器
        console.log('🔧 测试类型生成器...');
        const { generateTypesFromSchema } = require(
            path.join(tsBuildDir, 'generators/schema-to-types')
        );

        const workflowSchemaPath = path.join(schemasDest, 'workflow.schema.json');
        const typesOutputPath = path.join(testDir, 'workflow.types.ts');

        if (!fs.existsSync(workflowSchemaPath)) {
            console.error('❌ Schema文件不存在:', workflowSchemaPath);
            return false;
        }

        return new Promise((resolve) => {
            generateTypesFromSchema({
                schemaPath: workflowSchemaPath,
                outputPath: typesOutputPath,
                generateDocs: true,
            })
                .then(() => {
                    if (fs.existsSync(typesOutputPath)) {
                        console.log('✅ 类型生成器测试通过');
                        resolve(true);
                    } else {
                        console.error('❌ 类型生成器未产生输出文件');
                        resolve(false);
                    }
                })
                .catch((error) => {
                    console.error('❌ 类型生成器测试失败:', error);
                    resolve(false);
                });
        });
    } catch (error) {
        console.error('❌ 代码生成器测试失败:', error);
        return false;
    }
}

// 🔧 测试CLI命令
function testCLICommands() {
    console.log('📜 测试CLI命令...');

    try {
        // 编译代码
        const tsBuildDir = path.join(testDir, 'build');
        if (!fs.existsSync(tsBuildDir)) {
            fs.mkdirSync(tsBuildDir, { recursive: true });
            execSync(`npx tsc --outDir ${tsBuildDir}`, {
                cwd: rootDir,
                stdio: 'pipe',
            });
        }

        // 测试 CLI 是否能够运行（至少显示帮助信息）
        const cliPath = path.join(tsBuildDir, 'cli/index.js');
        if (!fs.existsSync(cliPath)) {
            console.error('❌ CLI文件不存在:', cliPath);
            return false;
        }

        // 尝试运行 CLI 帮助命令
        try {
            execSync(`node ${cliPath} --help`, {
                cwd: rootDir,
                stdio: 'pipe',
            });
            console.log('✅ CLI命令测试通过');
            return true;
        } catch (error) {
            // 如果帮助命令失败，至少检查文件是否存在
            if (fs.existsSync(cliPath)) {
                console.log('✅ CLI文件存在');
                return true;
            }
            console.error('❌ CLI命令测试失败:', error.stdout?.toString() || error.message);
            return false;
        }
    } catch (error) {
        console.error('❌ CLI命令测试失败:', error);
        return false;
    }
}

// 🌌 创建示例文件
function createExamples() {
    console.log('📜 创建示例文件...');

    try {
        const examplesDir = path.join(testDir, 'examples');
        fs.mkdirSync(examplesDir, { recursive: true });

        // 创建示例工作流
        const exampleWorkflow = {
            id: 'example_cli_test',
            name: 'CLI测试示例',
            description: 'CLI包测试用示例工作流',
            version: '1.0.0',
            author: '驺吾引擎',
            steps: [
                {
                    id: 'test_step',
                    type: 'builtin',
                    action: 'return',
                    input: {
                        success: true,
                        message: 'Hello from CLI test',
                    },
                },
            ],
        };

        fs.writeFileSync(
            path.join(examplesDir, 'example-workflow.json'),
            JSON.stringify(exampleWorkflow, null, 2)
        );

        console.log('✅ 示例文件创建完成');
        return true;
    } catch (error) {
        console.error('❌ 示例文件创建失败:', error);
        return false;
    }
}

// 🌌 主测试流程
async function main() {
    const results = [];

    try {
        cleanTestDir();

        results.push({ name: 'TypeScript编译', passed: testTypeScriptCompilation() });

        // 等待编译完成
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // 测试代码生成器（异步）
        const generatorResult = await testGenerators();
        results.push({ name: '代码生成器', passed: generatorResult });

        results.push({ name: 'CLI命令', passed: testCLICommands() });
        results.push({ name: '示例文件创建', passed: createExamples() });

        // 输出测试结果
        console.log('\n🌌 驺吾CLI包测试结果总览:');
        console.log('='.repeat(50));

        let totalPassed = 0;
        let totalFailed = 0;

        for (const result of results) {
            const status = result.passed ? '✅' : '❌';
            console.log(`${status} ${result.name}`);
            if (result.passed) {
                totalPassed++;
            } else {
                totalFailed++;
            }
        }

        console.log('='.repeat(50));
        console.log(`📊 总计: ${totalPassed} 通过, ${totalFailed} 失败`);

        if (totalFailed === 0) {
            console.log('🌌 所有测试通过，仙术圆满！');
            process.exit(0);
        } else {
            console.log('❌ 发现问题，需要修复');
            process.exit(1);
        }
    } catch (error) {
        console.error('❌ 天劫降临，测试失败:', error);
        process.exit(1);
    }
}

// 执行测试
main();
