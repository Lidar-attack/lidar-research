# LiDAR Mirror Attack Research Website

This website presents research on **Reflective Deception: Exploiting LiDAR Vulnerabilities in Autonomous Vehicles Through Mirror-Based Attacks**.

## Overview

This comprehensive website showcases groundbreaking research into how ordinary mirrors can be used to deceive LiDAR sensors in autonomous vehicles, creating either phantom obstacles (Object Addition Attacks - OAA) or hiding real hazards (Object Removal Attacks - ORA).

## Website Structure

```
lidar_research_website/
├── index.html              # Main website file
├── styles.css              # Complete styling
├── script.js               # Interactive functionality
├── videos/                 # Point cloud demonstration videos
│   ├── PC_30_2mr.mp4       # 30° angle, 2 mirrors
│   ├── PC_30_4mr.mp4       # 30° angle, 4 mirrors
│   ├── PC_30_6mr.mp4       # 30° angle, 6 mirrors
│   ├── PC_45_2mr.mp4       # 45° angle, 2 mirrors
│   ├── PC_45_4mr.mp4       # 45° angle, 4 mirrors
│   ├── PC_45_6mr.mp4       # 45° angle, 6 mirrors
│   ├── PC_60_2mr.mp4       # 60° angle, 2 mirrors
│   ├── PC_60_4mr.mp4       # 60° angle, 4 mirrors
│   ├── PC_60_6mr.mp4       # 60° angle, 6 mirrors
│   ├── autonomos_30_6mr.mp4 # Autonomous vehicle response (30°)
│   ├── autonomos_45_6mr.mp4 # Autonomous vehicle response (45°)
│   └── autonomos_60mr.mp4   # Autonomous vehicle response (60°)
├── crash_demo/
│   └── combined_demo.mp4   # CARLA simulation crash demonstration
├── experiment_ora.jpg      # ORA experiment setup image
├── experiment_oaa.jpg      # OAA experiment setup image
└── README.md              # This file
```

## Key Features

### 1. Comprehensive Research Presentation
- **Abstract & Introduction**: Clear explanation of the vulnerability and research motivation
- **Experimental Setup**: Detailed methodology using Ouster OS1-128 LiDAR
- **Attack Demonstrations**: Real point cloud data showing mirror effects
- **Simulation Framework**: CARLA-based validation with empirical models
- **Real-World Testing**: Autoware integration showing actual vehicle responses

### 2. Interactive Demonstrations
- **Point Cloud Videos**: 9 different mirror configurations showing:
  - Mirror size effects (2, 4, 6 mirrors)
  - Angular effects (30°, 45°, 60°)
  - Point density and phantom object formation
- **Autonomous Vehicle Responses**: Real footage of vehicle reactions to phantom obstacles
- **CARLA Crash Simulation**: Demonstration of cascading failure leading to collision

## Research Content Summary

### Attack Types Demonstrated

#### Object Addition Attacks (OAA)
- Create phantom obstacles using mirror reflections
- Variable intensity based on mirror surface area
- Controllable positioning via mirror angle
- Demonstrated to trigger emergency braking in autonomous vehicles

#### Object Removal Attacks (ORA)
- Hide real obstacles by deflecting LiDAR beams
- Works by redirecting beams to ground plane
- Creates dangerous illusion of clear path
- Robust across different mirror angles (15°-45°)

### Experimental Validation
- **Equipment**: Ouster OS1-128 LiDAR, adjustable mirror arrays
- **Environment**: Controlled outdoor testing area
- **Parameters**: 3 mirror sizes × 3 angles × multiple distances
- **Validation**: Both manual and autonomous vehicle testing

### Key Findings
- Low-cost mirrors ($50) can affect $100,000+ autonomous vehicles
- Attacks work across realistic parameter ranges
- Full-stack impact from perception through control systems
- Predictable behavior enables targeted attacks

## Security & Ethics

This research is conducted for **defensive security purposes only**:
- Identifying vulnerabilities to improve AV safety
- Developing countermeasures and detection methods
- Academic contribution to autonomous vehicle security
- All testing conducted in controlled environments

## Contact & Attribution

This website presents academic research conducted for defensive security purposes. The work contributes to understanding and mitigating LiDAR-based vulnerabilities in autonomous vehicle systems.

---

*Website created for academic demonstration purposes. All experiments conducted with appropriate safety measures in controlled environments.*
