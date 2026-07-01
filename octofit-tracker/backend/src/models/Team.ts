import { InferSchemaType, Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team = model('Team', teamSchema);

export default Team;
