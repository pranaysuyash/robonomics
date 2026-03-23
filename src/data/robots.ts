import { Profession, Robot, Industry } from '../types';

export const industries: { name: Industry; description: string }[] = [
  { name: 'Logistics', description: 'Movement, storage, and processing of goods across the supply chain.' },
  { name: 'Agriculture', description: 'Cultivation of plants and livestock for food, fiber, and other products.' },
  { name: 'Manufacturing', description: 'Production of merchandise for use or sale using labor, machines, and tools.' },
  { name: 'Medical', description: 'Healthcare delivery, surgery, patient care, and medical logistics.' },
  { name: 'Food Service', description: 'Preparation, cooking, and serving of food in commercial settings.' },
  { name: 'Construction', description: 'Building and assembly of infrastructure, commercial, and residential properties.' },
  { name: 'Maintenance', description: 'Preservation and repair of equipment, buildings, and infrastructure.' },
  { name: 'Retail', description: 'Sale of goods and services directly to consumers.' },
  { name: 'Security', description: 'Protection of property, assets, and people from threats.' }
];

export const professions: Profession[] = [
  {
    id: 'prof_warehouse_picker',
    name: 'Warehouse Order Picker',
    industry: 'Logistics',
    description: 'Responsible for navigating warehouse aisles, locating specific items, picking them from shelves or bins, and placing them into order totes or conveyor systems.',
    blockers: [
      'Grasping highly variable items (polybags, fragile items, odd shapes)',
      'Navigating dynamic, unstructured environments with human workers',
      'Handling items tightly packed in deep bins'
    ],
    tasks: [
      {
        id: 'task_navigate_aisles',
        name: 'Navigate Aisles',
        description: 'Move safely through warehouse aisles, avoiding obstacles and humans.',
        difficulty: 'Medium',
        environmentConstraints: ['Flat floors', 'Dynamic obstacles', 'Variable lighting']
      },
      {
        id: 'task_identify_item',
        name: 'Identify Item',
        description: 'Visually locate the correct SKU among similar items in a bin.',
        difficulty: 'Medium',
        environmentConstraints: ['Variable lighting', 'Occlusion', 'Similar packaging']
      },
      {
        id: 'task_grasp_item',
        name: 'Grasp Variable Item',
        description: 'Pick up an item regardless of its shape, weight, or packaging material.',
        difficulty: 'Extreme',
        environmentConstraints: ['Cluttered bins', 'Fragile items', 'Deformable packaging (polybags)']
      },
      {
        id: 'task_place_item',
        name: 'Place in Tote',
        description: 'Transfer the grasped item into an order tote without dropping or damaging it.',
        difficulty: 'Low',
        environmentConstraints: ['Moving conveyors', 'Spatial packing']
      }
    ]
  },
  {
    id: 'prof_fruit_picker',
    name: 'Fruit Harvester',
    industry: 'Agriculture',
    description: 'Responsible for identifying ripe fruit on trees or vines, carefully detaching it without damaging the plant or fruit, and placing it in a collection bin.',
    blockers: [
      'Navigating uneven, muddy, or sloped terrain',
      'Identifying ripeness under varying sunlight and occlusion by leaves',
      'Grasping delicate fruit without bruising'
    ],
    tasks: [
      {
        id: 'task_navigate_orchard',
        name: 'Navigate Orchard',
        description: 'Move between rows of trees or vines on uneven ground.',
        difficulty: 'High',
        environmentConstraints: ['Uneven terrain', 'Mud/Dust', 'Weather conditions']
      },
      {
        id: 'task_identify_ripe_fruit',
        name: 'Identify Ripe Fruit',
        description: 'Locate fruit and determine if it is ready for harvest based on color and size.',
        difficulty: 'High',
        environmentConstraints: ['Direct sunlight/shadows', 'Leaf occlusion', 'Variable fruit appearance']
      },
      {
        id: 'task_grasp_delicate',
        name: 'Grasp Delicate Fruit',
        description: 'Hold the fruit firmly enough to detach but softly enough to avoid bruising.',
        difficulty: 'Extreme',
        environmentConstraints: ['Soft skin', 'Variable size', 'Clustered fruit']
      },
      {
        id: 'task_detach_fruit',
        name: 'Detach Fruit',
        description: 'Remove the fruit from the stem without damaging the plant.',
        difficulty: 'Medium',
        environmentConstraints: ['Strong stems', 'Entangled branches']
      }
    ]
  }
];

