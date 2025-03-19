import Message from "../models/message.model"

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { senderId, receiverId } = req.params

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        })
        res.status(200).json({
            message: "message sent successfully",
            data: newMessage
        })
    } catch (error) {
        console.log("message failed to send")
        res.status(500).json({
            message: "message failed to send",
            stack: error.stack
        })
    }
}

export default sendMessage;