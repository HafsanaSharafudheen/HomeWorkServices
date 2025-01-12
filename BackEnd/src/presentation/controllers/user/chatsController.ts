import { Request, Response } from 'express';
import Chat from '../../../infrastructure/dbModels/chat';


export const fetchProvidersChatHistory = async (req: any, res: Response) => {
  try {
    const providerId=req.user.id
    console.log("Provider ID:", providerId);

    const chats = await Chat.aggregate([
      {
        $match: {
          $or: [
            { receiver: providerId },
            { sender: providerId },
          ],
        },
      },
      {
        $lookup: {
          from: "users", // Replace with your users collection name
          let: { senderId: "$sender" }, // Reference sender field
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$senderId" }], // Convert sender to ObjectId
                },
              },
            },
          ],
          as: "senderUserDetails",
        },
      },
      {
        $lookup: {
          from: "providers", // Replace with your providers collection name
          let: { senderId: "$sender" }, // Reference sender field
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$senderId" }], // Convert sender to ObjectId
                },
              },
            },
          ],
          as: "senderProviderDetails",
        },
      },
      {
        $lookup: {
          from: "users", // Replace with your users collection name
          let: { receiverId: "$receiver" }, // Reference receiver field
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$receiverId" }], // Convert receiver to ObjectId
                },
              },
            },
          ],
          as: "receiverUserDetails",
        },
      },
      {
        $lookup: {
          from: "providers", // Replace with your providers collection name
          let: { receiverId: "$receiver" }, // Reference receiver field
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$receiverId" }], // Convert receiver to ObjectId
                },
              },
            },
          ],
          as: "receiverProviderDetails",
        },
      },
      {
        $addFields: {
          senderDetails: {
            $cond: {
              if: { $ne: [{ $size: "$senderUserDetails" }, 0] },
              then: { $arrayElemAt: ["$senderUserDetails", 0] },
              else: { $arrayElemAt: ["$senderProviderDetails", 0] },
            },
          },
          receiverDetails: {
            $cond: {
              if: { $ne: [{ $size: "$receiverUserDetails" }, 0] },
              then: { $arrayElemAt: ["$receiverUserDetails", 0] },
              else: { $arrayElemAt: ["$receiverProviderDetails", 0] },
            },
          },
        },
      },
      {
        $project: {
          sender: 1,
          receiver: 1,
          message: 1,
          createdAt: 1,
          senderDetails: 1,
          receiverDetails: 1,
        },
      },
      {
        $sort: { createdAt: 1 }, 
      },
    ]);

    res.status(200).json({ success: true, chats:chats,fromProvider:true });
  } catch (error) {
    console.error("Error fetching provider's chat history:", error);
    res.status(500).json({ success: false, message: "Failed to fetch provider's chat history" });
  }
};


export const fetchUsersChatHistory = async (req: any, res: Response) => {
  try {
   
    const userId = req.user.id;
console.log(userId,'uuuuuuuuuuuuuuu')
    const chats = await Chat.aggregate([
      {
        $match: {
          $or: [
            { sender: userId },
            { receiver: userId },
          ],
        },
      },
      {
        $lookup: {
          from: "users", // Replace with your users collection name
          let: { senderId: "$sender" }, // Reference sender field
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$senderId" }], // Convert sender to ObjectId
                },
              },
            },
          ],
          as: "senderUserDetails",
        },
      },
      {
        $lookup: {
          from: "providers", // Replace with your providers collection name
          let: { senderId: "$sender" }, // Reference sender field
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$senderId" }], // Convert sender to ObjectId
                },
              },
            },
          ],
          as: "senderProviderDetails",
        },
      },
      {
        $lookup: {
          from: "users", // Replace with your users collection name
          let: { receiverId: "$receiver" }, // Reference receiver field
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$receiverId" }], // Convert receiver to ObjectId
                },
              },
            },
          ],
          as: "receiverUserDetails",
        },
      },
      {
        $lookup: {
          from: "providers", // Replace with your providers collection name
          let: { receiverId: "$receiver" }, // Reference receiver field
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$receiverId" }], // Convert receiver to ObjectId
                },
              },
            },
          ],
          as: "receiverProviderDetails",
        },
      },
      {
        $addFields: {
          senderDetails: {
            $cond: {
              if: { $ne: [{ $size: "$senderUserDetails" }, 0] },
              then: { $arrayElemAt: ["$senderUserDetails", 0] },
              else: { $arrayElemAt: ["$senderProviderDetails", 0] },
            },
          },
          receiverDetails: {
            $cond: {
              if: { $ne: [{ $size: "$receiverUserDetails" }, 0] },
              then: { $arrayElemAt: ["$receiverUserDetails", 0] },
              else: { $arrayElemAt: ["$receiverProviderDetails", 0] },
            },
          },
        },
      },
      {
        $project: {
          sender: 1,
          receiver: 1,
          message: 1,
          createdAt: 1,
          senderDetails: 1,
          receiverDetails: 1,
        },
      },
      {
        $sort: { createdAt: 1 }, // Sort chats by creation time
      },
    ]);
