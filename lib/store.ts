// In-memory store for prototype (can be replaced with API/database later)
import type { Comment, Project, Stakeholder, Metrics, MitigationStrategy, CommentGroup, EnvironmentalCategory, TimelineEvent, PublicMeeting } from '@/types';

let projects: Project[] = [];
let comments: Comment[] = [];
let stakeholders: Stakeholder[] = [];
let mitigationStrategies: MitigationStrategy[] = [];
let timelineEvents: TimelineEvent[] = [];
let publicMeetings: PublicMeeting[] = [];

// Initialize with sample data
export function initializeStore() {
  // Project 1 - Wind Farm (with mitigation strategies)
  const project1: Project = {
    id: 'proj-1',
    name: 'Búrfellslundur/Vaðölduver Wind Farm',
    description: '28-30 turbines, 120 MW wind energy project in Iceland',
    category: 'A',
    status: 'public-comment',
    developer: 'Landsvirkjun',
    consultant: 'COWI',
    commentPeriodStart: new Date('2024-11-01'),
    commentPeriodEnd: new Date('2024-12-13'),
    createdAt: new Date('2024-10-15'),
    updatedAt: new Date(),
  };

  // Project 2 - Second Wind Farm
  const project2: Project = {
    id: 'proj-2',
    name: 'Hafið Wind Farm Project',
    description: '15-18 turbines, 75 MW offshore wind energy project in North Iceland',
    category: 'A',
    status: 'scoping',
    developer: 'Orkubú Vestfjarða',
    consultant: 'EPLA',
    commentPeriodStart: new Date('2024-12-15'),
    commentPeriodEnd: new Date('2025-01-31'),
    createdAt: new Date('2024-11-20'),
    updatedAt: new Date(),
  };

  // Extended stakeholders
  const sampleStakeholders: Stakeholder[] = [
    {
      id: 'stake-1',
      name: 'Skipulagsstofnun',
      type: 'mandatory-agency',
      email: 'contact@skipulagsstofnun.is',
      organization: 'National Planning Agency',
      isMandatory: true,
      submissionDeadline: new Date('2024-12-13'),
      hasSubmitted: false,
    },
    {
      id: 'stake-2',
      name: 'Umhverfisstofnun',
      type: 'mandatory-agency',
      email: 'contact@umhverfisstofnun.is',
      organization: 'Environment Agency',
      isMandatory: true,
      submissionDeadline: new Date('2024-12-13'),
      hasSubmitted: true,
      submissionDate: new Date('2024-11-20'),
    },
    {
      id: 'stake-3',
      name: 'Icelandic Ornithological Society',
      type: 'special-interest-group',
      organization: 'Fuglafræðifélag Íslands',
      isMandatory: false,
    },
    {
      id: 'stake-4',
      name: 'Local Resident',
      type: 'public',
      email: 'resident@example.com',
      isMandatory: false,
    },
    {
      id: 'stake-5',
      name: 'Mýrdalshreppur Municipality',
      type: 'municipality',
      email: 'contact@myrdalshreppur.is',
      organization: 'Mýrdalshreppur',
      isMandatory: false,
    },
    {
      id: 'stake-6',
      name: 'Icelandic Water Authority',
      type: 'mandatory-agency',
      email: 'contact@vatten.is',
      organization: 'Vatnsstofnun',
      isMandatory: true,
      submissionDeadline: new Date('2025-01-15'),
      hasSubmitted: false,
    },
  ];

  // Mitigation strategies for Project 1 (demonstrating mapping to comments)
  const strategies: MitigationStrategy[] = [
    {
      id: 'mit-1',
      projectId: 'proj-1',
      title: 'Bird Migration Monitoring Program',
      description: 'Comprehensive monitoring program using radar and field observations during peak migration seasons (March-April, September-October). Turbine curtailment protocols when bird density exceeds threshold levels.',
      environmentalCategory: 'birds',
      status: 'approved',
      effectiveness: 'Expected to reduce bird collisions by 60-70% during peak migration periods',
      relatedCommentIds: ['comment-1', 'comment-5'],
      createdAt: new Date('2024-11-10'),
      updatedAt: new Date('2024-11-15'),
    },
    {
      id: 'mit-2',
      projectId: 'proj-1',
      title: 'Noise Level Controls During Construction',
      description: 'Strict decibel limits: 45 dB(A) at nearest residential area during daytime (07:00-22:00), 40 dB(A) during nighttime. Use of noise barriers and scheduling high-noise activities during daytime hours only.',
      environmentalCategory: 'noise',
      status: 'approved',
      effectiveness: 'Meets all regulatory requirements and minimizes disturbance to residents',
      relatedCommentIds: ['comment-3'],
      createdAt: new Date('2024-11-20'),
      updatedAt: new Date('2024-11-22'),
    },
    {
      id: 'mit-3',
      projectId: 'proj-1',
      title: 'Enhanced Visual Impact Assessment',
      description: 'Additional viewpoints from Route 1 at 2km, 5km, and 10km intervals. 3D visualization models showing seasonal variations and different weather conditions.',
      environmentalCategory: 'visual-impact',
      status: 'proposed',
      effectiveness: 'Provides comprehensive visual representation for public review',
      relatedCommentIds: ['comment-2'],
      createdAt: new Date('2024-11-12'),
      updatedAt: new Date('2024-11-12'),
    },
    {
      id: 'mit-4',
      projectId: 'proj-1',
      title: 'Habitat Restoration Plan',
      description: 'Restoration of 50 hectares of degraded land adjacent to project area. Native vegetation planting and wetland restoration to compensate for construction impacts.',
      environmentalCategory: 'vegetation',
      status: 'proposed',
      effectiveness: 'Net positive impact on local biodiversity',
      relatedCommentIds: [],
      createdAt: new Date('2024-11-18'),
      updatedAt: new Date('2024-11-18'),
    },
    // Mitigation strategies for Project 2 (Hafið Wind Farm)
    {
      id: 'mit-5',
      projectId: 'proj-2',
      title: 'Marine Mammal Monitoring Program',
      description: 'Comprehensive monitoring program using underwater acoustic systems and visual observations to detect and protect marine mammals during construction and operation. Shutdown protocols when whales or seals are detected within 500m of construction vessels.',
      environmentalCategory: 'other',
      status: 'proposed',
      effectiveness: 'Expected to minimize disturbance to marine mammals and comply with all regulatory requirements',
      relatedCommentIds: ['comment-10'],
      createdAt: new Date('2024-12-20'),
      updatedAt: new Date('2024-12-20'),
    },
    {
      id: 'mit-6',
      projectId: 'proj-2',
      title: 'Seabird Protection Measures',
      description: 'Pre-construction seabird surveys to identify critical nesting and feeding areas. Turbine placement to avoid key seabird colonies. Radar monitoring system to detect bird movements and potential shutdown during high-risk periods.',
      environmentalCategory: 'birds',
      status: 'proposed',
      effectiveness: 'Significant reduction in potential seabird collisions and habitat disruption',
      relatedCommentIds: ['comment-11'],
      createdAt: new Date('2024-12-22'),
      updatedAt: new Date('2024-12-22'),
    },
    {
      id: 'mit-7',
      projectId: 'proj-2',
      title: 'Navigation and Fishing Safety Protocols',
      description: 'Clear marking and lighting of turbine locations. Coordination with maritime authorities for safe navigation corridors. Communication protocols with local fishing fleets. Real-time navigation warnings system.',
      environmentalCategory: 'other',
      status: 'proposed',
      effectiveness: 'Ensures safe navigation for shipping and fishing activities while maintaining access',
      relatedCommentIds: ['comment-9'],
      createdAt: new Date('2024-12-18'),
      updatedAt: new Date('2024-12-18'),
    },
  ];

  // Extended comments for Project 1 (organized by topics)
  const project1Comments: Comment[] = [
    // Ecology/Birds
    {
      id: 'comment-1',
      projectId: 'proj-1',
      content: 'I am concerned about the impact on migratory bird routes, particularly the pink-footed goose population. The EIA should include more detailed migration data from the last 5 years.',
      commentType: 'substantive',
      environmentalCategory: 'birds',
      stakeholderId: 'stake-3',
      stakeholderName: 'Icelandic Ornithological Society',
      stakeholderType: 'special-interest-group',
      status: 'final',
      priority: 'high',
      createdAt: new Date('2024-11-05'),
      updatedAt: new Date('2024-11-15'),
      source: 'skipulagsgátt',
      tags: ['migration', 'pink-footed-goose'],
      mitigationStrategyIds: ['mit-1'],
      response: 'We have developed a comprehensive bird migration monitoring program with turbine curtailment protocols. Additional migration data from 2019-2024 has been added to the EIA.',
      responseDate: new Date('2024-11-15'),
      responseAuthor: {
        name: 'Dr. Anna Jónsdóttir',
        role: 'Senior Environmental Consultant',
        organization: 'COWI',
        email: 'anna.jonsdottir@cowi.com',
      },
      flaggedForPublicMeeting: true,
    },
    {
      id: 'comment-5',
      projectId: 'proj-1',
      content: 'The proposed turbine locations are within 500m of known golden eagle nesting sites. What measures will be taken to protect these protected species?',
      commentType: 'substantive',
      environmentalCategory: 'birds',
      stakeholderId: 'stake-2',
      stakeholderName: 'Umhverfisstofnun',
      stakeholderType: 'mandatory-agency',
      status: 'final',
      priority: 'critical',
      createdAt: new Date('2024-11-07'),
      updatedAt: new Date('2024-11-16'),
      source: 'skipulagsgátt',
      tags: ['golden-eagle', 'protected-species'],
      mitigationStrategyIds: ['mit-1'],
      response: 'The monitoring program includes specific protocols for golden eagles. A 1km buffer zone will be maintained around known nesting sites, and turbines will be shut down if eagles are detected within 500m during breeding season.',
      responseDate: new Date('2024-11-16'),
      responseAuthor: {
        name: 'Dr. Anna Jónsdóttir',
        role: 'Senior Environmental Consultant',
        organization: 'COWI',
        email: 'anna.jonsdottir@cowi.com',
      },
      flaggedForPublicMeeting: true,
      publicMeetingDate: new Date('2024-12-20'),
    },
    
    // Visual Impact
    {
      id: 'comment-2',
      projectId: 'proj-1',
      content: 'The visual impact assessment does not adequately represent the views from Route 1. Please include additional viewpoints from the highway.',
      commentType: 'technical',
      environmentalCategory: 'visual-impact',
      stakeholderId: 'stake-4',
      stakeholderName: 'Local Resident',
      stakeholderType: 'public',
      status: 'final',
      priority: 'medium',
      createdAt: new Date('2024-11-08'),
      updatedAt: new Date('2024-11-12'),
      source: 'email',
      tags: ['route-1', 'visual-assessment'],
      mitigationStrategyIds: ['mit-3'],
      response: 'We will provide additional viewpoints from Route 1 at multiple intervals, along with enhanced 3D visualizations showing seasonal variations.',
      responseDate: new Date('2024-11-12'),
      responseAuthor: {
        name: 'Jón Pétursson',
        role: 'Project Manager',
        organization: 'Landsvirkjun',
        email: 'jon.petursson@landsvirkjun.is',
      },
    },
    
    // Sound/Noise
    {
      id: 'comment-3',
      projectId: 'proj-1',
      content: 'Please clarify the noise mitigation measures during construction phase. The current documentation is unclear about decibel limits at residential areas.',
      commentType: 'substantive',
      environmentalCategory: 'noise',
      stakeholderId: 'stake-2',
      stakeholderName: 'Umhverfisstofnun',
      stakeholderType: 'mandatory-agency',
      status: 'final',
      priority: 'high',
      createdAt: new Date('2024-11-15'),
      updatedAt: new Date('2024-11-22'),
      assignedTo: 'John Smith',
      source: 'skipulagsgátt',
      response: 'Detailed noise mitigation measures have been added: 45 dB(A) daytime limit and 40 dB(A) nighttime limit at nearest residence. Noise barriers and scheduling protocols are in place.',
      responseDate: new Date('2024-11-22'),
      responseAuthor: {
        name: 'Jón Pétursson',
        role: 'Project Manager',
        organization: 'Landsvirkjun',
        email: 'jon.petursson@landsvirkjun.is',
      },
      tags: ['construction', 'noise-limits'],
      mitigationStrategyIds: ['mit-2'],
    },
    {
      id: 'comment-6',
      projectId: 'proj-1',
      content: 'What will be the operational noise levels from the turbines? Will I hear them at my home 3km away?',
      commentType: 'substantive',
      environmentalCategory: 'noise',
      stakeholderId: 'stake-4',
      stakeholderName: 'Local Resident',
      stakeholderType: 'public',
      status: 'draft-response',
      priority: 'medium',
      createdAt: new Date('2024-11-20'),
      updatedAt: new Date('2024-11-25'),
      source: 'email',
      tags: ['operational-noise', 'residential'],
      response: 'Operational noise levels at 3km distance will be below 35 dB(A), which is generally not noticeable over background ambient noise levels. A detailed noise impact study is included in the updated EIA.',
      flaggedForPublicMeeting: true,
    },
    
    // Water/Ecology
    {
      id: 'comment-7',
      projectId: 'proj-1',
      content: 'Concern about potential impact on groundwater levels from foundation construction. The area has sensitive wetland ecosystems.',
      commentType: 'substantive',
      environmentalCategory: 'water',
      stakeholderId: 'stake-2',
      stakeholderName: 'Umhverfisstofnun',
      stakeholderType: 'mandatory-agency',
      status: 'assigned',
      priority: 'high',
      createdAt: new Date('2024-11-18'),
      updatedAt: new Date('2024-11-18'),
      source: 'skipulagsgátt',
      tags: ['groundwater', 'wetlands'],
    },
    
    // Vegetation
    {
      id: 'comment-8',
      projectId: 'proj-1',
      content: 'The project will clear significant vegetation. What compensation measures are planned?',
      commentType: 'substantive',
      environmentalCategory: 'vegetation',
      stakeholderId: 'stake-5',
      stakeholderName: 'Mýrdalshreppur Municipality',
      stakeholderType: 'municipality',
      status: 'final',
      priority: 'medium',
      createdAt: new Date('2024-11-10'),
      updatedAt: new Date('2024-11-18'),
      source: 'skipulagsgátt',
      tags: ['compensation', 'biodiversity'],
      mitigationStrategyIds: ['mit-4'],
      response: 'A comprehensive habitat restoration plan is included, with restoration of 50 hectares including native vegetation planting and wetland restoration.',
      responseDate: new Date('2024-11-18'),
      responseAuthor: {
        name: 'Dr. Anna Jónsdóttir',
        role: 'Senior Environmental Consultant',
        organization: 'COWI',
        email: 'anna.jonsdottir@cowi.com',
      },
    },
    
    // Other
    {
      id: 'comment-4',
      projectId: 'proj-1',
      content: 'Will this project affect my property value?',
      commentType: 'out-of-scope',
      environmentalCategory: 'other',
      stakeholderId: 'stake-4',
      stakeholderName: 'Local Resident',
      stakeholderType: 'public',
      status: 'final',
      priority: 'low',
      createdAt: new Date('2024-11-10'),
      updatedAt: new Date('2024-11-12'),
      source: 'manual',
      response: 'Property value impacts are outside the scope of the EIA process. Please consult with local real estate professionals.',
      responseDate: new Date('2024-11-12'),
      responseAuthor: {
        name: 'Jón Pétursson',
        role: 'Project Manager',
        organization: 'Landsvirkjun',
        email: 'jon.petursson@landsvirkjun.is',
      },
    },
  ];

  // Comments for Project 2 (Hafið Wind Farm)
  const project2Comments: Comment[] = [
    {
      id: 'comment-9',
      projectId: 'proj-2',
      content: 'Offshore wind turbines may interfere with shipping lanes and fishing activities in the area. What measures are being taken to ensure safe navigation?',
      commentType: 'substantive',
      environmentalCategory: 'other',
      stakeholderId: 'stake-5',
      stakeholderName: 'Mýrdalshreppur Municipality',
      stakeholderType: 'municipality',
      status: 'pending-review',
      priority: 'high',
      createdAt: new Date('2024-12-18'),
      updatedAt: new Date('2024-12-18'),
      source: 'skipulagsgátt',
      tags: ['shipping', 'navigation', 'fishing'],
    },
    {
      id: 'comment-10',
      projectId: 'proj-2',
      content: 'Marine mammal impact assessment is crucial for this offshore project. Please include detailed studies on potential effects on seals and whales in the area.',
      commentType: 'technical',
      environmentalCategory: 'other',
      stakeholderId: 'stake-2',
      stakeholderName: 'Umhverfisstofnun',
      stakeholderType: 'mandatory-agency',
      status: 'assigned',
      priority: 'high',
      createdAt: new Date('2024-12-20'),
      updatedAt: new Date('2024-12-20'),
      source: 'skipulagsgátt',
      tags: ['marine-mammals', 'seals', 'whales'],
    },
    {
      id: 'comment-11',
      projectId: 'proj-2',
      content: 'Will the construction and operation of offshore turbines affect local seabird colonies? The area is known for important nesting sites.',
      commentType: 'substantive',
      environmentalCategory: 'birds',
      stakeholderId: 'stake-3',
      stakeholderName: 'Icelandic Ornithological Society',
      stakeholderType: 'special-interest-group',
      status: 'pending-review',
      priority: 'high',
      createdAt: new Date('2024-12-22'),
      updatedAt: new Date('2024-12-22'),
      source: 'email',
      tags: ['seabirds', 'nesting-sites'],
    },
  ];

  // Timeline events for Project 1
  const project1Timeline: TimelineEvent[] = [
    {
      id: 'timeline-1',
      projectId: 'proj-1',
      title: 'EIA Scoping Phase Complete',
      description: 'Initial scoping phase completed, baseline environmental studies initiated',
      type: 'milestone',
      date: new Date('2024-10-15'),
      status: 'completed',
      isPublic: true,
    },
    {
      id: 'timeline-2',
      projectId: 'proj-1',
      title: 'Public Comment Period Opens',
      description: '6-week public comment period begins. All stakeholders can submit feedback through Skipulagsgátt or directly',
      type: 'deadline',
      date: new Date('2024-11-01'),
      status: 'completed',
      isPublic: true,
    },
    {
      id: 'timeline-3',
      projectId: 'proj-1',
      title: 'Public Comment Period Closes',
      description: 'Last day to submit comments. All submissions must be received by end of day',
      type: 'deadline',
      date: new Date('2024-12-13'),
      status: 'upcoming',
      isPublic: true,
    },
    {
      id: 'timeline-4',
      projectId: 'proj-1',
      title: 'Public Information Meeting',
      description: 'Public meeting to discuss project details, address community concerns, and present mitigation strategies',
      type: 'meeting',
      date: new Date('2024-12-20'),
      status: 'upcoming',
      isPublic: true,
      location: 'Mýrdalshreppur Community Center',
      relatedCommentIds: ['comment-1', 'comment-5'],
    },
    {
      id: 'timeline-5',
      projectId: 'proj-1',
      title: 'Response to Comments Due',
      description: 'All substantive comments must have responses prepared and included in updated EIA document',
      type: 'deadline',
      date: new Date('2025-01-15'),
      status: 'upcoming',
      isPublic: true,
    },
    {
      id: 'timeline-6',
      projectId: 'proj-1',
      title: 'Final EIA Submission',
      description: 'Complete EIA document with all responses submitted to Skipulagsstofnun for review',
      type: 'submission',
      date: new Date('2025-02-01'),
      status: 'upcoming',
      isPublic: true,
    },
    {
      id: 'timeline-7',
      projectId: 'proj-1',
      title: 'Permit Decision Expected',
      description: 'Skipulagsstofnun review period complete. Decision on permit approval expected',
      type: 'decision',
      date: new Date('2025-04-15'),
      status: 'upcoming',
      isPublic: true,
    },
  ];

  // Timeline events for Project 2 (Hafið Wind Farm)
  const project2Timeline: TimelineEvent[] = [
    {
      id: 'timeline-8',
      projectId: 'proj-2',
      title: 'Project Scoping Phase',
      description: 'Initial scoping and baseline environmental studies for offshore wind farm project',
      type: 'milestone',
      date: new Date('2024-11-20'),
      status: 'in-progress',
      isPublic: true,
    },
    {
      id: 'timeline-9',
      projectId: 'proj-2',
      title: 'Public Comment Period Opens',
      description: '6-week public comment period begins for Hafið Wind Farm. Community feedback welcomed on all aspects of the project.',
      type: 'deadline',
      date: new Date('2024-12-15'),
      status: 'upcoming',
      isPublic: true,
    },
    {
      id: 'timeline-10',
      projectId: 'proj-2',
      title: 'Public Comment Period Closes',
      description: 'Last day to submit comments on the project. All submissions must be received by end of day.',
      type: 'deadline',
      date: new Date('2025-01-31'),
      status: 'upcoming',
      isPublic: true,
    },
    {
      id: 'timeline-11',
      projectId: 'proj-2',
      title: 'Public Scoping Meeting',
      description: 'Public meeting to discuss project scope, environmental concerns, and gather initial community feedback',
      type: 'meeting',
      date: new Date('2025-01-10'),
      status: 'upcoming',
      isPublic: true,
      location: 'Ísafjörður Community Center',
    },
    {
      id: 'timeline-12',
      projectId: 'proj-2',
      title: 'Environmental Assessment Begins',
      description: 'Detailed environmental impact assessment phase begins after scoping comments are reviewed',
      type: 'milestone',
      date: new Date('2025-02-15'),
      status: 'upcoming',
      isPublic: true,
    },
  ];

  // Public meetings
  const meetings: PublicMeeting[] = [
    {
      id: 'meeting-1',
      projectId: 'proj-1',
      title: 'Public Information Meeting - Búrfellslundur Wind Farm',
      description: 'Join us for a public information meeting about the proposed wind farm project. We will discuss the environmental assessment, address community concerns, and present mitigation strategies.',
      date: new Date('2024-12-20'),
      location: 'Mýrdalshreppur Community Center, Hvolsvöllur',
      format: 'in-person',
      agenda: [
        'Project overview and timeline',
        'Environmental impact assessment summary',
        'Community concerns and responses',
        'Mitigation strategies',
        'Q&A session',
      ],
      relatedCommentIds: ['comment-1', 'comment-5'],
    },
  ];

  projects = [project1, project2];
  stakeholders = sampleStakeholders;
  comments = [...project1Comments, ...project2Comments];
  mitigationStrategies = strategies;
  timelineEvents = [...project1Timeline, ...project2Timeline];
  publicMeetings = meetings;
}

