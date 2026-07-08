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
  title: 'Automation & Full Stack Developer',
  email: 'michaeljonifer17@gmail.com',
  linkedin: 'https://linkedin.com/in/michael-superable',
  github: 'https://github.com/michaelsuperable',
  summary:
    'Automation specialist designing end-to-end n8n workflows, lead qualification pipelines, and AI-powered tools for small and medium businesses.',
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
