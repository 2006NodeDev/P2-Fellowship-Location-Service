"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationDTOtoLocationConvertor = void 0;
function LocationDTOtoLocationConvertor(dto) {
    var image = [];
    var x = 0;
    for (var _i = 0, _a = dto.images; _i < _a.length; _i++) {
        var i = _a[_i];
        image.push({ imageId: dto.image_ids[x], image: i });
        x++;
    }
    return {
        locationId: dto.location_id,
        name: dto.name,
        image: image,
        realm: dto.realm,
        governance: dto.governance,
        primaryPopulation: dto.primary_population,
        description: dto.description,
        rating: dto.avg_rating,
        numVisited: dto.num_visited,
        latitude: dto.lat,
        longitude: dto.lng
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
    };
}
exports.LocationDTOtoLocationConvertor = LocationDTOtoLocationConvertor;
//# sourceMappingURL=LocationDTO-to-Location-converter.js.map