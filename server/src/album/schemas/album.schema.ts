import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Type } from 'class-transformer';
import { Track, TrackSchema } from '../../track/schemas/track.schema';

export type AlbumDocument = Album & Document;

@Schema({ versionKey: false })
export class Album {
  @Prop()
  name: string;

  @Prop()
  picture: string;

  @Prop({ type: TrackSchema })
  @Type(() => Track)
  tracks: Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
