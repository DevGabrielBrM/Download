import { Navbar } from "@/components/ui/navbar";
import { Container } from "@/components/ui/layout";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-brand-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        </div>

        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/20 border border-brand-200/50 dark:border-brand-800/30 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                AI-Powered Feedback Analysis
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Turn Customer Feedback Into{" "}
              <span className="text-gradient-accent">Product Insights</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Stop manually combing through reviews. FeedbackFlow scrapes
              Trustpilot, Google Reviews, and the App Store, then uses AI to
              extract bug reports and feature requests — so you can build what
              matters.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 w-full sm:w-auto"
              >
                Start Free Trial
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-foreground bg-secondary hover:bg-accent rounded-xl transition-all duration-200 border border-border w-full sm:w-auto"
              >
                See How It Works
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-16 flex flex-col items-center gap-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Trusted by product teams at
              </p>
              <div className="flex items-center gap-8 sm:gap-12 opacity-40">
                <span className="text-lg font-bold text-foreground/60">
                  TechCorp
                </span>
                <span className="text-lg font-bold text-foreground/60">
                  StartupX
                </span>
                <span className="text-lg font-bold text-foreground/60">
                  BuildCo
                </span>
                <span className="text-lg font-bold text-foreground/60">
                  DataPrime
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 sm:py-28 bg-secondary/50"
      >
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Everything you need to{" "}
              <span className="text-gradient">understand feedback</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From scraping to insights in minutes. No more manual review
              analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card text-card-foreground rounded-xl border border-border shadow-card p-6 hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Smart Scraping
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Paste a URL from Trustpilot, Google Reviews, or the App Store.
                FeedbackFlow automatically scrapes and structures all reviews.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card text-card-foreground rounded-xl border border-border shadow-card p-6 hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                AI Categorization
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our AI automatically separates noise from signal — categorizing
                each review as a Bug Report, Feature Request, or General
                Feedback.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card text-card-foreground rounded-xl border border-border shadow-card p-6 hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Sentiment Trends
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Track positive vs. negative sentiment over time with beautiful
                charts. Spot trends before they become problems.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              From URL to insights in{" "}
              <span className="text-gradient">3 steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-brand-500/30 via-purple-500/30 to-pink-500/30" />

            {[
              {
                step: "1",
                title: "Paste a URL",
                description:
                  "Copy a link from Trustpilot, Google Reviews, or the App Store and paste it into FeedbackFlow.",
              },
              {
                step: "2",
                title: "AI Analysis",
                description:
                  "Our AI scrapes every review, performs sentiment analysis, and categorizes each one automatically.",
              },
              {
                step: "3",
                title: "Get Insights",
                description:
                  "View bug reports, feature requests, and sentiment trends in a clean, actionable dashboard.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center text-center p-8"
              >
                <div className="w-12 h-12 rounded-full bg-brand-600 dark:bg-brand-500 text-white flex items-center justify-center text-lg font-bold mb-5 relative z-10 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-secondary/50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to stop guessing what your users want?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join product teams who use FeedbackFlow to ship features that
              matter and fix bugs that hurt.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-all duration-200"
            >
              Start Your Free Trial
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-brand-600 dark:bg-brand-500 flex items-center justify-center text-white font-bold text-xs">
                F
              </div>
              <span className="font-semibold text-foreground">
                FeedbackFlow
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} FeedbackFlow. All rights
              reserved.
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}