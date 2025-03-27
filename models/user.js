import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "اسم المستخدم مطلوب"],
      minlength: [3, "يجب أن يكون الاسم على الأقل 3 حروف"],
      maxlength: [20, "يجب أن يكون الاسم على الأقل 20 حرفا"],
    },
    email: {
      type: String,
      required: [true, "البريد الإلكتروني مطلوب"],
      unique: [true, "البريد الإلكتروني مستخدم بلفعل"],
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        "البريد الإلكتروني غير صالح",
      ],
    },
    username: {
      type: String,
      required: [true, "اسم المستخدم مطلوب"],
      unique: [true, "اسم المستخدم مستخدم بلفعل"],
      minlength: [3, "اسم المستخدم يجب أن يكون على الأقل 3 حروف"],
      maxlength: [20, "اسم المستخدم يجب أن لا يتجاوز 20 حرفًا"],
    },
    avatar: {
      type: Object,
      default: {
        img: "https://th.bing.com/th/id/OIP.Zvs5IHgOO5kip7A32UwZJgHaHa?rs=1&pid=ImgDetMain",
        idOfImage: null,
      },
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "كلمة المرور مطلوبة"],
      minlength: [3, "كلمة المرور يجب أن تكون على الأقل 3 حروف"],
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "{VALUE} ليس دورًا صالحًا",
      },
      default: "user",
    },
    adress: {
      type: [
        {
          governorate: {
            type: String,
            required: [true, "المحافظة مطلوبة"],
          },
          center: {
            type: String,
            required: [true, "المركز مطلوب"],
          },
          village: {
            type: String,
            required: [true, "القرية مطلوبة"],
          },
          landmark: {
            type: String,
            required: [true, "المعلم مطلوب"],
          },
          phone: {
            type: String,
            match: [/^\+?[0-9]{10,15}$/, "رقم الهاتف غير صالح"],
          },
        },
      ],
      validate: {
        validator: function (value) {
          if (value && value.length > 0) {
            return value.every(
              (address) =>
                address.governorate &&
                address.center &&
                address.village &&
                address.landmark &&
                address.phone
            );
          }
          return true;
        },
        message:
          "جميع حقول العنوان (المحافظة، المركز، القرية، المعلم، ورقم الهاتف) مطلوبة عند إضافة عنوان",
      },
    },
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
