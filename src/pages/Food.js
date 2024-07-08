import React from 'react'
import styles from '../assets/styles/layout.module.scss'

const Food = () => {
  return (
    <div className={styles['layout-container']}>
      <div className={styles['layout-content']}>
        <h1>푸드 페이지 입니다.</h1>
      </div>
    </div>
  )
}

export default Food