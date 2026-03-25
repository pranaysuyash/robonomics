export type Industry = 
  | 'Agriculture' 
  | 'Construction' 
  | 'Logistics' 
  | 'Food Service' 
  | 'Medical' 
  | 'Manufacturing' 
  | 'Maintenance' 
  | 'Retail' 
  | 'Security';

export interface Task {
  id: string;
  name: string;
  description: string;
  difficulty: 'Low' | 'Medium' | 'High' | 'Extreme';
  environmentConstraints: string[];
}

export interface Profession {
  id: string;
  name: string;
  industry: Industry;
  description: string;
  futureImpactScore: number; // 0-100
  futureImpactExplanation: string;
  tasks: Task[];
  blockers: string[];
}

export interface Evidence {
  id: string;
  title: string;
  url: string;
  type: 'Video' | 'Paper' | 'News' | 'Company Claim';
  verified: boolean;
  deploymentType: 'Demo' | 'Pilot' | 'Production';
  geographicLocation?: string;
}

export interface Capability {
  taskId: string;
  successLevel: 'None' | 'Partial' | 'Full' | 'Superhuman';
  confidenceScore: number; // 0-100
  evidenceIds: string[];
  notes: string;
}

export interface Robot {
  id: string;
  name: string;
  manufacturer: string;
  pricingModel: string;
  availability: 'Concept' | 'Pilot' | 'Available';
  deploymentCount: string;
  capabilities: Capability[];
  limitations: string[];
  specs: Record<string, string>;
  evidence: Evidence[];
  videoUrl?: string;
  description: string;
}

export interface IndustryData {
  name: Industry;
  description: string;
  futureImpactScore: number;
}
