-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "delivered" SET DEFAULT false;
