import { model, Schema } from "mongoose";

const verifySchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "يجب ادخال رمز المستخدم"],
  },
  user_token: {
    type: String,
    required: [true, "يجب ادخال رمز"],
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 15 * 60 * 1000),
    expires: 0,
  },
});

export const VerifyAny = model("VerifyAny", verifySchema);
