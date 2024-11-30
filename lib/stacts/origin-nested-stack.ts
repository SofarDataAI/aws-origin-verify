import { NestedStack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { OriginNestedStackProps } from "./OriginNestedStackProps";
import * as cdk from "aws-cdk-lib";
import { PythonFunction } from "@aws-cdk/aws-lambda-python-alpha";
import * as path from "path";

export class OriginNestedStack extends NestedStack {
    public readonly lambdaFnUrl: cdk.aws_lambda.IFunctionUrl;
    public readonly originVerifyFnArn: string;
    public readonly originVerifyFnUrl: string;

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
        this.lambdaFnUrl = new cdk.aws_lambda.FunctionUrl(this, `${props.resourcePrefix}-originVerifyFnUrl`, {
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

        this.originVerifyFnUrl = this.lambdaFnUrl.url;
        this.originVerifyFnArn = this.lambdaFnUrl.functionArn;

        new cdk.CfnOutput(this, 'OriginVerifyFnUrl', {
            value: this.lambdaFnUrl.url,
            description: `${props.resourcePrefix}-originVerifyFnUrl`,
            exportName: `${props.resourcePrefix}-originVerifyFnUrl`,
        });

        new cdk.CfnOutput(this, 'OriginVerifyFnArn', {
            value: this.lambdaFnUrl.functionArn,
            description: `${props.resourcePrefix}-originVerifyFnArn`,
            exportName: `${props.resourcePrefix}-originVerifyFnArn`,
        });
    }
}
