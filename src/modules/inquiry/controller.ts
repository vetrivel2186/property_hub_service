
import { asyncHandler } from "../../utils/async-handlers.js";
import {
  createInquiryService,
  getMyInquiriesService,
  getSenderInquiryService,
} from "./service.js";

export const createInquiryController =
  asyncHandler(async (req, res) => {
    const inquiry =
      await createInquiryService(
        req.user.userId,
        req.body
      );

    res.status(201).json({
      success: true,
      data: inquiry,
    });
  });

export const getMyInquiriesController =
  asyncHandler(async (req, res) => {
    const inquiries =
      await getMyInquiriesService(
        req.user.userId
      );

    res.status(200).json({
      success: true,
      data: inquiries,
    });
  });
export const getSenderInquiryController =
  asyncHandler(async (req, res) => {
    const inquiries =
      await getSenderInquiryService(
        req.user.userId
      );

    res.status(200).json({
      success: true,
      data: inquiries,
    });
  });