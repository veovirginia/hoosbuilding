import styles from "../styles/Overlays.module.css"
import Router from "next/router"

export default function NewTransactionOverlay(props) {

   return (
      <div className={styles.successOverlayContainer}>
         <div className={styles.successContainer}>
            <b>Success</b>
            <p>Thanks for contributing! Your info is uploaded. Expect it to be on the site within 24 hours. Email Alex (amb3yn@virginia.edu) with any questions.</p>
            <button onClick={() => Router.push("/")} className={styles.homeButton}>Home</button>
         </div>
      </div>
   )
}