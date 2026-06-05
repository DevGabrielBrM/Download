import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const sources = [
  { name: "Trustpilot", url: "trustpilot.com/feedbackflow", reviews: 1234, status: "active" as const, lastSync: "2 min ago" },
  { name: "Google Reviews", url: "google.com/business/feedbackflow", reviews: 892, status: "active" as const, lastSync: "15 min ago" },
  { name: "App Store", url: "apps.apple.com/feedbackflow", reviews: 721, status: "paused" as const, lastSync: "2 hours ago" },
];

export default function ReviewSourcesPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Review Sources</h2>
          <p className="text-sm text-muted-foreground">Manage your connected review platforms</p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Source
        </button>
      </div>

      <div className="space-y-3">
        {sources.map((source) => (
          <Card key={source.name} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-sm">
                {source.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{source.name}</p>
                <p className="text-xs text-muted-foreground">{source.url}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{source.reviews.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">reviews</p>
              </div>
              <Badge variant={source.status === "active" ? "positive" : "warning"} dot>
                {source.status}
              </Badge>
              <span className="text-xs text-muted-foreground w-20 text-right">{source.lastSync}</span>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}