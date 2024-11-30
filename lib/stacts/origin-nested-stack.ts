import { NestedStack, SecretValue } from "aws-cdk-lib";
import { Construct } from "constructs";
import { OriginNestedStackProps } from "./OriginNestedStackProps";
import { IVerification } from "../../src/contract";
import * as cdk from "aws-cdk-lib";
import { OriginVerify } from "../../src";
import { PythonFunction } from "@aws-cdk/aws-lambda-python-alpha";
import * as path from "path";

export class OriginNestedStack extends NestedStack {
    public readonly originVerifyFnUrl: cdk.aws_lambda.IFunctionUrl;
    public readonly originVerify: IVerification;

    constructor(scope: Construct, id: string, props: OriginNestedStackProps) {
        super(scope, id, props);

        /**
         * Creates the Lambda function for the origin verify.
         * @type {cdk.aws_lambda.Function}
         */
        const originVerifyFn: cdk.aws_lambda.Function = new PythonFunction(this, `${props.resourcePrefix}-originVerifyFn`, {
            runtime: cdk.aws_lambda.Runtime.PYTHON_3_12,
            entry: path.join(__dirname, '../../src/lambdas/origin-verify'),
            handler: "handler",
            architecture: cdk.aws_lambda.Architecture.ARM_64,
            runtimeManagementMode: cdk.aws_lambda.RuntimeManagementMode.AUTO,
            memorySize: 1024,
            timeout: cdk.Duration.seconds(60), // 60 seconds
            logRetention: cdk.aws_logs.RetentionDays.ONE_WEEK,
        });

        /**
         * Configures the Lambda Function URL for the TypeScript function.
         *
         * @type {cdk.aws_lambda.FunctionUrl}
         */
        this.originVerifyFnUrl = new cdk.aws_lambda.FunctionUrl(this, `${props.resourcePrefix}-originVerifyFnUrl`, {
            function: originVerifyFn,
            invokeMode: cdk.aws_lambda.InvokeMode.BUFFERED,
            cors: {
                allowedOrigins: ['*'],
                allowedMethods: [cdk.aws_lambda.HttpMethod.POST],
                allowedHeaders: ['*'],
                allowCredentials: true,
            },
            authType: cdk.aws_lambda.FunctionUrlAuthType.NONE,
        });

        const customSecretValue = SecretValue.unsafePlainText(props.originSecretValue);
        this.originVerify = new OriginVerify(this, 'OriginVerify', {
            origin: this.originVerifyFnUrl,
            secretValue: customSecretValue,
        });

        new cdk.CfnOutput(this, 'OriginVerifyFnUrl', {
            value: this.originVerifyFnUrl.url,
            description: `${props.resourcePrefix}-originVerifyFnUrl`,
            exportName: `${props.resourcePrefix}-originVerifyFnUrl`,
        });
    }
}