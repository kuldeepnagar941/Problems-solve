const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productname: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    discription:{
        required: true,
        type :String
    },
    image:{
        require:true,
        url:""
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("product", productSchema);