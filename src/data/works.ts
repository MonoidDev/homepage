import { makeStrings } from '@monoid-dev/use-strings';

import d2dHover from '@/assets/images/works/d2d-hover.png';
import d2dMobile from '@/assets/images/works/d2d-mobile.png';
import d2dNormal from '@/assets/images/works/d2d-normal.png';
import ihealHover from '@/assets/images/works/iheal-hover.png';
import ihealMobile from '@/assets/images/works/iheal-mobile.png';
import ihealNormal from '@/assets/images/works/iheal-normal.png';
import monozipHover from '@/assets/images/works/monozip-hover.png';
import monozipMobile from '@/assets/images/works/monozip-mobile.png';
import monozipNormal from '@/assets/images/works/monozip-normal.png';
import polijobHover from '@/assets/images/works/polijob-hover.png';
import polijobMobile from '@/assets/images/works/polijob-mobile.png';
import polijobNormal from '@/assets/images/works/polijob-normal.png';
import uptimeMonitorHover from '@/assets/images/works/uptime-monitor-hover.png';
import uptimeMonitorMobile from '@/assets/images/works/uptime-monitor-mobile.png';
import uptimeMonitorNormal from '@/assets/images/works/uptime-monitor-normal.png';
import wopalHover from '@/assets/images/works/wopal-hover.png';
import wopalMobile from '@/assets/images/works/wopal-mobile.png';
import wopalNormal from '@/assets/images/works/wopal-normal.png';

export interface WorkDescription {
  name: string;
  summary: string;
  tags: string[];
  mobileTags: string[];
  displayImage: string;
  hoverImage: string;
  mobileImage: string;
}

export const useWorksStrings = makeStrings<{ works: WorkDescription[] }>({
  'en-US': {
    works: [
      {
        name: 'WOPAL',
        summary: 'Online Training Platform For Student Sports Organizations',
        tags: ['WEB', 'APP', 'UIUX DESIGN', 'IoT'],
        mobileTags: ['Web', 'App', 'UIUX', 'IoT'],
        displayImage: wopalNormal.src,
        hoverImage: wopalHover.src,
        mobileImage: wopalMobile.src,
      },
      {
        name: 'MONOZIP',
        summary: 'Open Postal Code & Address Service',
        tags: ['SaaS', 'API', 'UIUX DESIGN', 'GEOLOCATION'],
        mobileTags: ['SaaS', 'API', 'Geolocation'],
        displayImage: monozipNormal.src,
        hoverImage: monozipHover.src,
        mobileImage: monozipMobile.src,
      },
      {
        name: 'D2D',
        summary:
          'Booking & Management System For International Logistics Service',
        tags: ['WEB', 'OA', 'CLOUD', 'UIUX DESIGN'],
        mobileTags: ['Web', 'OA', 'Cloud', 'UIUX'],
        displayImage: d2dNormal.src,
        hoverImage: d2dHover.src,
        mobileImage: d2dMobile.src,
      },
      {
        name: 'iHEAL',
        summary: 'Smart Aromatherapy Device Project',
        tags: ['RasPi', 'APP', 'WEB', 'UIUX DESIGN'],
        mobileTags: ['RasPi', 'App', 'IoT', 'Web'],
        displayImage: ihealNormal.src,
        hoverImage: ihealHover.src,
        mobileImage: ihealMobile.src,
      },
      {
        name: 'POLIJOB',
        summary: 'Online Recruiting Platform',
        tags: ['SYSTEM DESIGN', 'UIUX DESIGN'],
        mobileTags: ['System Design', 'UIUX'],
        displayImage: polijobNormal.src,
        hoverImage: polijobHover.src,
        mobileImage: polijobMobile.src,
      },
      {
        name: 'UPTIME MONITOR',
        summary: 'Observability Service',
        tags: ['OBSERVABILITY', 'ALARM SYSTEM'],
        mobileTags: [],
        displayImage: uptimeMonitorNormal.src,
        hoverImage: uptimeMonitorHover.src,
        mobileImage: uptimeMonitorMobile.src,
      },
    ],
  },
});
