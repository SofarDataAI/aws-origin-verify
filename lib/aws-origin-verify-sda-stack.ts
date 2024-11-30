import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AwsOriginVerifySdaStackProps } from './AwsOriginVerifySdaStackProps';
import { OriginNestedStack } from './stacts/origin-nested-stack';
import { DistributionNestedStack } from './stacts/distribution-nested-stack';

export class AwsOriginVerifySdaStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: AwsOriginVerifySdaStackProps) {
    super(scope, id, props);

    const originNestedStack = new OriginNestedStack(this, `${props.resourcePrefix}-originNestedStack`, {
      ...props,
      originSecretValue: 'foobar',
    });

    const distributionNestedStack = new DistributionNestedStack(this, `${props.resourcePrefix}-distributionNestedStack`, {
      ...props,
      originVerifyFnUrl: originNestedStack.originVerifyFnUrl,
      originVerify: originNestedStack.originVerify,
    });

    new cdk.CfnOutput(this, 'CloudFrontDistributionUrl', {
      value: distributionNestedStack.cloudFrontDistributionUrl,
      description: `${props.resourcePrefix}-cloudFrontDistributionUrl`,
      exportName: `${props.resourcePrefix}-cloudFrontDistributionUrl`,
    });
  }
}
