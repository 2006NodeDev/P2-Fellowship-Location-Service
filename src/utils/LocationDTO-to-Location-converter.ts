import { LocationDTO } from "../dtos/location-dto";
import { Location } from "../models/Location";
import { Image } from "../models/Image";


export function LocationDTOtoLocationConvertor( dto:LocationDTO):Location{

    let image:Image[]=[];
    let x = 0
    for (const i of dto.images){
        image.push({imageId:dto.image_ids[x], image:i})
        x++
    }

    return {
        locationId:dto.location_id,
        name:dto.name,
        image,
        realm:dto.realm,
        governance:dto.governance,
        primaryPopulation:dto.primary_population,
        description: dto.description,
        rating:  dto.avg_rating,
        numVisited:dto.num_visited 

        /*ISBN: dto.ISBN.toString(),
        authors:dto.authors,
        genre,
        bookId:dto.book_id,
        chapters:dto.chapters,
        pages:dto.pages,
        numberInSeries:dto.number_in_series,
        publisher:dto.publisher,
        publishingDate: dto.publishing_date.getFullYear(),
        series:dto.series,
        title:dto.title
        */
    }
}