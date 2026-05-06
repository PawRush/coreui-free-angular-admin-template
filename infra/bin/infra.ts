#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { execSync } from "child_process";
import { FrontendStack } from "../lib/stacks/frontend-stack";
import { PipelineStack } from "../lib/stacks/pipeline-stack";

const app = new cdk.App();

const getDefaultEnvironment = (): string => {
  try {
    const username = process.env.USER || execSync('whoami').toString().trim();
    return `preview-${username}`;
  } catch {
    return 'preview-local';
  }
};

const environment = app.node.tryGetContext("environment") || getDefaultEnvironment();
const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION || "us-east-1";
const buildOutputPath = app.node.tryGetContext("buildPath") || "../dist/coreui-free-angular-admin-template/browser";

// Deploy frontend infrastructure
const frontendStack = new FrontendStack(app, `CoreUIFrontend-${environment}`, {
  env: { account, region },
  environment,
  buildOutputPath,
  description: `Static website hosting - ${environment}`,
  terminationProtection: environment === "prod",
});

// Deploy CI/CD pipeline (optional - only when explicitly deploying pipeline stack)
const deployPipeline = app.node.tryGetContext("deployPipeline") === "true";
if (deployPipeline) {
  const githubOwner = app.node.tryGetContext("githubOwner") || "PawRush";
  const githubRepo = app.node.tryGetContext("githubRepo") || "coreui-free-angular-admin-template";
  const githubBranch = app.node.tryGetContext("githubBranch") || "deploy-to-aws-20260506_182005-kamielw";
  const codeConnectionArn = app.node.tryGetContext("codeConnectionArn") || "arn:aws:codeconnections:eu-central-1:189681391221:connection/4c2352a8-1bf0-449b-8300-b1135c0e5f4e";

  new PipelineStack(app, `CoreUIPipeline-${environment}`, {
    env: { account, region },
    environment,
    githubOwner,
    githubRepo,
    githubBranch,
    codeConnectionArn,
    targetBucketName: frontendStack.bucketName,
    distributionId: "E3763T1PFKP1ZX", // From existing deployment
    description: `CI/CD pipeline for ${githubRepo}`,
  });
}

cdk.Tags.of(app).add("Project", "CoreUI");
cdk.Tags.of(app).add("ManagedBy", "CDK");
cdk.Tags.of(app).add("Environment", environment);
