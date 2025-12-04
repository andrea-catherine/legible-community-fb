# UML Data Structure Diagram

This document shows the data structure and relationships in the EIA Community Feedback Management system.

## Mermaid Class Diagram

```mermaid
classDiagram
    class Project {
        +string id
        +string name
        +string description
        +string category (A|B)
        +ProjectStatus status
        +string developer
        +string? consultant
        +Date commentPeriodStart
        +Date commentPeriodEnd
        +Date createdAt
        +Date updatedAt
        +number? commentCount
        +number? resolvedCommentCount
    }

    class Comment {
        +string id
        +string projectId
        +string content
        +CommentType commentType
        +EnvironmentalCategory environmentalCategory
        +string stakeholderId
        +string stakeholderName
        +StakeholderType stakeholderType
        +CommentStatus status
        +string? assignedTo
        +Priority priority
        +Date createdAt
        +Date updatedAt
        +string? response
        +Date? responseDate
        +ResponseAuthor? responseAuthor
        +boolean? isDuplicate
        +string? duplicateOf
        +string[]? relatedCommentIds
        +string[]? tags
        +Source source
        +string[]? mitigationStrategyIds
        +boolean? flaggedForPublicMeeting
        +Date? publicMeetingDate
    }

    class Stakeholder {
        +string id
        +string name
        +StakeholderType type
        +string? email
        +string? organization
        +boolean isMandatory
        +Date? submissionDeadline
        +boolean? hasSubmitted
        +Date? submissionDate
        +number? historicalCommentCount
    }

    class ResponseAuthor {
        +string name
        +string role
        +string? organization
        +string? email
    }

    class MitigationStrategy {
        +string id
        +string projectId
        +string title
        +string description
        +EnvironmentalCategory environmentalCategory
        +StrategyStatus status
        +string? effectiveness
        +string[]? relatedCommentIds
        +Date createdAt
        +Date updatedAt
    }

    class TimelineEvent {
        +string id
        +string projectId
        +string title
        +string description
        +EventType type
        +Date date
        +EventStatus status
        +boolean isPublic
        +string[]? relatedCommentIds
        +string? location
        +string[]? attendees
    }

    class PublicMeeting {
        +string id
        +string projectId
        +string title
        +string description
        +Date date
        +string location
        +MeetingFormat format
        +string? meetingUrl
        +string[]? agenda
        +string[]? relatedCommentIds
        +string[]? attendees
        +string? notes
    }

    class CommentGroup {
        +EnvironmentalCategory category
        +Comment[] comments
        +MitigationStrategy[] mitigationStrategies
    }

    class CommentPeriod {
        +string projectId
        +Date startDate
        +Date endDate
        +number durationWeeks
        +string[] mandatoryCommenters
        +Date[] remindersSent
    }

    class Metrics {
        +number totalComments
        +Record~CommentStatus, number~ commentsByStatus
        +Record~EnvironmentalCategory, number~ commentsByCategory
        +Record~CommentType, number~ commentsByType
        +number averageResponseTime
        +number responseCompleteness
        +number pendingMandatorySubmissions
    }

    %% Enumerations
    class CommentType {
        <<enumeration>>
        technical
        procedural
        substantive
        out-of-scope
    }

    class EnvironmentalCategory {
        <<enumeration>>
        birds
        water
        visual-impact
        archaeological
        vegetation
        noise
        traffic
        other
    }

    class StakeholderType {
        <<enumeration>>
        public
        mandatory-agency
        special-interest-group
        municipality
        developer
    }

    class CommentStatus {
        <<enumeration>>
        pending-review
        assigned
        draft-response
        final
        resolved
    }

    class ProjectStatus {
        <<enumeration>>
        scoping
        assessment
        public-comment
        review
        approved
        rejected
    }

    class Priority {
        <<enumeration>>
        low
        medium
        high
        critical
    }

    class Source {
        <<enumeration>>
        skipulagsgátt
        email
        manual
        postal
    }

    class StrategyStatus {
        <<enumeration>>
        proposed
        approved
        implemented
        monitoring
    }

    class EventType {
        <<enumeration>>
        milestone
        deadline
        meeting
        submission
        decision
        other
    }

    class EventStatus {
        <<enumeration>>
        upcoming
        in-progress
        completed
        overdue
    }

    class MeetingFormat {
        <<enumeration>>
        in-person
        virtual
        hybrid
    }

    %% Relationships
    Project "1" --> "*" Comment : has
    Project "1" --> "*" MitigationStrategy : has
    Project "1" --> "*" TimelineEvent : has
    Project "1" --> "*" PublicMeeting : has
    Project "1" --> "1" CommentPeriod : has
    Project "1" --> "1" Metrics : generates

    Comment "*" --> "1" Project : belongs to
    Comment "*" --> "1" Stakeholder : submitted by
    Comment "*" --> "0..1" ResponseAuthor : responded by
    Comment "*" --> "*" MitigationStrategy : linked to
    Comment "*" --> "*" Comment : related to

    MitigationStrategy "*" --> "1" Project : belongs to
    MitigationStrategy "*" --> "*" Comment : addresses

    TimelineEvent "*" --> "1" Project : belongs to
    TimelineEvent "*" --> "*" Comment : references

    PublicMeeting "*" --> "1" Project : belongs to
    PublicMeeting "*" --> "*" Comment : discusses

    Stakeholder "*" --> "*" Comment : submits
    Stakeholder "*" --> "0..1" CommentPeriod : mandatory for

    CommentGroup "1" --> "*" Comment : groups
    CommentGroup "1" --> "*" MitigationStrategy : groups

    %% Enumeration relationships
    Comment --> CommentType : uses
    Comment --> EnvironmentalCategory : categorized by
    Comment --> StakeholderType : from
    Comment --> CommentStatus : has status
    Comment --> Priority : has
    Comment --> Source : from
    Project --> ProjectStatus : has status
    MitigationStrategy --> EnvironmentalCategory : addresses
    MitigationStrategy --> StrategyStatus : has status
    TimelineEvent --> EventType : is type
    TimelineEvent --> EventStatus : has status
    PublicMeeting --> MeetingFormat : has format
    Stakeholder --> StakeholderType : is type
```

