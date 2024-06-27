import React from 'react'
import styles from '../../assets/styles/loading.module.scss'
//로딩중 일 때 사용하는 컴포넌트

function Loading() {
  return (
    <span className={styles.loader}></span>
  )
}

export default Loading