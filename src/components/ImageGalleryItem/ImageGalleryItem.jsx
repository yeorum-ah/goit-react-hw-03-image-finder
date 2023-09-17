import {GalleryItem, GalleryImg } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ images, onImageClick}) => {
    return (
        <>
            {images.map(({ id, webformatURL, largeImageURL }) => (
                <GalleryItem key={id}>
                    <div  onClick={() => onImageClick(largeImageURL)}>
                    <GalleryImg  src={webformatURL} alt={`Image ${id}`} />
                    </div>
                </GalleryItem>
            ))}
           
        </>
    );
}