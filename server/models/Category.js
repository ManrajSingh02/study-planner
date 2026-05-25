import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    color: {
      type: String,
      default: 'bg-slate-500'
    },
    goal: {
      type: Number,
      default: 2
    }
  },
  {
    timestamps: true
  }
)

const Category = mongoose.model('Category', categorySchema)

export default Category
