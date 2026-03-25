// Last Research Update: 2026-03-24
// This file is automatically updated by tools/research.js
// Run 'node tools/research.js' to regenerate research queue

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
    deploymentCount: '14 units at White Castle as of Dec 2025; ended Jack in the Box agreement',
    description: 'AI-powered fry station automation. Latest generation (Nov 2025) is twice as fast, half the size, and now processes up to 120 baskets/hour. Features NVIDIA-powered vision system and partnerships with Roboworx (service), Amazon (cloud), and Ecolab (investment).',
    videoUrl: 'https://www.youtube.com/embed/1N8Z4W6r_1c',
    limitations: [
      'Requires human for restocking raw product',
      'Limited to fried menu items',
      'Needs periodic manual cleaning cycles',
      'Ended Jack in the Box partnership as of late 2025',
      'SEC filing shows $8.6M net loss (Q3 2025), $3.94M cash on hand'
    ],
    specs: {
      'Throughput': '120 baskets/hour (up from 100)',
      'Install Time': 'A few hours (75% less than previous)',
      'Power': 'Standard 120V',
      'Size': '50% smaller than v1.0, fits around existing fryers',
      'Patents': '25+ patents',
      'Partners': 'NVIDIA, Amazon, Roboworx, Ecolab'
    },
    evidence: [
      { id: 'ev_flippy_1', title: 'Miso Robotics SEC filings Dec 2025', url: 'https://www.sec.gov', type: 'Company Claim', verified: true, deploymentType: 'Production' },
      { id: 'ev_flippy_2', title: 'Miso Launches Newest Flippy Nov 2025', url: 'https://www.qsrweb.com', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_flippy_3', title: 'Miso Partners with Roboworx June 2025', url: 'https://misorobotics.com', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_fry_lift', successLevel: 'Superhuman', confidenceScore: 95, evidenceIds: ['ev_flippy_1', 'ev_flippy_2'], notes: 'Consistently lifts baskets at exact intervals without fatigue.' },
      { taskId: 'task_fry_shake', successLevel: 'Superhuman', confidenceScore: 95, evidenceIds: ['ev_flippy_2'], notes: 'Now processes 120 baskets/hour, twice as fast as humans.' }
    ]
  },
  {
    id: 'hadrian-x',
    name: 'Hadrian X',
    manufacturer: 'FBR',
    pricingModel: '~$5M AUD (~$4.4M USD) per unit',
    availability: 'Available',
    deploymentCount: 'First homes built in Perth & Florida; commercial scaling 2025-2026',
    description: 'Truck-mounted robotic bricklaying system. Now achieves 360 blocks/hour (up from 300). Completed factory acceptance testing late 2024; commercial scale-up underway with MOUs with builders in Australia. Can build a full house in a day.',
    videoUrl: 'https://www.youtube.com/embed/3J9xJ9zJQ3Y',
    limitations: [
      'Requires custom blocks optimized for adhesive',
      'Human team needed for block supply logistics',
      'Very high capital cost ($7.8M AUD)',
      'Weather-dependent (cannot operate in high wind >60km/h)',
      'Slower on complex wall structures'
    ],
    specs: {
      'Speed': '360 blocks/hour (peak), ~285 blocks/hour practical',
      'Accuracy': '±0.5mm',
      'Adhesive': 'Fastbrick Adhesive (cures in 45 min)',
      'Reach': '32 meters (105 feet)',
      'Block Weight': 'Up to 45kg (99 lbs)',
      'Wind Rating': 'Up to 60 km/h',
      'Price': '$7.8M AUD (~$4.4M USD)',
      'Capacity': '200-300 homes/year per unit'
    },
    evidence: [
      { id: 'ev_hadrian_1', title: 'Heise Online Oct 2025', url: 'https://www.heise.de', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_hadrian_2', title: 'Domain.com.au Feb 2026', url: 'https://www.domain.com.au', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_hadrian_3', title: 'Interesting Engineering 2025', url: 'https://interestingengineering.com', type: 'News', verified: true, deploymentType: 'Pilot' }
    ],
    capabilities: [
      { taskId: 'task_brick_place', successLevel: 'Superhuman', confidenceScore: 90, evidenceIds: ['ev_hadrian_1', 'ev_hadrian_2'], notes: 'Now lays 360 blocks/hour, 20% faster than before. Built 5 homes in demonstration program with CRH Ventures.' },
      { taskId: 'task_brick_adhesive', successLevel: 'Full', confidenceScore: 85, evidenceIds: ['ev_hadrian_1'], notes: 'Applies proprietary adhesive consistently with real-time stabilization.' }
    ]
  },
  {
    id: 'dusty-fieldprinter',
    name: 'FieldPrinter 2',
    manufacturer: 'Dusty Robotics',
    pricingModel: 'Subscription (RaaS)',
    availability: 'Available',
    deploymentCount: 'Deployed on major commercial construction projects across USA',
    description: 'Autonomous construction layout robot. Prints BIM data directly onto jobsite floors. Now integrates with Revit/AutoCAD directly. Featured in major contractor adoption across USA.',
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
      'Integration': 'Revit, AutoCAD via cloud plugins',
      'Connectivity': 'Direct to BIM models'
    },
    evidence: [
      { id: 'ev_dusty_1', title: 'Instagram Demo 2025', url: 'https://instagram.com', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_dusty_2', title: 'Modern Architect Instagram 2025', url: 'https://instagram.com', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_layout_nav', successLevel: 'Full', confidenceScore: 95, evidenceIds: ['ev_dusty_1'], notes: 'Navigates flat concrete reliably.' },
      { taskId: 'task_layout_print', successLevel: 'Superhuman', confidenceScore: 98, evidenceIds: ['ev_dusty_2'], notes: 'Prints layouts significantly faster and more accurately than manual chalk lines.' }
    ]
  },
  {
    id: 'grid-maintenance-robot',
    name: 'State Grid Inspection Robot',
    manufacturer: 'State Grid Corp of China',
    pricingModel: 'Internal Use / Govt Contract',
    availability: 'Available',
    deploymentCount: 'Widespread across Chinese provincial grids; 50+ operations in Zhenjiang alone; 5G-enabled inspection in Gansu',
    description: 'China deploying robotic electricians at scale. State Grid Zhenjiang used robot for live-line repair Aug 2025 - first summer use. Dual-arm coordination, remote control via handheld terminal. 5G inspection robots in Gansu substation. 60%+ efficiency improvement.',
    videoUrl: 'https://www.youtube.com/embed/example-grid-bot',
    limitations: [
      'Requires remote human operator for complex repairs',
      'Battery life limited for long-range tower hops',
      'Struggles with extreme ice/snow buildup',
      'Limited dexterity compared to human linemen'
    ],
    specs: {
      'Voltage Rating': 'Up to 500kV (10kV specific models)',
      'Weight': '45kg',
      'Climb Speed': '5m/min',
      'Sensors': 'LiDAR + Thermal Imaging',
      'Features': 'Dual-arm coordination, 5G connectivity, autonomous path planning',
      'Efficiency Gain': '60%+ vs traditional methods'
    },
    evidence: [
      { id: 'ev_grid_1', title: 'China Daily Aug 2025', url: 'https://www.chinadaily.com.cn', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_grid_2', title: 'CRI News Dec 2025', url: 'https://news.cri.cn', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_grid_climb', successLevel: 'Full', confidenceScore: 88, evidenceIds: ['ev_grid_1'], notes: 'Dual-arm robots can perform wire stripping, insulator replacement.' },
      { taskId: 'task_grid_inspect', successLevel: 'Full', confidenceScore: 95, evidenceIds: ['ev_grid_2'], notes: '5G-enabled inspection with 95% defect identification accuracy.' }
    ]
  },
  {
    id: 'davinci-5',
    name: 'Da Vinci 5',
    manufacturer: 'Intuitive Surgical',
    pricingModel: '$2.5M + $3k/procedure',
    availability: 'Available',
    deploymentCount: '8,000+ units globally; 20M+ patients treated total; 3.1M in 2025 alone',
    description: 'Gold standard in robotic-assisted surgery. FDA cleared for cardiac procedures Jan 2026 (mitral valve repair, IMA mobilization). Revenue $10.1B in 2025 (+21%), procedures up 19%. da Vinci procedures grew 18%, Ion lung biopsy +51%, SP platform +87%.',
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
      'Instruments': '70+ specialized tools',
      '2025 Revenue': '$10.1 billion (+21%)',
      '2025 Procedures': '3.1 million patients'
    },
    evidence: [
      { id: 'ev_davinci_1', title: 'Zacks Research March 2026', url: 'https://finance.yahoo.com', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_davinci_2', title: 'FDA Cardiac Clearance Jan 2026', url: 'https://globenewswire.com', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_surg_manipulate', successLevel: 'None', confidenceScore: 100, evidenceIds: ['ev_davinci_1'], notes: 'System is purely teleoperated; zero autonomy. But force feedback and visualization improved in da Vinci 5.' }
    ]
  },
  {
    id: 'stryker-mako',
    name: 'Mako SmartRobotics',
    manufacturer: 'Stryker',
    pricingModel: '$800k–$1.4M',
    availability: 'Available',
    deploymentCount: '2M+ procedures across 46 countries; market leader in robotic orthopedics',
    description: 'Robotic-arm-assisted orthopedic surgery. Introduced Mako RPS (Robotic Power System) Feb 2026 - handheld robot for total knee. Now multi-specialty: Knee, Hip, Spine, Shoulder. Mako Shoulder in full market release. AAOS 2026: Triathlon Gold knee system launched.',
    videoUrl: 'https://www.youtube.com/embed/c10j-IzdAoU',
    limitations: [
      'Semi-autonomous: surgeon fully in control',
      'Requires CT scan before each procedure',
      'High capital cost limits access to large hospitals',
      'Steep learning curve for OR teams'
    ],
    specs: {
      'Procedures': 'Total/Partial Knee, Total Hip, Spine, Shoulder',
      'Feedback': 'AccuStop™ haptic boundaries',
      'Planning': '3D CT-based pre-op modeling',
      'Platform': 'Mako 4 (2025)',
      'New 2026': 'Mako RPS handheld robotics',
      'Global Reach': '46 countries, 2M+ procedures'
    },
    evidence: [
      { id: 'ev_mako_1', title: 'Stryker Mako RPS Feb 2026', url: 'https://www.stryker.com', type: 'Company Claim', verified: true, deploymentType: 'Production' },
      { id: 'ev_mako_2', title: 'AAOS 2026 Announcements', url: 'https://www.stryker.com', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_ortho_cut', successLevel: 'Partial', confidenceScore: 92, evidenceIds: ['ev_mako_1', 'ev_mako_2'], notes: 'Mako RPS expands to handheld. Over 2M procedures performed with Mako system.' }
    ]
  },
  {
    id: 'figure-02',
    name: 'Figure 02',
    manufacturer: 'Figure AI',
    pricingModel: 'Pilot Pricing',
    availability: 'Available', // Retired, replaced by Figure 03
    deploymentCount: 'Deployed at BMW Spartanburg: 30,000+ X3 vehicles produced, 90,000+ parts loaded, 1,250+ hours runtime',
    description: 'Second-generation humanoid robot designed for commercial use. Successfully deployed at BMW Spartanburg assembly line from Jan-Nov 2025. Now officially retired; replaced by Figure 03. Demonstrated real manufacturing work but faced forearm reliability issues that informed Figure 03 redesign.',
    videoUrl: 'https://www.youtube.com/embed/FigureAI2024',
    limitations: [
      'Short battery life (approx 5 hours)',
      'Slow movement compared to specialized bots',
      'Forearm was top hardware failure point',
      'Requires high-bandwidth low-latency connection',
      'Retired as of Nov 2025'
    ],
    specs: {
      'Height': '5\'6"',
      'Payload': '20kg',
      'AI': 'OpenAI-powered vision/language',
      'DOF': '50 degrees of freedom',
      'Runtime at BMW': '1,250+ hours',
      'Parts Loaded': '90,000+',
      'Distance Traveled': '~200 miles (1.2M steps)',
      'Cycle Time Target': '84 seconds total'
    },
    evidence: [
      { id: 'ev_figure_1', title: 'Figure AI Production Results Nov 2025', url: 'https://www.figure.ai', type: 'Company Claim', verified: true, deploymentType: 'Production' },
      { id: 'ev_figure_2', title: 'BMW Group Press Release 2025', url: 'https://www.press.bmwgroup.com', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_figure_3', title: 'Humanoids Daily Nov 2025', url: 'https://www.humanoidsdaily.com', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_gen_nav', successLevel: 'Full', confidenceScore: 80, evidenceIds: ['ev_figure_1'], notes: 'Achieved 1.2M steps/200 miles in factory. Ran 10-hour shifts Monday-Friday.' },
      { taskId: 'task_gen_manipulate', successLevel: 'Partial', confidenceScore: 65, evidenceIds: ['ev_figure_1', 'ev_figure_3'], notes: 'Loaded 90,000+ sheet metal parts with 5mm tolerance. Forearm redesign informed Figure 03.' }
    ]
  },
  {
    id: 'agility-digit',
    name: 'Digit',
    manufacturer: 'Agility Robotics',
    pricingModel: '~$70k–$100k',
    availability: 'Available',
    deploymentCount: 'Commercial deployment at GXO Spanx facility (Georgia); 100,000+ totes moved as of Nov 2025',
    description: 'Bipedal humanoid robot purpose-built for warehouse and light-manufacturing environments. Achieved major milestone: 100,000+ tote moves in live commercial operation at GXO logistics facility - first humanoid to demonstrate real industrial throughput at scale.',
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
      'Milestone': '100,000+ totes moved (Nov 2025)',
      'Deployment': 'GXO Spanx facility, Flowery Branch, GA',
      'Runtime': 'Live commercial operation, not lab testing'
    },
    evidence: [
      { id: 'ev_digit_1', title: 'Agility Robotics Nov 2025', url: 'https://roboticsandautomationnews.com', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_digit_2', title: 'The Robot Report 2025', url: 'https://www.therobotreport.com', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_digit_3', title: 'Business Insider 2025', url: 'https://www.businessinsider.com', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_gen_nav', successLevel: 'Full', confidenceScore: 90, evidenceIds: ['ev_digit_1'], notes: 'Proven reliability across thousands of cycles in live warehouse environment.' },
      { taskId: 'task_gen_manipulate', successLevel: 'Full', confidenceScore: 75, evidenceIds: ['ev_digit_1', 'ev_digit_2'], notes: 'Moved 100,000+ totes in commercial operation, picking on/off AMRs and loading conveyors.' }
    ]
  },
  {
    id: 'carbon-robotics-weeder',
    name: 'LaserWeeder',
    manufacturer: 'Carbon Robotics',
    pricingModel: '$600K-$1.6M (depending on size)',
    availability: 'Available',
    deploymentCount: '150+ machines deployed across 100+ farms in 14 countries; shot 30+ billion weeds',
    description: 'Autonomous laser weeding robot. Uses AI to identify weeds and thermal energy to eliminate them without chemicals. Now offers 40-foot model for broad-acre organic corn/soybeans. Also launched Autonomous Tractor Kit (ATK) for converting existing John Deere tractors. Raised $20M in Series D-2 funding Nov 2025.',
    videoUrl: 'https://www.youtube.com/embed/WeedingBot',
    limitations: [
      'High power consumption',
      'Struggles in extremely muddy conditions',
      'Requires flat terrain for optimal speed',
      'Limited to specific crop types (now 100+ AI models)'
    ],
    specs: {
      'Speed': '0.5-1.5 acres/hour',
      'Lasers': '30 x 150W CO2 lasers (G2 model)',
      'Chemicals': '0% herbicide used',
      'Accuracy': 'Sub-millimeter',
      'AI Models': '100+ crop/weed models',
      'Weeds Killed': '30+ billion (as of 2025)',
      'Price': '$600K (6.5ft) to $1.6M (40ft)'
    },
    evidence: [
      { id: 'ev_carbon_1', title: 'Real Agriculture Nov 2025', url: 'https://www.realagriculture.com', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_carbon_2', title: 'GeekWire Nov 2025', url: 'https://www.geekwire.com', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_carbon_3', title: 'AgNet West March 2026', url: 'https://agnetwest.com', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_weed_id', successLevel: 'Superhuman', confidenceScore: 98, evidenceIds: ['ev_carbon_1', 'ev_carbon_2'], notes: '100+ AI models, 65M+ labeled plants. Large plant model enables generalization.' },
      { taskId: 'task_weed_eliminate', successLevel: 'Superhuman', confidenceScore: 98, evidenceIds: ['ev_carbon_1'], notes: 'Kills up to 99% of weeds, 5,000+ weeds/minute. Outperforms 75-person crew.' }
    ]
  },
  {
    id: 'monarch-tractor-mkv',
    name: 'MK-V',
    manufacturer: 'Monarch Tractor',
    pricingModel: '~$89,000 (pre-subsidy); eligible for $68,750 CORE subsidy in California',
    availability: 'Available',
    deploymentCount: '400+ tractors deployed globally; Autodrive launched for dairy feed pushing Feb 2025',
    description: 'World\'s first fully electric, driver-optional autonomous tractor. Launched Autodrive Feb 2025 - first commercially available fully autonomous feature in a driver-optional tractor. Now available for dairy feed pushing with expansion to indoor/covered dairies planned Summer 2025. Eligible for California CORE program subsidies up to $68,750.',
    videoUrl: 'https://www.youtube.com/embed/uLrullFkmZ4',
    limitations: [
      'Battery swaps required for all-day operation (6-10 min swap)',
      'Autonomy limited to mapped, known fields',
      'Implement compatibility requires Category I/II three-point hitch',
      'Autodrive initially for outdoor dairies only'
    ],
    specs: {
      'Power': '70 HP, 100% electric 4WD',
      'Battery Life': 'Up to 14 hours (XLR pack)',
      'Emissions': 'Zero tailpipe',
      'Platform': 'WingspanAI fleet management',
      'Autodrive': 'First commercially available fully autonomous (Feb 2025)',
      'CORE Subsidy': 'Up to $68,750 in California'
    },
    evidence: [
      { id: 'ev_monarch_1', title: 'Monarch Autodrive Launch Feb 2025', url: 'https://www.monarchtractor.com', type: 'Company Claim', verified: true, deploymentType: 'Production' },
      { id: 'ev_monarch_2', title: 'California CORE Program 2025', url: 'https://www.monarchtractor.com', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_monarch_3', title: 'Tractor News 2025', url: 'https://tractornews.com', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_tractor_nav', successLevel: 'Full', confidenceScore: 90, evidenceIds: ['ev_monarch_1', 'ev_monarch_3'], notes: 'Autodrive handles U-turn navigation in aisle headlands without driver. Expanding to covered dairies Summer 2025.' }
    ]
  },
  {
    id: 'stretch-boston-dynamics',
    name: 'Stretch',
    manufacturer: 'Boston Dynamics',
    pricingModel: 'Project-based (hardware + integration)',
    availability: 'Available',
    deploymentCount: 'DHL MOU for 1,000+ units by 2030; currently 7 live in North America, expanding to UK/Europe',
    description: 'Mobile case-handling robot purpose-built for logistics. DHL signed MOU May 2025 for 1,000+ additional Stretch robots by 2030 - the largest order in company history. Expanding from container unloading into case picking workflows.',
    videoUrl: 'https://www.youtube.com/embed/3Ka8AkZajsk',
    limitations: [
      'Optimized for case unloading; palletizing still in development',
      'Requires conveyor integration for downstream flow',
      'High integration and infrastructure adaptation costs',
      'Pricing not publicly disclosed'
    ],
    specs: {
      'Throughput': '600–800 cases/hour (up to 700 in DHL operations)',
      'Max Case Weight': '50 lbs',
      'Arm DOF': '7 degrees of freedom',
      'Recharge': '90% charge in < 2 hours',
      'DHL Deployment': '7 units live (2025), 20 planned by end of 2025'
    },
    evidence: [
      { id: 'ev_stretch_1', title: 'DHL MOU May 2025', url: 'https://group.dhl.com', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_stretch_2', title: 'The Robot Report May 2025', url: 'https://www.therobotreport.com', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_stretch_3', title: 'Modern Materials Handling May 2025', url: 'https://www.mmh.com', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_case_unload', successLevel: 'Full', confidenceScore: 95, evidenceIds: ['ev_stretch_1', 'ev_stretch_2'], notes: 'Achieved up to 700 cases/hour in DHL operations. MOU for 1,000+ units is largest robotic logistics deployment.' }
    ]
  },
  {
    id: 'simbe-tally',
    name: 'Tally 4.0',
    manufacturer: 'Simbe Robotics',
    pricingModel: 'Subscription (RaaS)',
    availability: 'Available',
    deploymentCount: 'Deployed across 10 countries, nearly a dozen retail sectors. 10-year anniversary Nov 2025.',
    description: 'Autonomous shelf-scanning robot. Launched Tally 4.0 Jan 2026 with 12-hour runtime (up from previous), enhanced vision, and edge AI. Celebrated 10 years Nov 2025 with 4.7M hours, 44.8B photos, 600M shelf gaps detected. Now operates in 10 countries across grocery, club, farm, home improvement.',
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
      'Runtime': 'Up to 12 hours (Tally 4.0)',
      'Photos Captured': '44.8 billion',
      'Shelf Gaps Detected': '600 million',
      'Price Tags Scanned': '18 billion',
      'Platform': 'NVIDIA AI infrastructure'
    },
    evidence: [
      { id: 'ev_tally_1', title: 'Simbe 10-Year Anniversary Nov 2025', url: 'https://www.simberobotics.com', type: 'Company Claim', verified: true, deploymentType: 'Production' },
      { id: 'ev_tally_2', title: 'Tally 4.0 Launch Jan 2026', url: 'https://www.supermarketnews.com', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_tally_3', title: 'Retail Tech Innovation Hub July 2025', url: 'https://retailtechinnovationhub.com', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_inv_scan', successLevel: 'Superhuman', confidenceScore: 98, evidenceIds: ['ev_tally_1', 'ev_tally_2'], notes: 'Scans shelves far faster and more accurately than human workers. 600M shelf gaps detected, 42% fixed instantly.' }
    ]
  },
  {
    id: 'knightscope-k5',
    name: 'K5',
    manufacturer: 'Knightscope',
    pricingModel: '~$70k–$80k/year (RaaS)',
    availability: 'Available',
    deploymentCount: 'Deployed at Microsoft, Uber, Sacramento Kings, NBC Universal, LaGuardia Airport, Ohio PD (2025)',
    description: 'Autonomous outdoor/indoor security robot. Upgraded Jan 2025 with enhanced autonomous navigation for larger environments (parking lots, logistics centers, auto auctions). Ohio PD became first police dept to adopt K5. 400+ employees as of 2025.',
    videoUrl: 'https://www.youtube.com/embed/IwPrbj696Ig',
    limitations: [
      'Cannot physically intervene or detain individuals',
      'Limited to pre-mapped patrol routes',
      'Battery limits to 2.5-3 hours between charges',
      'Has faced public skepticism in high-profile trials'
    ],
    specs: {
      'Speed': 'Up to 3 mph',
      'Weight': '300-400 lbs',
      'Cameras': '360° UHD + Thermal',
      'Sensors': 'LiDAR (×13), sonar, license plate recognition',
      '2025 Upgrade': 'Enhanced ML + sensor fusion for larger areas',
      'Cost': '~$7/hour rental'
    },
    evidence: [
      { id: 'ev_k5_1', title: 'Knightscope K5 Upgrade Jan 2025', url: 'https://www.businesswire.com', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_k5_2', title: 'OnOff Security Robots 2026', url: 'https://www.onoff.gr', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_sec_patrol', successLevel: 'Full', confidenceScore: 92, evidenceIds: ['ev_k5_1'], notes: 'Upgraded for larger environments. Ohio PD first police deployment.' },
      { taskId: 'task_sec_observe', successLevel: 'Partial', confidenceScore: 75, evidenceIds: ['ev_k5_2'], notes: 'Excellent sensor suite, but AI threat detection still yields false positives.' }
    ]
  },
  {
    id: 'tesla-optimus',
    name: 'Optimus Gen 2',
    manufacturer: 'Tesla',
    pricingModel: 'Purchase ($150k estimated)',
    availability: 'Concept',
    deploymentCount: 'Early prototypes; voluntary demonstrations at Tesla events 2024-2025',
    description: 'Tesla\'s humanoid robot designed for manufacturing and domestic tasks. Gen 2 shown Dec 2024 with improved dexterity. Elon Musk aims for sub-$20K price point. Uses Tesla\'s AI compute (Dojo) and neural networks. Still in development, no commercial deployment.',
    videoUrl: 'https://www.youtube.com/embed/demo',
    limitations: [
      'Early prototype stage, no commercial availability',
      'Dexterity limitations vs human workers',
      'No clear timeline for production',
      'High cost to manufacture at scale'
    ],
    specs: {
      'Height': '5\'8"',
      'Weight': '57 kg (125 lbs)',
      'Payload': '20 kg',
      'Speed': '5 mph',
      'Hands': '11 DOF, human-like manipulation',
      'Target Price': '<$20,000'
    },
    evidence: [
      { id: 'ev_opt_1', title: 'Tesla AI Day 2024', url: 'https://tesla.com', type: 'Company Claim', verified: true, deploymentType: 'Demo' }
    ],
    capabilities: [
      { taskId: 'task_gen_nav', successLevel: 'Partial', confidenceScore: 40, evidenceIds: ['ev_opt_1'], notes: 'Can walk independently, improving from Gen 1.' },
      { taskId: 'task_gen_manipulate', successLevel: 'Partial', confidenceScore: 35, evidenceIds: ['ev_opt_1'], notes: 'Improved hand dexterity, can handle eggs and delicate objects.' }
    ]
  },
  {
    id: 'boston-dynamics-atlas',
    name: 'Electric Atlas',
    manufacturer: 'Boston Dynamics',
    pricingModel: 'Not publicly available',
    availability: 'Pilot',
    deploymentCount: 'Hyundai facility testing; first production deployment planned 2025',
    description: 'Next-gen humanoid robot, fully electric. Announced April 2024, designed for real-world work. Hyundai (owner) investing $21B in US, planning "tens of thousands" of robots. First industrial deployment at Hyundai facilities.',
    videoUrl: 'https://www.youtube.com/embed/atlas-electric',
    limitations: [
      'Not yet commercially available',
      'Limited real-world testing data',
      'High cost',
      'Requires substantial infrastructure'
    ],
    specs: {
      'Height': '6\'0"',
      'Payload': '25 kg',
      'Battery': 'Electric (vs hydraulic)',
      'DOF': 'Human-like range of motion'
    },
    evidence: [
      { id: 'ev_atlas_1', title: 'Boston Dynamics Atlas Announcement 2024', url: 'https://bostondynamics.com', type: 'Company Claim', verified: true, deploymentType: 'Pilot' }
    ],
    capabilities: [
      { taskId: 'task_gen_nav', successLevel: 'Full', confidenceScore: 75, evidenceIds: ['ev_atlas_1'], notes: 'Advanced bipedal locomotion from hydraulic Atlas.' },
      { taskId: 'task_gen_manipulate', successLevel: 'Partial', confidenceScore: 60, evidenceIds: ['ev_atlas_1'], notes: 'Designed for practical manipulation tasks.' }
    ]
  },
  {
    id: 'apptronik-apollo',
    name: 'Apollo',
    manufacturer: 'Apptronik',
    pricingModel: '$150,000 (pilot pricing)',
    availability: 'Available',
    deploymentCount: 'Pilot at GXO logistics; Mercedes-Benz pilot announced 2024',
    description: 'Humanoid robot for logistics and manufacturing. Signed $350M Series A Feb 2025. GXO deploying in warehouses. Mercedes-Benz pilot for manufacturing. Focus on reliable, supervised autonomy in structured environments.',
    videoUrl: 'https://www.youtube.com/embed/apollo',
    limitations: [
      'Limited payload (25 kg)',
      'Requires human supervision',
      'Early commercial stage',
      'Structured environments only'
    ],
    specs: {
      'Height': '5\'7"',
      'Weight': '140 lbs',
      'Payload': '55 lbs (25 kg)',
      'Runtime': '4 hours',
      'Price': '$150,000 pilot'
    },
    evidence: [
      { id: 'ev_apollo_1', title: 'Apptronik Series A Feb 2025', url: 'https://apptronik.com', type: 'Company Claim', verified: true, deploymentType: 'Pilot' }
    ],
    capabilities: [
      { taskId: 'task_gen_nav', successLevel: 'Full', confidenceScore: 70, evidenceIds: ['ev_apollo_1'], notes: 'Reliable bipedal navigation for warehouse environments.' },
      { taskId: 'task_gen_manipulate', successLevel: 'Partial', confidenceScore: 60, evidenceIds: ['ev_apollo_1'], notes: 'Designed for palletizing, picking in logistics.' }
    ]
  },
  {
    id: 'amazon-astro',
    name: 'Astro',
    manufacturer: 'Amazon',
    pricingModel: '$1,599 (purchase)',
    availability: 'Available',
    deploymentCount: 'Limited US rollout; Invite-only initially',
    description: 'Home robot for home monitoring, Alexa integration. Rolls on wheels, has periscope camera. Not a security patrol robot but home assistant.',
    videoUrl: 'https://www.youtube.com/embed/amazon-astro',
    limitations: ['Indoor use only', 'Not designed for security intervention', 'Limited autonomous capability in complex homes'],
    specs: { 'Weight': '20.6 lbs', 'Cameras': '2 + periscope', 'Display': '10" tablet', 'Price': '$1,599' },
    evidence: [{ id: 'ev_astro_1', title: 'Amazon Astro product page', url: 'https://amazon.com', type: 'Company Claim', verified: true, deploymentType: 'Production' }],
    capabilities: [
      { taskId: 'task_sec_patrol', successLevel: 'Partial', confidenceScore: 50, evidenceIds: ['ev_astro_1'], notes: 'Home monitoring, not security intervention.' },
      { taskId: 'task_sec_observe', successLevel: 'Partial', confidenceScore: 60, evidenceIds: ['ev_astro_1'], notes: 'Can identify family members, send alerts.' }
    ]
  },
  {
    id: 'serve-robotics',
    name: 'Serve Autonomous Robot',
    manufacturer: 'Serve Robotics',
    pricingModel: 'RaaS ($2-3/delivery)',
    availability: 'Available',
    deploymentCount: '2,000+ robots deployed - largest US sidewalk fleet; 99.8% completion rate',
    description: 'Autonomous sidewalk delivery robot. Deployed in LA, Atlanta, Dallas, Miami, Chicago. Level 4 autonomy, operates on sidewalks and intersections. Partnered with Uber Eats, 7-Eleven. 20x fleet growth in 2025.',
    videoUrl: 'https://www.youtube.com/embed/serve',
    limitations: ['Payload limited to small parcels', 'Weather dependent', 'Sidewalk infrastructure required'],
    specs: { 'Payload': '~10 kg', 'Speed': 'Walking pace', 'Autonomy': 'Level 4', 'Fleet': '2,000+ (2025)', 'Markets': '7 US cities' },
    evidence: [
      { id: 'ev_serve_1', title: 'Serve Robotics Dec 2025', url: 'https://globenewswire.com', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_case_unload', successLevel: 'Full', confidenceScore: 95, evidenceIds: ['ev_serve_1'], notes: '2,000 robots, millions of deliveries, 99.8% completion rate.' }
    ]
  },
  {
    id: 'starship-delivery',
    name: 'Starship Delivery Robot',
    manufacturer: 'Starship Technologies',
    pricingModel: 'RaaS',
    availability: 'Available',
    deploymentCount: '8M+ deliveries across US and Europe campuses',
    description: 'Pioneer in sidewalk delivery robots. Six-wheeled autonomous delivery. Operations across 50+ campuses in US/Europe. 600+ employees.',
    videoUrl: 'https://www.youtube.com/embed/starship',
    limitations: ['Payload 10 kg', 'Campus limited', 'Speed limited'],
    specs: { 'Payload': '10 kg', 'Wheels': '6', 'Deliveries': '8M+' },
    evidence: [{ id: 'ev_starship_1', title: 'Starship 2025', url: 'https://starship.xyz', type: 'Company Claim', verified: true, deploymentType: 'Production' }],
    capabilities: [{ taskId: 'task_case_unload', successLevel: 'Full', confidenceScore: 90, evidenceIds: ['ev_starship_1'], notes: '8M+ deliveries proven at scale.' }]
  },
  {
    id: 'kiwibot',
    name: 'Kiwibot 4.0',
    manufacturer: 'Kiwibot',
    pricingModel: 'RaaS',
    availability: 'Available',
    deploymentCount: 'Campus networks, DoorDash/Grubhub partnerships',
    description: 'Colorful sidewalk delivery robots for campus and urban delivery. Rebranding to Robot.com. Active in US and Spain.',
    videoUrl: 'https://www.youtube.com/embed/kiwibot',
    limitations: ['Payload 10 kg', 'Campus focused', 'Partnership dependent'],
    specs: { 'Payload': '10 kg', 'Model': '4.0', 'Partners': 'DoorDash, Grubhub' },
    evidence: [{ id: 'ev_kiwi_1', title: 'Kiwibot 2025', url: 'https://kiwibot.com', type: 'Company Claim', verified: true, deploymentType: 'Production' }],
    capabilities: [{ taskId: 'task_case_unload', successLevel: 'Full', confidenceScore: 85, evidenceIds: ['ev_kiwi_1'], notes: 'Campus scale deployment.' }]
  },
  {
    id: 'neolix',
    name: 'Neolix Autonomous Van',
    manufacturer: 'Neolix',
    pricingModel: 'Sale/RaaS',
    availability: 'Available',
    deploymentCount: 'Deployed in Dubai, Beijing, Europe',
    description: 'Autonomous delivery van, larger than sidewalk robots. Carries up to 200 kg. Multiple cities including Dubai smart city.',
    videoUrl: 'https://www.youtube.com/embed/neolix',
    limitations: ['Road legal required', 'Larger footprint', 'Higher cost'],
    specs: { 'Payload': '200 kg', 'Type': 'Autonomous van', 'Markets': 'Dubai, Beijing, Europe' },
    evidence: [{ id: 'ev_neolix_1', title: 'Neolix 2025', url: 'https://neolix.cn', type: 'Company Claim', verified: true, deploymentType: 'Production' }],
    capabilities: [{ taskId: 'task_case_unload', successLevel: 'Full', confidenceScore: 88, evidenceIds: ['ev_neolix_1'], notes: 'Heavier payload delivery across cities.' }]
  },
  {
    id: 'doordash-dot',
    name: 'Dot',
    manufacturer: 'DoorDash',
    pricingModel: 'Platform integrated',
    availability: 'Pilot',
    deploymentCount: 'Early access program Tempe/Mesa Arizona Sep 2025',
    description: 'First commercial robot built to travel on bike lanes, roads, sidewalks, driveways. One-tenth car size, 20 mph. In-house by DoorDash Labs. Integrates with autonomous delivery platform.',
    videoUrl: 'https://www.youtube.com/embed/doordash-dot',
    limitations: ['Early pilot', 'Single market', 'Road infrastructure needed'],
    specs: { 'Speed': '20 mph', 'Size': '1/10 car', 'Platform': 'Autonomous Delivery Platform' },
    evidence: [{ id: 'ev_dot_1', title: 'DoorDash Dot Sep 2025', url: 'https://doordash.com', type: 'News', verified: true, deploymentType: 'Pilot' }],
    capabilities: [{ taskId: 'task_case_unload', successLevel: 'Full', confidenceScore: 80, evidenceIds: ['ev_dot_1'], notes: 'New platform - multi-modal (bike lanes, roads, sidewalks).' }]
  },
  {
    id: 'brightpick-autopicker',
    name: 'Autopicker',
    manufacturer: 'Brightpick',
    pricingModel: 'RaaS',
    availability: 'Available',
    deploymentCount: '73 robots at Denver distribution center - 83% labor reduction',
    description: 'AI-powered mobile manipulator for warehouse picking. 83% labor reduction (120 FTEs to 20 per shift). Lights-out overnight operations. Autopicker 2.0 launched June 2025. Gridpicker announced March 2026 - 2x throughput.',
    videoUrl: 'https://www.youtube.com/embed/brightpick',
    limitations: ['Requires warehouse environment', 'High deployment cost', 'Integration complexity'],
    specs: { 'Deployment': '73 robots Denver', 'Labor Reduction': '83%', 'Runtime': '24/7', 'Throughput': 'High' },
    evidence: [
      { id: 'ev_brightpick_1', title: 'Brightpick Dec 2025', url: 'https://brightpick.ai', type: 'News', verified: true, deploymentType: 'Production' },
      { id: 'ev_brightpick_2', title: 'Gridpicker Mar 2026', url: 'https://brightpick.ai', type: 'News', verified: true, deploymentType: 'Production' }
    ],
    capabilities: [
      { taskId: 'task_wh_grasp', successLevel: 'Full', confidenceScore: 95, evidenceIds: ['ev_brightpick_1'], notes: '83% labor reduction proven at scale.' }
    ]
  },
  {
    id: 'galbot-g1',
    name: 'G1 Mobile Manipulator',
    manufacturer: 'Galbot',
    pricingModel: '$300M funding round, $3B valuation',
    availability: 'Available',
    deploymentCount: '24/7 operations in multiple warehouse locations; hospital deployments at Xuanwu',
    description: 'Mobile manipulator with human-like torso, two arms, mobile base. $300M funding Nov 2025, $800M total. Deployed in warehouses 24/7 for over a year. Also Galbot Store retail system. Partnered with CATL, Xuanwu Hospital.',
    videoUrl: 'https://www.youtube.com/embed/galbot',
    limitations: ['Early commercial', 'High valuation may not match revenue', 'Complex environments'],
    specs: { 'Model': 'G1', 'Funding': '$300M (Nov 2025)', 'Valuation': '$3B', 'Operations': '24/7' },
    evidence: [{ id: 'ev_galbot_1', title: 'Galbot Funding Nov 2025', url: 'https://therobotreport.com', type: 'News', verified: true, deploymentType: 'Production' }],
    capabilities: [
      { taskId: 'task_gen_manipulate', successLevel: 'Full', confidenceScore: 85, evidenceIds: ['ev_galbot_1'], notes: 'Human-like arms + mobile base for warehouse automation.' }
    ]
  },
  {
    id: 'fendt-xaver',
    name: 'Xaver GT',
    manufacturer: 'Fendt (AGCO)',
    pricingModel: 'Purchase ($100k estimated)',
    availability: 'Concept',
    deploymentCount: 'Agritechnica 2025 world premiere',
    description: 'Fully autonomous field robot for mechanical weed control. Diesel-electric serial hybrid, 25kW generator. Mid-mount implement position for hoeing, harrowing. 3 tonne light weight reduces soil compaction. AI-based RowPilot for crop/weed differentiation.',
    videoUrl: 'https://www.youtube.com/embed/fendt-xaver',
    limitations: ['Concept stage', 'No pricing', 'No launch date'],
    specs: { 'Weight': '3 tonnes', 'Power': '25kW hybrid', 'Implement': 'Mid-mount', 'AI': 'RowPilot' },
    evidence: [{ id: 'ev_fendt_1', title: 'Agritechnica 2025', url: 'https://fendt.com', type: 'News', verified: true, deploymentType: 'Demo' }],
    capabilities: [{ taskId: 'task_weed_eliminate', successLevel: 'Full', confidenceScore: 75, evidenceIds: ['ev_fendt_1'], notes: 'Mechanical weeding - camera AI distinguishes crop from weeds.' }]
  },
  {
    id: 'john-deere-autonomy',
    name: 'John Deere Autonomy 2.0',
    manufacturer: 'John Deere',
    pricingModel: 'Kit + tractor',
    availability: 'Available',
    deploymentCount: 'Commercial availability 2025 for 8R/9R tractors',
    description: 'Complete autonomous system for tractors. Refreshed Jan 2025 as Autonomy 2.0. Compatible with 2022+ 8R and 9R tractors. Tillage implements supported.',
    videoUrl: 'https://www.youtube.com/embed/john-deere',
    limitations: ['Requires compatible tractor', 'High cost', 'Large farms only'],
    specs: { 'Compatibility': '8R (2022+), 9R (2022+)', 'Features': 'Full autonomy', 'Launch': 'Jan 2025' },
    evidence: [{ id: 'ev_jd_1', title: 'John Deere Autonomy 2.0 Jan 2025', url: 'https://johndeere.com', type: 'Company Claim', verified: true, deploymentType: 'Production' }],
    capabilities: [{ taskId: 'task_tractor_nav', successLevel: 'Full', confidenceScore: 90, evidenceIds: ['ev_jd_1'], notes: 'Full tractor autonomy for large-scale farming.' }]
  },
  {
    id: 'geek-robots',
    name: 'Geek+ AMR',
    manufacturer: 'Geek+',
    pricingModel: 'RaaS',
    availability: 'Available',
    deploymentCount: '#1 global AMR market share - 48.5% goods-to-person',
    description: 'Chinese warehouse robotics leader. #1 global AMR market share 7 consecutive years. Picking, sorting, pallet handling robots. Operations in major e-commerce warehouses globally.',
    videoUrl: 'https://www.youtube.com/embed/geek',
    limitations: ['China-focused initially', 'Complex integration', 'Competition from others'],
    specs: { 'Market Share': '48.5% goods-to-person', 'Products': 'Picking, Sorting, Pallet' },
    evidence: [{ id: 'ev_geek_1', title: 'Geek+ 2026', url: 'https://geekplus.com', type: 'Company Claim', verified: true, deploymentType: 'Production' }],
    capabilities: [{ taskId: 'task_wh_nav', successLevel: 'Superhuman', confidenceScore: 98, evidenceIds: ['ev_geek_1'], notes: '#1 AMR globally - proven at scale.' }]
  },
  {
    id: 'greyorange',
    name: 'GreyOrange Butler',
    manufacturer: 'GreyOrange',
    pricingModel: 'RaaS',
    availability: 'Available',
    deploymentCount: 'AI-powered warehouse automation globally',
    description: 'AI-powered warehouse robotics. Focus on end-to-end order automation. Large logistics deployments. Competes with Geek+ in e-commerce fulfillment.',
    videoUrl: 'https://www.youtube.com/embed/greyorange',
    limitations: ['Large scale required', 'High integration cost', 'Competitive market'],
    specs: { 'Focus': 'AI-powered fulfillment', 'Market': 'Global' },
    evidence: [{ id: 'ev_grey_1', title: 'GreyOrange 2025', url: 'https://greyorange.com', type: 'Company Claim', verified: true, deploymentType: 'Production' }],
    capabilities: [{ taskId: 'task_wh_nav', successLevel: 'Full', confidenceScore: 92, evidenceIds: ['ev_grey_1'], notes: 'AI-powered warehouse automation.' }]
  },
  {
    id: 'mir-mobile',
    name: 'MC600 Mobile Manipulator',
    manufacturer: 'Mobile Industrial Robots (MiR)',
    pricingModel: 'Sale',
    availability: 'Available',
    deploymentCount: '2025 RBR50 Robotics Innovation Award winner',
    description: 'Combines MiR600 AMR with UR20/UR30 collaborative arms from Universal Robots. Industrial-grade collaborative mobile manipulator. Teradyne owned.',
    videoUrl: 'https://www.youtube.com/embed/mir',
    limitations: ['Industrial focus', 'High cost', 'Limited SMB appeal'],
    specs: { 'Base': 'MiR600', 'Arm': 'UR20/UR30', 'Award': 'RBR50 2025' },
    evidence: [{ id: 'ev_mir_1', title: 'MiR MC600 2025', url: 'https://mobile-industrial-robots.com', type: 'News', verified: true, deploymentType: 'Production' }],
    capabilities: [{ taskId: 'task_gen_manipulate', successLevel: 'Full', confidenceScore: 88, evidenceIds: ['ev_mir_1'], notes: 'Industrial mobile manipulator.' }]
  },
  {
    id: 'nuro',
    name: 'Nuro R3',
    manufacturer: 'Nuro',
    pricingModel: 'RaaS',
    availability: 'Available',
    deploymentCount: 'Road-based delivery in 25+ US markets',
    description: 'Road-based autonomous delivery vehicle. Larger than sidewalk robots, operates on roads. 15,000+ deliveries daily in US. Partnership with Uber, Domino\'s, Walmart.',
    videoUrl: 'https://www.youtube.com/embed/nuro',
    limitations: ['Road legal required', 'Regulatory challenges', 'Higher speed = more scrutiny'],
    specs: { 'Type': 'Road vehicle', 'Deliveries': '15,000+/day', 'Markets': '25+' },
    evidence: [{ id: 'ev_nuro_1', title: 'Nuro 2025', url: 'https://nuro.ai', type: 'Company Claim', verified: true, deploymentType: 'Production' }],
    capabilities: [{ taskId: 'task_case_unload', successLevel: 'Full', confidenceScore: 90, evidenceIds: ['ev_nuro_1'], notes: 'Road-based delivery at scale.' }]
  },
  {
    id: 'ecorobotix',
    name: 'Ecorobotix',
    manufacturer: 'Ecorobotix',
    pricingModel: 'Sale',
    availability: 'Available',
    deploymentCount: '$150M+ funding, solar-powered weeding',
    description: 'Swiss solar-powered autonomous weeding robot. Ultra-light (90kg),太阳能 powered. Precision spraying with AI plant detection. For row crops, vegetables, vineyards.',
    videoUrl: 'https://www.youtube.com/embed/ecorobotix',
    limitations: ['Solar dependent', 'Smaller payload', 'European focus'],
    specs: { 'Weight': '90 kg', 'Power': 'Solar', 'Funding': '$150M+' },
    evidence: [{ id: 'ev_eco_1', title: 'Ecorobotix 2025', url: 'https://ecorobotix.com', type: 'Company Claim', verified: true, deploymentType: 'Production' }],
    capabilities: [{ taskId: 'task_weed_eliminate', successLevel: 'Superhuman', confidenceScore: 90, evidenceIds: ['ev_eco_1'], notes: 'Solar-powered precision weeding.' }]
  },
  {
    id: 'saga-robotics',
    name: 'Thorvald',
    manufacturer: 'Saga Robotics',
    pricingModel: 'Sale',
    availability: 'Available',
    deploymentCount: 'Strawberry farms, vineyards - multiple countries',
    description: 'Norwegian robotics company. Thorvald robot for strawberry picking and greenhouse work. Multipurpose agricultural robot. Multiple deployments in Europe and US.',
    videoUrl: 'https://www.youtube.com/embed/saga',
    limitations: ['Crop specific', 'Greenhouse focus', 'Limited scale'],
    specs: { 'Model': 'Thorvald', 'Crops': 'Strawberry, vineyard' },
    evidence: [{ id: 'ev_saga_1', title: 'Saga Robotics 2025', url: 'https://sagarobotics.no', type: 'Company Claim', verified: true, deploymentType: 'Production' }],
    capabilities: [{ taskId: 'task_weed_eliminate', successLevel: 'Full', confidenceScore: 80, evidenceIds: ['ev_saga_1'], notes: 'Strawberry picking and greenhouse automation.' }]
  },
  {
    id: 'swarmfarm',
    name: 'SwarmBot',
    manufacturer: 'SwarmFarm Robotics',
    pricingModel: 'Sale',
    availability: 'Available',
    deploymentCount: 'Australian farms, $30M+ funding',
    description: 'Australian agricultural robot company. SwarmBot for autonomous spraying and weeding. Focus on broadacre farming. Multiple deployments in Australian wheat farms.',
    videoUrl: 'https://www.youtube.com/embed/swarmfarm',
    limitations: ['Australia focus', 'Broadacre only', 'Smaller scale'],
    specs: { 'Model': 'SwarmBot', 'Focus': 'Broadacre', 'Funding': '$30M+' },
    evidence: [{ id: 'ev_swarm_1', title: 'SwarmFarm 2025', url: 'https://swarmfarm.com', type: 'Company Claim', verified: true, deploymentType: 'Production' }],
    capabilities: [{ taskId: 'task_weed_eliminate', successLevel: 'Full', confidenceScore: 82, evidenceIds: ['ev_swarm_1'], notes: 'Australian broadacre autonomous spraying.' }]
  },
  {
    id: 'dexterity-truck',
    name: 'Dexterity Mech',
    manufacturer: 'Dexterity',
    pricingModel: 'RaaS',
    availability: 'Available',
    deploymentCount: 'Production deployments for truck loading',
    description: 'Physical AI for industrial robotics. Dual-armed "superhumanoid" robot Mech for truck loading. Foresight world model. 100M+ autonomous actions in production. Truck loading/unloading, palletizing.',
    videoUrl: 'https://www.youtube.com/embed/dexterity',
    limitations: ['Narrow focus (truck loading)', 'Complex environment', 'Safety concerns'],
    specs: { 'Product': 'Mech', 'AI': 'Foresight world model', 'Actions': '100M+' },
    evidence: [{ id: 'ev_dex_1', title: 'Dexterity Mar 2026', url: 'https://dexterity.ai', type: 'News', verified: true, deploymentType: 'Production' }],
    capabilities: [
      { taskId: 'task_case_unload', successLevel: 'Full', confidenceScore: 92, evidenceIds: ['ev_dex_1'], notes: 'Dual-arm robot for truck loading - 100M+ actions.' }
    ]
  },
  {
    id: 'jungheinrich-eac',
    name: 'EAC 212a',
    manufacturer: 'Jungheinrich',
    pricingModel: 'Sale/RaaS',
    availability: 'Available',
    deploymentCount: 'Launch H2 2026',
    description: 'Autonomous mobile robot for high-lift transport. Handles pallets up to 1,200 kg. LiDAR contour-based navigation, AI 3D pallet detection. VDA 5050 compatible. Launch Q2 2026.',
    videoUrl: 'https://www.youtube.com/embed/jungheinrich',
    limitations: ['Q2 2026 launch', 'High payload requires scale', 'European focus'],
    specs: { 'Payload': '1,200 kg', 'Speed': '6 km/h', 'Launch': 'H2 2026' },
    evidence: [{ id: 'ev_jung_1', title: 'Jungheinrich Feb 2026', url: 'https://jungheinrich.com', type: 'News', verified: true, deploymentType: 'Production' }],
    capabilities: [{ taskId: 'task_gen_nav', successLevel: 'Full', confidenceScore: 85, evidenceIds: ['ev_jung_1'], notes: 'High-lift pallet transport autonomous.' }]
  },
  {
    id: 'quasi-c2',
    name: 'Model C2 PartPorter',
    manufacturer: 'Quasi Robotics',
    pricingModel: 'Sale',
    availability: 'Available',
    deploymentCount: 'Industrial deployments - woodworking, fabrication',
    description: 'Purpose-built for large flat materials (panels, sheets, doors). Quasi AI v3 navigation. 22 ToF sensors + IR. 16 hour battery. For woodworking, cabinetry, metal fabrication.',
    videoUrl: 'https://www.youtube.com/embed/quasi',
    limitations: ['Niche industrial focus', 'Specialized payload', 'Limited market'],
    specs: { 'Payload': 'Industrial', 'Sensors': '22 ToF + IR', 'Battery': '16 hours' },
    evidence: [{ id: 'ev_quasi_1', title: 'Quasi Robotics Jan 2026', url: 'https://quasi.ai', type: 'News', verified: true, deploymentType: 'Production' }],
    capabilities: [{ taskId: 'task_gen_nav', successLevel: 'Full', confidenceScore: 88, evidenceIds: ['ev_quasi_1'], notes: 'Specialized for large flat material transport.' }]
  }
];
