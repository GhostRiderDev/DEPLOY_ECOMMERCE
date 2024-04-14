import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ collection: 'order' })
export class Order {
  @Prop({ default: Date.now, required: true })
  date: Date;

  @Prop({ type: String, required: true })
  id_user: string;

  @Prop({ type: Types.ObjectId, ref: 'OrderDetail' })
  order_detail_id: Types.ObjectId;
}
export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
  },
});

OrderSchema.virtual('id').get(function () {
  return this._id.toString();
});
