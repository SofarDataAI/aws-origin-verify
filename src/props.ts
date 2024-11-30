import { IResolvable, SecretValue } from 'aws-cdk-lib';
import { IStage } from 'aws-cdk-lib/aws-apigateway';
import { IHttpStage } from 'aws-cdk-lib/aws-apigatewayv2';
import { CfnGraphQLApi } from 'aws-cdk-lib/aws-appsync';
import { IApplicationLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { IFunctionUrl } from 'aws-cdk-lib/aws-lambda';
import { CfnWebACL } from 'aws-cdk-lib/aws-wafv2';

/**
 * A Lambda function Url
 */
export interface ILambdaFunctionUrl {
  /**
   * The url of the Lambda function.
   *
   * @attribute FunctionUrl
   */
  readonly url: string;
  /**
   * The ARN of the function this URL refers to
   *
   * @attribute FunctionArn
   */
  readonly functionArn: string;
}

/**
 * Origin to "protect" via WAFv2 WebACL request verification.
 * Accepted types:
 * - `IStage` (from `aws-cdk-lib/aws-apigateway`)
 * - `IApplicationLoadBalancer` (from `aws-cdk-lib/aws-elasticloadbalancingv2`)
 */
export type Origin = IStage | IApplicationLoadBalancer | CfnGraphQLApi | IHttpStage | ILambdaFunctionUrl;

/**
 * Properties for `OriginVerify` constructor.
 */
export interface OriginVerifyProps {

  /**
   * Origin to protect.
   *
   * Accepted types:
   * - `IStage` (from `aws-cdk-lib/aws-apigateway`)
   * - `IApplicationLoadBalancer` (from `aws-cdk-lib/aws-elasticloadbalancingv2`)
   **/
  readonly origin: Origin;

  /**
   * The secret which is used to verify the CloudFront distribution.
   * Optional: By default this construct will generate a `new Secret`.
   *
   * @default
   * new Secret().secretValue
   **/
  readonly secretValue?: SecretValue;

  /**
   * By default `x-origin-verify` is used. To override it, provide a value for
   * this. Recommendation is to use something with a `x-` prefix.
   *
   * @default
   * 'x-origin-verify'
   **/
  readonly headerName?: string;

  /**
   * Metric name for the WebACL.
   *
   * @default
   * 'OriginVerifyWebAcl'
   */
  readonly aclMetricName?: string;

  /**
   * Metric name for the allowed requests.
   *
   * @default
   * 'OriginVerifyAllowedRequests'
   */
  readonly ruleMetricName?: string;

  /**
   * Any additional rules to add into the created WAFv2 WebACL.
   */
  readonly rules?: (IResolvable | CfnWebACL.RuleProperty)[];
}
