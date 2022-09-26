import React from 'react'
import GatesNo1 from '../../assets/images/gate_no1.png'
import GatesNo2 from '../../assets/images/gate_no2.png'
import GatesNo3 from '../../assets/images/gate_no3.png'
import Team from '../../assets/images/team.png'
import VideoImage from '../../assets/images/three_gates.png'
import Logo from '../../assets/svg/logo.png'
import openseaIcon from '../../assets/svg/opensea.svg'
import twitterIcon from '../../assets/svg/twitter.svg'
import ThreeCoin from '../../assets/videos/coins.mp4'
import styles from './styles.less'

const TgPage: React.FC = () => {
  return (
    <div className={styles.tg_wrap}>
      <div className={styles.header}>
        <img className={styles.logo} src={Logo} alt="logo" />
      </div>

      <div className={styles.video}>
        <div className={styles.video_logo}>
          <img className={styles.logo} src={VideoImage} alt="VideoImage" />
        </div>
        <video
          id="video"
          src="https://lx-cssofer.s3.ap-south-1.amazonaws.com/lx-tg-assets/njdjcmiei80j3nrnsr5irjj.mp4"
          loop
          muted
          controls={false}
          autoPlay
        ></video>
      </div>
      <div className={styles.main_t}>
        <div className={styles.main_title}>ABOUT THREE GATES</div>
        <div className={styles.main__sub_title}>5000 PEER-TO-PEER NON-FUNGIBLE-TOKEN</div>
      </div>
      <img className={styles.about_logo} src={Team} alt="logo" />
      <div className={styles.small_title}>
        5OOO UNIQUE COLLECTIBLE NFT CHARACTERS ARE UNIQUE CREDENTIALS STORED ON THE ETHEREUM BLOCKCHAIN. IT IS ALSO THE ONLY ELEMENT TO ENTER TG-WAR IN ADVANCE.
        5000 EDITABLE AND COLLECTIBLE FT CHARACTERS USEDFOR THE CONSTRUCTION OF THE METAVERSE ECOLOGICAL ENVIRONMENT, AND AN IMPORTANT ECOLOGICAL PARTNER IN THE
        FUTURE. AT THIS STAGE, 2D HAND-PAINTING WAS ADOPTED TO ECHO THE GAME CREATION PROCESS. THE SAME IS DIVIDED INTO THREE STEPS, ONE, 2D. TWO, 3D. THREE,
        THE METAVERSE.
      </div>
      <div className={styles.main_t}>
        <div className={styles.main_title}>GATE NO.1</div>
        <div className={styles.main__sub_title}>TRUE PEER-TO-PEER NON-HOMOGENIZATION</div>
      </div>
      <img className={styles.gate_no1_logo} src={GatesNo1} alt="logo" />
      <div className={styles.small_title}>
        ANY ONE CAN TAKE A GOOD PICTURE(NFT),ANYBODY CAN TAKE A PICTURE(NFT]. EVERY MEMBER OF THE COMMUNITY HAS AN OPINION ON THE DEVELOPMENT OF THE PRODUCT.
        BEARING IN MIND THE EXPERIENCE AND LESSONS THE MARKET HAS GIVEN US IS THE ORIGINAL INTENTION OF DEVELOPING THE PRODUCT, AND IT IS ALSO THE FIRST THING
        WE SHOULO DO.
      </div>
      <div className={styles.main_t}>
        <div className={styles.main_title}>GATE NO.2</div>
        <div className={styles.main__sub_title}>FULLY DECENTRALIZED ASSET SYNCHRONIZATION</div>
        <div></div>
      </div>
      <img className={styles.gate_no1_logo} src={GatesNo2} alt="logo" />
      <div className={styles.small_title} style={{ margin: '20px auto 40px auto' }}>
        FOLLOW DA, ALLOCATE ASSETS REASONABLY BEFORE BUILDING A COMMUNITY, AND INTRODUCE TOKENS TO REALIZE VALUE EXCHANGE AMONG MEMBERS, BUT IF YOU ARE HERE TO
        MAKE MONEY, PLEASE STAY AWAY FROM US.
      </div>
      {/* <img className={styles.gate_no1_logo} src={ThreeCoin} alt="logo" /> */}
      <div className={styles.coin_video}>
        <video id="video" src={ThreeCoin} loop muted controls={false} autoPlay></video>
      </div>
      <div className={styles.main_t}>
        <div className={styles.main_title}>GATE NO.3</div>
        <div className={styles.main__sub_title}>BACKTRACKING ACCORDING TO COMMUNITY CONTRIBUTION REWARDS</div>
        <div></div>
      </div>
      <img className={styles.gate_no1_logo} src={GatesNo3} alt="logo" />
      <div className={styles.small_title} style={{ margin: '20px auto 40px auto' }}>
        IN ORDER TO MAINTAIN THE STABILITY AND SECURITY OF THE DO COMMUNITY, THE REWARD BACKTRACKING MECHANISM IS BASED ON THE EFFICIENCY OF EACH MEMBER OF THE
        COMMUNITY. MEMBERS' REWARDS THROUGH BACKTRACKING CAN BE USED TO DEFINE THE INFRASTRUCTURE IN THE WORLD AND PARTICIPATE IN REAL-TIME TRANSACTIONS.
      </div>

      <div className={styles.princ}>PRINCIPLE</div>
      <div className={styles.princ_cont}>
        <div className={styles.princ_cont1}>
          <div className={styles.tt}>NO.1</div>
          <div className={styles.t2}>FASTER</div>
          <div className={styles.t3}>
            WE WILL SET A TIME LIMIT TO SUPPORT THE COMMON INTERESTS OF EVERY MEMBER OF OUR "TO" DAO. PLEASE EXERCISE YOUR PRECIOUS POWER DURING THIS PERIOD
          </div>
        </div>
        <div className={styles.princ_cont1}>
          <div className={styles.tt}>NO.2</div>
          <div className={styles.t2}>MORE SECURE</div>
          <div className={styles.t3}>THE PROFESSIONAL TECHNICAL TEAM WILL SUPPORT THE OPERATION SAFETY OF ALL STAGES OF OUR PROJECT</div>
        </div>
        <div className={styles.princ_cont1}>
          <div className={styles.tt}>NO.3</div>
          <div className={styles.t2}>MORE EFFICIENT</div>
          <div className={styles.t3}>
            THE RESPONSIBLE BODY IS A COMMUNITY WITH A SHARED FUTURE. IF YOU'RE HERE TO COLLECT MONEY, PLEASE FUCK OFF IMMEDIATELY
          </div>
        </div>
      </div>
      <div className={styles.princ} style={{ marginTop: '30px' }}>
        TEAM
      </div>
      <img className={styles.gate_no1_logo} src={Team} alt="logo" />
      <div className={styles.main_t}>
        <div className={styles.main_title}>ABOUT US</div>
        <div className={styles.main__sub_title}>TRUE PEER-TO-PEER NON-HOMOGENIZATION</div>
      </div>
      <div className={styles.small_title}>
        WE ARE THE ELITES OF VARIOUS INDUSTRIES AND A COMPLETELY DECENTRALIZED ORGANIZATION. EVERY MEMBER OF THE ORGANIZATION IS AN IRREGULAR FIGURE. WE ARE NOT
        THE SAME KIND OF PEOPLE, BUT WE ARE ALL LOOKING FORWARD TO DAO. WE WON'T MENTION THE THREE FLOOR FOR THE MOMENT. SINCE 2004, WE HAVE BEEN WORKING WITH
        SOME DEDICATED ARTISTS. NOW, I OFFICIALLY STEP INTO WEB3.0. WE WILL DEVOTE MORE ENERGY TO THIS CAUSE AND COOPERATE WITH WELL-KNOWN LEADING INVESTORS IF
        YOU WANT TO KNOW MORE ABOUT US, WE LOOK FORWARD TO MEETING YOU BEHIND THE THIRO GATE.
      </div>

      <div className={styles.urls}>
        <a href="https://www.twitter.com" target="_blank">
          <img src={twitterIcon} />
        </a>
        <a href="https://opensea.io/" target="_blank">
          <img src={openseaIcon} />
        </a>
      </div>
    </div>
  )
}

export default TgPage
