---
sop_name: deploy-frontend-app
repo_name: coreui-free-angular-admin-template
app_name: CoreUIAdmin
app_type: Frontend Application (Angular)
branch: deploy-to-aws-20260501_121659-kamielw
created: 2026-05-01T12:43:00Z
completed: 2026-05-01T12:51:00Z
---

# Deployment Summary

Your app is deployed to AWS! Preview URL: https://d1iv7uv3iio598.cloudfront.net

**Next Step: Automate Deployments**

You're currently using manual deployment. To automate deployments from GitHub, ask your coding agent to set up AWS CodePipeline using an agent SOP for pipeline creation. Try: "create a pipeline using AWS SOPs"

Services used: CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# View deployment status
aws cloudformation describe-stacks --stack-name "CoreUIFrontend-preview-kamielw" --region eu-central-1 --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "E3763T1PFKP1ZX" --paths "/*"

# View CloudFront access logs (last hour)
aws s3 ls "s3://coreuifrontend-preview-ka-cftos3cloudfrontloggingb-gijqipbudesd/" --recursive | tail -20

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
- [x] Step 13: Update README.md

## Deployment Info

- Deployment URL: https://d1iv7uv3iio598.cloudfront.net
- Stack name: CoreUIFrontend-preview-kamielw
- Region: eu-central-1
- Distribution ID: E3763T1PFKP1ZX
- Distribution Domain: d1iv7uv3iio598.cloudfront.net
- S3 Bucket: coreuifrontend-preview-kami-cftos3s3bucketcae9f2be-ytfywl02fyvy
- CloudFront Log Bucket: coreuifrontend-preview-ka-cftos3cloudfrontloggingb-gijqipbudesd
- S3 Log Bucket: coreuifrontend-preview-ka-cftos3s3loggingbucket64b-qrp7tkziuxgj

## Build Configuration

- Framework: Angular 20 (SPA)
- Package manager: npm
- Build command: npm run build
- Output directory: dist/coreui-free-angular-admin-template/browser
- Base path: / (root)
- Entry point: index.html
- CloudFront config: SPA (error responses to /index.html)
- Lint command: none detected

## Recovery Guide

```bash
# Rollback
cd infra && npx cdk destroy --all --region eu-central-1

# Redeploy
./scripts/deploy.sh

# Manual cleanup if needed
# CloudFront → S3 → IAM (in that order)
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-05-01T12:51:00Z
Agent: Claude Sonnet 4.5
Progress: Completed full deployment - created deployment plan, created deploy branch (deploy-to-aws-20260501_121659-kamielw), detected build configuration (Angular 20 SPA, output: dist/coreui-free-angular-admin-template/browser), validated prerequisites, initialized CDK infrastructure, generated frontend stack with S3+CloudFront+CSP headers, created deployment script, validated CDK synth, deployed to AWS (eu-central-1), validated CloudFormation stack (UPDATE_COMPLETE), verified application accessible at https://d1iv7uv3iio598.cloudfront.net, finalized documentation.
Status: DEPLOYMENT COMPLETE
