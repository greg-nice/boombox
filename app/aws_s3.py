import boto3
import botocore
from .config import Config

s3 = boto3.client(
   "s3",
   aws_access_key_id=Config.S3_KEY,
   aws_secret_access_key=Config.S3_SECRET
)

def upload_file_to_s3(file, bucket_name, file_prefix, acl="public-read"):

    try:

        s3.upload_fileobj(
            file,
            bucket_name,
            f"{file_prefix}/{file.filename}",
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e


    return f"{Config.S3_LOCATION}{file_prefix}/{file.filename}"


def delete_file_from_s3(bucket_name, file_name):

    try:

        s3.delete_object(Bucket=bucket_name, Key=file_name)
    
    except Exception as e:
        print("Somthing Happened: ", e)
        return e

    return "File deleted."