export const robots: Robot[] = [
  {
    id: 'rob_agility_digit',
    name: 'Digit',
    manufacturer: 'Agility Robotics',
    pricingModel: 'RaaS (Robot-as-a-Service)',
    availability: 'Pilot',
    deploymentCount: '100+',
    limitations: [
      'Struggles with highly deformable objects like polybags',
      'Battery life limits continuous operation to ~2 hours without charging',
      'Payload capacity limited to 35 lbs (16 kg)'
    ],
    evidence: [
      {
        id: 'ev_digit_amazon',
        title: 'Amazon begins testing Digit in fulfillment centers',
        url: 'https://www.aboutamazon.com/news/operations/amazon-agility-robotics-digit',
        type: 'News',
        verified: true,
        deploymentType: 'Pilot'
      },
      {
        id: 'ev_digit_gxo',
        title: 'GXO deploys Digit for tote handling',
        url: 'https://gxo.com/news/gxo-deploys-agility-robotics-digit/',
        type: 'News',
        verified: true,
        deploymentType: 'Pilot'
      }
    ],
    capabilities: [
      {
        taskId: 'task_navigate_aisles',
        successLevel: 'Full',
        confidenceScore: 95,
        evidenceIds: ['ev_digit_amazon', 'ev_digit_gxo'],
        notes: 'Bipedal locomotion handles flat warehouse floors and minor obstacles effortlessly.'
      },
      {
        taskId: 'task_identify_item',
        successLevel: 'Partial',
        confidenceScore: 70,
        evidenceIds: ['ev_digit_amazon'],
        notes: 'Can identify standard totes and boxes, but struggles with complex, unstructured bins.'
      },
      {
        taskId: 'task_grasp_item',
        successLevel: 'Partial',
        confidenceScore: 50,
        evidenceIds: ['ev_digit_amazon'],
        notes: 'Current end-effectors are designed for rigid totes, not individual, variable items.'
      },
      {
        taskId: 'task_place_item',
        successLevel: 'Full',
        confidenceScore: 90,
        evidenceIds: ['ev_digit_gxo'],
        notes: 'Reliably places totes onto conveyors.'
      }
    ]
  },
  {
    id: 'rob_bd_stretch',
    name: 'Stretch',
    manufacturer: 'Boston Dynamics',
    pricingModel: 'Purchase / RaaS',
    availability: 'Available',
    deploymentCount: '500+',
    limitations: [
      'Requires relatively flat surfaces for its mobile base',
      'Designed primarily for case handling, not individual piece picking',
      'Large footprint requires wide aisles'
    ],
    evidence: [
      {
        id: 'ev_stretch_dhl',
        title: 'DHL Supply Chain invests $15M in Boston Dynamics Stretch',
        url: 'https://bostondynamics.com/news/dhl-supply-chain-invests-15m-in-boston-dynamics-stretch-robots/',
        type: 'News',
        verified: true,
        deploymentType: 'Production'
      }
    ],
    capabilities: [
      {
        taskId: 'task_navigate_aisles',
        successLevel: 'Full',
        confidenceScore: 98,
        evidenceIds: ['ev_stretch_dhl'],
        notes: 'Omnidirectional mobile base navigates standard warehouse environments reliably.'
      },
      {
        taskId: 'task_identify_item',
        successLevel: 'Full',
        confidenceScore: 95,
        evidenceIds: ['ev_stretch_dhl'],
        notes: 'Advanced vision system identifies boxes of varying sizes, even when tightly packed or skewed.'
      },
      {
        taskId: 'task_grasp_item',
        successLevel: 'Partial',
        confidenceScore: 85,
        evidenceIds: ['ev_stretch_dhl'],
        notes: 'Smart vacuum gripper handles almost any cardboard box up to 50 lbs, but cannot handle non-flat/porous items.'
      },
      {
        taskId: 'task_place_item',
        successLevel: 'Full',
        confidenceScore: 99,
        evidenceIds: ['ev_stretch_dhl'],
        notes: 'Places boxes onto conveyors with high precision and speed.'
      }
    ]
  },
  {
    id: 'rob_tevel_aerobotics',
    name: 'Flying Autonomous Robots (FAR)',
    manufacturer: 'Tevel Aerobotics',
    pricingModel: 'RaaS (Harvest-as-a-Service)',
    availability: 'Pilot',
    deploymentCount: 'Unknown (Dozens of systems)',
    limitations: [
      'Tethered design limits range from the base vehicle',
      'Wind and extreme weather can disrupt flight stability',
      'Currently optimized for specific fruits (apples, peaches, plums)'
    ],
    evidence: [
      {
        id: 'ev_tevel_demo',
        title: 'Tevel Aerobotics Apple Harvesting',
        url: 'https://www.tevel-tech.com/',
        type: 'Video',
        verified: true,
        deploymentType: 'Pilot'
      }
    ],
    capabilities: [
      {
        taskId: 'task_navigate_orchard',
        successLevel: 'Full',
        confidenceScore: 90,
        evidenceIds: ['ev_tevel_demo'],
        notes: 'Base vehicle navigates rows, while tethered drones fly to reach fruit at any height, bypassing terrain issues.'
      },
      {
        taskId: 'task_identify_ripe_fruit',
        successLevel: 'Full',
        confidenceScore: 85,
        evidenceIds: ['ev_tevel_demo'],
        notes: 'AI vision classifies fruit ripeness and detects foliage occlusion in real-time.'
      },
      {
        taskId: 'task_grasp_delicate',
        successLevel: 'Partial',
        confidenceScore: 75,
        evidenceIds: ['ev_tevel_demo'],
        notes: 'Uses a suction mechanism to gently grasp fruit, reducing bruising compared to mechanical claws.'
      },
      {
        taskId: 'task_detach_fruit',
        successLevel: 'Full',
        confidenceScore: 80,
        evidenceIds: ['ev_tevel_demo'],
        notes: 'Twisting motion combined with suction effectively detaches fruit.'
      }
    ]
  }
];
