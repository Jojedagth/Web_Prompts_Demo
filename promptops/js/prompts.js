const STORAGE_KEY = 'promptops_prompts';

const SEED_PROMPTS = [
  {
    id: Date.now().toString() + '0',
    title: "Full-Stack Web App Spec",
    type: "spec",
    author: "admin",
    stacks: ["HTML", "CSS", "JS", "Node"],
    description: "Generates a complete SPEC.md for any web project.",
    body: "You are a senior software architect. Generate a complete SPEC.md for the following web project.\n\n## Structure\n1. **Why This Project Exists** — Describe the problem it solves.\n2. **Tech Stack** — Choose appropriate technologies with reasoning.\n3. **Pages / Sections** — List every page/component needed.\n4. **Data Model** — Define entities, fields, and relationships.\n5. **File Structure** — Generate a complete folder layout.\n6. **Color Palette** — Define design tokens.\n7. **V1 Scope** — Checklist of what to build first.\n\nBe specific, opinionated, and production-ready. Include file names, component names, and API endpoints where relevant.",
    createdAt: "2026-05-20T00:00:00Z"
  },
  {
    id: Date.now().toString() + '1',
    title: "REST API Architecture",
    type: "architecture",
    author: "admin",
    stacks: ["Node", "Express", "SQL"],
    description: "Generates a full API architecture with endpoints and schemas.",
    body: "You are a senior backend architect. Design a complete REST API for the described application.\n\n## Endpoints\nFor each resource define:\n- HTTP method and path\n- Request body schema\n- Response schema (success + error)\n- Authentication requirements\n\n## Architecture Decisions\n- Auth strategy (JWT, sessions, API keys)\n- Error handling pattern\n- Middleware stack\n- Database connection and query approach\n\n## Folder Structure\n```\nproject/\n\u251c\u2500\u2500 src/\n\u2502   \u251c\u2500\u2500 routes/\n\u2502   \u251c\u2500\u2500 controllers/\n\u2502   \u251c\u2500\u2500 models/\n\u2502   \u251c\u2500\u2500 middleware/\n\u2502   \u251c\u2500\u2500 utils/\n\u2502   \u2514\u2500\u2500 config/\n\u251c\u2500\u2500 tests/\n\u2514\u2500\u2500 package.json\n```\n\nProvide example request/response for each endpoint.",
    createdAt: "2026-05-20T00:00:00Z"
  },
  {
    id: Date.now().toString() + '2',
    title: "Landing Page UI Blueprint",
    type: "ui",
    author: "admin",
    stacks: ["HTML", "CSS", "JS"],
    description: "Generates a complete UI spec for a landing page.",
    body: "You are a senior UI designer and frontend developer. Generate a complete UI specification for a landing page.\n\n## Sections\n1. **Hero** — Headline, subtext, CTA, background treatment\n2. **Features** — 3-column grid with icons and descriptions\n3. **Testimonials** — Card carousel or grid with quotes\n4. **CTA Section** — Final call-to-action with urgency\n\n## Design System\n- Color tokens (primary, secondary, accent, background, text)\n- Spacing system (4px base unit)\n- Typography scale (h1–h6, body, small)\n- Component breakdown (button, card, input, nav)\n\n## Responsive Breakpoints\n- Desktop: 1200px+\n- Tablet: 768px–1199px\n- Mobile: <768px\n\nProvide HTML structure for each section with class names.",
    createdAt: "2026-05-20T00:00:00Z"
  },
  {
    id: Date.now().toString() + '3',
    title: "AI Agent Workflow",
    type: "agent",
    author: "admin",
    stacks: ["Python", "OpenAI API"],
    description: "Designs a multi-step AI agent with tools and memory.",
    body: "You are an AI engineer. Design a multi-step AI agent for the following automation task.\n\n## Architecture\n1. **Tools** — List every tool/function the agent can call\n2. **Memory** — How the agent maintains context (conversation history, vector store, etc.)\n3. **Loop Logic** — The reasoning loop: think \u2192 act \u2192 observe \u2192 repeat\n4. **Fallback Handling** — What happens when a tool fails or the agent is uncertain\n\n## Implementation Outline\n```python\nclass Agent:\n    def __init__(self, tools, memory):\n        ...\n    \n    def run(self, task):\n        while not self.is_done:\n            thought = self.think(context)\n            action = self.act(thought)\n            result = self.execute(action)\n            self.observe(result)\n        return self.output\n```\n\nProvide specific prompt templates for the system message and each step.",
    createdAt: "2026-05-20T00:00:00Z"
  },
  {
    id: Date.now().toString() + '4',
    title: "Code Review System Prompt",
    type: "system",
    author: "admin",
    stacks: ["Any"],
    description: "Turns any AI model into a strict senior code reviewer.",
    body: "You are a senior software engineer conducting a thorough code review. Analyze the provided code for:\n\n## Checklist\n1. **Correctness** — Does the code work as intended? Edge cases?\n2. **Security** — SQL injection, XSS, CSRF, input validation, auth checks\n3. **Performance** — N+1 queries, unnecessary allocations, caching opportunities\n4. **Readability** — Naming, comments, complexity, consistency\n5. **Maintainability** — Duplication, testability, separation of concerns\n\n## Output Format\nFor each issue found:\n- **Severity**: critical / major / minor / suggestion\n- **Location**: file:line\n- **Problem**: What's wrong\n- **Fix**: Specific code suggestion\n\nEnd with a summary: overall grade (PASS / CONDITIONAL / FAIL), count of issues by severity, and top 3 recommended changes.",
    createdAt: "2026-05-20T00:00:00Z"
  },
  {
    id: Date.now().toString() + '5',
    title: "Database Schema Designer",
    type: "architecture",
    author: "admin",
    stacks: ["SQL", "PostgreSQL"],
    description: "Generates a normalized database schema for any application.",
    body: "You are a senior database architect. Design a normalized database schema for the described application.\n\n## Schema Design\nFor each table:\n- Table name (plural, snake_case)\n- Columns with types (VARCHAR, INTEGER, UUID, TIMESTAMP, TEXT, BOOLEAN, JSONB)\n- Constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK)\n- Indexes (B-tree, GIN, unique, composite)\n- Relationships (one-to-many, many-to-many with junction table)\n\n## Requirements\n- Third normal form (3NF) minimum\n- Include migration SQL\n- Include seed data SQL for testing\n- Add soft delete pattern (deleted_at TIMESTAMP)\n- Add created_at / updated_at timestamps\n\n## Example\n```sql\nCREATE TABLE users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) UNIQUE NOT NULL,\n  ...\n);\n```",
    createdAt: "2026-05-20T00:00:00Z"
  }
];

function getPrompts() {
  const prompts = storageGet(STORAGE_KEY);
  if (!prompts || prompts.length === 0) {
    storageSet(STORAGE_KEY, SEED_PROMPTS);
    return SEED_PROMPTS;
  }
  return prompts;
}

function addPrompt(prompt) {
  const prompts = getPrompts();
  prompts.push(prompt);
  storageSet(STORAGE_KEY, prompts);
  return prompts;
}