## Relationship Summary

### Core Entities

1. **Project** - Central entity
   - Has many Comments
   - Has many MitigationStrategies
   - Has many TimelineEvents
   - Has many PublicMeetings
   - Has one CommentPeriod
   - Generates one Metrics object

2. **Comment** - Feedback from stakeholders
   - Belongs to one Project
   - Submitted by one Stakeholder
   - Can have one ResponseAuthor
   - Can link to many MitigationStrategies
   - Can relate to other Comments (duplicates/related)

3. **Stakeholder** - Person/organization providing feedback
   - Can submit many Comments
   - Can be mandatory for CommentPeriods

4. **MitigationStrategy** - Actions to address concerns
   - Belongs to one Project
   - Addresses many Comments
   - Grouped by EnvironmentalCategory

5. **TimelineEvent** - Project milestones and deadlines
   - Belongs to one Project
   - Can reference many Comments

6. **PublicMeeting** - Community meetings
   - Belongs to one Project
   - Can discuss many Comments

### Derived/Computed Entities

- **CommentGroup** - Groups comments and strategies by EnvironmentalCategory
- **Metrics** - Calculated statistics for a Project
- **CommentPeriod** - Period definition for comment collection

## Data Flow

```
Project
  ├── Comment (created by Stakeholder)
  │   ├── ResponseAuthor (responds to comment)
  │   └── MitigationStrategy (addresses comment)
  │
  ├── MitigationStrategy
  │   └── Related Comments
  │
  ├── TimelineEvent
  │   └── Related Comments (optional)
  │
  ├── PublicMeeting
  │   └── Related Comments (discussed)
  │
  └── Metrics (computed from Comments)
```

## Storage Structure (LocalStorage)

The prototype stores data in browser localStorage:

- `eia-projects` - Array of Project objects
- `eia-comments` - Array of Comment objects
- `eia-stakeholders` - Array of Stakeholder objects
- `eia-mitigation-strategies` - Array of MitigationStrategy objects
- `eia-timeline-events` - Array of TimelineEvent objects
- `eia-public-meetings` - Array of PublicMeeting objects

## Key Relationships

### One-to-Many
- Project → Comments (1:N)
- Project → MitigationStrategies (1:N)
- Project → TimelineEvents (1:N)
- Project → PublicMeetings (1:N)
- Stakeholder → Comments (1:N)

### Many-to-Many (via arrays)
- Comments ↔ MitigationStrategies (via mitigationStrategyIds)
- Comments ↔ Comments (via relatedCommentIds, duplicates)
- TimelineEvents ↔ Comments (via relatedCommentIds)
- PublicMeetings ↔ Comments (via relatedCommentIds)

### Composition
- Comment contains ResponseAuthor (optional)
- CommentGroup contains Comments and MitigationStrategies
- Metrics derived from Project's Comments

