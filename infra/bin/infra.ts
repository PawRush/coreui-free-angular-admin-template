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

const account = process.env.CDK_DEFAULT_ACCOUNT;
const region = process.env.CDK_DEFAULT_REGION || "us-east-1";

const codeConnectionArn = app.node.tryGetContext("codeConnectionArn");
const repositoryName = app.node.tryGetContext("repositoryName") || "PawRush/coreui-free-angular-admin-template";
const branchName = app.node.tryGetContext("branchName") || "deploy-to-aws-20260130_032535-sergeyka";

// Manual deployment stacks (when no CodeConnection specified)
if (!codeConnectionArn) {
  const environment = app.node.tryGetContext("environment") || getDefaultEnvironment();
  const buildOutputPath = app.node.tryGetContext("buildPath") || "../dist/coreui-free-angular-admin-template/browser";

  new FrontendStack(app, `CoreUIFrontend-${environment}`, {
    env: { account, region },
    environment,
    buildOutputPath,
    description: `CoreUI Admin Template - ${environment}`,
    terminationProtection: environment === "prod",
  });

  cdk.Tags.of(app).add("Environment", environment);
}

// Pipeline deployment (when CodeConnection specified)
if (codeConnectionArn) {
  new PipelineStack(app, "CoreUIPipelineStack", {
    env: { account, region },
    description: "CI/CD Pipeline for CoreUI Admin Template",
    codeConnectionArn,
    repositoryName,
    branchName,
    terminationProtection: true,
  });
}

cdk.Tags.of(app).add("Project", "CoreUI");
cdk.Tags.of(app).add("ManagedBy", "CDK");
