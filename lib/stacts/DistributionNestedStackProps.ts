import { NestedStackProps } from "aws-cdk-lib";
import { AwsOriginVerifySdaBaseStackProps } from "../AwsOriginVerifySdaStackProps";
import * as cdk from "aws-cdk-lib";

export interface DistributionNestedStackProps extends AwsOriginVerifySdaBaseStackProps, NestedStackProps {
    /**
     * The URL of the origin verify function.
     * @type {string}
     */
    readonly originVerifyFnUrl: string;

    /**
     * The ARN of the origin verify function.
     * @type {string}
     */
    readonly originVerifyFnArn: string;

    /**
     * The Lambda function URL.
     * @type {cdk.aws_lambda.IFunctionUrl}
     */
    readonly lambdaFnUrl: cdk.aws_lambda.IFunctionUrl;

    /**
     * The secret value for the origin is verified.
     */
    readonly originSecretValue: string;
}
