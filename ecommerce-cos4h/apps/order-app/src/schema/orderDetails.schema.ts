import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDetailDocument = HydratedDocument<OrderDetail>;

@Schema({ collection: 'orderDetail' })
export class OrderDetail {
  @Prop({
    type: Number,
    required: true,
    get: (price: number) => parseFloat(price.toFixed(2)),
  })
  price: number;

  @Prop({ type: Array<any>, required: true, name: 'products' })
  products: any[];
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);

OrderDetailSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

OrderDetailSchema.virtual('id').get(function () {
  return this._id.toString();
});
