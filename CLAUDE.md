# Zouwu Workflow Project Rules & Code Standards

## Core Principles

### Communication

- Use Chinese for all responses (dialogue and reasoning)
- English only for mode declarations and code blocks

### Problem Solving

- Provide minimum 2 different solution approaches for every problem
- AI auto-selects and executes optimal solution
- User can correct anytime
- FIX issues, NEVER skip or workaround

## Code Standards

### File Size Limits

- Class files: max 200 lines
- Function files: max 150 lines
- Single function: max 50 lines
- Max nesting depth: 3 levels

### Pure Functions First (Linus Style)

```typescript
// GOOD: Pure function, single responsibility
function validateConfig(config: unknown): ValidationResult {
    if (!config || typeof config !== 'object') {
        return { valid: false, error: 'Invalid config' };
    }
    return { valid: true, data: config };
}

function transformData(data: ValidData): TransformedData {
    return {
        ...data,
        timestamp: Date.now(),
    };
}

// BAD: Large class with mixed responsibilities
class DataProcessor {
    processData() {
        /* 200+ lines */
    }
    validateData() {
        /* 100+ lines */
    }
    transformData() {
        /* 150+ lines */
    }
}
```

### Code Quality

- Key code needs explanatory comments
- Functions over 100 lines must be refactored
- Proper error handling for edge cases
- Clear and consistent naming
- No assumptions in code - complete implementation only

### TypeScript Specifics

- Strict type checking enabled
- Avoid `any` type - use `unknown` or proper types
- Prefer `interface` over `type` for object shapes
- Use discriminated unions for state management

## Project Structure

### Monorepo Setup (pnpm workspace)

```
zouwu-workflow/
├── packages/
│   ├── @systembug/zouwu-workflow/
│   └── ...
├── pnpm-workspace.yaml
└── package.json
```

### Key Rules

- Check package dependencies before modifications
- Shared utilities go in common packages
- NO circular dependencies
- Each package must have clear responsibility

## Testing Requirements

### Coverage

- Unit test coverage: minimum 80%
- Critical paths: 100% coverage required
- Integration tests for key workflows

### Test Structure

```typescript
describe('Feature', () => {
    it('should handle normal case', () => {
        // Arrange
        // Act
        // Assert
    });

    it('should handle edge case', () => {
        // Test edge cases
    });

    it('should handle errors', () => {
        // Test error scenarios
    });
});
```

## Git Commit Standards

### Conventional Commits

```
feat: add new feature
fix: bug fix
docs: documentation only
refactor: code refactoring
test: add/update tests
chore: build/tooling changes
perf: performance improvement
```

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Error Handling

### Auto-Pause Scenarios

1. AI fails 2 consecutive times
2. Unrecoverable errors encountered
3. High-risk operations detected:
    - Database schema changes
    - Production config modifications
    - Data deletion operations

### Recovery Process

1. Output detailed diagnostics
2. Wait for user confirmation
3. User can redirect or correct anytime

## Development Workflow

### Mode Flow

Research → Ideate → Plan → Validate → Execute → Review

### Smart Mode Trigger

- Use `!!!` to trigger single-pass complete flow
- AI auto-determines when to use smart mode
- Complex tasks use full mode flow

## Critical Rules

### NEVER

- Leave incomplete functionality
- Use unverified dependencies
- Skip error handling
- Create fake/placeholder implementations
- Use workarounds instead of fixes
- Modify unrelated code
- Break existing functionality

### ALWAYS

- Fix root cause, not symptoms
- Write complete, working code
- Test critical paths
- Document design decisions
- Follow project conventions
- Validate before executing

## Performance Standards

### Response Time

- Normal interactions: under 30 seconds
- Complex tasks: provide progress updates
- Timeout handling: degrade gracefully or split tasks

### Code Efficiency

- Optimize critical paths
- Avoid unnecessary iterations
- Use appropriate data structures
- Profile before optimizing

## Documentation Requirements

### Code Comments

- Complex logic must be explained
- Public APIs need JSDoc
- Non-obvious decisions need rationale

### Project Docs

- Architecture decisions in /docs
- API documentation for public interfaces
- Setup and deployment guides
- Changelog for releases

---

**Remember**: Direct, efficient, zero bullshit. Write minimal code to solve problems. No over-engineering. No fake information.
