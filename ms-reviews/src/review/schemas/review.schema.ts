import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Ratings } from "src/common/types/ratings";


@Schema({
    timestamps: true
})
export class Review {
    @Prop({ required: true })
    title: string;

    @Prop({required: true})
    userMail: string

    @Prop({required: true})
    gameId: number

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    rating: Ratings;

    @Prop({default: true})
    isAvailable: boolean

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);