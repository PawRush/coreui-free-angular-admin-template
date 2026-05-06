import * as cdk from "aws-cdk-lib";
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as codepipeline_actions from "aws-cdk-lib/aws-codepipeline-actions";
import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export interface PipelineStackProps extends cdk.StackProps {
  environment: string;
  githubOwner: string;
  githubRepo: string;
  githubBranch: string;
  codeConnectionArn: string;
  targetBucketName: string;
  distributionId: string;
}

export class PipelineStack extends cdk.Stack {
  public readonly pipeline: codepipeline.Pipeline;

  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    const { environment, githubOwner, githubRepo, githubBranch, codeConnectionArn, targetBucketName, distributionId } = props;

    // Artifact buckets
    const artifactBucket = new s3.Bucket(this, "ArtifactBucket", {
      bucketName: `${id.toLowerCase()}-artifacts-${cdk.Aws.ACCOUNT_ID}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      lifecycleRules: [
        {
          id: "DeleteOldArtifacts",
          enabled: true,
          expiration: cdk.Duration.days(30),
        },
      ],
    });

    // Source output artifact
    const sourceOutput = new codepipeline.Artifact("SourceOutput");
    const buildOutput = new codepipeline.Artifact("BuildOutput");

    // CodeBuild project for building Angular app
    const buildProject = new codebuild.PipelineProject(this, "BuildProject", {
      projectName: `${id}-Build`,
      description: `Build project for ${githubRepo}`,
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_7_0, // Node.js 18+
        computeType: codebuild.ComputeType.SMALL,
        privileged: false,
      },
      cache: codebuild.Cache.local(codebuild.LocalCacheMode.SOURCE, codebuild.LocalCacheMode.CUSTOM),
      buildSpec: codebuild.BuildSpec.fromSourceFilename("buildspec.yml"),
      environmentVariables: {
        S3_BUCKET: {
          type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          value: targetBucketName,
        },
        DISTRIBUTION_ID: {
          type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          value: distributionId,
        },
      },
    });

    // Grant S3 permissions to CodeBuild
    const targetBucket = s3.Bucket.fromBucketName(this, "TargetBucket", targetBucketName);
    targetBucket.grantReadWrite(buildProject);

    // Grant CloudFront invalidation permissions
    buildProject.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["cloudfront:CreateInvalidation"],
        resources: [`arn:aws:cloudfront::${cdk.Aws.ACCOUNT_ID}:distribution/${distributionId}`],
      })
    );

    // Pipeline
    this.pipeline = new codepipeline.Pipeline(this, "Pipeline", {
      pipelineName: `${id}-Pipeline`,
      artifactBucket,
      restartExecutionOnUpdate: true,
    });

    // Source stage - GitHub via CodeConnections
    this.pipeline.addStage({
      stageName: "Source",
      actions: [
        new codepipeline_actions.CodeStarConnectionsSourceAction({
          actionName: "GitHub_Source",
          owner: githubOwner,
          repo: githubRepo,
          branch: githubBranch,
          connectionArn: codeConnectionArn,
          output: sourceOutput,
          codeBuildCloneOutput: true, // Enable full git clone for CodeBuild
        }),
      ],
    });

    // Build stage
    this.pipeline.addStage({
      stageName: "Build",
      actions: [
        new codepipeline_actions.CodeBuildAction({
          actionName: "Angular_Build_Deploy",
          project: buildProject,
          input: sourceOutput,
          outputs: [buildOutput],
        }),
      ],
    });

    // Outputs
    new cdk.CfnOutput(this, "PipelineName", {
      value: this.pipeline.pipelineName,
      description: "CodePipeline name",
      exportName: `${id}-PipelineName`,
    });

    new cdk.CfnOutput(this, "PipelineConsoleUrl", {
      value: `https://${cdk.Aws.REGION}.console.aws.amazon.com/codesuite/codepipeline/pipelines/${this.pipeline.pipelineName}/view`,
      description: "Pipeline console URL",
    });

    new cdk.CfnOutput(this, "BuildProjectName", {
      value: buildProject.projectName,
      description: "CodeBuild project name",
      exportName: `${id}-BuildProjectName`,
    });

    // Tags
    cdk.Tags.of(this).add("Stack", "Pipeline");
    cdk.Tags.of(this).add("GitHubRepo", `${githubOwner}/${githubRepo}`);
    cdk.Tags.of(this).add("Branch", githubBranch);
  }
}
