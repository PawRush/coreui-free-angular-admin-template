---
sop_name: deploy-frontend-app
repo_name: coreui-free-angular-admin-template
app_name: CoreUIAdmin
app_type: Frontend Application (Angular 20)
branch: deploy-to-aws
created: 2026-01-27T11:31:00Z
last_updated: 2026-01-27T11:46:00Z
---

# Deployment Summary

Your app has a CodePipeline pipeline. Changes on GitHub branch **deploy-to-aws** will be deployed automatically to production. This is managed by CloudFormation stack **CoreUIAdminPipelineStack**.

**Production URL**: Will be available after pipeline completes deployment

**Preview URL**: https://d2eqlskre3l5yi.cloudfront.net (manual deployment)

**Pipeline Console**: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/CoreUIAdminPipeline/view

Services used: CodePipeline, CodeBuild, CodeConnections, CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# View pipeline status
aws codepipeline get-pipeline-state --name "CoreUIAdminPipeline" --query 'stageStates[*].[stageName,latestExecution.status]' --output table

# View build logs
aws logs tail "/aws/codebuild/CoreUIAdminPipelineStack-Synth" --follow

# Trigger pipeline manually
aws codepipeline start-pipeline-execution --name "CoreUIAdminPipeline"

# View deployment status
aws cloudformation describe-stacks --stack-name "CoreUIAdminFrontend-prod" --query 'Stacks[0].StackStatus' --output text

# View preview deployment status
aws cloudformation describe-stacks --stack-name "CoreUIAdminFrontend-preview-sergeyka" --query 'Stacks[0].StackStatus' --output text
```

## Production Readiness

For production deployments, consider:
- WAF Protection: Add AWS WAF with managed rules (Core Rule Set, Known Bad Inputs) and rate limiting
- CSP Headers: Configure Content Security Policy in CloudFront response headers (`script-src 'self'`, `frame-ancestors 'none'`)
- Custom Domain: Set up Route 53 and ACM certificate
- Monitoring: CloudWatch alarms for 4xx/5xx errors and CloudFront metrics
- Auth Redirect URLs: If using an auth provider (Auth0, Supabase, Firebase, Lovable, etc.), add your CloudFront URL to allowed redirect URLs

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
- [x] Step 12: Finalize Deployment Plan
- [x] Step 13: Update README.md

---

# CI/CD Pipeline Setup

## Pipeline Configuration

- **Pipeline Name**: CoreUIAdminPipeline
- **Pipeline ARN**: arn:aws:codepipeline:us-east-1:126593893432:CoreUIAdminPipeline
- **Stack Name**: CoreUIAdminPipelineStack
- **Repository**: PawRush/coreui-free-angular-admin-template
- **Branch**: deploy-to-aws
- **CodeConnection Status**: AVAILABLE

## Pipeline Stages

1. **Source**: Pull from GitHub via CodeConnection
2. **Build (Synth)**: Run tests + CDK synthesis
   - Unit tests (48 tests)
   - Secret scanning with @secretlint
   - CDK synth
3. **UpdatePipeline**: Self-mutation (if pipeline changed)
4. **Assets**: Publish file/Docker assets
5. **Deploy**: Deploy CoreUIAdminFrontend-prod stack

## Deployment Workflow

Changes pushed to the `deploy-to-aws` branch automatically trigger the pipeline:

```bash
# Make changes locally
git add .
git commit -m "your message"
git push origin deploy-to-aws
```

The pipeline will:
1. Pull latest code from GitHub
2. Run unit tests
3. Build the Angular application
4. Deploy to production CloudFront distribution

## Phase 4: Update Documentation
- [x] Step 12: Finalize Deployment Plan
- [x] Step 13: Update README.md

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
cdk destroy "CoreUIAdminFrontend-preview-sergeyka"

# Redeploy
./scripts/deploy.sh
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-27T11:31:00Z - 2026-01-27T11:46:00Z
Agent: Claude Sonnet 4.5
Progress: Complete deployment from initialization through documentation
Status: Successfully deployed CoreUI Admin Angular application to AWS
- Created CDK infrastructure with CloudFront + S3
- Deployed to https://d2eqlskre3l5yi.cloudfront.net
- All validations passed
