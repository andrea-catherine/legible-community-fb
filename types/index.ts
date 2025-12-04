// Core data types for Community Feedback Management

export type CommentType = 
  | 'technical' 
  | 'procedural' 
  | 'substantive' 
  | 'out-of-scope';

export type EnvironmentalCategory = 
  | 'birds'
  | 'water'
  | 'visual-impact'
  | 'archaeological'
  | 'vegetation'
  | 'noise'
  | 'traffic'
  | 'other';

export type StakeholderType = 
  | 'public'
  | 'mandatory-agency'
  | 'special-interest-group'
  | 'municipality'
  | 'developer';

export type CommentStatus = 
  | 'pending-review'
  | 'assigned'
  | 'draft-response'
  | 'final'
  | 'resolved';

export type ProjectStatus = 
  | 'scoping'
  | 'assessment'
  | 'public-comment'
  | 'review'
  | 'approved'
  | 'rejected';

export interface Stakeholder {
  id: string;
  name: string;
  type: StakeholderType;
  email?: string;
  organization?: string;
  isMandatory: boolean;
  submissionDeadline?: Date;
  hasSubmitted?: boolean;
  submissionDate?: Date;
  historicalCommentCount?: number;
}

export interface ResponseAuthor {
  name: string;
  role: string;
  organization?: string;
  email?: string;
}

export interface Comment {
  id: string;
  projectId: string;
  content: string;
  commentType: CommentType;
  environmentalCategory: EnvironmentalCategory;
  stakeholderId: string;
  stakeholderName: string;
  stakeholderType: StakeholderType;
  status: CommentStatus;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  updatedAt: Date;
  response?: string;
  responseDate?: Date;
  responseAuthor?: ResponseAuthor;
  isDuplicate?: boolean;
  duplicateOf?: string;
  relatedCommentIds?: string[];
  tags?: string[];
  source: 'skipulagsgátt' | 'email' | 'manual' | 'postal';
  mitigationStrategyIds?: string[]; // Links to mitigation strategies
  flaggedForPublicMeeting?: boolean; // Flag to bring to public meeting
  publicMeetingDate?: Date; // Date of public meeting if scheduled
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: 'A' | 'B';
  status: ProjectStatus;
  developer: string;
  consultant?: string;
  commentPeriodStart: Date;
  commentPeriodEnd: Date;
  createdAt: Date;
  updatedAt: Date;
  commentCount?: number;
  resolvedCommentCount?: number;
}

export interface CommentPeriod {
  projectId: string;
  startDate: Date;
  endDate: Date;
  durationWeeks: number;
  mandatoryCommenters: string[];
  remindersSent: Date[];
}

export interface Metrics {
  totalComments: number;
  commentsByStatus: Record<CommentStatus, number>;
  commentsByCategory: Record<EnvironmentalCategory, number>;
  commentsByType: Record<CommentType, number>;
  averageResponseTime: number; // in hours
  responseCompleteness: number; // percentage
  pendingMandatorySubmissions: number;
}

export interface MitigationStrategy {
  id: string;
  projectId: string;
  title: string;
  description: string;
  environmentalCategory: EnvironmentalCategory;
  status: 'proposed' | 'approved' | 'implemented' | 'monitoring';
  effectiveness?: string;
  relatedCommentIds?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentGroup {
  category: EnvironmentalCategory;
  comments: Comment[];
  mitigationStrategies: MitigationStrategy[];
}

export interface TimelineEvent {
  id: string;
  projectId: string;
  title: string;
  description: string;
  type: 'milestone' | 'deadline' | 'meeting' | 'submission' | 'decision' | 'other';
  date: Date;
  status: 'upcoming' | 'in-progress' | 'completed' | 'overdue';
  isPublic: boolean; // Whether to show in public timeline
  relatedCommentIds?: string[];
  location?: string;
  attendees?: string[];
}

export interface PublicMeeting {
  id: string;
  projectId: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  format: 'in-person' | 'virtual' | 'hybrid';
  meetingUrl?: string;
  agenda?: string[];
  relatedCommentIds?: string[];
  attendees?: string[];
  notes?: string;
}



