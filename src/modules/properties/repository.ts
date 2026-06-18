import { db } from "../../db/index.js"
import { properties } from "../../db/schema/property.schema.js";
import {
  and,
  asc,
  desc,
  eq,
  gte,
  lte,
  sql,
} from "drizzle-orm";


export const getAllProperties = async (filters: any) => {
  const {
    city,
    propertyType,
    bedrooms,
    minPrice,
    maxPrice,
    sort,
    page = 1,
    limit = 10,
  } = filters;

  const conditions = [];

  if (city) {
    conditions.push(eq(properties.city, city));
  }

  if (propertyType) {
    conditions.push(
      eq(properties.propertyType, propertyType)
    );
  }

  if (bedrooms) {
    conditions.push(
      eq(properties.bedrooms, Number(bedrooms))
    );
  }

  if (minPrice) {
    conditions.push(
      gte(properties.price, Number(minPrice))
    );
  }

  if (maxPrice) {
    conditions.push(
      lte(properties.price, Number(maxPrice))
    );
  }

  let orderByClause = desc(
    properties.createdAt
  );

  switch (sort) {
    case "price_asc":
      orderByClause = asc(properties.price);
      break;

    case "price_desc":
      orderByClause = desc(properties.price);
      break;

    case "oldest":
      orderByClause = asc(
        properties.createdAt
      );
      break;
  }

  const offset =
    (Number(page) - 1) * Number(limit);

  const data = await db
    .select()
    .from(properties)
    .where(
      conditions.length
        ? and(...conditions)
        : undefined
    )
    .orderBy(orderByClause)
    .limit(Number(limit))
    .offset(offset);

  const result = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(properties)
    .where(
      conditions.length
        ? and(...conditions)
        : undefined
    );
    const count = result[0]?.count || 0;
  console.log(data)
  return {
    data,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: Number(count),
      totalPages: Math.ceil(
        Number(count) / Number(limit)
      ),
    },
  };
};
export const insertProperty = async (propertyData: typeof properties.$inferInsert) => {
  console.log(propertyData)
    const result = await db.insert(properties).values(propertyData).returning();
    if (!result[0]) {
        throw new Error("Property insert failed");
    }
    return result[0];
}


export const getPropertyById = async (
  id: number
) => {
  const [property] = await db
    .select()
    .from(properties)
    .where(eq(properties.id, id));

  return property;
};
export const getPropertyByUserId = async (
  id: number
) => {
  const property = await db
    .select()
    .from(properties)
    .where(eq(properties.userId, id));

  return property;
};



export const updateProperty = async (
  id: number,
  data: Partial<typeof properties.$inferInsert>
) => {
  const [property] = await db
    .update(properties)
    .set(data)
    .where(eq(properties.id, id))
    .returning();

  return property;
};

export const deleteProperty = async (
  id: number
) => {
  const [property] = await db
    .delete(properties)
    .where(eq(properties.id, id))
    .returning();

  return property;
};