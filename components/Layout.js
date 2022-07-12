import CustomNavbar from "./CustomNavbar"
import SuccessfulUploadOverlay from "./SuccessfulUploadOverlay.js"
import { useState, Children, cloneElement } from "react"

export default function Layout({ children }) {
   const [successfulUploadOverlayVisible, setSuccessfulOverlayVisible] =
      useState(false)
   const [overlayVisible, setOverlayVisible] = useState(false)

   function handleSuccess() {
      setOverlayVisible(true)
      setSuccessfulOverlayVisible(true)
   }

   function dismissOverlay() {
      setOverlayVisible(false)
      setSuccessfulOverlayVisible(false)
   }

   const childrenWithProps = Children.map(children, (child) =>
      cloneElement(child, {
         handleSuccess: handleSuccess,
         dismissOverlay: dismissOverlay,
      })
   )

   return (
      <>
         {overlayVisible && (
            <div>
               {successfulUploadOverlayVisible && <SuccessfulUploadOverlay />}
            </div>
         )}
         <CustomNavbar />
         <main>{childrenWithProps}</main>
         {/* <Footer /> */}
      </>
   )
}