import { NestedStackProps } from "aws-cdk-lib";
import { AwsOriginVerifySdaBaseStackProps } from "../AwsOriginVerifySdaStackProps";

export interface OriginNestedStackProps extends AwsOriginVerifySdaBaseStackProps, NestedStackProps {
    /**
     * The secret value for the origin verify.
     */
    readonly originSecretValue: string;
}
