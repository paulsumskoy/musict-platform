import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from '../file/file.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album, AlbumDocument } from './schemas/album.schema';
import { Track, TrackDocument } from '../track/schemas/track.schema';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private fileService: FileService,
  ) {}

  async create(
    dto: CreateAlbumDto,
    picture: Express.Multer.File | undefined,
  ): Promise<Album> {
    const picturePath = picture
      ? this.fileService.createFile(FileType.IMAGE, picture)
      : '';
    const album = await this.albumModel.create({
      ...dto,
      picture: picturePath,
    });
    return album;
  }

  async getAll(count = 10, offset = 0): Promise<Album[]> {
    const albums = await this.albumModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return albums;
  }

  async getOne(id: ObjectId): Promise<Album> {
    const album = await this.albumModel.findById(id).populate('tracks');
    return album;
  }

  async addTrack(id: ObjectId, trackId: ObjectId): Promise<Album> {
    const album = await this.albumModel.findById(id);
    const track = await this.trackModel.findById(trackId);
    album.tracks.push(track);
    await album.save();
    return album;
  }

  async search(query: string): Promise<Album[]> {
    const albums = await this.albumModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return albums;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const album = await this.albumModel.findById(id);
    await Promise.all([
      this.fileService.removeFile(album.picture),
      this.albumModel.deleteOne({ _id: id }),
    ]);
    return album._id;
  }
}
