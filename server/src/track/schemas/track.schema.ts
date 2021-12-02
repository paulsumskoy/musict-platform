import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Type } from 'class-transformer';
import { Comment, CommentSchema } from './comment.schema';

export type TrackDocument = Track & Document;

@Schema({ versionKey: false })
export class Track {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  text: string;

  @Prop()
  listens: number;

  @Prop()
  picture: string;

  @Prop()
  audio: string;

  @Prop({ type: CommentSchema })
  @Type(() => Comment)
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track);
