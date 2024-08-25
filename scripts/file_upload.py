
"""
The Lambda function receives a request with a file name and content, decodes the content, and
uploads the file to an S3 bucket.

:param event: The `event` parameter in the `lambda_handler` function represents the event data that
is passed to the Lambda function during invocation. It contains information about the event that
triggered the function, such as HTTP request parameters, message queue data, or other event sources.
In this specific Lambda function, the event
:param context: The `context` parameter in the `lambda_handler` function represents the runtime
information of the Lambda function that is being executed. It provides details such as the AWS
request ID, function name, memory limit, and other contextual information about the execution
environment. This parameter is commonly used to access information about the
:return: The lambda_handler function returns a dictionary with a status code and a message in JSON
format. If the file_name or file_content is missing in the request body, it returns a 400 status
code with a message indicating the missing parameters. If the file is successfully uploaded to the
S3 bucket, it returns a 200 status code with a success message. If any other exception occurs during
the execution,
"""
import json
import boto3
import base64
import os

s3 = boto3.client('s3')
bucket_name = os.environ['BUCKET_NAME']

def lambda_handler(event, context):
    try:
        # Ensure the body is parsed correctly
        body = json.loads(event.get('body', '{}'))
        file_name = body.get('file_name')
        file_content = body.get('file_content')
        
        if not file_name or not file_content:
            return {
                'statusCode': 400,
                'body': json.dumps('file_name and file_content are required')
            }

        # Decode and upload the file
        decoded_file = base64.b64decode(file_content)
        s3.put_object(Bucket=bucket_name, Key=file_name, Body=decoded_file)

        return {
            'statusCode': 200,
            'body': json.dumps('File uploaded successfully')
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps('Internal server error')
        }
