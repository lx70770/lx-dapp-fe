//import { OrbitControls} from './controls/OrbitControls';
import { Tween, update } from '@tweenjs/tween.js'

import Stats from 'stats.js'
import {
  AmbientLight,
  DirectionalLight,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  Scene,
  sRGBEncoding,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import animate from './Animate'

import Arrow from '../assets/three/arrow.png'
import BG from '../assets/three/bj.png'
// @ts-ignore
import Scenes from '../assets/three/scene.glb'

export class ApplicationNFT {
  private scene: Scene
  private camera!: PerspectiveCamera
  private renderer: WebGLRenderer
  composer!: EffectComposer

  effectFXAA!: ShaderPass

  constructor(element: HTMLElement) {
    //初始化
    this.scene = new Scene()

    // this.camera = new PerspectiveCamera(60, window.innerWidth / innerHeight, 0.01, 1000);
    //this.camera.position.set(-77,9,-8);
    // this.camera.rotation.y=-Math.PI/2;
    this.renderer = new WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true })

    // this.renderer.sortObjects = false;

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.outputEncoding = sRGBEncoding

    this.renderer.autoClear = false
    // this.scene.background = new Color(0xffffff);
    // this.scene.fog = new Fog(0xDFE9F3, 0, 2.1);//雾

    //  this.renderer.toneMapping=ACESFilmicToneMapping;
    //  this.renderer.toneMappingExposure=1;

    //FPS
    const stats = new Stats()
    stats.showPanel(0)
    element.appendChild(stats.dom)

    //事件监听
    window.addEventListener('resize', () => this.onWindowsResize())

    const arrowTex = new TextureLoader().load(Arrow)

    const bj = new TextureLoader().load(BG)
    new GLTFLoader().load(Scenes, (model) => {
      console.log(model.scene)
      const renMat = new MeshStandardMaterial({ color: 0x161616, roughness: 0.4, metalness: 0.1 })
      model.scene.traverse((child: any) => {
        if (child.name == 'ren') {
          child.children.forEach((element: any) => {
            element.material = renMat
          })
        }

        if (child.name == 'Light1') {
          child.children.forEach((element: any) => {
            element.renderOrder = 2
          })
        }
      })

      this.camera = model.scene.children[0].children[0].children[1] as PerspectiveCamera
      console.log(this.camera)

      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.fov = 28
      this.camera.updateProjectionMatrix()
      //this.camera.position.x+=2;
      this.scene.add(model.scene)

      //new OrbitControls(this.camera,this.renderer.domElement) ;

      this.scene.add(new AmbientLight(0xffffff, 0.12))
      const light = new DirectionalLight(0xffffff, 0.2)
      light.position.set(0, 0.1, 1)
      this.scene.add(light)
      element.appendChild(this.renderer.domElement)

      const pointer = new Vector2()

      let mouseX = 0,
        mouseY = 0
      document.addEventListener('mousemove', (e: any) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1
        pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
        this.CameraControl(e, (x: number, y: number) => {
          if (x > 0) mouseX = x > 1 ? 1 : x
          else mouseX = x < -1 ? -1 : x
          mouseY = y
        })
      })

      let openBox: boolean = false
      document.addEventListener('click', (e: any) => {
        if (intersects.length > 0) {
          if (intersects[0].object.name.startsWith('Group43')) {
            console.log('human click')
          }
          if (intersects[0].object.name == 'polySurface138' || intersects[0].object.name == 'Gai') {
            console.log('box click')
            if (!openBox) {
              new Tween({ rot: bottleCap.parent.rotation.z })
                .to({ rot: -Math.PI * 0.5 }, 500)
                .onUpdate((val) => {
                  bottleCap.parent.rotation.z = val.rot
                })
                .start()
            } else {
              new Tween({ rot: bottleCap.parent.rotation.z })
                .to({ rot: 0 }, 500)
                .onUpdate((val) => {
                  bottleCap.parent.rotation.z = val.rot
                })
                .start()
            }
            openBox = !openBox
          }
        }
      })

      const intersectObjects: any[] = []
      let bottleCap: any
      model.scene.traverse((child: any) => {
        if (child.name.startsWith('Group43') || child.name == 'polySurface138' || child.name == 'Gai') {
          intersectObjects.push(child)
          if (child.name == 'Gai') {
            bottleCap = child
          }
          if (child.name == 'Gai' || child.name == 'polySurface138') {
            child.material.metalness = 1
            child.material.roughness = 0.2
          }
        }
        if (child.name == 'polySurface116' || child.name == 'polySurface119' || child.name == 'polySurface125' || child.name == 'polySurface112') {
          child.material.emissivemap = child.material.map
          child.material.emissive = child.material.color
          child.material.emissiveIntensity = 1.5
        }
        if (child.name.startsWith('Plane')) {
          child.material.map = bj
        }
      })

      const arrow = new Mesh(new PlaneGeometry(8.98, 9), new MeshBasicMaterial({ side: DoubleSide, map: arrowTex, transparent: true, color: 0x111111 }))
      arrow.rotation.set(0, -Math.PI / 2, 0)
      arrow.scale.set(0.3, 0.3, 0.3)
      arrow.position.set(10, 15, 13)
      this.scene.add(arrow)

      let raycaster = new Raycaster()
      let intersects: any

      let speed = 0.1
      let arrowDir = 0.05
      animate((time: any) => {
        update(time)
        raycaster.setFromCamera(pointer, this.camera)
        intersects = raycaster.intersectObjects(intersectObjects)

        const rotY = mouseX * Math.PI * 0.015
        model.scene.children[0].children[0].children[0].rotation.y += (rotY - model.scene.children[0].children[0].children[0].rotation.y) * speed

        const rotX = -mouseY * Math.PI * 0.003
        model.scene.children[0].children[0].children[0].rotation.z += (rotX - model.scene.children[0].children[0].children[0].rotation.z) * speed

        if (arrow.position.y >= 15 || arrow.position.y <= 12) arrowDir = -arrowDir
        arrow.position.y += arrowDir
      })

      //effect
      this.composer = new EffectComposer(this.renderer)
      this.composer.renderToScreen = true
      this.composer.addPass(new RenderPass(this.scene, this.camera))

      this.effectFXAA = new ShaderPass(FXAAShader)
      this.effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight)
      this.composer.addPass(this.effectFXAA)

      // //bloom
      const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
      bloomPass.threshold = 0.33
      bloomPass.strength = 2.2
      bloomPass.radius = 1.5

      this.composer.addPass(bloomPass)

      this.render(stats)
    })
  }

  CameraControl(event: any, callback: any) {
    let windowHalfX = window.innerWidth / 2
    let windowHalfY = window.innerHeight / 2
    callback(-(windowHalfX - event.clientX) / windowHalfX, (windowHalfY - event.clientY) / windowHalfY)
  }

  private render(stat: Stats) {
    stat.begin()
    window.requestAnimationFrame(() => this.render(stat))

    this.composer.render()
    //this.renderer.render(this.scene,this.camera)
    stat.end()
  }

  //resize 事件
  private onWindowsResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.composer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}
