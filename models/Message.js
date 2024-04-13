import {Schema , models , model} from 'mongoose';


const MessageSchema = new Schema({

sender:{

     type:Schema.Types.ObjectId,
       ref:'User' ,
     required:true
},
recipient:{
    type:Schema.Types.ObjectId,
    ref:'User' ,
  required:true
     
},

property:{
    type:Schema.Types.ObjectId,
    ref:'Property' ,
  required:true
     
},

name:{

     type:String,
     required:[true, 'Name is requird']
},

email:{

     type:String,
     required:[true, 'Email is requird']
},

phoneNumber:{

     type:String ,
    
},
message:{

     type:String,
    
},
read:{

     type:Boolean,
     default:false
}
      
     
},
{ timestamps: true }
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;

