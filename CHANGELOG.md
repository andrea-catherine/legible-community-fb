# Changelog - Community Features Update

## New Features Added

### 1. Project Timeline View ✨
- **Location**: `/projects/[id]/timeline`
- **Features**:
  - Visual timeline showing all project milestones and deadlines
  - Color-coded status indicators (completed, in-progress, upcoming)
  - Public meeting integration with location and agenda details
  - "What Happens Next" section explaining the EIA process steps
  - Days countdown/ago indicators for each event
  - Timeline line visualization

### 2. Enhanced Project Detail Page
- **Added**:
  - "What's Next" preview card showing upcoming events
  - Direct link to timeline view
  - Upcoming events countdown
  - Better navigation between views (Timeline, Topics, Comments)

### 3. Timeline Events Data
- **Types**:
  - Milestones (project phases)
  - Deadlines (comment periods, submissions)
  - Meetings (public information meetings)
  - Submissions (EIA document submissions)
  - Decisions (permit decisions)
- **Status Tracking**: Completed, In Progress, Upcoming, Overdue

### 4. Public Meeting Management
- **Features**:
  - Meeting details (title, description, date, location)
  - Meeting format (in-person, virtual, hybrid)
  - Agenda items
  - Links to related comments
  - Integration with timeline

### 5. Second Project (Already Exists)
- **Project**: Hellisheiði Geothermal Expansion
- **Status**: Assessment phase
- **Comments**: 3 sample comments covering different environmental categories
- **Full timeline**: Comment period and milestones

## Data Enhancements

### Timeline Events for Project 1 (Wind Farm)
1. EIA Scoping Phase Complete (Completed)
2. Public Comment Period Opens (Completed)
3. Public Comment Period Closes (Upcoming)
4. Public Information Meeting (Upcoming) - Dec 20, 2024
5. Response to Comments Due (Upcoming)
6. Final EIA Submission (Upcoming)
7. Permit Decision Expected (Upcoming)

### Timeline Events for Project 2 (Geothermal)
1. Environmental Assessment Phase (In Progress)
2. Public Comment Period Opens (In Progress)
3. Public Comment Period Closes (Upcoming)

### Public Meetings
- **Project 1**: Public Information Meeting on Dec 20, 2024
  - Location: Mýrdalshreppur Community Center
  - Format: In-person
  - Includes full agenda

## User Experience Improvements

### Navigation
- Timeline link added to project detail page
- Better organization of project views
- Quick access to "What's Next" from project overview

### Visual Design
- Color-coded timeline events by status
- Clear visual hierarchy
- Icons for different event types
- Status badges throughout

### Information Architecture
- Clear separation between timeline events and meetings
- "What Happens Next" educational content
- Process transparency

## Files Created/Modified

### New Files
- `app/projects/[id]/timeline/page.tsx` - Timeline view page
- `COMMUNITY_FEATURES.md` - Feature suggestions document
- `CHANGELOG.md` - This file

### Modified Files
- `types/index.ts` - Added TimelineEvent and PublicMeeting types
- `lib/store.ts` - Added timeline events and public meetings data
- `app/projects/[id]/page.tsx` - Added timeline preview and links

## Future Community Features (See COMMUNITY_FEATURES.md)

Comprehensive list of 20+ community-centric features organized by priority, including:
- Public comment submission form
- Community FAQ/resources
- Email notifications
- Document library
- Multi-language support
- And many more...

## How to Use

1. **View Timeline**: Navigate to any project → Click "View Timeline" or "View Full Timeline"
2. **See What's Next**: Project detail page shows upcoming events preview
3. **Public Meetings**: Meetings are integrated into timeline with full details
4. **Track Progress**: Timeline shows where project is in the EIA process

## Technical Notes

- Timeline events and meetings stored in localStorage (prototype)
- Dates are properly serialized/deserialized
- Events sorted chronologically
- Public-only filter available for community-facing views
- All dates use JavaScript Date objects with proper handling

