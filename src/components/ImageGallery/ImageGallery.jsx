import { GalleryUl } from "./ImageGallery.styled";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ images, onImageClick, isModalOpen}) => {

    return (
        <GalleryUl className="gallery">
           <ImageGalleryItem images={images} onImageClick={onImageClick} isModalOpen={isModalOpen} />
        </GalleryUl>
    );
}