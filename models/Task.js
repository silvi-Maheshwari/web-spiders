const mongoose=require('mongoose')
const TaskSchema=new mongoose.Schema({
    title:{type:String,required:true,maxlength: 100 },
    description: { type: String },
    status:{ type: String, enum: ["TODO", "IN_PROGRESS", "COMPLETED"], default: "TODO"},
    priority:{ type: String, enum: ["LOW", "MEDIUM", "HIGH"], required: true },
    dueDate:{ type: Date },
},
{ timestamps: true }
)
const taskmodel=mongoose.model("Task1", TaskSchema)
module.exports=taskmodel