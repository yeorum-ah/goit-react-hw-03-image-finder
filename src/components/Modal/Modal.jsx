import { Overlay, ModalWindow } from "./Modal.styled"

export const Modal = ({selectedImage, onClose} ) => {


return <Overlay className="overlay" onClick={onClose} >
  <ModalWindow className="modal"  >
    <img src={selectedImage} alt="" />
  </ModalWindow>
</Overlay>
}