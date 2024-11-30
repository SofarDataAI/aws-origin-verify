from aws_lambda_powertools import Logger

logger = Logger()
logger.set_auto_correlation_ids(True)
logger.set_auto_correlation_ids(True)

def handler(event, context):
    logger.info(f"Origin verify lambda function invoked with event: {event}")
    logger.info(f"Origin verify lambda function invoked with context: {context}")
    logger.info("Origin verify lambda function invoked")
    return {"statusCode": 200, "body": "Origin verify lambda function invoked"}
