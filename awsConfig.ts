import { S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config'

const region = process.env.AWS_REGION
const bucketName = process.env.AWS_BUCKET_NAME

const s3 = new S3Client({})

export { s3, bucketName, region }