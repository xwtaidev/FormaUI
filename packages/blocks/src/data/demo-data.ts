export interface DemoPlan {
  name: string;
  price: string;
  description: string;
  ctaLabel: string;
  featured?: boolean;
}

export interface DemoApiKey {
  name: string;
  keyPreview: string;
  createdAt: string;
  lastUsed: string;
  status: "active" | "revoked";
}

export interface DemoTokenUsagePoint {
  label: string;
  value: number;
}

export interface DemoAgentRun {
  id: string;
  agent: string;
  task: string;
  status: "success" | "running" | "failed";
  startedAt: string;
}

export interface DemoSidebarItem {
  label: string;
  active?: boolean;
}

export interface DemoMetric {
  title: string;
  value: string;
  delta: string;
}

export interface DemoTeamMember {
  id: string;
  name: string;
  role: string;
  team: string;
  location: string;
  status: "active" | "away" | "offline";
}

export interface DemoNotification {
  id: string;
  title: string;
  summary: string;
  level: "critical" | "info" | "success";
  time: string;
}

export const demoPlans: DemoPlan[] = [
  {
    name: "Starter",
    price: "$19/mo",
    description: "For solo builders who need core product analytics.",
    ctaLabel: "Choose Starter"
  },
  {
    name: "Pro",
    price: "$79/mo",
    description: "For growing teams shipping multiple AI workflows.",
    ctaLabel: "Start Pro",
    featured: true
  },
  {
    name: "Enterprise",
    price: "Contact us",
    description: "For organizations with compliance and custom deployment needs.",
    ctaLabel: "Talk to sales"
  }
];

export const demoApiKeys: DemoApiKey[] = [
  {
    name: "Production",
    keyPreview: "sk-prod-4j7k...92fd",
    createdAt: "2026-03-12",
    lastUsed: "3 minutes ago",
    status: "active"
  },
  {
    name: "Staging",
    keyPreview: "sk-stg-21fa...8bb2",
    createdAt: "2026-02-20",
    lastUsed: "1 day ago",
    status: "active"
  },
  {
    name: "Legacy importer",
    keyPreview: "sk-legacy-9fe1...1ca0",
    createdAt: "2025-11-05",
    lastUsed: "31 days ago",
    status: "revoked"
  }
];

export const demoTokenUsage: DemoTokenUsagePoint[] = [
  { label: "Mon", value: 28 },
  { label: "Tue", value: 36 },
  { label: "Wed", value: 42 },
  { label: "Thu", value: 47 },
  { label: "Fri", value: 39 },
  { label: "Sat", value: 24 },
  { label: "Sun", value: 31 }
];

export const demoAgentRuns: DemoAgentRun[] = [
  {
    id: "run_1042",
    agent: "Support triage",
    task: "Classify incoming tickets and route priority",
    status: "success",
    startedAt: "09:14"
  },
  {
    id: "run_1043",
    agent: "Changelog writer",
    task: "Draft release note summary from merged PRs",
    status: "running",
    startedAt: "09:19"
  },
  {
    id: "run_1041",
    agent: "Billing watcher",
    task: "Detect abnormal usage spikes by tenant",
    status: "failed",
    startedAt: "08:52"
  }
];

export const demoSidebarItems: DemoSidebarItem[] = [
  { label: "Overview", active: true },
  { label: "Agents" },
  { label: "Usage" },
  { label: "Billing" },
  { label: "Settings" }
];

export const demoMetrics: DemoMetric[] = [
  { title: "MRR", value: "$84,120", delta: "+8.7%" },
  { title: "Active workspaces", value: "312", delta: "+14" },
  { title: "Automation success", value: "98.3%", delta: "+0.5%" }
];

export const demoTeamMembers: DemoTeamMember[] = [
  {
    id: "tm_01",
    name: "Avery Lin",
    role: "Product Lead",
    team: "Platform",
    location: "Singapore",
    status: "active"
  },
  {
    id: "tm_02",
    name: "Riley Chen",
    role: "ML Engineer",
    team: "AI",
    location: "Shanghai",
    status: "away"
  },
  {
    id: "tm_03",
    name: "Jordan Patel",
    role: "UX Designer",
    team: "Experience",
    location: "San Francisco",
    status: "active"
  },
  {
    id: "tm_04",
    name: "Samira Khan",
    role: "Customer Success",
    team: "Operations",
    location: "London",
    status: "offline"
  }
];

export const demoNotifications: DemoNotification[] = [
  {
    id: "ntf_01",
    title: "Billing threshold reached",
    summary: "Workspace usage passed 80% of monthly quota.",
    level: "critical",
    time: "5 min ago"
  },
  {
    id: "ntf_02",
    title: "Model warmup complete",
    summary: "Realtime response latency dropped below 700ms.",
    level: "success",
    time: "22 min ago"
  },
  {
    id: "ntf_03",
    title: "New teammate invited",
    summary: "Chen joined the AI operations workspace.",
    level: "info",
    time: "1 hr ago"
  }
];
