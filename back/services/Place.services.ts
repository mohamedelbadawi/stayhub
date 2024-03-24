import { IPlace, placeModel } from "../models/Place.model";
class PlaceServices {
  async createPlace(data: IPlace) {
    return await placeModel.create(data);
  }
  async getPlacesByUserId(userId: string) {
    return await placeModel.find({
      userId: userId,
    });
  }
  async getPlacesById(id: string) {
    return await placeModel.findOne({
      _id: id,
    });
  }
  async updatePlacesById(id: string, data: IPlace) {
    return await placeModel.findOneAndUpdate({ _id: id }, data);
  }
  async deleteImageFromPlace(placeId: string, publicId: string) {
    return await placeModel.findOneAndUpdate(
      { _id: placeId },
      { $pull: { images: { publicId: publicId } } }
    );
  }
  async getPlaces({
    page = 1,
    limit = 10,
    search,
    minPrice,
    maxPrice,
  }: {
    page?: number;
    limit?: number;
    search: string;
    minPrice?: string;
    maxPrice?: string;
  }) {
    const skip: number = (page - 1) * limit;
    console.log(search);
    let query: any = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: new RegExp(search, "i") } },
          { description: { $regex: new RegExp(search, "i") } },
        ],
      };
    }

    const places = await placeModel.find(query).skip(skip).limit(limit);
    const aggregationPipeline = [
      { $match: query },
      { $group: { _id: null, count: { $sum: 1 } } },
    ];

    const result = await placeModel.aggregate(aggregationPipeline);
    const totalPages =
      result.length > 0 ? Math.ceil(result[0]?.count / limit) : 0;
    return {
      places,
      pages: totalPages,
      page: page * 1,
      perPage: limit,
      totalPages: result[0]?.count,
    };
  }
}
export const placeServices = new PlaceServices();
