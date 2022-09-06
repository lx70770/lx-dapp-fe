import React from 'react'
import DiamondIcon from '../../assets/images/diamond.png'
import styles from './styles.less'

const Diamond: React.FC = () => {
  return (
    <div className={styles.diamond_wrap}>
      <div className={styles.middle}>
        <img src={DiamondIcon} alt="" />
        <div className={styles.slogan}>
          WITH <strong style={{ fontFamily: 'industry_black' }}>DIAMONDS</strong>, YOU CAN OPEN SUPPLY BOXES AND EQUIP YOUR OWN NFTS,
        </div>
        <div className={styles.slogan}>
          THIS IS THE ONLY WAY TO OPEN THE <strong style={{ fontFamily: 'industry_black' }}>SECOND GATE</strong>.
        </div>
        <div className={styles.mint_button}>
          <div className={styles.text}>PRICE: 0.01ETH</div>
          <div className={styles.text}>124/5000, quantity 10</div>
          <div className={styles.mint}>MINT</div>
        </div>
      </div>
      <div className={styles.bg}></div>
    </div>
  )
}

export default Diamond