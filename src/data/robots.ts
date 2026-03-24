import { Profession, Robot, IndustryData } from '../types';

export const industries: IndustryData[] = [
  { name: 'Logistics', description: 'Movement, storage, and processing of goods across the supply chain.', futureImpactScore: 85 },
  { name: 'Agriculture', description: 'Cultivation of plants and livestock for food, fiber, and other products.', futureImpactScore: 75 },
  { name: 'Manufacturing', description: 'Production of merchandise for use or sale using labor, machines, and tools.', futureImpactScore: 90 },
  { name: 'Medical', description: 'Healthcare delivery, surgery, patient care, and medical logistics.', futureImpactScore: 60 },
  { name: 'Food Service', description: 'Preparation, cooking, and serving of food in commercial settings.', futureImpactScore: 80 },
  { name: 'Construction', description: 'Building and assembly of infrastructure, commercial, and residential properties.', futureImpactScore: 70 },
  { name: 'Maintenance', description: 'Preservation and repair of equipment, buildings, and infrastructure.', futureImpactScore: 65 },
  { name: 'Retail', description: 'Sale of goods and services directly to consumers.', futureImpactScore: 88 },
  { name: 'Security', description: 'Protection of property, assets, and people from threats.', futureImpactScore: 72 }
];

export const professions: Profession[] = [
  {
    id: 'prof_fry_cook',
    name: 'Fry Cook',
    industry: 'Food Service',
    description: 'Responsible for operating fryers, managing cooking times, and ensuring food quality in high-volume settings.',
    futureImpactScore: 85,
    futureImpactExplanation: 'Highly repetitive tasks in structured environments make this ripe for near-term full automation.',
    blockers: ['Handling non-standard items', 'Restocking raw product', 'Cleaning cycles'],
    tasks: [
      { id: 'task_fry_lift', name: 'Basket Lifting', description: 'Submerge and lift fry baskets at precise intervals.', difficulty: 'Low', environmentConstraints: ['High heat', 'Grease'] },
      { id: 'task_fry_shake', name: 'Basket Shaking', description: 'Shake baskets to ensure even cooking and oil drainage.', difficulty: 'Medium', environmentConstraints: ['High heat', 'Dynamic motion'] }
    ]
  },
  {
    id: 'prof_bricklayer',
    name: 'Bricklayer',
    industry: 'Construction',
    description: 'Lays bricks, concrete blocks, and other materials to construct and repair walls and structures.',
    futureImpactScore: 70,
    futureImpactExplanation: 'Significant progress in structured environments, but unstructured sites and weather remain blockers.',
    blockers: ['Custom block requirements', 'Supply logistics', 'Weather dependency'],
    tasks: [
      { id: 'task_brick_place', name: 'Block Placement', description: 'Precisely place bricks according to CAD models.', difficulty: 'High', environmentConstraints: ['Outdoor', 'Wind', 'Dust'] },
      { id: 'task_brick_adhesive', name: 'Adhesive Application', description: 'Apply mortar or construction glue evenly.', difficulty: 'Medium', environmentConstraints: ['Viscous materials', 'Temperature sensitive'] }
    ]
  },
  {
    id: 'prof_layout_printer',
    name: 'Layout Printer',
    industry: 'Construction',
    description: 'Translates BIM data into physical markings on construction site floors.',
    futureImpactScore: 90,
    futureImpactExplanation: 'Already highly automated; primary blockers are site preparation and environmental conditions.',
    blockers: ['Requires clean, level concrete', 'BIM model accuracy', 'Moisture fading'],
    tasks: [
      { id: 'task_layout_nav', name: 'Site Navigation', description: 'Navigate flat concrete floors while maintaining precise localization.', difficulty: 'Medium', environmentConstraints: ['Flat surfaces', 'Dust'] },
      { id: 'task_layout_print', name: 'Precision Printing', description: 'Print lines and text at 1/16" accuracy.', difficulty: 'High', environmentConstraints: ['Ink adhesion', 'Surface debris'] }
    ]
  },
  {
    id: 'prof_grid_maintainer',
    name: 'Electrical Grid Maintainer',
    industry: 'Maintenance',
    description: 'Inspects and repairs high-voltage power lines and towers.',
    futureImpactScore: 65,
    futureImpactExplanation: 'Robots handle inspection well, but complex repairs still require human dexterity or teleoperation.',
    blockers: ['Complex repairs', 'Extreme weather (ice/snow)', 'Dexterity limits'],
    tasks: [
      { id: 'task_grid_climb', name: 'Tower Climbing', description: 'Navigate high-voltage towers safely.', difficulty: 'Extreme', environmentConstraints: ['High altitude', 'High voltage', 'Wind'] },
      { id: 'task_grid_inspect', name: 'Visual/Thermal Inspection', description: 'Identify faults using sensors.', difficulty: 'Medium', environmentConstraints: ['Glare', 'Weather'] }
    ]
  },
  {
    id: 'prof_surgeon_mis',
    name: 'Minimally Invasive Surgeon',
    industry: 'Medical',
    description: 'Performs complex surgeries through small incisions using specialized instruments.',
    futureImpactScore: 30,
    futureImpactExplanation: 'Currently heavily reliant on teleoperation; true autonomy is decades away due to safety and anatomical variability.',
    blockers: ['Zero autonomy (teleoperation)', 'Haptic feedback limits', 'Anatomical variability'],
    tasks: [
      { id: 'task_surg_manipulate', name: 'Soft Tissue Manipulation', description: 'Cut, suture, and manipulate delicate tissues.', difficulty: 'Extreme', environmentConstraints: ['Sterile', 'Dynamic anatomy', 'Bleeding'] }
    ]
  },
  {
    id: 'prof_surgeon_ortho',
    name: 'Orthopedic Surgeon',
    industry: 'Medical',
    description: 'Performs bone cutting and joint replacements.',
    futureImpactScore: 40,
    futureImpactExplanation: 'Robots assist with precision cutting based on pre-op CTs, but surgeons remain fully in control.',
    blockers: ['Semi-autonomous only', 'Requires pre-op CT', 'High capital cost'],
    tasks: [
      { id: 'task_ortho_cut', name: 'Precision Bone Cutting', description: 'Cut bone within strict haptic boundaries.', difficulty: 'High', environmentConstraints: ['Sterile', 'Rigid structures'] }
    ]
  },
  {
    id: 'prof_general_labor',
    name: 'General Purpose Labor',
    industry: 'Manufacturing',
    description: 'Performs varied, unstructured tasks across factory floors.',
    futureImpactScore: 50,
    futureImpactExplanation: 'Humanoids are advancing rapidly but struggle with battery life, speed, and unstructured environments.',
    blockers: ['Battery life', 'Movement speed', 'Fragility in unstructured spaces'],
    tasks: [
      { id: 'task_gen_nav', name: 'Bipedal Navigation', description: 'Walk through dynamic factory environments.', difficulty: 'High', environmentConstraints: ['Stairs', 'Uneven floors', 'Dynamic obstacles'] },
      { id: 'task_gen_manipulate', name: 'Dexterous Manipulation', description: 'Handle varied objects and tools.', difficulty: 'Extreme', environmentConstraints: ['Variable shapes', 'Variable weights'] }
    ]
  },
  {
    id: 'prof_warehouse_picker',
    name: 'Warehouse Order Picker',
    industry: 'Logistics',
    description: 'Navigates aisles, locates items, and picks them into totes.',
    futureImpactScore: 75,
    futureImpactExplanation: 'Navigation is solved; grasping variable, deformable items (like polybags) remains the primary blocker.',
    blockers: ['Grasping polybags/fragile items', 'Deep bin picking', 'Unstructured environments'],
    tasks: [
      { id: 'task_wh_nav', name: 'Navigate Aisles', description: 'Move safely through warehouse aisles.', difficulty: 'Medium', environmentConstraints: ['Flat floors', 'Dynamic obstacles'] },
      { id: 'task_wh_grasp', name: 'Grasp Variable Item', description: 'Pick up items regardless of shape/packaging.', difficulty: 'Extreme', environmentConstraints: ['Cluttered bins', 'Deformable packaging'] }
    ]
  },
  {
    id: 'prof_case_handler',
    name: 'Case Handler',
    industry: 'Logistics',
    description: 'Unloads trailers and processes heavy cases onto conveyors.',
    futureImpactScore: 85,
    futureImpactExplanation: 'Highly automated for standard cases; palletizing and non-standard items are the next frontier.',
    blockers: ['Palletizing complexity', 'Conveyor integration', 'High infrastructure costs'],
    tasks: [
      { id: 'task_case_unload', name: 'Trailer Unloading', description: 'Autonomously unload packed cases from trailers.', difficulty: 'High', environmentConstraints: ['Tight spaces', 'Variable lighting', 'Heavy loads'] }
    ]
  },
  {
    id: 'prof_weeder',
    name: 'Agricultural Weeder',
    industry: 'Agriculture',
    description: 'Identifies and removes weeds from crop fields.',
    futureImpactScore: 95,
    futureImpactExplanation: 'Laser and mechanical weeding robots are highly effective and widely deployed.',
    blockers: ['Muddy conditions', 'High power consumption', 'Crop type limitations'],
    tasks: [
      { id: 'task_weed_id', name: 'Identify Weeds', description: 'Visually distinguish weeds from crops.', difficulty: 'Medium', environmentConstraints: ['Variable lighting', 'Occlusion'] },
      { id: 'task_weed_eliminate', name: 'Eliminate Weed', description: 'Destroy weed without harming crop.', difficulty: 'High', environmentConstraints: ['Sub-millimeter accuracy required'] }
    ]
  },
  {
    id: 'prof_tractor_op',
    name: 'Tractor Operator',
    industry: 'Agriculture',
    description: 'Drives tractors for plowing, seeding, and harvesting.',
    futureImpactScore: 80,
    futureImpactExplanation: 'Autonomous tractors are available but limited to mapped fields and require battery swaps.',
    blockers: ['Battery life (electric)', 'Requires mapped fields', 'Implement compatibility'],
    tasks: [
      { id: 'task_tractor_nav', name: 'Field Navigation', description: 'Drive precise routes while avoiding obstacles.', difficulty: 'Medium', environmentConstraints: ['Uneven terrain', 'Dust/Mud', 'Dynamic obstacles'] }
    ]
  },
  {
    id: 'prof_inventory_mgr',
    name: 'Inventory Manager',
    industry: 'Retail',
    description: 'Scans shelves to monitor inventory levels and pricing accuracy.',
    futureImpactScore: 92,
    futureImpactExplanation: 'Scanning is highly automated; physical restocking remains a human task.',
    blockers: ['Cannot physically restock', 'Blocked aisles', 'Label readability'],
    tasks: [
      { id: 'task_inv_scan', name: 'Shelf Scanning', description: 'Continuously monitor inventory and pricing.', difficulty: 'Medium', environmentConstraints: ['Narrow aisles', 'Human traffic', 'Glare'] }
    ]
  },
  {
    id: 'prof_security_patrol',
    name: 'Security Patrol',
    industry: 'Security',
    description: 'Patrols premises to observe and report suspicious activity.',
    futureImpactScore: 72,
    futureImpactExplanation: 'Observation and reporting are automated; physical intervention is impossible for current bots.',
    blockers: ['Cannot intervene/detain', 'Pre-mapped routes only', 'Battery limits'],
    tasks: [
      { id: 'task_sec_patrol', name: 'Autonomous Patrol', description: 'Navigate routes and monitor surroundings.', difficulty: 'Medium', environmentConstraints: ['Indoor/Outdoor', 'Variable lighting', 'Weather'] },
      { id: 'task_sec_observe', name: 'Threat Detection', description: 'Identify anomalies using cameras and sensors.', difficulty: 'High', environmentConstraints: ['Occlusion', 'False positives'] }
    ]
  }
];

