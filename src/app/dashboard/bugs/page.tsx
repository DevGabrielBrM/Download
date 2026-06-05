import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const bugs = [
  { id: "BUG-001", title: "Login flow crashes on Safari browser", source: "Trustpilot", priority: "high" as const, status: "open" as const, date: "2 hours ago" },
  { id: "BUG-002", title: "Export to CSV truncates long text fields", source: "Google Reviews", priority: "medium" as const, status: "in-progress" as const, date: "1 day ago" },
  { id: "BUG-003", title: "Notifications not sending on mobile devices", source: "App Store", priority: "high" as const, status: "open" as const, date: "3 days ago" },
  { id: "BUG-004", title: "Dashboard charts not loading with >10k reviews", source: "Trustpilot", priority: "low" as const, status: "triaged" as const, date: "5 days ago" },
  { id: "BUG-005", title: "Dark mode toggle causes layout shift", source: "Google Reviews", priority: "medium" as const, status: "resolved" as const, date: "1 week ago" },
];

const priorityColors = { high: "negative", medium: "warning", low: "default" } as const;
const statusColors = { open: "negative", "in-progress": "warning", triaged: "info", resolved: "positive" } as const;

export default function BugsPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Bug Reports</h2>
          <p className="text-sm text-muted-foreground">{bugs.length} open bugs found from review analysis</p>
        </div>
        <div className="flex gap-2">
          <select className="h-10 px-3 text-sm rounded-lg border border-border bg-card text-foreground">
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select className="h-10 px-3 text-sm rounded-lg border border-border bg-card text-foreground">
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        {bugs.map((bug) => (
          <Card key={bug.id} className="flex items-center gap-4 p-4 hover:shadow-elevated transition-shadow cursor-pointer" padded={false}>
            <div className="flex items-center gap-4 flex-1 p-4">
              <div className="w-8 h-8 rounded-lg bg-negative-light dark:bg-negative-dark/20 flex items-center justify-center text-negative shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{bug.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{bug.id}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{bug.source}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{bug.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={priorityColors[bug.priority] as "negative" | "warning" | "default"} size="sm">
                  {bug.priority}
                </Badge>
                <Badge variant={statusColors[bug.status] as "negative" | "warning" | "info" | "positive"} size="sm">
                  {bug.status === "in-progress" ? "In Progress" : bug.status}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}