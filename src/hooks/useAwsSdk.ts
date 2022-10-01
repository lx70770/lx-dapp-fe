import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity'
import { useEffect, useState } from 'react'

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

  // const createAlbums = async (name: string) => {
  //   if (s3Ins) {
  //     const albumName = name.trim()
  //     if (albumName.indexOf('/') !== -1) {
  //       console.error('Album names cannot contain slashes.')
  //       return
  //     }
  //     const albumKey = encodeURIComponent(albumName) + '/'
  //     try {
  //       const params = { Bucket: BUCKET_NAME, Key: albumKey }
  //       const data = await s3Ins.send(new PutObjectCommand(params))
  //       console.log('Successfully created album.')
  //       console.log(data)
  //     } catch (err) {
  //       console.error('There was an error creating your album: ', err)
  //     }
  //   }
  // }

  // const uploadJson = async () => {
  //   const ttg_array = [
  //     4, 45, 25, 44, 2, 38, 20, 23, 9, 5, 6, 31, 10, 21, 12, 16, 19, 26, 15, 42, 34, 13, 36, 43, 49, 11, 41, 3, 33, 27, 50, 47, 30, 48, 17, 37, 18, 28, 35, 39,
  //     7, 46, 40, 8, 32, 1, 14, 24, 22, 29,
  //   ]
  //   const albumPhotosKey = encodeURIComponent('ttg-jsons') + '/'
  //   if (s3Ins) {
  //     let i = 25
  //     while (i < 50) {
  //       const photoKey = `${albumPhotosKey}${ttg_array[i]}.json`
  //       const uploadParams = {
  //         Bucket: BUCKET_NAME,
  //         Key: photoKey,
  //         Body: JSON.stringify({
  //           name: `TTG #${ttg_array[i]}`,
  //           description: 'This is a journey about The three gates, enjoy the game.',
  //           image: `https://lx-cssofer.s3.ap-south-1.amazonaws.com/ttg-origin/male.png`,
  //           attributes: [
  //             {
  //               trait_type: 'sex',
  //               value: 'male',
  //             },
  //           ],
  //         }),
  //         ContentType: 'application/json',
  //       }
  //       const data = await s3Ins.send(new PutObjectCommand(uploadParams))
  //       console.log('Successfully uploaded json.')
  //       console.log(data)

  //       i++
  //     }
  //   }
  // }

  const uploadJson = async (tnum: string, b: string, face: string, s: string) => {
    const albumPhotosKey = encodeURIComponent('ttg-jsons') + '/'
    if (s3Ins) {
      const photoKey = `${albumPhotosKey}${tnum}.json`
      const uploadParams = {
        Bucket: BUCKET_NAME,
        Key: photoKey,
        Body: JSON.stringify({
          name: `TTG #${tnum}`,
          description: 'This is a journey about The three gates, enjoy the game.',
          image: `https://lx-cssofer.s3.ap-south-1.amazonaws.com/ttg-nfts/${tnum}.png`,
          attributes: [
            {
              trait_type: 'sex',
              value: 'male',
            },
            {
              trait_type: 'background',
              value: b,
            },
            {
              trait_type: 'face',
              value: face,
            },
            {
              trait_type: 'scratch',
              value: s,
            },
          ],
        }),
        ContentType: 'application/json',
      }
      const data = await s3Ins.send(new PutObjectCommand(uploadParams))
      console.log('Successfully uploaded json.')
    }
  }

  const uploadImage = async (base64Url: string, tokenId: string) => {
    const file = await dataURLtoFile(base64Url, `${tokenId}.png`)
    const albumPhotosKey = encodeURIComponent('ttg-nfts') + '/'
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
    }
  }

  const dataURLtoFile = async (dataurl: string, filename: string) => {
    const res = await fetch(dataurl)
    const blob = await res.blob()
    const file = new File([blob], filename, { type: 'image/png' })
    return file
  }

  return { uploadImage, uploadJson, loading }
}
