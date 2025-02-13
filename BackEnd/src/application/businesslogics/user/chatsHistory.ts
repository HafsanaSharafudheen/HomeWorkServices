import  Chat from '../../../infrastructure/dbModels/chat';

export const fetchChat = async (providerId: string) => {
    return await Chat.aggregate([
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
            from: "users",
            let: { senderId: "$sender" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", { $toObjectId: "$$senderId" }],
                  },
                },
              },
            ],
            as: "senderUserDetails",
          },
        },
        {
          $lookup: {
            from: "providers",
            let: { senderId: "$sender" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", { $toObjectId: "$$senderId" }],
                  },
                },
              },
            ],
            as: "senderProviderDetails",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { receiverId: "$receiver" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", { $toObjectId: "$$receiverId" }],
                  },
                },
              },
            ],
            as: "receiverUserDetails",
          },
        },
        {
          $lookup: {
            from: "providers",
            let: { receiverId: "$receiver" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", { $toObjectId: "$$receiverId" }],
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
};


export const fetchChatUser=async(userId:string)=>{
    return await Chat.aggregate([
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
}
export default {fetchChat,fetchChatUser}