import React from "react";
import styles from '../styles/searchTeeups.module.css';

const UserRemoveConfirmation = props => {
  return (
    <div className={styles.popupbox}>
      <div className={styles.box}>
        <span className={styles.closeicon} onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};

export default UserRemoveConfirmation;