console.log(chats,"cccccccccccc")
    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("Error fetching user's chat history:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user's chat history" });
  }
};


export const saveChatMessage = async (req: any, res: any) => {
  try {
   const{sender,receiver,message,time} =req.body
   console.log(req.body,"reqqqqqqqqqqqqqqqq")
    // Save the chat message in the database
    const newChat = await Chat.create({
      sender,
      receiver,
      message,
      time
    });

    res.status(201).json({ success: true, chat: newChat });
  } catch (error) {
    console.error("Error saving chat message:", error);
    res.status(500).json({ success: false, message: "Failed to save chat message" });
  }
};



export const fetchChatHistory = async (req:any, res:any) => {
  try {
    const providerId = req.query.providerId;
    const userId = req.user.id;

    if (!providerId) {
      return res.status(400).json({ error: "Participant ID is required" });
    }

    const chats = await Chat.aggregate([
      {
        $match: {
          $or: [
            { sender: userId, receiver: providerId },
            { sender: providerId, receiver: userId },
          ],
        },
      },
      {
        $lookup: {
          from: "users", // User collection name
          let: { userId: "$sender" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$userId" }],
                },
              },
            },
            {
              $project: { _id: 1, fullName: 1, email: 1 },
            },
          ],
          as: "senderDetails",
        },
      },
      {
        $lookup: {
          from: "providers", // Provider collection name
          let: { providerId: "$sender" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$providerId" }],
                },
              },
            },
            {
              $project: { _id: 1, fullName: 1, email: 1 },
            },
          ],
          as: "senderProviderDetails",
        },
      },
      {
        $lookup: {
          from: "users", // User collection name
          let: { userId: "$receiver" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$userId" }],
                },
              },
            },
            {
              $project: { _id: 1, fullName: 1, email: 1 },
            },
          ],
          as: "receiverDetails",
        },
      },
      {
        $lookup: {
          from: "providers", // Provider collection name
          let: { providerId: "$receiver" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$providerId" }],
                },
              },
            },
            {
              $project: { _id: 1, fullName: 1, email: 1 },
            },
          ],
          as: "receiverProviderDetails",
        },
      },
      {
        $addFields: {
          senderDetails: {
            $cond: {
              if: { $gt: [{ $size: "$senderDetails" }, 0] },
              then: { $arrayElemAt: ["$senderDetails", 0] },
              else: { $arrayElemAt: ["$senderProviderDetails", 0] },
            },
          },
          receiverDetails: {
            $cond: {
              if: { $gt: [{ $size: "$receiverDetails" }, 0] },
              then: { $arrayElemAt: ["$receiverDetails", 0] },
              else: { $arrayElemAt: ["$receiverProviderDetails", 0] },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          sender: 1,
          receiver: 1,
          message: 1,
          createdAt: 1,
          senderDetails: 1,
          receiverDetails: 1,
        },
      },
      {
        $sort: { createdAt: 1 },
      },
    ]);

    res.status(200).json({ messages: chats });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};

