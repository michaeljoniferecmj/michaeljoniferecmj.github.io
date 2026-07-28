export type Profile = {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
  skills: string[];
};

export const profile: Profile = {
  name: 'Michael Ervin Superable',
  title: 'Web, App, SEO, Automation & AI Agent Developer',
  email: 'michaeljonifer17@gmail.com',
  linkedin: 'https://linkedin.com/in/michael-superable',
  github: 'https://github.com/michaeljoniferecmj',
  summary:
    'Developer building websites, apps, SEO, workflow automation, and AI agents for '
    + 'small and medium businesses — from live storefronts to multi-agent AI platforms.',
  skills: [
    'n8n Workflow Automation',
    'Webhook Integration & API Design',
    'Google Workspace (Sheets, Drive, Gmail, Calendar, Docs)',
    'Discord / Slack / Telegram Notifications',
    'HubSpot CRM Integration',
    'OpenAI / GPT-4o Integration',
    'PHP & SQLite',
    'IMAP Email Processing',
    'Lead Scoring & Qualification',
    'Multi-Stage Approval Workflows',
    'Real-Time Alert Systems',
    'Next.js / React',
    'Business Process Automation',
  ],
};
