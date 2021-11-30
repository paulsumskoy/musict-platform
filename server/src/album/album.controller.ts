import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('/albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(
    @UploadedFiles() files: { picture?: Express.Multer.File[] },
    @Body() dto: CreateAlbumDto,
  ) {
    const { picture } = files;
    return this.albumService.create(dto, picture[0]);
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.albumService.getAll(count, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.albumService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.albumService.getOne(id);
  }

  @Put(':id/track/:trackId')
  addTrack(@Param('id') id: ObjectId, @Param('trackId') trackId: ObjectId) {
    return this.albumService.addTrack(id, trackId);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.albumService.delete(id);
  }
}
