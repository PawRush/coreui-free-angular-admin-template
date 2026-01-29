# Deployment Summary

Your app is deployed to AWS! Preview URL: https://d3x0qfm5sm6ox.cloudfront.net

**Next Step: Automate Deployments**

You're currently using manual deployment. To automate deployments from GitHub, ask your coding agent to set up AWS CodePipeline using an agent SOP for pipeline creation. Try: "create a pipeline using AWS SOPs"

Services used: CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# View deployment status
aws cloudformation describe-stacks --stack-name "CoreUIFrontend-preview-sergeyka" --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "EVUN71R03Y9CV" --paths "/*"

# View CloudFront access logs (last hour)
aws s3 ls "s3://coreuifrontend-preview-se-cftos3cloudfrontloggingb-v2okrbffe34p/" --recursive | tail -20

# Redeploy
./scripts/deploy.sh
```

## Production Readiness

For production deployments, consider:
- WAF Protection: Add AWS WAF with managed rules (Core Rule Set, Known Bad Inputs) and rate limiting
- CSP Headers: Configure Content Security Policy in CloudFront response headers (`script-src 'self'`, `frame-ancestors 'none'`)
- Custom Domain: Set up Route 53 and ACM certificate
- Monitoring: CloudWatch alarms for 4xx/5xx errors and CloudFront metrics
- Auth Redirect URLs: If using an auth provider (Auth0, Supabase, Firebase, Lovable, etc.), add your CloudFront URL to allowed redirect URLs

---

# Deployment Plan: CoreUI Angular Admin Template

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
- [x] Step 12: Finalize Deployment Plan
- [x] Step 13: Update README.md

## Deployment Info

- Deployment URL: https://d3x0qfm5sm6ox.cloudfront.net
- Stack name: CoreUIFrontend-preview-sergeyka
- Distribution ID: EVUN71R03Y9CV
- S3 Bucket: coreuifrontend-preview-serg-cftos3s3bucketcae9f2be-np6tygjmw22c
- CloudFront Log Bucket: coreuifrontend-preview-se-cftos3cloudfrontloggingb-v2okrbffe34p
- S3 Log Bucket: coreuifrontend-preview-se-cftos3s3loggingbucket64b-e0dtioqcavtt
- Deployment timestamp: 2026-01-29T23:31:34Z

## Recovery Guide

```bash
# Rollback
cd infra
cdk destroy "CoreUIFrontend-<environment>"

# Redeploy
./scripts/deploy.sh

# Manual resource cleanup (if cdk destroy fails)
# 1. Delete CloudFront distribution (disable first, wait ~15 min)
# 2. Empty and delete S3 buckets
# 3. Delete CloudFormation stack
# 4. Delete IAM roles
```

## Issues Encountered

None.

## Build Configuration

- Framework: Angular 20
- Package manager: npm
- Build command: `npm run build`
- Output directory: `dist/coreui-free-angular-admin-template/browser/`
- Base path: `/` (root)
- Entry point: `index.html`
- Application type: Single Page Application (SPA)
- CloudFront config: Error responses to /index.html for client-side routing

## Session Log

### Session 1 - 2026-01-29T23:32:00Z
Agent: Claude Sonnet 4.5
Progress: Deployment complete - All phases finished, application live at CloudFront URL
Next: Finalize documentation
