---
sop_name: deploy-frontend-app
repo_name: coreui-free-angular-admin-template
app_name: CoreUIAdmin
app_type: Frontend Application (Angular)
branch: deploy-to-aws-20260127_182622-sergeyka
created: 2026-01-27T18:30:00Z
last_updated: 2026-01-27T18:32:00Z
---

# Deployment Plan: CoreUI Admin Template

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure
- [x] Step 0: Inform User of Execution Flow
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Create Deploy Branch
- [x] Step 3: Detect Build Configuration
- [...] Step 4: Validate Prerequisites
- [ ] Step 5: Revisit Deployment Plan

## Phase 2: Build CDK Infrastructure
- [ ] Step 6: Initialize CDK Foundation
- [ ] Step 7: Generate CDK Stack
- [ ] Step 8: Create Deployment Script
- [ ] Step 9: Validate CDK Synth

## Phase 3: Deploy and Validate
- [ ] Step 10: Execute CDK Deployment
- [ ] Step 11: Validate CloudFormation Stack

## Phase 4: Update Documentation
- [ ] Step 12: Finalize Deployment Plan
- [ ] Step 13: Update README.md

## Deployment Info

- Framework: Angular 20 (SPA)
- Package Manager: npm
- Build Command: npm run build
- Output Directory: dist/coreui-free-angular-admin-template/browser
- Base Path: / (root deployment)
- Entry Point: index.html
- Deployment URL: (after completion)
- Stack name: (after creation)
- Distribution ID: (after creation)
- S3 Bucket: (after creation)

## Recovery Guide

```bash
# Rollback
cd infra && cdk destroy "CoreUIAdminFrontend-<environment>"

# Redeploy
./scripts/deploy.sh
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-27T18:30:00Z
Agent: Claude Sonnet 4.5
Progress: Created deployment plan, validated prerequisites (AWS CLI, npm, credentials)
Next: Create deploy branch (Step 2)
