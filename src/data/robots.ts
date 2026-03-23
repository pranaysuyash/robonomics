import { Robot } from '../types';

export const robots: Robot[] = [
  {
    id: 'flippy-2',
    name: 'Flippy 2',
    manufacturer: 'Miso Robotics',
    profession: 'Food Service',
    subProfession: 'Fry Cook',
    price: '$5,400/mo (RaaS)',
    availability: 'Available',
    autonomyScore: 75,
    taskCoverage: 85,
    videoUrl: 'https://www.youtube.com/embed/1N8Z4W6r_1c',
    description: 'AI-powered fry station automation. Handles basket lifting, frying, and shaking for high-volume quick-service restaurants.',
    limitations: [
      'Requires human for restocking raw product',
      'Limited to fried menu items',
      'Needs periodic manual cleaning cycles',
      'Cannot handle non-standard basket configurations'
    ],
    specs: {
      'Throughput': '100 baskets/hour',
      'Install Time': '3-4 hours',
      'Power': 'Standard 120V',
      'Size': '50% smaller than v1.0'
    },
    deploymentCount: '13+ chains (White Castle, Jack in the Box)',
    sources: ['Miso Robotics SEC filings', 'Restaurant Dive 2024']
  },
  {
    id: 'hadrian-x',
    name: 'Hadrian X',
    manufacturer: 'FBR',
    profession: 'Construction',
    subProfession: 'Bricklaying',
    price: 'Project-based (WaaS)',
    availability: 'Pilot',
    autonomyScore: 85,
    taskCoverage: 90,
    videoUrl: 'https://www.youtube.com/embed/3J9xJ9zJQ3Y',
    description: 'Truck-mounted robotic bricklaying system. Uses 3D CAD models to build walls including door/window openings with high precision.',
    limitations: [
      'Requires custom blocks',
      'Human team needed for block supply logistics',
      'Limited to single-story structures in current config',
      'Weather-dependent (cannot operate in high wind)'
    ],
    specs: {
      'Speed': '1,000 bricks/hour',
      'Accuracy': '±0.5mm',
      'Adhesive': 'Construction glue (mortarless)',
      'Reach': '32 meters'
    },
    deploymentCount: '10+ projects in Australia/USA',
    sources: ['FBR Annual Report 2024', 'Construction Dive']
  },
  {
    id: 'grid-maintenance-robot',
    name: 'J-Type Maintenance Bot',
    manufacturer: 'State Grid Corp of China',
    profession: 'Maintenance',
    subProfession: 'Electrical Grid Maintenance',
    price: 'Internal Use / Govt Contract',
    availability: 'Enterprise Only',
    autonomyScore: 65,
    taskCoverage: 40,
    videoUrl: 'https://www.youtube.com/embed/example-grid-bot',
    description: 'Specialized robot for high-voltage power line maintenance. Capable of climbing towers and performing basic repairs/inspections.',
    limitations: [
      'Requires remote human operator for complex repairs',
      'Battery life limited for long-range tower hops',
      'Struggles with extreme ice/snow buildup',
      'Limited dexterity compared to human linemen'
    ],
    specs: {
      'Voltage Rating': 'Up to 500kV',
      'Weight': '45kg',
      'Climb Speed': '5m/min',
      'Sensors': 'LiDAR + Thermal Imaging'
    },
    deploymentCount: 'Widespread in Chinese provincial grids',
    sources: ['State Grid Corp Reports', 'IEEE Spectrum']
  },
  {
    id: 'davinci-5',
    name: 'Da Vinci 5',
    manufacturer: 'Intuitive Surgical',
    profession: 'Medical',
    subProfession: 'Surgery',
    price: '$2.5M + $3k/procedure',
    availability: 'Available',
    autonomyScore: 20,
    taskCoverage: 95,
    videoUrl: 'https://www.youtube.com/embed/daVinciDemo',
    description: 'The gold standard in robotic-assisted surgery. Provides surgeons with enhanced vision, precision, and control.',
    limitations: [
      'Zero autonomy (direct teleoperation)',
      'High setup time per procedure',
      'Requires specialized sterile team',
      'Limited haptic feedback'
    ],
    specs: {
      'Arms': '4 multi-jointed arms',
      'Vision': '3D HD 10x magnification',
      'Precision': 'Tremor filtration',
      'Instruments': '70+ specialized tools'
    },
    deploymentCount: '8,000+ units installed globally',
    sources: ['Intuitive Surgical Investor Relations', 'NIH Reports']
  },
  {
    id: 'figure-02',
    name: 'Figure 02',
    manufacturer: 'Figure AI',
    profession: 'Manufacturing',
    subProfession: 'General Purpose Labor',
    price: 'Pilot Pricing',
    availability: 'Pilot',
    autonomyScore: 35,
    taskCoverage: 20,
    videoUrl: 'https://www.youtube.com/embed/FigureAI2024',
    description: 'Second-generation humanoid robot designed for commercial use. Currently being tested in automotive assembly lines.',
    limitations: [
      'Short battery life (approx 5 hours)',
      'Slow movement compared to specialized bots',
      'Fragile in unstructured environments',
      'Requires high-bandwidth low-latency connection'
    ],
    specs: {
      'Height': '5\'6"',
      'Payload': '20kg',
      'AI': 'OpenAI-powered vision/language',
      'DOF': '50 degrees of freedom'
    },
    deploymentCount: 'Active pilot at BMW Spartanburg',
    sources: ['Figure AI Press Release', 'BMW Group News']
  },
  {
    id: 'carbon-robotics-weeder',
    name: 'LaserWeeder',
    manufacturer: 'Carbon Robotics',
    profession: 'Agriculture',
    subProfession: 'Weeding',
    price: '$1.4M (Purchase)',
    availability: 'Available',
    autonomyScore: 90,
    taskCoverage: 95,
    videoUrl: 'https://www.youtube.com/embed/WeedingBot',
    description: 'Autonomous laser weeding robot. Uses AI to identify weeds and thermal energy to eliminate them without chemicals.',
    limitations: [
      'High power consumption',
      'Struggles in extremely muddy conditions',
      'Requires flat terrain for optimal speed',
      'Limited to specific crop types (currently 40+)'
    ],
    specs: {
      'Speed': '2 acres/hour',
      'Lasers': '30x 150W CO2 lasers',
      'Chemicals': '0% herbicide used',
      'Accuracy': 'Sub-millimeter'
    },
    deploymentCount: 'Dozens of large-scale farms in USA',
    sources: ['Carbon Robotics', 'AgFunder News']
  }
];
