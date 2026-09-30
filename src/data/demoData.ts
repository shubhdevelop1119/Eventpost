import { EventDetails, SavedPost, CustomizationOptions } from '../types';

export const DEMO_EVENT: EventDetails = {
  eventName: 'Tech Fest 2026',
  shortDescription:
    'Join us for an exciting technology festival featuring coding competitions, workshops, innovation challenges and expert sessions.',
  date: '15 October 2026',
  time: '10:00 AM',
  venue: 'ABC College, Rajkot',
  organizer: 'ABC College',
  contactInfo: 'info@abccollege.edu | +91 98765 43210',
  registrationUrl: 'https://example.com/register',
  targetAudience: ['Students', 'Professionals'],
};

export const DEFAULT_CUSTOMIZATION: CustomizationOptions = {
  platform: 'instagram',
  style: 'Exciting',
  length: 'medium',
  language: 'English',
  emojiLevel: 'engaging',
  includeHashtags: true,
};

export interface EventTemplateItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  eventDetails: EventDetails;
  suggestedStyle: string;
}

export const EVENT_TEMPLATES: EventTemplateItem[] = [
  {
    id: 'college-event',
    name: 'College Event',
    category: 'Education',
    icon: 'GraduationCap',
    description: 'Annual college symposiums, tech fests, or campus orientation programs.',
    eventDetails: {
      eventName: 'Campus Tech Sparks 2026',
      shortDescription:
        'A university-wide celebration of technical prowess featuring hackathons, robotics challenges, and paper presentations.',
      date: '24 October 2026',
      time: '09:30 AM',
      venue: 'Main Auditorium, Campus North',
      organizer: 'Student Affairs Council',
      contactInfo: 'campus.sparks@university.edu',
      registrationUrl: 'https://university.edu/sparks2026',
      targetAudience: ['Students', 'Local Community'],
    },
    suggestedStyle: 'Exciting',
  },
  {
    id: 'workshop',
    name: 'Workshop',
    category: 'Skills',
    icon: 'Wrench',
    description: 'Hands-on practical training, bootcamps, and interactive skill sessions.',
    eventDetails: {
      eventName: 'AI & Full-Stack Deep Dive',
      shortDescription:
        'Build production AI agents and modern web apps in this intensive 4-hour hands-on masterclass with senior engineers.',
      date: '08 November 2026',
      time: '02:00 PM',
      venue: 'Tech Innovation Hub, Floor 4',
      organizer: 'DevCraft Labs',
      contactInfo: 'workshops@devcraft.io',
      registrationUrl: 'https://devcraft.io/ai-workshop',
      targetAudience: ['Professionals', 'Students'],
    },
    suggestedStyle: 'Professional',
  },
  {
    id: 'seminar',
    name: 'Seminar',
    category: 'Academic',
    icon: 'BookOpen',
    description: 'Academic lectures, industry expert discussions, and knowledge exchanges.',
    eventDetails: {
      eventName: 'Future of Sustainable Energy Seminar',
      shortDescription:
        'Renowned climate scientists and energy strategists discuss renewable grid transitions and policy innovations.',
      date: '18 November 2026',
      time: '11:00 AM',
      venue: 'Green Council Hall, Downtown',
      organizer: 'Sustainable Planet Institute',
      contactInfo: 'events@sustainableplanet.org',
      registrationUrl: 'https://sustainableplanet.org/seminar',
      targetAudience: ['Professionals', 'General Public'],
    },
    suggestedStyle: 'Formal',
  },
  {
    id: 'conference',
    name: 'Conference',
    category: 'Corporate',
    icon: 'Briefcase',
    description: 'Multi-track international or regional industry conferences.',
    eventDetails: {
      eventName: 'Global Product Leaders Summit 2026',
      shortDescription:
        'Connecting 1,200+ product designers, engineering vice presidents, and venture builders for keynote talks and networking.',
      date: '04 December 2026',
      time: '08:30 AM',
      venue: 'Metropolitan Convention Center',
      organizer: 'Product League Global',
      contactInfo: 'summit@productleague.com',
      registrationUrl: 'https://productleague.com/summit2026',
      targetAudience: ['Business Audience', 'Professionals'],
    },
    suggestedStyle: 'Professional',
  },
  {
    id: 'sports-event',
    name: 'Sports Event',
    category: 'Athletics',
    icon: 'Trophy',
    description: 'Marathons, tournaments, intramural games, and athletic championships.',
    eventDetails: {
      eventName: 'City Marathon & 10K Run 2026',
      shortDescription:
        'Lace up your running shoes! Join 5,000+ runners through the historic city center to promote health and community wellness.',
      date: '22 November 2026',
      time: '06:00 AM',
      venue: 'City Stadium Starting Line',
      organizer: 'City Sports Foundation',
      contactInfo: 'marathon@citysports.gov',
      registrationUrl: 'https://citymarathon2026.org',
      targetAudience: ['General Public', 'Local Community'],
    },
    suggestedStyle: 'Exciting',
  },
  {
    id: 'cultural-event',
    name: 'Cultural Event',
    category: 'Arts',
    icon: 'Palette',
    description: 'Dance recitals, music evenings, theatrical performances, and heritage fests.',
    eventDetails: {
      eventName: 'Harmony Heritage Cultural Evening',
      shortDescription:
        'An enchanting evening celebrating traditional music, classical dance forms, folklore storytelling, and artisan crafts.',
      date: '29 November 2026',
      time: '06:30 PM',
      venue: 'Royal Arts Amphitheater',
      organizer: 'Heritage Cultural Society',
      contactInfo: 'contact@heritagearts.org',
      registrationUrl: 'https://heritagearts.org/tickets',
      targetAudience: ['General Public', 'Parents', 'Local Community'],
    },
    suggestedStyle: 'Friendly',
  },
  {
    id: 'festival',
    name: 'Festival',
    category: 'Celebration',
    icon: 'Sparkles',
    description: 'Community street festivals, food carnivals, and holiday gatherings.',
    eventDetails: {
      eventName: 'Autumn Food & Beats Festival',
      shortDescription:
        'Over 60 gourmet food stalls, live acoustic indie sets, artisan pop-ups, and interactive kids zones for the entire family.',
      date: '12 December 2026',
      time: '12:00 PM',
      venue: 'Central Park Meadows',
      organizer: 'City Cultural Board',
      contactInfo: 'festival@citybeats.com',
      registrationUrl: 'https://autumnbeatsfestival.com',
      targetAudience: ['General Public', 'Parents', 'Students'],
    },
    suggestedStyle: 'Fun',
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    category: 'Business',
    icon: 'Rocket',
    description: 'Showcasing new products, software releases, hardware reveals, and brand unveilings.',
    eventDetails: {
      eventName: 'OmniVibe 2 Hardware Keynote',
      shortDescription:
        'The next leap in spatial acoustics and ambient computing. Witness the live hardware reveal and early hands-on demos.',
      date: '02 November 2026',
      time: '05:00 PM',
      venue: 'Design Foundry & Broadcast Studio',
      organizer: 'OmniVibe Audio Corp',
      contactInfo: 'press@omnivibe.io',
      registrationUrl: 'https://omnivibe.io/keynote',
      targetAudience: ['Customers', 'Business Audience', 'Professionals'],
    },
    suggestedStyle: 'Promotional',
  },
  {
    id: 'business-event',
    name: 'Business Event',
    category: 'Networking',
    icon: 'Users',
    description: 'Executive dinners, B2B mixers, investor pitch nights, and roundtables.',
    eventDetails: {
      eventName: 'Founder & Investor Evening Mixer',
      shortDescription:
        'An exclusive high-impact networking gathering for seed and series-A founders connecting with leading angel syndicates and VCs.',
      date: '10 November 2026',
      time: '07:00 PM',
      venue: 'The Skyline Club, 32nd Floor',
      organizer: 'Catalyst Ventures Network',
      contactInfo: 'invite@catalystnetwork.vc',
      registrationUrl: 'https://catalystnetwork.vc/mixer',
      targetAudience: ['Business Audience', 'Professionals'],
    },
    suggestedStyle: 'Professional',
  },
  {
    id: 'birthday',
    name: 'Birthday & Milestone',
    category: 'Social',
    icon: 'Cake',
    description: 'Milestone anniversaries, celebrations, and intimate family gatherings.',
    eventDetails: {
      eventName: 'Aarav’s 10th Birthday Grand Gala',
      shortDescription:
        'Join us for games, magic shows, bouncy castles, and delicious treats to celebrate Aarav turning ten!',
      date: '05 October 2026',
      time: '04:30 PM',
      venue: 'Silver Oak Club Lawn',
      organizer: 'The Patel Family',
      contactInfo: 'rsvp.patel@gmail.com',
      registrationUrl: 'https://rsvp.example.com/aarav10',
      targetAudience: ['Parents', 'Local Community'],
    },
    suggestedStyle: 'Fun',
  },
  {
    id: 'fundraiser',
    name: 'Fundraiser',
    category: 'Charity',
    icon: 'Heart',
    description: 'Charity galas, non-profit auctions, community aid drives, and benefit dinners.',
    eventDetails: {
      eventName: 'Hope for Tomorrow Charity Gala',
      shortDescription:
        'An inspiring evening of classical music, silent auction, and dinner to raise scholarship funds for underprivileged scholars.',
      date: '28 November 2026',
      time: '06:00 PM',
      venue: 'Grand Crystal Ballroom',
      organizer: 'Hope Foundation International',
      contactInfo: 'donate@hopefortomorrow.org',
      registrationUrl: 'https://hopefortomorrow.org/gala2026',
      targetAudience: ['Business Audience', 'General Public'],
    },
    suggestedStyle: 'Friendly',
  },
  {
    id: 'community-event',
    name: 'Community Event',
    category: 'Neighborhood',
    icon: 'MapPin',
    description: 'Neighborhood cleanups, farmers markets, tree planting drives, and local town halls.',
    eventDetails: {
      eventName: 'Green Neighborhood Tree Plantation & Fair',
      shortDescription:
        'Let’s plant 500 indigenous trees along the riverfront! Bring your neighbors for gardening, organic sapling stalls, and snacks.',
      date: '19 October 2026',
      time: '08:00 AM',
      venue: 'Riverfront Promenade Sector 3',
      organizer: 'EcoCity Volunteer Brigade',
      contactInfo: 'volunteer@ecocity.org',
      registrationUrl: 'https://ecocity.org/plant-drive',
      targetAudience: ['Local Community', 'Parents', 'General Public'],
    },
    suggestedStyle: 'Friendly',
  },
];

