import type { Request, Response } from "express";
import { createPropertyService, deletePropertyService, getPropertiesService, getPropertyByUserIdService, getPropertyService, updatePropertyService } from "./service.js";
import { asyncHandler } from "../../utils/async-handlers.js";

export const getAllPropertiesController = asyncHandler(async (req, res) => {
    try {
        const properties = await getPropertiesService(req.query);
        res.json({
            success: true,
            data: properties,
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
})

export const createPropertyController =
    asyncHandler(async (req,res ) => {
        console.log(req.body,req.user)
        const property =
            await createPropertyService(
                req.user.userId,
                req.body
            );
         console.log(property)
        res.status(201).json({
            success: true,
            data: property,
        });
    });


export const getPropertyController =
    asyncHandler(async (
        req,
        res
    ) => {
        const property =
            await getPropertyService(
                Number(req.params.id)
            );
        res.json({
            success: true,
            data: property,
        });
    });
export const getPropertyByUserIdController =
    asyncHandler(async (
        req,
        res
    ) => {
        console.log(req.user)
        const property =
            await getPropertyByUserIdService(req.user.userId
            );
        res.json({
            success: true,
            data: property,
        });
    });

export const updatePropertyController =
    asyncHandler(async (req,res) => {
        const property =
            await updatePropertyService(
                Number(req.params.id),
                req.user.userId,
                req.body
            );

        res.json({
            success: true,
            data: property,
        });
    });

export const deletePropertyController =
    asyncHandler(async (req,res) => {
        await deletePropertyService(
            Number(req.params.id),
            req.user.userId
        );

        res.json({
            success: true,
            message: "Property deleted successfully",
        });
    });