---
sop_name: deploy-frontend-app
repo_name: coreui-free-angular-admin-template
app_name: CoreUIAdmin
app_type: Frontend Application (Angular)
branch: deploy-to-aws-20260130_032535-sergeyka
created: 2026-01-30T04:04:00Z
last_updated: 2026-01-30T04:16:00Z
---

# Deployment Summary

Your app is deployed to AWS with automated CI/CD!

**Production URL**: (pending - pipeline deploying)
**Preview URL**: https://d3j631bgrt0bpt.cloudfront.net
**Pipeline**: https://us-east-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/CoreUIPipeline/view

## Automated Deployments

Changes pushed to `deploy-to-aws-20260130_032535-sergeyka` branch automatically trigger the pipeline:

```bash
# Make changes, commit, and push
git push origin deploy-to-aws-20260130_032535-sergeyka
```

Services used: CodePipeline, CodeBuild, CodeConnections, CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# View pipeline status
aws codepipeline get-pipeline-state --name "CoreUIPipeline" --query 'stageStates[*].[stageName,latestExecution.status]' --output table

# View build logs
aws logs tail "/aws/codebuild/PipelineBuildSynthCdkBuildP-" --since 10m --follow

# Trigger pipeline manually
aws codepipeline start-pipeline-execution --name "CoreUIPipeline"

# View preview deployment status (manual deployments)
aws cloudformation describe-stacks --stack-name "CoreUIFrontend-preview-sergeyka" --query 'Stacks[0].StackStatus' --output text

# Invalidate CloudFront cache (preview)
aws cloudfront create-invalidation --distribution-id "E3U1YIULBG7A44" --paths "/*"

# Manual deployment (preview environment)
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
- [x] Phase 1 Checkpoint

## Phase 2: Build CDK Infrastructure
- [x] Step 6: Initialize CDK Foundation
- [x] Step 7: Generate CDK Stack
- [x] Step 8: Create Deployment Script
- [x] Step 9: Validate CDK Synth
- [x] Phase 2 Checkpoint

## Phase 3: Deploy and Validate
- [x] Step 10: Execute CDK Deployment
- [x] Step 11: Validate CloudFormation Stack
- [x] Phase 3 Checkpoint

## Phase 4: Update Documentation
- [x] Step 12: Finalize Deployment Plan
- [x] Step 13: Update README.md
- [x] Completion Step

## Deployment Info

- Package Manager: npm
- Framework: Angular 20
- Build Command: npm run build
- Output Directory: dist/coreui-free-angular-admin-template/browser
- Base Path: /
- Entry Point: index.html
- Application Type: SPA
- Deployment URL: https://d3j631bgrt0bpt.cloudfront.net
- Stack Name: CoreUIFrontend-preview-sergeyka
- Distribution ID: E3U1YIULBG7A44
- S3 Bucket: coreuifrontend-preview-serg-cftos3s3bucketcae9f2be-tzqlnsqhrck3
- S3 Log Bucket: coreuifrontend-preview-se-cftos3s3loggingbucket64b-fnypn4c0a2ie
- CloudFront Log Bucket: coreuifrontend-preview-se-cftos3cloudfrontloggingb-y1ezdityf4jp

## Recovery Guide

```bash
# Rollback
cd infra && cdk destroy "CoreUIFrontend-preview-sergeyka"

# Redeploy
./scripts/deploy.sh

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id "E3U1YIULBG7A44" --paths "/*"
```

## Issues Encountered

None.

## Session Log

### Session 1 - 2026-01-30T04:04:00Z - 2026-01-30T04:16:00Z
Agent: Claude Sonnet 4.5
Progress: Complete deployment from detection through validation
- Detected Angular 20 SPA with build to dist/coreui-free-angular-admin-template/browser
- Created CDK infrastructure with CloudFrontToS3 construct
- Applied SPA error response configuration (403/404 → /index.html)
- Deployed to preview-sergeyka environment in ~5 minutes
- Validated stack CREATE_COMPLETE and site accessible with security headers
Next: Documentation complete
