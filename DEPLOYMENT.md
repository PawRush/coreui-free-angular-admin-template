---
sop_name: deploy-frontend-app
repo_name: coreui-free-angular-admin-template
app_name: CoreUIAdmin
app_type: Frontend Application
branch: deploy-to-aws-20260506_150212-kamielw
created: 2026-05-06T15:32:00Z
completed: 2026-05-06T15:42:00Z
---

# Deployment Summary

Your app has a **CI/CD pipeline** deployed! Changes pushed to the `deploy-to-aws-20260506_150212-kamielw` branch on GitHub will automatically deploy to production.

**Production URL**: https://d12x6r59p26l1d.cloudfront.net  
**Preview URL**: https://d1iv7uv3iio598.cloudfront.net

**Pipeline Console**: https://eu-central-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/CoreUIAdminPipeline/view

Services used: CodePipeline, CodeBuild, CodeConnections, CloudFront, S3, CloudFormation, IAM

Questions? Ask your Coding Agent:
 - What resources were deployed to AWS?
 - How do I update my deployment?

## Quick Commands

```bash
# View pipeline status
aws codepipeline get-pipeline-state --name "CoreUIAdminPipeline" --region eu-central-1 --query 'stageStates[*].[stageName,latestExecution.status]' --output table

# View build logs
aws logs tail "/aws/codebuild/CoreUIAdminPipelineStack-PipelineBuildSynthCdkBuildProject" --region eu-central-1 --follow

# Trigger pipeline manually
aws codepipeline start-pipeline-execution --name "CoreUIAdminPipeline" --region eu-central-1

# View production deployment status
aws cloudformation describe-stacks --stack-name "CoreUIAdminFrontend-prod" --region eu-central-1 --query 'Stacks[0].StackStatus' --output text

# Invalidate production CloudFront cache
aws cloudfront create-invalidation --distribution-id "E13LPW1Z1RQTI3" --paths "/*" --region eu-central-1

# Manual preview deployment (for testing)
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

➡️ Phase 1 Checkpoint

## Phase 2: Build CDK Infrastructure
- [x] Step 6: Initialize CDK Foundation
- [x] Step 7: Generate CDK Stack
- [x] Step 8: Create Deployment Script
- [x] Step 9: Validate CDK Synth

➡️ Phase 2 Checkpoint

## Phase 3: Deploy and Validate
- [x] Step 10: Execute CDK Deployment
- [x] Step 11: Validate CloudFormation Stack

➡️ Phase 3 Checkpoint

## Phase 4: Update Documentation
- [x] Step 12: Finalize Deployment Plan
- [x] Step 13: Update README.md

🎯 COMPLETION STEP - COMPLETE

## Build Configuration

- Framework: Angular 20
- Package Manager: npm
- Build Command: `npm run build`
- Output Directory: `dist/coreui-free-angular-admin-template/browser`
- Base Path: `/` (root)
- Entry Point: `index.html`
- Lint Command: None detected
- Application Type: SPA (Single Page Application)
- CloudFront Config: Error responses → `/index.html`

## Deployment Info

### Production Environment
- Deployment URL: https://d12x6r59p26l1d.cloudfront.net
- Stack Name: CoreUIAdminFrontend-prod
- Distribution ID: E13LPW1Z1RQTI3
- Distribution Domain: d12x6r59p26l1d.cloudfront.net
- S3 Bucket: coreuiadminfrontend-prod-cftos3s3bucketcae9f2be-cwvfpljro5sg
- CloudFront Log Bucket: coreuiadminfrontend-prod-cftos3cloudfrontloggingbu-ufhgev0jzmsn
- S3 Log Bucket: coreuiadminfrontend-prod-cftos3s3loggingbucket64b4-vmhf5dfdnhoa

### Preview Environment (Manual Deployment)
- Deployment URL: https://d1iv7uv3iio598.cloudfront.net
- Stack Name: CoreUIFrontend-preview-kamielw
- Distribution ID: E3763T1PFKP1ZX
- Distribution Domain: d1iv7uv3iio598.cloudfront.net
- S3 Bucket: coreuifrontend-preview-kami-cftos3s3bucketcae9f2be-ytfywl02fyvy
- CloudFront Log Bucket: coreuifrontend-preview-ka-cftos3cloudfrontloggingb-gijqipbudesd
- S3 Log Bucket: coreuifrontend-preview-ka-cftos3s3loggingbucket64b-qrp7tkziuxgj

### Pipeline Configuration
- Pipeline Name: CoreUIAdminPipeline
- Pipeline Stack: CoreUIAdminPipelineStack
- Source Branch: deploy-to-aws-20260506_150212-kamielw
- Repository: PawRush/coreui-free-angular-admin-template
- CodeConnection ARN: arn:aws:codeconnections:eu-central-1:189681391221:connection/ee7a600a-99ab-4b3a-bf6c-b42cc9f5a026
- Region: eu-central-1
- Pipeline Deployed: 2026-05-06T15:50:13Z

## Recovery Guide

```bash
# Rollback
cd infra
cdk destroy "CoreUIFrontend-preview-kamielw" --region eu-central-1