export const robots: Robot[] = [
  {
    id: 'flippy-2',
    name: 'Flippy 2',
    manufacturer: 'Miso Robotics',
    pricingModel: '$5,400/mo (RaaS)',
    availability: 'Available',
    deploymentCount: '13+ chains (White Castle, Jack in the Box)',
    description: 'AI-powered fry station automation. Handles basket lifting, frying, and shaking for high-volume quick-service restaurants.',
    videoUrl: 'https://www.youtube.com/embed/1N8Z4W6r_1c',
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
    evidence: [
      { id: 'ev_flippy_1', title: 'Miso Robotics SEC filings', url: '#', type: 'Company Claim', verified: true, deploymentType: 'Production' },
      { id: 'ev_flippy_2', title: 'Restaurant Dive 2024', url: '#', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_fry_lift', successLevel: 'Superhuman', confidenceScore: 95, evidenceIds: ['ev_flippy_1', 'ev_flippy_2'], notes: 'Consistently lifts baskets at exact intervals without fatigue.' },
      { taskId: 'task_fry_shake', successLevel: 'Full', confidenceScore: 90, evidenceIds: ['ev_flippy_1'], notes: 'Effectively shakes baskets to drain oil.' }
    ]
  },
  {
    id: 'hadrian-x',
    name: 'Hadrian X',
    manufacturer: 'FBR',
    pricingModel: 'Project-based (WaaS)',
    availability: 'Pilot',
    deploymentCount: '10+ projects in Australia/USA',
    description: 'Truck-mounted robotic bricklaying system. Uses 3D CAD models to build walls including door/window openings with high precision.',
    videoUrl: 'https://www.youtube.com/embed/3J9xJ9zJQ3Y',
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
    evidence: [
      { id: 'ev_hadrian_1', title: 'FBR Annual Report 2024', url: '#', type: 'Company Claim', verified: true, deploymentType: 'Pilot' }
    ],
    capabilities: [
      { taskId: 'task_brick_place', successLevel: 'Superhuman', confidenceScore: 85, evidenceIds: ['ev_hadrian_1'], notes: 'Places bricks much faster and more accurately than humans, but requires specific conditions.' },
      { taskId: 'task_brick_adhesive', successLevel: 'Full', confidenceScore: 80, evidenceIds: ['ev_hadrian_1'], notes: 'Applies proprietary adhesive consistently.' }
    ]
  },
  {
    id: 'dusty-fieldprinter',
    name: 'FieldPrinter 2',
    manufacturer: 'Dusty Robotics',
    pricingModel: 'Subscription (RaaS)',
    availability: 'Available',
    deploymentCount: 'Deployed on major commercial construction projects across USA',
    description: 'Autonomous construction layout robot that prints BIM data directly onto jobsite floors. Enables accurate placement for walls, plumbing, and electrical at 10x manual speed.',
    videoUrl: 'https://www.youtube.com/embed/xIb_yiOHjWY',
    limitations: [
      'Requires clean, level concrete floor surface',
      'BIM models must be properly prepared and geo-referenced',
      'Cannot operate on outdoor dirt or uneven sub-base',
      'Print lines may fade in high-moisture environments'
    ],
    specs: {
      'Speed': '10,000–15,000 sq ft/day',
      'Accuracy': '1/16" (600 DPI)',
      'Weight': '23 lbs',
      'Integration': 'Revit, AutoCAD via cloud plugins'
    },
    evidence: [
      { id: 'ev_dusty_1', title: 'TechCrunch 2024', url: '#', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_layout_nav', successLevel: 'Full', confidenceScore: 95, evidenceIds: ['ev_dusty_1'], notes: 'Navigates flat concrete reliably.' },
      { taskId: 'task_layout_print', successLevel: 'Superhuman', confidenceScore: 98, evidenceIds: ['ev_dusty_1'], notes: 'Prints layouts significantly faster and more accurately than manual chalk lines.' }
    ]
  },
  {
    id: 'grid-maintenance-robot',
    name: 'J-Type Maintenance Bot',
    manufacturer: 'State Grid Corp of China',
    pricingModel: 'Internal Use / Govt Contract',
    availability: 'Available',
    deploymentCount: 'Widespread in Chinese provincial grids',
    description: 'Specialized robot for high-voltage power line maintenance. Capable of climbing towers and performing basic repairs/inspections. In China, they are rolling out robotic electricians on a massive scale to install and inspect live high-voltage wires.',
    videoUrl: 'https://www.youtube.com/embed/example-grid-bot',
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
    evidence: [
      { id: 'ev_grid_1', title: 'State Grid Corp Reports', url: '#', type: 'Company Claim', verified: true, deploymentType: 'Production' },
      { id: 'ev_grid_2', title: 'IEEE Spectrum', url: '#', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_grid_climb', successLevel: 'Full', confidenceScore: 85, evidenceIds: ['ev_grid_1', 'ev_grid_2'], notes: 'Safely climbs towers, eliminating human risk.' },
      { taskId: 'task_grid_inspect', successLevel: 'Full', confidenceScore: 90, evidenceIds: ['ev_grid_1'], notes: 'Performs thorough inspections using multi-modal sensors.' }
    ]
  },
  {
    id: 'davinci-5',
    name: 'Da Vinci 5',
    manufacturer: 'Intuitive Surgical',
    pricingModel: '$2.5M + $3k/procedure',
    availability: 'Available',
    deploymentCount: '8,000+ units installed globally',
    description: 'The gold standard in robotic-assisted surgery. Provides surgeons with enhanced vision, precision, and control for minimally invasive soft-tissue procedures.',
    videoUrl: 'https://www.youtube.com/embed/daVinciDemo',
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
    evidence: [
      { id: 'ev_davinci_1', title: 'Intuitive Surgical Investor Relations', url: '#', type: 'Company Claim', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_surg_manipulate', successLevel: 'None', confidenceScore: 100, evidenceIds: ['ev_davinci_1'], notes: 'System is purely teleoperated; it has zero autonomy for tissue manipulation.' }
    ]
  },
  {
    id: 'stryker-mako',
    name: 'Mako SmartRobotics',
    manufacturer: 'Stryker',
    pricingModel: '$800k–$1.4M',
    availability: 'Available',
    deploymentCount: 'Market leader in robotic orthopedics; thousands of units in US hospitals',
    description: 'Robotic-arm-assisted orthopedic surgery system. Uses CT-based 3D planning and AccuStop haptic feedback to guide surgeons in precise bone cutting for knee and hip replacements.',
    videoUrl: 'https://www.youtube.com/embed/c10j-IzdAoU',
    limitations: [
      'Semi-autonomous: surgeon fully in control',
      'Requires CT scan before each procedure',
      'High capital cost limits access to large hospitals',
      'Steep learning curve for OR teams'
    ],
    specs: {
      'Procedures': 'Total/Partial Knee, Total Hip, Spine',
      'Feedback': 'AccuStop™ haptic boundaries',
      'Planning': '3D CT-based pre-op modeling',
      'Platform': 'Mako 4 (2025)'
    },
    evidence: [
      { id: 'ev_mako_1', title: 'Stryker Investor Relations', url: '#', type: 'Company Claim', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_ortho_cut', successLevel: 'Partial', confidenceScore: 90, evidenceIds: ['ev_mako_1'], notes: 'Provides haptic boundaries and precision assistance, but surgeon drives the tool.' }
    ]
  },
  {
    id: 'figure-02',
    name: 'Figure 02',
    manufacturer: 'Figure AI',
    pricingModel: 'Pilot Pricing',
    availability: 'Pilot',
    deploymentCount: 'Active pilot at BMW Spartanburg',
    description: 'Second-generation humanoid robot designed for commercial use. Currently being tested in automotive assembly lines.',
    videoUrl: 'https://www.youtube.com/embed/FigureAI2024',
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
    evidence: [
      { id: 'ev_figure_1', title: 'BMW Group News', url: '#', type: 'News', verified: true, deploymentType: 'Pilot' }
    ],
    capabilities: [
      { taskId: 'task_gen_nav', successLevel: 'Partial', confidenceScore: 60, evidenceIds: ['ev_figure_1'], notes: 'Can walk in structured factory settings, but slow.' },
      { taskId: 'task_gen_manipulate', successLevel: 'Partial', confidenceScore: 50, evidenceIds: ['ev_figure_1'], notes: 'Demonstrated basic manipulation (e.g., placing parts), but lacks human speed and reliability.' }
    ]
  },
  {
    id: 'agility-digit',
    name: 'Digit',
    manufacturer: 'Agility Robotics',
    pricingModel: '~$70k–$100k',
    availability: 'Available',
    deploymentCount: 'Active pilots at Amazon and GXO Logistics; first humanoid robot factory (RoboFab) operational',
    description: 'Bipedal humanoid robot purpose-built for warehouse and light-manufacturing environments. Navigates stairs/ramps and moves totes between AMRs and conveyors — tasks fixed robots cannot reach.',
    videoUrl: 'https://www.youtube.com/embed/wE_XDbkVOp0',
    limitations: [
      'Payload limited to 35 lbs',
      'Slower than purpose-built conveyors for repetitive routes',
      'Requires structured task environment',
      'Software integration with WMS systems still maturing'
    ],
    specs: {
      'Height': '5\'9"',
      'Weight': '105 lbs',
      'Payload': '35 lbs (16 kg)',
      'Milestone': '100,000+ totes moved in production (2024)'
    },
    evidence: [
      { id: 'ev_digit_1', title: 'Amazon begins testing Digit', url: '#', type: 'News', verified: true, deploymentType: 'Pilot' }
    ],
    capabilities: [
      { taskId: 'task_gen_nav', successLevel: 'Full', confidenceScore: 85, evidenceIds: ['ev_digit_1'], notes: 'Excellent bipedal locomotion for warehouses.' },
      { taskId: 'task_gen_manipulate', successLevel: 'Partial', confidenceScore: 65, evidenceIds: ['ev_digit_1'], notes: 'Optimized for tote handling, not fine dexterity.' }
    ]
  },
  {
    id: 'carbon-robotics-weeder',
    name: 'LaserWeeder',
    manufacturer: 'Carbon Robotics',
    pricingModel: '$1.4M (Purchase)',
    availability: 'Available',
    deploymentCount: 'Dozens of large-scale farms in USA',
    description: 'Autonomous laser weeding robot. Uses AI to identify weeds and thermal energy to eliminate them without chemicals.',
    videoUrl: 'https://www.youtube.com/embed/WeedingBot',
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
    evidence: [
      { id: 'ev_carbon_1', title: 'AgFunder News', url: '#', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_weed_id', successLevel: 'Superhuman', confidenceScore: 95, evidenceIds: ['ev_carbon_1'], notes: 'Identifies weeds with high accuracy using computer vision.' },
      { taskId: 'task_weed_eliminate', successLevel: 'Superhuman', confidenceScore: 95, evidenceIds: ['ev_carbon_1'], notes: 'Eliminates weeds instantly with lasers, faster than human crews.' }
    ]
  },
  {
    id: 'monarch-tractor-mkv',
    name: 'MK-V',
    manufacturer: 'Monarch Tractor',
    pricingModel: '~$89,000 (pre-subsidy)',
    availability: 'Available',
    deploymentCount: '400+ tractors deployed (US, Canada, EU, New Zealand); 42,000+ autonomous operating hours',
    description: 'World\'s first fully electric, driver-optional autonomous tractor. Operates autonomously or in "shadow mode" following a worker, with 360-degree obstacle avoidance and WingspanAI data platform.',
    videoUrl: 'https://www.youtube.com/embed/uLrullFkmZ4',
    limitations: [
      'Battery swaps required for all-day operation (6-10 min swap)',
      'Autonomy limited to mapped, known fields',
      'Implement compatibility requires Category I/II three-point hitch',
      'High upfront cost (subsidies can offset up to 80%)'
    ],
    specs: {
      'Power': '70 HP, 100% electric 4WD',
      'Battery Life': 'Up to 14 hours (XLR pack)',
      'Emissions': 'Zero tailpipe',
      'Platform': 'WingspanAI fleet management'
    },
    evidence: [
      { id: 'ev_monarch_1', title: 'Monarch Tractor 2024', url: '#', type: 'Company Claim', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_tractor_nav', successLevel: 'Full', confidenceScore: 85, evidenceIds: ['ev_monarch_1'], notes: 'Navigates mapped fields autonomously with obstacle avoidance.' }
    ]
  },
  {
    id: 'stretch-boston-dynamics',
    name: 'Stretch',
    manufacturer: 'Boston Dynamics',
    pricingModel: 'Project-based (hardware + integration)',
    availability: 'Available',
    deploymentCount: '1,000+ units committed (DHL global partnership); deployments at Gap Inc., Arvato',
    description: 'Mobile case-handling robot purpose-built for logistics. Autonomously unloads trailers and processes cases onto conveyors using a 7-DOF arm and AI-driven computer vision — no fixed infrastructure required.',
    videoUrl: 'https://www.youtube.com/embed/3Ka8AkZajsk',
    limitations: [
      'Optimized for case unloading; palletizing still in development',
      'Requires conveyor integration for downstream flow',
      'High integration and infrastructure adaptation costs',
      'Pricing not publicly disclosed'
    ],
    specs: {
      'Throughput': '600–800 cases/hour',
      'Max Case Weight': '50 lbs',
      'Arm DOF': '7 degrees of freedom',
      'Recharge': '90% charge in < 2 hours'
    },
    evidence: [
      { id: 'ev_stretch_1', title: 'DHL Press Release 2025', url: '#', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_case_unload', successLevel: 'Full', confidenceScore: 90, evidenceIds: ['ev_stretch_1'], notes: 'Unloads cases efficiently using advanced vision and vacuum gripper.' }
    ]
  },
  {
    id: 'simbe-tally',
    name: 'Tally 4.0',
    manufacturer: 'Simbe Robotics',
    pricingModel: 'Subscription (RaaS)',
    availability: 'Available',
    deploymentCount: '~1,000 stores across Schnucks, Wakefern/ShopRite, BJ\'s Wholesale, SpartanNash',
    description: 'Autonomous shelf-scanning robot that turns retail shelves into real-time data infrastructure. Uses edge AI (NVIDIA) to continuously monitor inventory levels, pricing accuracy, and merchandising compliance.',
    videoUrl: 'https://www.youtube.com/embed/lxcgKF9N17A',
    limitations: [
      'Cannot physically restock shelves',
      'Requires clear aisle access (blocked by carts/customers)',
      'Shelf tag/label readability affects accuracy',
      'Data value depends on integration with store WMS'
    ],
    specs: {
      'Scan Rate': '15,000–30,000 products/hour',
      'Out-of-stock Reduction': '60%',
      'Pricing Error Reduction': '90%',
      'Deployments': '~1,000 stores (2025)'
    },
    evidence: [
      { id: 'ev_tally_1', title: 'Simbe Robotics 2025', url: '#', type: 'Company Claim', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_inv_scan', successLevel: 'Superhuman', confidenceScore: 98, evidenceIds: ['ev_tally_1'], notes: 'Scans shelves far faster and more accurately than human workers.' }
    ]
  },
  {
    id: 'knightscope-k5',
    name: 'K5',
    manufacturer: 'Knightscope',
    pricingModel: '~$70k–$80k/year (RaaS)',
    availability: 'Available',
    deploymentCount: 'Deployed at campuses, malls, hospitals, airports, and parking structures across the USA',
    description: 'Fully autonomous outdoor/indoor security robot. Patrols 24/7 with 360-degree UHD cameras, thermal imaging, license plate recognition, and two-way intercom. Self-docking for autonomous recharging.',
    videoUrl: 'https://www.youtube.com/embed/IwPrbj696Ig',
    limitations: [
      'Cannot physically intervene or detain individuals',
      'Limited to pre-mapped patrol routes',
      'Battery limits to 2.5-3 hours between charges',
      'Has faced public skepticism in high-profile NYPD trials'
    ],
    specs: {
      'Speed': 'Up to 3 mph',
      'Weight': '420 lbs',
      'Cameras': '360° UHD + Thermal',
      'Sensors': 'LiDAR (×13), sonar, license plate recognition'
    },
    evidence: [
      { id: 'ev_k5_1', title: 'CNBC NYPD Report 2024', url: '#', type: 'News', verified: true, deploymentType: 'Pilot' }
    ],
    capabilities: [
      { taskId: 'task_sec_patrol', successLevel: 'Full', confidenceScore: 90, evidenceIds: ['ev_k5_1'], notes: 'Reliably patrols mapped areas autonomously.' },
      { taskId: 'task_sec_observe', successLevel: 'Partial', confidenceScore: 75, evidenceIds: ['ev_k5_1'], notes: 'Excellent sensor suite, but AI threat detection still yields false positives.' }
    ]
  }
];
