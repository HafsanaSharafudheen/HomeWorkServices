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
Object.defineProperty(exports, "__esModule", { value: true });
const allTestimonials_1 = require("../../../application/businesslogics/user/allTestimonials");
const fetchTestimonials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testimonials = yield (0, allTestimonials_1.allTestimonials)();
        res.status(200).json(testimonials);
    }
    catch (error) {
        console.error("Error in fetching testimonials:", error);
        res.status(500).json({ message: error });
    }
});
exports.default = fetchTestimonials;
//# sourceMappingURL=fetchTestimonials%20.js.map