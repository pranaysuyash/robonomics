// Last Research Update: 2026-03-25
// This file is automatically updated by tools/research.js

import { Profession } from '../types';

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
