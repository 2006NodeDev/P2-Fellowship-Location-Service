import { ImageDTO } from "src/dtos/image-dto";
import { Image } from "src/models/Image";

export function ImageDTOtoImageConverter(idto:ImageDTO): Image {
    return {
        imageId: idto.image_id,
        image: idto.image
    }
}