# Redeploy
./scripts/deploy.sh
```

## Issues Encountered

None.

---

## CI/CD Pipeline

### Pipeline Overview

The CoreUI Admin Template now has automated CI/CD pipeline that deploys to production whenever code is pushed to the `deploy-to-aws-20260506_150212-kamielw` branch.

**Pipeline Stages:**
1. **Source**: Pull code from GitHub via CodeConnection
2. **Build (Synth)**: 
   - Install dependencies
   - Run unit tests (48 tests)
   - Check for secrets in code
   - Build Angular app
   - Synthesize CDK infrastructure
3. **UpdatePipeline**: Self-mutate if pipeline code changed
4. **Assets**: Publish file assets to S3
5. **Deploy**: Deploy application stacks to production

### How to Deploy

Simply push to the source branch:

```bash
git push origin deploy-to-aws-20260506_150212-kamielw
```

The pipeline will automatically:
- Run tests
- Build the application
- Deploy to production CloudFront/S3
- Invalidate CloudFront cache

### CodeConnection Status

**⚠️ Important**: The CodeConnection currently shows ERROR status. To enable automatic deployments on push:

1. Visit: https://eu-central-1.console.aws.amazon.com/codesuite/settings/connections
2. Find connection: `arn:aws:codeconnections:eu-central-1:189681391221:connection/ee7a600a-99ab-4b3a-bf6c-b42cc9f5a026`
3. Click "Update pending connection"
4. Authorize GitHub access
5. Install AWS Connector app

Once authorized, the pipeline will trigger automatically on every push to the branch.

### Manual Pipeline Trigger

If needed, you can manually trigger the pipeline:

```bash
aws codepipeline start-pipeline-execution \
  --name "CoreUIAdminPipeline" \
  --region eu-central-1
```

### Troubleshooting Pipeline

**View pipeline execution:**
```bash
aws codepipeline get-pipeline-state \
  --name "CoreUIAdminPipeline" \
  --region eu-central-1
```

**View build logs:**
```bash
aws logs tail "/aws/codebuild/CoreUIAdminPipelineStack-PipelineBuildSynthCdkBuildProject" \
  --region eu-central-1 \
  --follow
```

**Check CloudFormation stack events:**
```bash
aws cloudformation describe-stack-events \
  --stack-name "CoreUIAdminFrontend-prod" \
  --region eu-central-1 \
  --max-items 20
```

---

## Session Log

### Session 1 - 2026-05-06T15:32:00Z - 2026-05-06T15:42:00Z
Agent: Claude Sonnet 4.5
Progress: Complete deployment from analysis through production deployment
Status: SUCCESS
- Analyzed codebase and determined Angular 20 SPA
- Created CDK infrastructure with CloudFront + S3
- Deployed to eu-central-1
- Validated all resources and accessibility

### Session 2 - 2026-05-06T15:45:00Z - 2026-05-06T15:52:00Z
Agent: Claude Sonnet 4.5
Progress: Set up CI/CD pipeline using setup-pipeline SOP
Status: SUCCESS
- Detected existing infrastructure and configuration
- Created PipelineStack with CodePipeline + CodeBuild
- Updated infra.ts to support pipeline and manual modes
- Deployed pipeline stack successfully
- Pipeline executed and deployed production stack
- Production URL: https://d12x6r59p26l1d.cloudfront.net
- Note: CodeConnection needs GitHub authorization for automatic triggers
