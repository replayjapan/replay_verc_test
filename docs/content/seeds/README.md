# Content Seeds

Seed files organized by milestone. Each subfolder contains the JSON/CSV files
used to import content for that milestone.

## Structure

```
seeds/
├── m14-collections-migration/
│   └── (seed data from M14)
├── m22a-content-seeding/
│   ├── domain-content-template.json
│   ├── domain-content-remaining.json
│   └── domain-import.csv
├── m22b-blog-polish/
│   └── blog-content-seed.json
└── m25-design-overhaul/
    └── (future seed files)
```

## Rules

- Milestone number and name in folder name
- EngAI or Codex creates seed files, Developer reviews before import
- Seed files stay here permanently as a record of what was imported
