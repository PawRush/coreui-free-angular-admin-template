---
sop_name: deploy-frontend-app
repo_name: coreui-free-angular-admin-template
app_name: CoreUIAdmin
app_type: Frontend Application (Angular)
branch: deploy-to-aws-20260130_032535-sergeyka
created: 2026-01-30T04:04:00Z
last_updated: 2026-01-30T04:10:00Z
---

# Deployment Plan: CoreUI Admin Template

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure
- [x] Step 0: Inform User of Execution Flow
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Create Deploy Branch
- [x] Step 3: Detect Build Configuration
- [x] Step 4: Validate Prerequisites
- [x] Step 5: Revisit Deployment Plan
- [x] Phase 1 Checkpoint

## Phase 2: Build CDK Infrastructure
- [x] Step 6: Initialize CDK Foundation
- [x] Step 7: Generate CDK Stack
- [x] Step 8: Create Deployment Script
- [x] Step 9: Validate CDK Synth
- [x] Phase 2 Checkpoint

## Phase 3: Deploy and Validate
- [ ] Step 10: Execute CDK Deployment
- [ ] Step 11: Validate CloudFormation Stack
- [ ] Phase 3 Checkpoint

## Phase 4: Update Documentation
- [ ] Step 12: Finalize Deployment Plan
- [ ] Step 13: Update README.md
- [ ] Completion Step

## Deployment Info

- Package Manager: npm
- Framework: Angular 20
- Build Command: npm run build
- Output Directory: dist/coreui-free-angular-admin-template/browser
- Base Path: /
- Entry Point: index.html
- Application Type: SPA
- Deployment URL: (pending)
- Stack Name: (pending)
- Distribution ID: (pending)
- S3 Bucket: (pending)

## Recovery Guide

```bash
# Rollback
cd infra && cdk destroy "CoreUIAdminFrontend-<environment>"

# Redeploy
./scripts/deploy.sh

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "<distribution-id>" --paths "/*"
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-30T04:04:00Z
Agent: Claude Sonnet 4.5
Progress: Created deployment plan
Next: Step 2 - Create deploy branch
