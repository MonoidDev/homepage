import { makeStrings } from '@monoid-dev/use-strings';

import d2dHover from '@/assets/images/works/d2d-hover.png';
import d2dNormal from '@/assets/images/works/d2d-normal.png';
import ihealHover from '@/assets/images/works/iheal-hover.png';
import ihealNormal from '@/assets/images/works/iheal-normal.png';
import monozipHover from '@/assets/images/works/monozip-hover.png';
import monozipNormal from '@/assets/images/works/monozip-normal.png';
import polijobHover from '@/assets/images/works/polijob-hover.png';
import polijobNormal from '@/assets/images/works/polijob-normal.png';
import uptimeMonitorHover from '@/assets/images/works/uptime-monitor-hover.png';
import uptimeMonitorNormal from '@/assets/images/works/uptime-monitor-normal.png';
import wopalHover from '@/assets/images/works/wopal-hover.png';
import wopalNormal from '@/assets/images/works/wopal-normal.png';

export interface WorkDescription {
  name: string;
  summary: string;
  tags: string[];
  displayImage: string;
  hoverImage: string;
}

export const useWorksStrings = makeStrings<{ works: WorkDescription[] }>({
  'en-US': {
    works: [
      {
        name: 'WOPAL',
        summary: 'Online Training Platform For Student Sports Organizations',
        tags: ['WEB', 'APP', 'UIUX DESIGN', 'IoT'],
        displayImage: wopalNormal.src,
        hoverImage: wopalHover.src,
      },
      {
        name: 'MONOZIP API',
        summary: 'Open Postal Code & Address Service',
        tags: ['SaaS', 'API', 'UIUX DESIGN', 'GEOLOCATION'],
        displayImage: monozipNormal.src,
        hoverImage: monozipHover.src,
      },
      {
        name: 'D2D',
        summary:
          'Booking & Management System For International Logistics Service',
        tags: ['WEB', 'OA', 'UIUX DESIGN'],
        displayImage: d2dNormal.src,
        hoverImage: d2dHover.src,
      },
      {
        name: 'iHEAL',
        summary: 'Smart Aromatherapy Device Project',
        tags: ['RasPi', 'APP', 'WEB', 'UIUX DESIGN'],
        displayImage: ihealNormal.src,
        hoverImage: ihealHover.src,
      },
      {
        name: 'POLIJOB',
        summary: 'Online Recruiting Platform',
        tags: ['SYSTEM DESIGN', 'UIUX DESIGN'],
        displayImage: polijobNormal.src,
        hoverImage: polijobHover.src,
      },
      {
        name: 'UPTIME MONITOR',
        summary: 'Observability Service',
        tags: ['OBSERVABILITY', 'ALARM SYSTEM'],
        displayImage: uptimeMonitorNormal.src,
        hoverImage: uptimeMonitorHover.src,
      },
    ],
  },
});
