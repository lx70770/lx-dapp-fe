import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity'
import mergeImages from 'merge-images'
import { useEffect, useState } from 'react'
import BlueBack from '../assets/Background/SunBlue.png'
import RedEye from '../assets/Eye/Red.png'

const BUCKET_NAME = 'lx-cssofer'
const REGION = 'ap-south-1'
const IDENTITY_POOL_ID = 'ap-south-1:c5989857-25fd-4ed3-a2ae-fb5559e48eb8'

export function useAWS() {
  const [loading, setLoading] = useState(false)
  const [s3Ins, setS3Ins] = useState<S3Client | undefined>(undefined)

  useEffect(() => {
    initS3Client()
  }, [])

  const initS3Client = async () => {
    try {
      const s3 = new S3Client({
        region: REGION,
        credentials: fromCognitoIdentityPool({
          client: new CognitoIdentityClient({ region: REGION }),
          identityPoolId: IDENTITY_POOL_ID,
        }),
      })
      setS3Ins(s3)
    } catch (e) {
      console.log('init aws S3 error')
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const createAlbums = async (name: string) => {
    if (s3Ins) {
      const albumName = name.trim()
      if (albumName.indexOf('/') !== -1) {
        console.error('Album names cannot contain slashes.')
        return
      }
      const albumKey = encodeURIComponent(albumName) + '/'
      try {
        const params = { Bucket: BUCKET_NAME, Key: albumKey }
        const data = await s3Ins.send(new PutObjectCommand(params))
        console.log('Successfully created album.')
        console.log(data)
      } catch (err) {
        console.error('There was an error creating your album: ', err)
      }
    }
  }

  const uploadJson = async () => {
    const albumPhotosKey = encodeURIComponent('lx-json') + '/'
    if (s3Ins) {
      const photoKey = albumPhotosKey + '2311.json'
      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: photoKey,
        Body: JSON.stringify({
          image: 'https://dasda/ad/a/d/asd/asd/',
          a: 1,
          b: {
            a: 'da',
            c: 'vv2',
            d: false,
          },
          d: true,
        }),
        ContentType: 'application/json',
      }
      const data = await s3Ins.send(new PutObjectCommand(uploadParams))
      console.log('Successfully uploaded json.')
      console.log(data)
    }
  }

  const uploadImage = async () => {
    const base64Url = await mergeImages([BlueBack, RedEye], { quality: 1 })
    const file = await dataURLtoFile(base64Url, 'blue_red1.png')
    const albumPhotosKey = encodeURIComponent('lx-images') + '/'
    if (s3Ins) {
      const fileName = file.name
      const photoKey = albumPhotosKey + fileName
      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: photoKey,
        Body: file,
        ContentType: 'image/png',
      }
      const data = await s3Ins.send(new PutObjectCommand(uploadParams))
      console.log('Successfully uploaded photo.')
      console.log(data)
    }
  }

  const dataURLtoFile = async (dataurl: string, filename: string) => {
    const res = await fetch(dataurl)
    const blob = await res.blob()
    const file = new File([blob], filename, { type: 'image/png' })
    return file
  }

  return { createAlbums, uploadImage, uploadJson, loading }
}
