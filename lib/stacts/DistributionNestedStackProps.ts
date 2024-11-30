import { NestedStackProps } from "aws-cdk-lib";
import { AwsOriginVerifySdaBaseStackProps } from "../AwsOriginVerifySdaStackProps";
import { IVerification } from "../../src/contract";
import * as cdk from "aws-cdk-lib";

export interface DistributionNestedStackProps extends AwsOriginVerifySdaBaseStackProps, NestedStackProps {
    /**
     * The URL of the origin verify function.
     * @type {cdk.aws_lambda.IFunctionUrl}
     */
    readonly originVerifyFnUrl: cdk.aws_lambda.IFunctionUrl;
    /**
     * The origin verify instance.
     * @type {IVerification}
     */
    readonly originVerify: IVerification;
}
