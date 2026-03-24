export interface Robot {
  id: string;
  name: string;
  manufacturer: string;
  profession: string;
  subProfession: string;
  price: string;
  availability: string;
  autonomyScore: number;
  taskCoverage: number;
  videoUrl: string;
  description: string;
  limitations: string[];
  specs: Record<string, string>;
  deploymentCount: string;
  sources: string[];
}

