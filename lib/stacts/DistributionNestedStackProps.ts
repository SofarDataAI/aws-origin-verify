import { NestedStackProps } from "aws-cdk-lib";
import { AwsOriginVerifySdaBaseStackProps } from "../AwsOriginVerifySdaStackProps";
import * as cdk from "aws-cdk-lib";

export interface DistributionNestedStackProps extends AwsOriginVerifySdaBaseStackProps, NestedStackProps {
    /**
     * The URL of the origin verify function.
     * @type {cdk.aws_lambda.IFunctionUrl}
     */
    readonly originVerifyFnUrl: cdk.aws_lambda.IFunctionUrl;
    /**
     * The secret value for the origin is verified.
     */
    readonly originSecretValue: string;
}
