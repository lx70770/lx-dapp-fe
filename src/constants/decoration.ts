import EyeDark from '../assets/eye/dark.png'
import EyeLight from '../assets/eye/light.png'
import Face1 from '../assets/face/face.png'
import Hair1 from '../assets/hair/hair1.png'
import Hair2 from '../assets/hair/hair2.png'
import Hair3 from '../assets/hair/hair3.png'
import MouseClose from '../assets/mouse/close.png'
import MouseOpen from '../assets/mouse/open.png'

const faces = [{ url: Face1, name: 'face_1' }]
const eyes = [
  { url: EyeLight, name: 'light_eye' },
  { url: EyeDark, name: 'dark_eye' },
]
const hairs = [
  { url: Hair1, name: 'hair_1' },
  { url: Hair2, name: 'hair_2' },
  { url: Hair3, name: 'hair_3' },
]
const mouses = [
  { url: MouseOpen, name: 'mouse_open' },
  { url: MouseClose, name: 'mouse_close' },
]

export { eyes, faces, hairs, mouses }
