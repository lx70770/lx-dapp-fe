import anime from 'animejs'
import { useLayoutEffect, useRef, useState } from 'react'
import styles from './styles.less'

const LoadingImg: React.FC = () => {
  const lettersRef = useRef<HTMLSpanElement>(null)
  const ml11 = useRef<HTMLHRElement>(null)
  const line = useRef<HTMLSpanElement>(null)
  const letter = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    if (lettersRef.current) {
      anime
        .timeline({ loop: true })
        .add({
          targets: '.ml11 .line',
          scaleY: [0, 1],
          opacity: [0.5, 1],
          easing: 'easeOutExpo',
          duration: 700,
        })
        .add({
          targets: '.ml11 .line',
          translateX: [0, lettersRef.current.getBoundingClientRect().width + 2],
          easing: 'easeOutExpo',
          duration: 700,
          delay: 100,
        })
        .add({
          targets: '.ml11 .letter',
          opacity: [0, 1],
          easing: 'easeOutExpo',
          duration: 600,
          offset: '-=775',
          delay: (el, i) => 34 * (i + 1),
        })
        .add({
          targets: '.ml11',
          opacity: 0,
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 1000,
        })
    }
  }, [])

  return (
    <h1 ref={ml11} className="ml11">
      <span className="text_wrapper">
        <span ref={line} className="line line1"></span>
        <span ref={lettersRef} className="letters">
          <span ref={letter} className="letter">
            T
          </span>
          <span ref={letter} className="letter">
            H
          </span>
          <span ref={letter} className="letter">
            E
          </span>
          <span ref={letter} className="letter">
            T
          </span>
          <span ref={letter} className="letter">
            H
          </span>
          <span ref={letter} className="letter">
            R
          </span>
          <span ref={letter} className="letter">
            E
          </span>
          <span ref={letter} className="letter">
            E
          </span>
          <span ref={letter} className="letter">
            G
          </span>
          <span ref={letter} className="letter">
            A
          </span>
          <span ref={letter} className="letter">
            T
          </span>
          <span ref={letter} className="letter">
            E
          </span>
          <span ref={letter} className="letter">
            S
          </span>
        </span>
      </span>
    </h1>
  )
}

const ImageLoader: React.FC<{ src: string; height?: number }> = ({ src, height = 100 }) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <>
      {loaded ? null : (
        <div className={styles.img_loading} style={{ height }}>
          <LoadingImg />
        </div>
      )}
      <img
        style={loaded ? {} : { display: 'none' }}
        src={src}
        width={height}
        height={height}
        onLoad={() => {
          console.log(`image loaded`)
          setLoaded(true)
        }}
      />
    </>
  )
}

export default ImageLoader
