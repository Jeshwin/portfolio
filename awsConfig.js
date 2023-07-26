import { S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config'

const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const region = process.env.AWS_REGION
const bucketName = process.env.AWS_BUCKET_NAME

// console.log("TESTING\n\nAMAZON CREDENTIALS")
// console.log("accessKeyId: " + accessKeyId)
// console.log("secretAccessKey: " + secretAccessKey)
// console.log("region: " + region)
// console.log("bucketName: " + bucketName)

const s3 = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
})

export { s3 }