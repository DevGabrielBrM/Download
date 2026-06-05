"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Container } from "@/components/ui/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    id: "starter",
    description: "Perfect for individuals and side projects getting started with feedback analysis.",
    monthlyPrice: 19,
    yearlyPrice: 182, // 19*12 - 20% = 182.4 → rounds to 182
    yearlyLabel: "$15/mo",
    yearlyNote: "billed annually ($182/yr)",
    features: [
      { text: "1 review platform", included: true },
      { text: "500 reviews/month", included: true },
      { text: "Basic sentiment dashboard", included: true },
      { text: "7-day data history", included: true },
      { text: "Email support", included: true },
      { text: "AI bug report & feature extraction", included: false },
      { text: "Export to CSV/PDF", included: false },
      { text: "Custom integrations", included: false },
      { text: "API access", included: false },
      { text: "Dedicated support", included: false },
    ],
    cta: "Get Started Free",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Pro",
    id: "pro",
    description: "For growing product teams that need comprehensive feedback analysis across all platforms.",
    monthlyPrice: 49,
    yearlyPrice: 470, // 49*12 - 20% = 470.4
    yearlyLabel: "$39/mo",
    yearlyNote: "billed annually ($470/yr)",
    features: [
      { text: "Unlimited review platforms", included: true },
      { text: "Unlimited reviews", included: true },
      { text: "Advanced sentiment dashboard", included: true },
      { text: "30-day data history", included: true },
      { text: "Priority email & chat support", included: true },
      { text: "AI bug report & feature extraction", included: true },
      { text: "Export to CSV/PDF", included: true },
      { text: "Full AI categorization", included: true },
      { text: "Custom integrations", included: false },
      { text: "API access", included: false },
      { text: "Dedicated account manager", included: false },
      { text: "Custom AI model tuning", included: false },
    ],
    cta: "Start Free Trial",
    href: "/register",
    highlighted: true,
  },
  {
    name: "Enterprise",
    id: "enterprise",
    description: "For large organizations requiring custom integrations, API access, and white-glove support.",
    monthlyPrice: 149,
    yearlyPrice: 1428, // 149*12 - 20% = 1430.4 → roughly
    yearlyLabel: "$119/mo",
    yearlyNote: "billed annually ($1,428/yr)",
    features: [
      { text: "Unlimited review platforms", included: true },
      { text: "Unlimited reviews", included: true },
      { text: "Custom dashboard & analytics", included: true },
      { text: "Unlimited data history", included: true },
      { text: "Dedicated support team", included: true },
      { text: "AI bug report & feature extraction", included: true },
      { text: "All export formats", included: true },
      { text: "Full AI categorization", included: true },
      { text: "Custom integrations", included: true },
      { text: "Full API access", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom AI model tuning", included: true },
      { text: "SLA guarantee", included: true },
      { text: "SSO & advanced security", included: true },
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
];

const allFeatures = [
  { name: "Review platforms", starter: "1", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "Monthly reviews", starter: "500", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "Sentiment dashboard", starter: "Basic", pro: "Advanced", enterprise: "Custom" },
  { name: "Data history", starter: "7 days", pro: "30 days", enterprise: "Unlimited" },
  { name: "AI bug report extraction", starter: false, pro: true, enterprise: true },
  { name: "AI feature request extraction", starter: false, pro: true, enterprise: true },
  { name: "Full AI categorization", starter: false, pro: true, enterprise: true },
  { name: "Export to CSV/PDF", starter: false, pro: true, enterprise: true },
  { name: "Custom integrations", starter: false, pro: false, enterprise: true },
  { name: "API access", starter: false, pro: false, enterprise: true },
  { name: "Custom AI model tuning", starter: false, pro: false, enterprise: true },
  { name: "Support", starter: "Email", pro: "Priority", enterprise: "Dedicated" },
  { name: "SLA guarantee", starter: false, pro: false, enterprise: true },
  { name: "SSO & advanced security", starter: false, pro: false, enterprise: true },
];

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate your billing for the remainder of the month.",
  },
  {
    q: "How does the free trial work?",
    a: "Start with a 14-day free trial on any paid plan. No credit card required. You'll get full access to all Pro features during the trial period.",
  },
  {
    q: "What review platforms do you support?",
    a: "We currently support Trustpilot, Google Reviews, and the Apple App Store. Enterprise plans can request custom platform integrations.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes, you can cancel anytime. Your data will remain accessible for the remainder of your billing period, and you can export everything before it ends.",
  },
  {
    q: "How does AI categorization work?",
    a: "Our AI analyzes each review using natural language processing to determine sentiment (positive/negative/neutral) and automatically categorizes it as a bug report, feature request, or general feedback.",
  },
  {
    q: "What does the SLA guarantee cover?",
    a: "Enterprise SLA guarantees 99.9% uptime, 4-hour response time for critical issues, and dedicated infrastructure. Custom SLAs can be negotiated.",
  },
];

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-positive shrink-0">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/40 shrink-0">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-brand-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        </div>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/20 border border-brand-200/50 dark:border-brand-800/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                Simple, transparent pricing
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Find the perfect plan for{" "}
              <span className="text-gradient">your team</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Start for free, upgrade when you grow. No hidden fees, no surprises.
            </p>

            {/* Billing toggle */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <span
                className={`text-sm font-medium transition-colors ${
                  !annual ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setAnnual(!annual)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                  annual ? "bg-brand-600" : "bg-muted-foreground/30"
                }`}
                aria-label={annual ? "Switch to monthly billing" : "Switch to yearly billing"}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                    annual ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium transition-colors ${
                  annual ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Yearly
                <span className="ml-1.5 inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-semibold bg-positive-light text-positive-dark dark:bg-positive-dark/20 dark:text-positive">
                  Save 20%
                </span>
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <Container>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
                  tier.highlighted
                    ? "border-brand-500 dark:border-brand-400 shadow-elevated scale-[1.02] md:scale-105 bg-card ring-1 ring-brand-500/20"
                    : "border-border bg-card hover:shadow-elevated"
                }`}
              >
                {/* Most Popular badge */}
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Card Header */}
                <div className="p-6 lg:p-8">
                  <h3 className={`text-lg font-semibold ${tier.highlighted ? "text-brand-600 dark:text-brand-400" : "text-foreground"}`}>
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6">
                    <div className="flex items-baseline gap-1">
                      {annual ? (
                        <>
                          <span className="text-4xl font-extrabold text-foreground">
                            {tier.yearlyLabel}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            /mo
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-4xl font-extrabold text-foreground">
                            {tier.monthlyPrice === 0 ? (
                              "Free"
                            ) : (
                              <>${tier.monthlyPrice}</>
                            )}
                          </span>
                          {tier.monthlyPrice > 0 && (
                            <span className="text-sm text-muted-foreground">
                              /mo
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    {annual && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {tier.yearlyNote}
                      </p>
                    )}
                    {!annual && tier.monthlyPrice > 0 && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        ${tier.monthlyPrice * 12}/yr
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <a
                    href={tier.href}
                    className={`mt-6 flex items-center justify-center h-11 w-full rounded-xl text-sm font-medium transition-all duration-200 ${
                      tier.highlighted
                        ? "bg-brand-600 text-white hover:bg-brand-700 shadow-sm active:scale-[0.98]"
                        : "bg-secondary text-foreground hover:bg-accent border border-border active:scale-[0.98]"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>

                {/* Features list */}
                <div className="px-6 lg:px-8 pb-6 lg:pb-8 flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                    What&apos;s included
                  </p>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature.text}
                        className={`flex items-start gap-3 text-sm ${
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground/50"
                        }`}
                      >
                        {feature.included ? <CheckIcon /> : <MinusIcon />}
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-secondary/50">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
              Compare plans in detail
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
              Everything you need to know about what each plan includes.
            </p>

            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">
                      Feature
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-foreground">
                      Starter
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-brand-600 dark:text-brand-400 bg-brand-50/30 dark:bg-brand-900/10">
                      Pro
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-semibold text-foreground">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((feature, i) => (
                    <tr
                      key={feature.name}
                      className={`border-b border-border/50 ${
                        i % 2 === 0 ? "bg-card" : "bg-secondary/30"
                      }`}
                    >
                      <td className="py-3.5 px-6 text-sm text-foreground font-medium">
                        {feature.name}
                      </td>
                      {(["starter", "pro", "enterprise"] as const).map(
                        (tier) => (
                          <td
                            key={tier}
                            className={`text-center py-3.5 px-6 ${
                              tier === "pro"
                                ? "bg-brand-50/20 dark:bg-brand-900/5"
                                : ""
                            }`}
                          >
                            {typeof feature[tier] === "boolean" ? (
                              feature[tier] ? (
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-positive-light dark:bg-positive-dark/20">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-positive"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </span>
                              ) : (
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted/30">
                                  <MinusIcon />
                                </span>
                              )
                            ) : (
                              <span className="text-sm text-foreground">
                                {String(feature[tier])}
                              </span>
                            )}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
              Frequently asked questions
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
              Got questions? We&apos;ve got answers.
            </p>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-border bg-card overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-foreground hover:bg-accent/50 transition-colors list-none">
                    {faq.q}
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
                      className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to transform your feedback?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Start your 14-day free trial on the Pro plan. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/register"
                className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm transition-all duration-200 active:scale-[0.98]"
              >
                Get Started Free
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
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-foreground bg-secondary hover:bg-accent rounded-xl transition-all duration-200 border border-border"
              >
                Talk to Sales
              </a>
            </div>
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
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
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