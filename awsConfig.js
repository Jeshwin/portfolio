import { S3Client } from '@aws-sdk/client-s3';
// import 'dotenv/config'

// const accessKeyId = process.env.AWS_ACCESS_KEY_ID
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
// const region = process.env.AWS_REGION
// const bucketName = process.env.AWS_BUCKET_NAME

const accessKeyId = "AKIAR6RHTTUKEB2MXI2X"
const secretAccessKey = "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"
const region = "us-west-1"
const bucketName = "jeshwin-portfolio-bucket"

// console.log("TESTING\n\nAMAZON CREDENTIALS")
// console.log("accessKeyId: " + accessKeyId)
// console.log("secretAccessKey: " + secretAccessKey)
// console.log("region: " + region)
// console.log("bucketName: " + bucketName)

const s3 = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
})

export { s3, region, bucketName }