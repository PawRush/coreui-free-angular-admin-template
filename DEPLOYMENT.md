---
sop_name: deploy-frontend-app
repo_name: coreui-free-angular-admin-template
app_name: CoreUIAdmin
app_type: Frontend Application (Angular)
branch: deploy-to-aws-20260127_182622-sergeyka
created: 2026-01-27T18:30:00Z
last_updated: 2026-01-27T18:45:00Z
---

# Deployment Summary

Your app is deployed to AWS! Preview URL: https://d3ohut4p6h7edv.cloudfront.net

**Next Step: Automate Deployments**

You're currently using manual deployment. To automate deployments from GitHub, ask your coding agent to set up AWS CodePipeline using an agent SOP for pipeline creation. Try: "create a pipeline using AWS SOPs"

Services used: CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# View deployment status
aws cloudformation describe-stacks --stack-name "CoreUIAdminFrontend-preview-sergeyka" --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "E1LFLNSEC2AQKH" --paths "/*"

# View CloudFront access logs (last hour)
aws s3 ls "s3://coreuiadminfrontend-previ-cftos3cloudfrontloggingb-qxod0gi4p1qn/" --recursive | tail -20

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
- [ ] Step 13: Update README.md

## Deployment Info

- Framework: Angular 20 (SPA)
- Package Manager: npm
- Build Command: npm run build
- Output Directory: dist/coreui-free-angular-admin-template/browser
- Base Path: / (root deployment)
- Entry Point: index.html
- Deployment URL: https://d3ohut4p6h7edv.cloudfront.net
- Stack name: CoreUIAdminFrontend-preview-sergeyka
- Distribution ID: E1LFLNSEC2AQKH
- S3 Bucket: coreuiadminfrontend-preview-cftos3s3bucketcae9f2be-jsyr0psarhca
- CloudFront Log Bucket: coreuiadminfrontend-previ-cftos3cloudfrontloggingb-qxod0gi4p1qn
- S3 Log Bucket: coreuiadminfrontend-previ-cftos3s3loggingbucket64b-1io9zblfzbko
- Deployment Timestamp: 2026-01-27T18:41:38Z

## Recovery Guide

```bash
# Rollback
cd infra && cdk destroy "CoreUIAdminFrontend-preview-sergeyka"

# Redeploy
./scripts/deploy.sh
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-27T18:30:00Z
Agent: Claude Sonnet 4.5
Progress: Completed all phases - deployment successful
Next: Documentation finalization complete
