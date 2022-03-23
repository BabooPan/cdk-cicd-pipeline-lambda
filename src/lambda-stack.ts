
import * as cdk from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class MyLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, stageName: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaPath = `${__dirname}/lambda-assets`;

    const helloFunction = new NodejsFunction(this, 'helloFunction', {
      entry: `${lambdaPath}/hello-world/index.ts`,
      handler: 'handler',
      environment: { stageName: stageName },
    });
  }
}