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
exports.fetchChatUser = exports.fetchChat = void 0;
const chat_1 = __importDefault(require("../../../infrastructure/dbModels/chat"));
const fetchChat = (providerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield chat_1.default.aggregate([
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
});
exports.fetchChat = fetchChat;
const fetchChatUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield chat_1.default.aggregate([
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
});
exports.fetchChatUser = fetchChatUser;
exports.default = { fetchChat: exports.fetchChat, fetchChatUser: exports.fetchChatUser };
//# sourceMappingURL=chatsHistory.js.map