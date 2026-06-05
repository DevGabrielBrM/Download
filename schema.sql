-- FeedbackFlow Database Schema

-- Users table for authentication
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Workspaces table for multi-tenant support
CREATE TABLE workspaces (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    plan_type TEXT DEFAULT 'starter', -- starter, pro, enterprise
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Review sources (Trustpilot, Google Reviews, App Store)
CREATE TABLE review_sources (
    id TEXT PRIMARY KEY,
    workspace_id TEXT NOT NULL,
    url TEXT NOT NULL,
    platform TEXT NOT NULL, -- trustpilot, google_reviews, app_store
    name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workspace_id) REFERENCES workspaces(id)
);

-- Individual reviews scraped from sources
CREATE TABLE reviews (
    id TEXT PRIMARY KEY,
    review_source_id TEXT NOT NULL,
    author TEXT,
    rating INTEGER,
    title TEXT,
    body TEXT,
    date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_source_id) REFERENCES review_sources(id)
);

-- Sentiment analysis results for each review
CREATE TABLE sentiment_analyses (
    id TEXT PRIMARY KEY,
    review_id TEXT UNIQUE NOT NULL,
    sentiment TEXT NOT NULL, -- positive, negative, neutral
    score REAL, -- 0 to 1
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);

-- Bug reports extracted from reviews
CREATE TABLE bug_reports (
    id TEXT PRIMARY KEY,
    review_id TEXT NOT NULL,
    title TEXT,
    description TEXT,
    severity TEXT, -- low, medium, high, critical
    status TEXT DEFAULT 'open', -- open, in_progress, resolved, closed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);

-- Feature requests extracted from reviews
CREATE TABLE feature_requests (
    id TEXT PRIMARY KEY,
    review_id TEXT NOT NULL,
    title TEXT,
    description TEXT,
    votes INTEGER DEFAULT 0,
    status TEXT DEFAULT 'open', -- open, planned, in_progress, completed, declined
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);

-- Performance Indexes
CREATE INDEX idx_workspaces_user_id ON workspaces(user_id);
CREATE INDEX idx_review_sources_workspace_id ON review_sources(workspace_id);
CREATE INDEX idx_reviews_review_source_id ON reviews(review_source_id);
CREATE INDEX idx_bug_reports_review_id ON bug_reports(review_id);
CREATE INDEX idx_feature_requests_review_id ON feature_requests(review_id);