// Load from localStorage on client side
export function loadFromStorage() {
  if (typeof window === 'undefined') return;
  
  try {
    const storedProjects = localStorage.getItem('eia-projects');
    const storedComments = localStorage.getItem('eia-comments');
    const storedStakeholders = localStorage.getItem('eia-stakeholders');
    const storedStrategies = localStorage.getItem('eia-mitigation-strategies');
    const storedTimeline = localStorage.getItem('eia-timeline-events');
    const storedMeetings = localStorage.getItem('eia-public-meetings');
    
    if (storedProjects) projects = JSON.parse(storedProjects).map((p: any) => ({
      ...p,
      commentPeriodStart: new Date(p.commentPeriodStart),
      commentPeriodEnd: new Date(p.commentPeriodEnd),
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.updatedAt),
    }));
    
    if (storedComments) comments = JSON.parse(storedComments).map((c: any) => ({
      ...c,
      createdAt: new Date(c.createdAt),
      updatedAt: new Date(c.updatedAt),
      responseDate: c.responseDate ? new Date(c.responseDate) : undefined,
      publicMeetingDate: c.publicMeetingDate ? new Date(c.publicMeetingDate) : undefined,
    }));
    
    if (storedStakeholders) stakeholders = JSON.parse(storedStakeholders).map((s: any) => ({
      ...s,
      submissionDeadline: s.submissionDeadline ? new Date(s.submissionDeadline) : undefined,
      submissionDate: s.submissionDate ? new Date(s.submissionDate) : undefined,
    }));
    
    if (storedStrategies) mitigationStrategies = JSON.parse(storedStrategies).map((s: any) => ({
      ...s,
      createdAt: new Date(s.createdAt),
      updatedAt: new Date(s.updatedAt),
    }));
    
    if (storedTimeline) timelineEvents = JSON.parse(storedTimeline).map((e: any) => ({
      ...e,
      date: new Date(e.date),
    }));
    
    if (storedMeetings) publicMeetings = JSON.parse(storedMeetings).map((m: any) => ({
      ...m,
      date: new Date(m.date),
    }));
  } catch (e) {
    console.error('Failed to load from storage:', e);
  }
}

