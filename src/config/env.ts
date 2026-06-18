import dotenv from "dotenv";
dotenv.config();
export const env ={
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL!,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY!,
    JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY!,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,  

}
export const CONSTANTS ={
    api_version:"v1",
    module:"api"


}