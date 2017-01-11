import Chat from '../models/chat'
import { asyncRequest } from '../utils'


export const initChatSockets = (io) => {
  io.of('/api/chat').on('connection', function(socket) {
    socket.on('message', function(message) {
      // save message
      new Chat(message).save(function(err, msg) {
        if(err) console.log(err)

        // get message and send it to every one
        Chat.find({ _id: msg.id })
          .populate('userId', 'local.username local.avatar_name local.nick_name')
          .exec(function(err, chatMsg) {
          // if(err) return res.json({ err: 'something went wrong when loading sending the message, please to send it again!', err })
          if(chatMsg) io.of('/api/chat').emit('message', chatMsg)
          // if(!chatMsg) return res.json({ empty: 'something went wrong when loading sending the message, please to send it again!' })
        })
      })

    })
  })

  // io.of('/chat').on('disconnect', function() {
  //   console.log('disconnect')
  //   // handle disconnect
  //   // io.disconnect()
  //   // io.close()
  // })

} // initChatSockets

export const getChatHistory = asyncRequest(async (req, res) => {
  const chats = await Chat.find({})
    .populate('userId', 'local.username local.avatar_name local.nick_name')
    .exec()
    if(!chats) {
      res.json({ empty: 'no chat history!' })
      return
    }
    res.json(chats)
}) // getChatHistory
