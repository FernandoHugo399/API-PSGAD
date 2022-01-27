import { Storage } from '@google-cloud/storage'
import path from 'path'

const projectId = process.env.GCLOUD_ID
const bucketName = projectId + '.appspot.com'

const gcs = new Storage({
  projectId: projectId,
  keyFilename: path.join(__dirname) + '/service-account.json'
})

export const bucket = gcs.bucket(bucketName)
