"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markMessageAsRead = exports.fetchChatHistory = exports.saveChatMessage = exports.fetchUsersChatHistory = exports.fetchProvidersChatHistory = void 0;
const chat_1 = __importDefault(require("../../../infrastructure/dbModels/chat"));
const chatsHistory_1 = require("../../../application/businesslogics/user/chatsHistory");
const fetchProvidersChatHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providerId = req.user.id;
        console.log("Provider ID:", providerId);
        // const chats = await Chat.aggregate([
        //   {
        //     $match: {
        //       $or: [
        //         { receiver: providerId },
        //         { sender: providerId },
        //       ],
        //     },
        //   },
        //   {
        //     $lookup: {
        //       from: "users", // Replace with your users collection name
        //       let: { senderId: "$sender" }, // Reference sender field
        //       pipeline: [
        //         {
        //           $match: {
        //             $expr: {
        //               $eq: ["$_id", { $toObjectId: "$$senderId" }], // Convert sender to ObjectId
        //             },
        //           },
        //         },
        //       ],
        //       as: "senderUserDetails",
        //     },
        //   },
        //   {
        //     $lookup: {
        //       from: "providers", // Replace with your providers collection name
        //       let: { senderId: "$sender" }, // Reference sender field
        //       pipeline: [
        //         {
        //           $match: {
        //             $expr: {
        //               $eq: ["$_id", { $toObjectId: "$$senderId" }], // Convert sender to ObjectId
        //             },
        //           },
        //         },
        //       ],
        //       as: "senderProviderDetails",
        //     },
        //   },
        //   {
        //     $lookup: {
        //       from: "users", // Replace with your users collection name
        //       let: { receiverId: "$receiver" }, // Reference receiver field
        //       pipeline: [
        //         {
        //           $match: {
        //             $expr: {
        //               $eq: ["$_id", { $toObjectId: "$$receiverId" }], // Convert receiver to ObjectId
        //             },
        //           },
        //         },
        //       ],
        //       as: "receiverUserDetails",
        //     },
        //   },
        //   {
        //     $lookup: {
        //       from: "providers", // Replace with your providers collection name
        //       let: { receiverId: "$receiver" }, // Reference receiver field
        //       pipeline: [
        //         {
        //           $match: {
        //             $expr: {
        //               $eq: ["$_id", { $toObjectId: "$$receiverId" }], // Convert receiver to ObjectId
        //             },
        //           },
        //         },
        //       ],
        //       as: "receiverProviderDetails",
        //     },
        //   },
        //   {
        //     $addFields: {
        //       senderDetails: {
        //         $cond: {
        //           if: { $ne: [{ $size: "$senderUserDetails" }, 0] },
        //           then: { $arrayElemAt: ["$senderUserDetails", 0] },
        //           else: { $arrayElemAt: ["$senderProviderDetails", 0] },
        //         },
        //       },
        //       receiverDetails: {
        //         $cond: {
        //           if: { $ne: [{ $size: "$receiverUserDetails" }, 0] },
        //           then: { $arrayElemAt: ["$receiverUserDetails", 0] },
        //           else: { $arrayElemAt: ["$receiverProviderDetails", 0] },
        //         },
        //       },
        //     },
        //   },
        //   {
        //     $project: {
        //       sender: 1,
        //       receiver: 1,
        //       message: 1,
        //       createdAt: 1,
        //       senderDetails: 1,
        //       receiverDetails: 1,
        //     },
        //   },
        //   {
        //     $sort: { createdAt: 1 }, 
        //   },
        // ]);
        const chats = yield (0, chatsHistory_1.fetchChat)(providerId);
        res.status(200).json({ success: true, chats: chats, fromProvider: true });
    }
    catch (error) {
        console.error("Error fetching provider's chat history:", error);
        res.status(500).json({ success: false, message: "Failed to fetch provider's chat history" });
    }
});
exports.fetchProvidersChatHistory = fetchProvidersChatHistory;
const fetchUsersChatHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        console.log(req.user, "this is the request user");
        console.log(userId, 'uuuuuuuuuuuuuuu');
        const chats = yield (0, chatsHistory_1.fetchChatUser)(userId);
        console.log(chats, "cccccccccccc");
        res.status(200).json({ success: true, chats });
    }
    catch (error) {
        console.error("Error fetching user's chat history:", error);
        res.status(500).json({ success: false, message: "Failed to fetch user's chat history" });
    }
});
exports.fetchUsersChatHistory = fetchUsersChatHistory;
const saveChatMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sender, receiver, message, time } = req.body;
        console.log(req.body, "reqqqqqqqqqqqqqqqq");
        // Save the chat message in the database
        const newChat = yield chat_1.default.create({
            sender,
            receiver,
            message,
            time
        });
        res.status(201).json({ success: true, chat: newChat });
    }
    catch (error) {
        console.error("Error saving chat message:", error);
        res.status(500).json({ success: false, message: "Failed to save chat message" });
    }
});
exports.saveChatMessage = saveChatMessage;
const fetchChatHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providerId = req.query.providerId;
        const userId = req.user.id;
        if (!providerId) {
            return res.status(400).json({ error: "Participant ID is required" });
        }
        const chats = yield chat_1.default.aggregate([
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
                    read: 1,
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
    }
    catch (error) {
        console.error("Error fetching chat history:", error);
        res.status(500).json({ error: "Failed to fetch chat history" });
    }
});
exports.fetchChatHistory = fetchChatHistory;
const markMessageAsRead = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sender, receiver } = req.body;
        if (!sender || !receiver) {
            return res.status(400).json({ error: "Sender and Receiver are required" });
        }
        const updatedMessages = yield chat_1.default.updateMany({ sender, receiver, read: false }, { $set: { read: true } });
        return res.status(200).json({
            message: "Messages marked as read successfully",
            markAsRead: true,
            updatedCount: updatedMessages.modifiedCount,
        });
    }
    catch (error) {
        console.error("Error marking messages as read:", error);
        next(error);
    }
});
exports.markMessageAsRead = markMessageAsRead;
exports.default = exports.markMessageAsRead;
//# sourceMappingURL=chatsController.js.map