export const INITIAL_SAVED_POSTS: SavedPost[] = [
  {
    id: 'post-demo-1',
    eventName: 'Tech Fest 2026',
    eventDetails: DEMO_EVENT,
    content: `🔥 Tech Fest 2026 is officially here! 🔥\n\nJoin us for an exciting technology festival featuring coding competitions, workshops, innovation challenges and expert sessions.\n\nDesigned specifically for students and technology enthusiasts looking to build the future.\n\n📅 Date: 15 October 2026\n⏰ Time: 10:00 AM\n📍 Venue: ABC College, Rajkot\nOrganized by: ABC College\n\nRegister now: https://example.com/register\nContact: info@abccollege.edu | +91 98765 43210\n\nDon't miss out on this high-energy gathering. Seats are filling fast—save your spot today!\n\n#TechFest2026 #Innovation #CollegeTechFest #RajkotEvents`,
    platform: 'instagram',
    language: 'English',
    style: 'Exciting',
    hashtags: ['#TechFest2026', '#Innovation', '#CollegeTechFest', '#RajkotEvents'],
    versions: [
      {
        id: 'A',
        name: 'Version A — Exciting',
        styleLabel: 'Exciting',
        text: `🔥 Tech Fest 2026 is officially here! 🔥\n\nJoin us for an exciting technology festival featuring coding competitions, workshops, innovation challenges and expert sessions.\n\n📅 Date: 15 October 2026\n⏰ Time: 10:00 AM\n📍 Venue: ABC College, Rajkot\n\nRegister now: https://example.com/register\n\n#TechFest2026 #Innovation #CollegeTechFest #RajkotEvents`,
      },
      {
        id: 'B',
        name: 'Version B — Professional',
        styleLabel: 'Professional',
        text: `We are pleased to announce Tech Fest 2026.\n\nOrganized by ABC College, this festival convenes students, developers, and industry pioneers for hands-on innovation.\n\n• Date: 15 October 2026\n• Time: 10:00 AM\n• Venue: ABC College, Rajkot\n\nOfficial Portal: https://example.com/register\n\n#TechFest2026 #Technology #RajkotEvents`,
      },
      {
        id: 'C',
        name: 'Version C — Short & Catchy',
        styleLabel: 'Short & Catchy',
        text: `⚡ Tech Fest 2026!\n\nCoding competitions, workshops & innovation challenges.\n\n📅 15 Oct 2026 | 📍 ABC College, Rajkot\nRegister: https://example.com/register\n\n#TechFest2026`,
      },
    ],
    selectedVersionId: 'A',
    createdAt: '2026-09-29T14:30:00.000Z',
    isPoster: false,
  },
  {
    id: 'post-demo-2',
    eventName: 'Global Product Leaders Summit 2026',
    eventDetails: {
      eventName: 'Global Product Leaders Summit 2026',
      shortDescription: 'Connecting 1,200+ product designers and engineering leaders.',
      date: '04 December 2026',
      time: '08:30 AM',
      venue: 'Metropolitan Convention Center',
      organizer: 'Product League Global',
      contactInfo: 'summit@productleague.com',
      registrationUrl: 'https://productleague.com/summit2026',
      targetAudience: ['Business Audience', 'Professionals'],
    },
    content: `Excited to invite our professional network to the Global Product Leaders Summit 2026!\n\nJoin 1,200+ product designers, engineering VPs, and venture builders for keynote talks and high-impact roundtables.\n\n📅 Date: 04 December 2026\n📍 Venue: Metropolitan Convention Center\n\nSecure your delegate pass here: https://productleague.com/summit2026\n\n#ProductLeadership #Innovation #TechConference #B2B`,
    platform: 'linkedin',
    language: 'English',
    style: 'Professional',
    hashtags: ['#ProductLeadership', '#Innovation', '#TechConference', '#B2B'],
    versions: [],
    selectedVersionId: 'A',
    createdAt: '2026-09-28T09:15:00.000Z',
    isPoster: false,
  },
];
