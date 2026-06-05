import { DashboardLayout } from "@/components/ui/dashboard-layout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-card text-card-foreground rounded-xl border border-border shadow-card p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
              <p className="text-2xl font-bold text-foreground">2,847</p>
              <p className="text-xs font-medium text-positive">+12.5% this week</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border border-border shadow-card p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Avg. Sentiment</p>
              <p className="text-2xl font-bold text-foreground">4.2</p>
              <p className="text-xs font-medium text-positive">+0.3 vs last month</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-positive-light dark:bg-positive-dark/20 flex items-center justify-center text-positive dark:text-positive">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border border-border shadow-card p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Bug Reports</p>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs font-medium text-negative">+3 new today</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-negative-light dark:bg-negative-dark/20 flex items-center justify-center text-negative dark:text-negative">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border border-border shadow-card p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Feature Requests</p>
              <p className="text-2xl font-bold text-foreground">8</p>
              <p className="text-xs font-medium text-warning">4 in planning</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-warning-light dark:bg-warning-dark/20 flex items-center justify-center text-warning dark:text-warning">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sentiment Trend */}
        <div className="bg-card text-card-foreground rounded-xl border border-border shadow-card p-5">
          <h3 className="text-base font-semibold text-foreground mb-4">Sentiment Trend</h3>
          <div className="flex items-center justify-center h-48 text-muted-foreground">
            <p className="text-sm">Chart will render here (Recharts)</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card text-card-foreground rounded-xl border border-border shadow-card p-5">
          <h3 className="text-base font-semibold text-foreground mb-4">Recent Reviews</h3>
          <div className="space-y-3">
            {[
              { source: "Trustpilot", text: "Great app but the sync feature keeps failing...", sentiment: "negative" },
              { source: "App Store", text: "Love the new dark mode! Much easier on the eyes.", sentiment: "positive" },
              { source: "Google Reviews", text: "Would be perfect if you added API access.", sentiment: "neutral" },
            ].map((review, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  review.sentiment === "positive" ? "bg-positive" :
                  review.sentiment === "negative" ? "bg-negative" : "bg-warning"
                }`} />
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">{review.source}</p>
                  <p className="text-sm text-foreground">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card text-card-foreground rounded-xl border border-border shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">Top Bug Reports</h3>
            <a href="/dashboard/bugs" className="text-xs text-brand-600 dark:text-brand-400 hover:underline">View all</a>
          </div>
          <div className="space-y-2">
            {["Login flow crashes on Safari", "Export to CSV truncates long text", "Notifications not sending on mobile"].map((bug, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-negative shrink-0" />
                <p className="text-sm text-foreground truncate">{bug}</p>
                <span className="ml-auto text-2xs font-medium text-muted-foreground">P{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border border-border shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">Top Feature Requests</h3>
            <a href="/dashboard/features" className="text-xs text-brand-600 dark:text-brand-400 hover:underline">View all</a>
          </div>
          <div className="space-y-2">
            {["API access for programmatic review fetching", "Custom dashboard widgets", "Slack integration for alerts"].map((feat, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                <p className="text-sm text-foreground truncate">{feat}</p>
                <span className="ml-auto text-2xs font-medium text-muted-foreground">{42 - i * 10} votes</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}