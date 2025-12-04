# Data Structure Documentation

This document explains the data structure of the EIA Community Feedback Management system.

## UML Diagrams Available

1. **UML_DATA_STRUCTURE.md** - Mermaid diagram (renders in GitHub, many markdown viewers)
2. **UML_DATA_STRUCTURE.puml** - PlantUML diagram (use with PlantUML tools)

## Quick Reference

### Core Entity Relationships

```
Project (1) ──< (N) Comment
Project (1) ──< (N) MitigationStrategy
Project (1) ──< (N) TimelineEvent
Project (1) ──< (N) PublicMeeting
Project (1) ──< (1) CommentPeriod
Project (1) ──< (1) Metrics (computed)

Stakeholder (1) ──< (N) Comment
Comment (N) ──> (0..1) ResponseAuthor
Comment (N) ──> (N) MitigationStrategy (via IDs)
Comment (N) ──> (N) Comment (related/duplicates)
```

## Entity Descriptions

### Project
The central entity representing an EIA project. Contains basic project information, status, and comment period dates.

### Comment
Represents feedback from stakeholders about a project. Can be categorized by type, environmental category, and status. Can link to mitigation strategies and other comments.

### Stakeholder
Represents a person or organization that can submit comments. Can be mandatory (required to comment) or optional.

### MitigationStrategy
Actions or plans to address environmental concerns raised in comments. Linked to specific comments and categorized by environmental area.

### TimelineEvent
Milestones, deadlines, and important dates in the project timeline. Can reference related comments.

### PublicMeeting
Public information meetings related to the project. Can include agenda items and link to discussed comments.

### Metrics
Computed statistics about comments and project progress. Generated dynamically from comments and stakeholders.

### CommentGroup
A grouping of comments and mitigation strategies by environmental category. Used for topic-based organization.

## Data Storage

Currently uses browser localStorage with the following keys:
- `eia-projects`
- `eia-comments`
- `eia-stakeholders`
- `eia-mitigation-strategies`
- `eia-timeline-events`
- `eia-public-meetings`

## Key Design Patterns

1. **Referential Integrity via IDs**: Comments reference stakeholders, projects, and mitigation strategies by ID
2. **Soft Relationships**: Many-to-many relationships handled via ID arrays (e.g., `mitigationStrategyIds`)
3. **Computed Entities**: Metrics and CommentGroups are derived/computed, not stored
4. **Optional Fields**: Many fields are optional (marked with `?`) to support flexible data entry

## Future Database Schema

When migrating to a real database, consider:

- **Primary Keys**: All entities have `id` field suitable for UUID
- **Foreign Keys**: `projectId`, `stakeholderId` should be foreign keys
- **Indexes**: On `projectId`, `stakeholderId`, `environmentalCategory`, `status`
- **Constraints**: Unique constraints on IDs, check constraints on enums
- **Relationships**: Many-to-many tables for Comment-MitigationStrategy links

