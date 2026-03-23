export type Profession = 
  | 'Agriculture' 
  | 'Construction' 
  | 'Logistics' 
  | 'Food Service' 
  | 'Medical' 
  | 'Manufacturing' 
  | 'Maintenance' 
  | 'Retail' 
  | 'Security';

export interface Robot {
  id: string;
  name: string;
  manufacturer: string;
  profession: Profession;
  subProfession: string;
  price: string;
  availability: 'Available' | 'Pre-order' | 'Pilot' | 'Enterprise Only' | 'Concept';
  autonomyScore: number; // 0-100
  taskCoverage: number; // 0-100
  videoUrl: string;
  description: string;
  limitations: string[];
  specs: Record<string, string>;
  deploymentCount?: string;
  sources: string[];
}