// Save to localStorage
export function saveToStorage() {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('eia-projects', JSON.stringify(projects));
    localStorage.setItem('eia-comments', JSON.stringify(comments));
    localStorage.setItem('eia-stakeholders', JSON.stringify(stakeholders));
    localStorage.setItem('eia-mitigation-strategies', JSON.stringify(mitigationStrategies));
    localStorage.setItem('eia-timeline-events', JSON.stringify(timelineEvents));
    localStorage.setItem('eia-public-meetings', JSON.stringify(publicMeetings));
  } catch (e) {
    console.error('Failed to save to storage:', e);
  }
}

export function getProjects(): Project[] {
  if (typeof window !== 'undefined' && projects.length === 0) {
    loadFromStorage();
    if (projects.length === 0) {
      initializeStore();
      saveToStorage();
    }
  }
  return projects;
}

export function getProject(id: string): Project | undefined {
  const projs = getProjects();
  return projs.find(p => p.id === id);
}

export function getComments(projectId?: string): Comment[] {
  if (typeof window !== 'undefined' && comments.length === 0) {
    loadFromStorage();
  }
  if (projectId) {
    return comments.filter(c => c.projectId === projectId);
  }
  return comments;
}

export function getStakeholders(): Stakeholder[] {
  if (typeof window !== 'undefined' && stakeholders.length === 0) {
    loadFromStorage();
  }
  return stakeholders;
}

