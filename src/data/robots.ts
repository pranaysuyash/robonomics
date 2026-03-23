import { Robot } from '../types';

export const robots: Robot[] = [
  // ── Food Service ──────────────────────────────────────────────────────────
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

  // ── Construction ──────────────────────────────────────────────────────────
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
    id: 'dusty-fieldprinter',
    name: 'FieldPrinter 2',
    manufacturer: 'Dusty Robotics',
    profession: 'Construction',
    subProfession: 'Layout Printing',
    price: 'Subscription (RaaS)',
    availability: 'Available',
    autonomyScore: 90,
    taskCoverage: 70,
    videoUrl: 'https://www.youtube.com/embed/xIb_yiOHjWY',
    description: 'Autonomous construction layout robot that prints BIM data directly onto jobsite floors. Enables accurate placement for walls, plumbing, and electrical at 10x manual speed.',
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
    deploymentCount: 'Deployed on major commercial construction projects across USA',
    sources: ['Dusty Robotics', 'TechCrunch 2024', 'Springer Research 2025']
  },

  // ── Maintenance ───────────────────────────────────────────────────────────
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

  // ── Medical ───────────────────────────────────────────────────────────────
  {
    id: 'davinci-5',
    name: 'Da Vinci 5',
    manufacturer: 'Intuitive Surgical',
    profession: 'Medical',
    subProfession: 'Minimally Invasive Surgery',
    price: '$2.5M + $3k/procedure',
    availability: 'Available',
    autonomyScore: 20,
    taskCoverage: 95,
    videoUrl: 'https://www.youtube.com/embed/daVinciDemo',
    description: 'The gold standard in robotic-assisted surgery. Provides surgeons with enhanced vision, precision, and control for minimally invasive soft-tissue procedures.',
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
    id: 'stryker-mako',
    name: 'Mako SmartRobotics',
    manufacturer: 'Stryker',
    profession: 'Medical',
    subProfession: 'Orthopedic Surgery',
    price: '$800k–$1.4M',
    availability: 'Available',
    autonomyScore: 25,
    taskCoverage: 85,
    videoUrl: 'https://www.youtube.com/embed/c10j-IzdAoU',
    description: 'Robotic-arm-assisted orthopedic surgery system. Uses CT-based 3D planning and AccuStop haptic feedback to guide surgeons in precise bone cutting for knee and hip replacements.',
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
    deploymentCount: 'Market leader in robotic orthopedics; thousands of units in US hospitals',
    sources: ['Stryker Investor Relations', 'MedTech Dive 2025', 'AAOS 2025']
  },

  // ── Manufacturing ─────────────────────────────────────────────────────────
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
    id: 'agility-digit',
    name: 'Digit',
    manufacturer: 'Agility Robotics',
    profession: 'Manufacturing',
    subProfession: 'Intralogistics & Warehouse Labor',
    price: '~$70k–$100k',
    availability: 'Available',
    autonomyScore: 70,
    taskCoverage: 45,
    videoUrl: 'https://www.youtube.com/embed/wE_XDbkVOp0',
    description: 'Bipedal humanoid robot purpose-built for warehouse and light-manufacturing environments. Navigates stairs/ramps and moves totes between AMRs and conveyors — tasks fixed robots cannot reach.',
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
    deploymentCount: 'Active pilots at Amazon and GXO Logistics; first humanoid robot factory (RoboFab) operational',
    sources: ['Agility Robotics Press 2024', 'CNBC RoboFab Report', 'MODEX 2024']
  },
  {
    id: 'apptronik-apollo',
    name: 'Apollo',
    manufacturer: 'Apptronik',
    profession: 'Manufacturing',
    subProfession: 'Factory & Logistics Operations',
    price: 'Pilot Pricing (~$20k–$30k target)',
    availability: 'Pilot',
    autonomyScore: 55,
    taskCoverage: 50,
    videoUrl: 'https://www.youtube.com/embed/FHlCiM4KNWM',
    description: 'General-purpose humanoid robot designed for real-world factory and logistics work. Features modular hot-swappable batteries and proprietary linear actuators refined over 13+ generations.',
    limitations: [
      'Battery life 4 hours per pack (hot-swappable)',
      'Walking speed limited to ~1.5 m/s',
      'Complex dexterous manipulation still maturing',
      'Pricing not yet publicly finalized'
    ],
    specs: {
      'Height': '5\'8"',
      'Payload': '55 lbs (25 kg)',
      'DOF': '29–44+',
      'Battery': 'Hot-swappable 4 hr packs'
    },
    deploymentCount: 'Pilots at Mercedes-Benz, GXO Logistics, and Jabil; $400M+ raised (Google, NVIDIA)',
    sources: ['Apptronik CES 2025', 'Advanced Manufacturing 2024', 'The Robot Report 2024']
  },

  // ── Agriculture ───────────────────────────────────────────────────────────
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
  },
  {
    id: 'monarch-tractor-mkv',
    name: 'MK-V',
    manufacturer: 'Monarch Tractor',
    profession: 'Agriculture',
    subProfession: 'Autonomous Tractor',
    price: '~$89,000 (pre-subsidy)',
    availability: 'Available',
    autonomyScore: 80,
    taskCoverage: 70,
    videoUrl: 'https://www.youtube.com/embed/uLrullFkmZ4',
    description: 'World\'s first fully electric, driver-optional autonomous tractor. Operates autonomously or in "shadow mode" following a worker, with 360-degree obstacle avoidance and WingspanAI data platform.',
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
    deploymentCount: '400+ tractors deployed (US, Canada, EU, New Zealand); 42,000+ autonomous operating hours',
    sources: ['Monarch Tractor 2024', 'Fast Company Most Innovative 2024', 'AgFunder News']
  },

  // ── Logistics ─────────────────────────────────────────────────────────────
  {
    id: 'stretch-boston-dynamics',
    name: 'Stretch',
    manufacturer: 'Boston Dynamics',
    profession: 'Logistics',
    subProfession: 'Warehouse Unloading & Case Handling',
    price: 'Project-based (hardware + integration)',
    availability: 'Available',
    autonomyScore: 85,
    taskCoverage: 75,
    videoUrl: 'https://www.youtube.com/embed/3Ka8AkZajsk',
    description: 'Mobile case-handling robot purpose-built for logistics. Autonomously unloads trailers and processes cases onto conveyors using a 7-DOF arm and AI-driven computer vision — no fixed infrastructure required.',
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
    deploymentCount: '1,000+ units committed (DHL global partnership); deployments at Gap Inc., Arvato',
    sources: ['Boston Dynamics 2025', 'DHL Press Release 2025', 'Silicon Review 2025']
  },

  // ── Retail ────────────────────────────────────────────────────────────────
  {
    id: 'simbe-tally',
    name: 'Tally 4.0',
    manufacturer: 'Simbe Robotics',
    profession: 'Retail',
    subProfession: 'Inventory Management',
    price: 'Subscription (RaaS)',
    availability: 'Available',
    autonomyScore: 92,
    taskCoverage: 80,
    videoUrl: 'https://www.youtube.com/embed/lxcgKF9N17A',
    description: 'Autonomous shelf-scanning robot that turns retail shelves into real-time data infrastructure. Uses edge AI (NVIDIA) to continuously monitor inventory levels, pricing accuracy, and merchandising compliance.',
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
    deploymentCount: '~1,000 stores across Schnucks, Wakefern/ShopRite, BJ\'s Wholesale, SpartanNash',
    sources: ['Simbe Robotics 2025', 'Fast Company Most Innovative 2025', 'Shelby Report 2025']
  },

  // ── Security ──────────────────────────────────────────────────────────────
  {
    id: 'knightscope-k5',
    name: 'K5',
    manufacturer: 'Knightscope',
    profession: 'Security',
    subProfession: 'Autonomous Security Patrol',
    price: '~$70k–$80k/year (RaaS)',
    availability: 'Available',
    autonomyScore: 80,
    taskCoverage: 60,
    videoUrl: 'https://www.youtube.com/embed/IwPrbj696Ig',
    description: 'Fully autonomous outdoor/indoor security robot. Patrols 24/7 with 360-degree UHD cameras, thermal imaging, license plate recognition, and two-way intercom. Self-docking for autonomous recharging.',
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
    deploymentCount: 'Deployed at campuses, malls, hospitals, airports, and parking structures across the USA',
    sources: ['Knightscope Product Page 2025', 'Security Info Watch 2025', 'CNBC NYPD Report 2024']
  }
];
