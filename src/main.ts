import * as cdk from 'aws-cdk-lib';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';

export class CdkCicdPipelineLambda extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    new pipelines.CodePipeline(this, 'pipeline', {
      pipelineName: 'demo-lambda',
      synth: new pipelines.ShellStep('Synth', {
        // input: pipelines.CodePipelineSource.gitHub('baboopan/cdk-cicd-pipeline-lambda', 'main'),
        input: pipelines.CodePipelineSource.connection('baboopan/cdk-cicd-pipeline-lambda', 'main', {
          connectionArn: 'arn:aws:codestar-connections:us-west-2:471856162574:connection/46b4ffea-b66f-46cb-90d5-4386bdc00769',
        }),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();

new CdkCicdPipelineLambda(app, 'cdk-cicd-pipeline-lambda', { env: devEnv });

app.synth();