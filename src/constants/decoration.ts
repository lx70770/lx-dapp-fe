import blue from '../assets/nfts/background/blue.png'
import green from '../assets/nfts/background/green.png'
import orange from '../assets/nfts/background/orange.png'
import pink from '../assets/nfts/background/pink.png'
import purple from '../assets/nfts/background/purple.png'
import red from '../assets/nfts/background/red.png'
import yellow from '../assets/nfts/background/yellow.png'

import face1 from '../assets/nfts/face/face1.png'
import face2 from '../assets/nfts/face/face2.png'
import face3 from '../assets/nfts/face/face3.png'
import face4 from '../assets/nfts/face/face4.png'
import face5 from '../assets/nfts/face/face5.png'
import face6 from '../assets/nfts/face/face6.png'
import face7 from '../assets/nfts/face/face7.png'

import scratch1 from '../assets/nfts/scratch/scratch1.png'
import scratch2 from '../assets/nfts/scratch/scratch2.png'
import scratch3 from '../assets/nfts/scratch/scratch3.png'
import scratch4 from '../assets/nfts/scratch/scratch4.png'
import scratch5 from '../assets/nfts/scratch/scratch5.png'
import scratch6 from '../assets/nfts/scratch/scratch6.png'
import scratch7 from '../assets/nfts/scratch/scratch7.png'

import female from '../assets/nfts/origin/female.png'
import male from '../assets/nfts/origin/male.png'

const backgrounds = [
  { url: blue, name: 'blue', tag: '01' },
  { url: green, name: 'green', tag: '02' },
  { url: orange, name: 'orange', tag: '03' },
  { url: pink, name: 'pink', tag: '04' },
  { url: purple, name: 'purple', tag: '05' },
  { url: red, name: 'red', tag: '06' },
  { url: yellow, name: 'yellow', tag: '07' },
]
const faces = [
  { url: face1, name: 'face1', tag: '01' },
  { url: face2, name: 'face2', tag: '02' },
  { url: face3, name: 'face3', tag: '03' },
  { url: face4, name: 'face4', tag: '04' },
  { url: face5, name: 'face5', tag: '05' },
  { url: face6, name: 'face6', tag: '06' },
  { url: face7, name: 'face7', tag: '07' },
]
const scratchs = [
  { url: scratch1, name: 'scratch1', tag: '01' },
  { url: scratch2, name: 'scratch2', tag: '02' },
  { url: scratch3, name: 'scratch3', tag: '03' },
  { url: scratch4, name: 'scratch4', tag: '04' },
  { url: scratch5, name: 'scratch5', tag: '05' },
  { url: scratch6, name: 'scratch6', tag: '06' },
  { url: scratch7, name: 'scratch7', tag: '07' },
]

const humans = {
  female,
  male,
}

interface ImageProps {
  name: string
  url: string
  tag: string
  score?: number
}

const image_names = [
  'blue',
  'green',
  'orange',
  'pink',
  'purple',
  'red',
  'yellow',
  'face1',
  'face2',
  'face3',
  'face4',
  'face5',
  'face6',
  'face7',
  'scratch1',
  'scratch2',
  'scratch3',
  'scratch4',
  'scratch5',
  'scratch6',
  'scratch7',
]

const ttg_array = [
  4, 45, 25, 44, 2, 38, 20, 23, 9, 5, 6, 31, 10, 21, 12, 16, 19, 26, 15, 42, 34, 13, 36, 43, 49, 11, 41, 3, 33, 27, 50, 47, 30, 48, 17, 37, 18, 28, 35, 39, 7,
  46, 40, 8, 32, 1, 14, 24, 22, 29,
]

const judgeSex = (ttg: string) => {
  const a = ttg_array.findIndex((t) => t.toString() === ttg)
  if (a && a > 25) return true
  return false
}

export { backgrounds, faces, scratchs, humans, ImageProps, image_names, judgeSex }
