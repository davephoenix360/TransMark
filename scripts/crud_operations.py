import json
import boto3
from botocore.exceptions import ClientError
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime

# Initialize the DynamoDB Client
dynamodb = boto3.resource("dynamodb", region_name="us-east-2")
dynamodb_table = dynamodb.Table("comments")

status_check_path = "/status"
comment_path = "/comment"
comments_path = "/comments"


def lambda_handler(event, context):
    print("Request event: ", event)
    response = None

    try:
        http_method = event.get("httpMethod")
        path = event.get("path")

        if http_method == "GET" and path == status_check_path:
            response = build_response(200, "Service is running properly")
        elif http_method == "GET" and path == comment_path:
            comment_id = event["queryStringParameters"]["commentid"]
            transcript_id = event["queryStringParameters"]["transcriptid"]
            response = get_comment(comment_id, transcript_id)
        elif http_method == "GET" and path == comments_path:
            transcript_id = event["queryStringParameters"]["transcriptid"]
            response = get_comments(transcript_id)
        elif http_method == "POST" and path == comment_path:
            request_body = json.loads(event["body"])
            response = save_comment(request_body)
        elif http_method == "PATCH" and path == comment_path:
            request_body = json.loads(event["body"])  # Parse the JSON string
            comment_id = request_body["comment_id"]
            transcript_id = request_body["transcript_id"]
            update_key = request_body["update_key"]
            update_value = request_body["update_value"]
            response = modify_comment(
                transcript_id, comment_id, update_key, update_value
            )
        elif http_method == "DELETE" and path == comment_path:
            request_body = json.loads(event["body"])  # Parse the JSON string
            comment_id = request_body["comment_id"]
            transcript_id = request_body["transcript_id"]
            response = delete_comment(transcript_id, comment_id)

    except Exception as e:
        print("Error:", e)
        response = build_response(400, "Error processing request")

    return response


def get_comment(comment_id, transcript_id):
    try:
        response = dynamodb_table.get_item(
            Key={"comment_id": comment_id, "transcript_id": transcript_id}
        )
        return build_response(200, response.get("Item"))
    except ClientError as e:
        print("Error:", e)
        return build_response(400, e.response["Error"]["Message"])


def get_comments(transcript_id):
    try:
        response = dynamodb_table.scan(
            FilterExpression=Attr("transcript_id").eq(transcript_id)
        ).get("Items")
        return build_response(200, response)

    except ClientError as e:
        print("Error:", e)
        return build_response(400, e.response["Error"]["Message"])


def save_comment(request_body):
    try:
        request_body["timestamp"] = str(datetime.now().isoformat())
        dynamodb_table.put_item(Item=request_body)
        body = {"Operation": "SAVE", "Message": "SUCCESS", "Item": request_body}
        return build_response(200, body)
    except ClientError as e:
        print("Error:", e)
        return build_response(400, e.response["Error"]["Message"])


def modify_comment(transcript_id, comment_id, update_key, update_value):
    try:
        response = dynamodb_table.update_item(
            Key={"comment_id": comment_id, "transcript_id": transcript_id},
            UpdateExpression=f"SET {update_key} = :value",
            ExpressionAttributeValues={":value": update_value},
            ReturnValues="UPDATED_NEW",
        )
        body = {
            "Operation": "UPDATE",
            "Message": "SUCCESS",
            "UpdatedAttributes": response,
        }
        return build_response(200, body)
    except ClientError as e:
        print("Error:", e)
        return build_response(400, e.response["Error"]["Message"])


def delete_comment(transcript_id, comment_id):
    try:
        response = dynamodb_table.delete_item(
            Key={"comment_id": comment_id, "transcript_id": transcript_id},
            ReturnValues="ALL_OLD",
        )
        body = {"Operation": "DELETE", "Message": "SUCCESS", "Item": response}
        return build_response(200, body)
    except ClientError as e:
        print("Error:", e)
        return build_response(400, e.response["Error"]["Message"])


class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            # Check if it's an int or a float
            if obj % 1 == 0:
                return int(obj)
            else:
                return float(obj)
        # Let the base class default method raise the TypeError
        return super(DecimalEncoder, self).default(obj)


def build_response(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(body, cls=DecimalEncoder),
    }
