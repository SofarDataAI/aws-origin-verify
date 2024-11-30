import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AwsOriginVerifySdaStackProps } from './AwsOriginVerifySdaStackProps';
import { OriginVerify } from '../src/construct';
import { SecretValue } from 'aws-cdk-lib';
import { PythonFunction } from "@aws-cdk/aws-lambda-python-alpha";
import * as path from 'path';
import { IVerification } from '../src/contract';
import { OriginNestedStack } from './stacts/origin-nested-stack';

export class AwsOriginVerifySdaStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: AwsOriginVerifySdaStackProps) {
    super(scope, id, props);

    const originNestedStack = new OriginNestedStack(this, `${props.resourcePrefix}-originNestedStack`, {
      ...props,
      originSecretValue: 'foobar',
    });
  }
}
