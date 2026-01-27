---
sop_name: deploy-frontend-app
repo_name: coreui-free-angular-admin-template
app_name: CoreUIAdmin
app_type: Frontend Application (Angular 20)
branch: deploy-to-aws
created: 2026-01-27T11:31:00Z
last_updated: 2026-01-27T11:46:00Z
---

# Deployment Plan: CoreUI Admin

Coding Agents should follow this Deployment Plan, and validate previous progress if picking up the Deployment in a new coding session.

**IMPORTANT**: Update this plan after EACH step completes. Mark the step `[x]` and update `last_updated` timestamp.

## Phase 1: Gather Context and Configure
- [x] Step 0: Inform User of Execution Flow
- [x] Step 1: Create Deployment Plan
- [x] Step 2: Create Deploy Branch
- [x] Step 3: Detect Build Configuration
- [x] Step 4: Validate Prerequisites
- [x] Step 5: Revisit Deployment Plan

## Phase 2: Build CDK Infrastructure
- [x] Step 6: Initialize CDK Foundation
- [x] Step 7: Generate CDK Stack
- [x] Step 8: Create Deployment Script
- [x] Step 9: Validate CDK Synth

## Phase 3: Deploy and Validate
- [x] Step 10: Execute CDK Deployment
- [x] Step 11: Validate CloudFormation Stack

## Phase 4: Update Documentation
- [ ] Step 12: Finalize Deployment Plan
- [ ] Step 13: Update README.md

## Deployment Info

- Framework: Angular 20 (SPA)
- Package Manager: npm
- Build Command: npm run build
- Output Directory: dist/coreui-free-angular-admin-template/browser
- Base Path: / (root)
- CloudFront Config: SPA with error responses to /index.html
- Deployment URL: https://d2eqlskre3l5yi.cloudfront.net
- Stack Name: CoreUIAdminFrontend-preview-sergeyka
- Distribution ID: E3HRO79TEQH6NW
- S3 Bucket Name: coreuiadminfrontend-preview-cftos3s3bucketcae9f2be-0w4n9pzx4bgp
- S3 Log Bucket: coreuiadminfrontend-previ-cftos3s3loggingbucket64b-6mweepltxhls
- CloudFront Log Bucket: coreuiadminfrontend-previ-cftos3cloudfrontloggingb-kbxaixbb8q94
- Deployment Timestamp: 2026-01-27T11:45:50Z

## Recovery Guide

```bash
# Rollback
cd infra
cdk destroy "<StackName>"

# Redeploy
./scripts/deploy.sh
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-27T11:31:00Z
Agent: Claude Sonnet 4.5
Progress: Creating deployment plan
Next: Step 2 - Create deploy branch