export function getMitigationStrategies(projectId?: string): MitigationStrategy[] {
  if (typeof window !== 'undefined' && mitigationStrategies.length === 0) {
    loadFromStorage();
  }
  if (projectId) {
    return mitigationStrategies.filter(s => s.projectId === projectId);
  }
  return mitigationStrategies;
}

export function getTimelineEvents(projectId?: string, publicOnly: boolean = false): TimelineEvent[] {
  if (typeof window !== 'undefined' && timelineEvents.length === 0) {
    loadFromStorage();
  }
  let events = timelineEvents;
  if (projectId) {
    events = events.filter(e => e.projectId === projectId);
  }
  if (publicOnly) {
    events = events.filter(e => e.isPublic);
  }
  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function getPublicMeetings(projectId?: string): PublicMeeting[] {
  if (typeof window !== 'undefined' && publicMeetings.length === 0) {
    loadFromStorage();
  }
  if (projectId) {
    return publicMeetings.filter(m => m.projectId === projectId);
  }
  return publicMeetings.sort((a, b) => a.date.getTime() - b.date.getTime());
}

// Get comments organized by topic/category
export function getCommentsByTopic(projectId: string): CommentGroup[] {
  const projectComments = getComments(projectId);
  const strategies = getMitigationStrategies(projectId);
  
  // Group by environmental category
  const categoryMap = new Map<EnvironmentalCategory, { comments: Comment[]; strategies: MitigationStrategy[] }>();
  
  projectComments.forEach(comment => {
    const category = comment.environmentalCategory;
    if (!categoryMap.has(category)) {
      categoryMap.set(category, { comments: [], strategies: [] });
    }
    categoryMap.get(category)!.comments.push(comment);
  });
  
  strategies.forEach(strategy => {
    const category = strategy.environmentalCategory;
    if (!categoryMap.has(category)) {
      categoryMap.set(category, { comments: [], strategies: [] });
    }
    categoryMap.get(category)!.strategies.push(strategy);
  });
  
  // Convert to array and sort by number of comments
  return Array.from(categoryMap.entries())
    .map(([category, data]) => ({
      category,
      comments: data.comments.sort((a, b) => b.priority.localeCompare(a.priority)),
      mitigationStrategies: data.strategies,
    }))
    .sort((a, b) => b.comments.length - a.comments.length);
}

export function addComment(comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Comment {
  const newComment: Comment = {
    ...comment,
    id: `comment-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  comments.push(newComment);
  saveToStorage();
  return newComment;
}

export function updateComment(id: string, updates: Partial<Comment>): Comment | null {
  const index = comments.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  comments[index] = {
    ...comments[index],
    ...updates,
    updatedAt: new Date(),
  };
  saveToStorage();
  return comments[index];
}

export function getMetrics(projectId: string): Metrics {
  const projectComments = getComments(projectId);
  const projStakeholders = getStakeholders();
  
  const statusCounts: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};
  const typeCounts: Record<string, number> = {};
  
  projectComments.forEach(comment => {
    statusCounts[comment.status] = (statusCounts[comment.status] || 0) + 1;
    categoryCounts[comment.environmentalCategory] = (categoryCounts[comment.environmentalCategory] || 0) + 1;
    typeCounts[comment.commentType] = (typeCounts[comment.commentType] || 0) + 1;
  });
  
  const pendingMandatory = projStakeholders.filter(
    s => s.isMandatory && !s.hasSubmitted && s.submissionDeadline
  ).length;
  
  const responsesWithDate = projectComments.filter(c => c.responseDate);
  const responseTimes = responsesWithDate.map(c => {
    const diff = c.responseDate!.getTime() - c.createdAt.getTime();
    return diff / (1000 * 60 * 60); // hours
  });
  
  const avgResponseTime = responseTimes.length > 0
    ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
    : 0;
  
  const responseCompleteness = projectComments.length > 0
    ? (projectComments.filter(c => c.response && c.status === 'final').length / projectComments.length) * 100
    : 0;
  
  return {
    totalComments: projectComments.length,
    commentsByStatus: statusCounts as any,
    commentsByCategory: categoryCounts as any,
    commentsByType: typeCounts as any,
    averageResponseTime: avgResponseTime,
    responseCompleteness,
    pendingMandatorySubmissions: pendingMandatory,
  };
}
