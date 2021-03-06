const sanitizeHTML = require('sanitize-html');

module.exports = function(url,callback){
  const mongoose = require('mongoose');
  mongoose.connect(url,callback);

  const Message = mongoose.model(
    'messages',
    {username:String,text:String}
  );

  return {
    create:function(newMessage,callback){

      const msg = new Message(newMessage);

      msg.save(callback);
    },
    read:function(id,callback){

      return Message.findById(id, callback)

    },
    readUsername:function(username,callback){

      return Message.find({username: username}).find(callback)

    },
    readAll:function(callback){

      return Message.find({Message: Message}).find(callback)

    },
    update:function(id,updatedMessage,callback){

    return Message.findByIdAndUpdate(id, updatedMessage, callback)

    },
    delete:function(id,callback){

      return Message.findByIdAndRemove(id, callback) 

    },
    deleteAll:function(callback){
      Message.remove({},callback);
    },
    disconnect:function(){
      mongoose.disconnect();
    }
  };
};
