import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const features = [
  { id: "FR-001", title: "API access for programmatic review fetching", source: "Trustpilot", votes: 42, status: "planned" as const, date: "2 days ago" },
  { id: "FR-002", title: "Custom dashboard widgets", source: "Google Reviews", votes: 38, status: "planned" as const, date: "3 days ago" },
  { id: "FR-003", title: "Slack integration for real-time alerts", source: "App Store", votes: 31, status: "under-review" as const, date: "1 week ago" },
  { id: "FR-004", title: "Export to PDF reports", source: "Trustpilot", votes: 25, status: "under-review" as const, date: "2 weeks ago" },
  { id: "FR-005", title: "Multi-language sentiment analysis", source: "Google Reviews", votes: 18, status: "backlog" as const, date: "3 weeks ago" },
  { id: "FR-006", title: "GitHub issue integration", source: "App Store", votes: 14, status: "backlog" as const, date: "1 month ago" },
  { id: "FR-007", title: "Historical trend comparison", source: "Trustpilot", votes: 11, status: "shipped" as const, date: "2 months ago" },
  { id: "FR-008", title: "Competitor review tracking", source: "Google Reviews", votes: 9, status: "shipped" as const, date: "3 months ago" },
];

const statusColors = {
  planned: "brand",
  "under-review": "warning",
  backlog: "default",
  shipped: "positive",
} as const;

export default function FeaturesPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Feature Requests</h2>
          <p className="text-sm text-muted-foreground">{features.length} feature requests extracted from reviews</p>
        </div>
        <select className="h-10 px-3 text-sm rounded-lg border border-border bg-card text-foreground">
          <option>All Status</option>
          <option>Planned</option>
          <option>Under Review</option>
          <option>Backlog</option>
          <option>Shipped</option>
        </select>
      </div>

      <div className="space-y-2">
        {features.map((feat) => (
          <Card key={feat.id} className="flex items-center gap-4 p-4 hover:shadow-elevated transition-shadow cursor-pointer" padded={false}>
            <div className="flex items-center gap-4 flex-1 p-4">
              <div className="w-8 h-8 rounded-lg bg-warning-light dark:bg-warning-dark/20 flex items-center justify-center text-warning shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{feat.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{feat.id}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{feat.source}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">{feat.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{feat.votes}</p>
                  <p className="text-2xs text-muted-foreground">votes</p>
                </div>
                <Badge variant={statusColors[feat.status] as "brand" | "warning" | "default" | "positive"} size="sm">
                  {feat.status === "under-review" ? "Under Review" : feat.status}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}