import boto3
from botocore.exceptions import NoCredentialsError
from app.config import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET_NAME, AWS_S3_REGION


def upload_file_to_s3(file_bytes, file_name, content_type):
    '''
    Upload a file to an S3 bucket and return the file URL.
    '''
    try:
        s3 = boto3.client(
            "s3",
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            region_name=AWS_S3_REGION
        )
        
        s3.put_object(Bucket=AWS_S3_BUCKET_NAME, Key=file_name, Body=file_bytes, ContentType=content_type)
        
        url = f"https://{AWS_S3_BUCKET_NAME}.s3.{AWS_S3_REGION}.amazonaws.com/{file_name}"
        return url

    except NoCredentialsError:
        raise Exception("Credentials not available")