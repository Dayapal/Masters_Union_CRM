-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SUBSCRIBER', 'SALES');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "user_login" TEXT NOT NULL,
    "user_pass" TEXT NOT NULL,
    "user_nicename" TEXT,
    "user_email" TEXT NOT NULL,
    "user_url" TEXT,
    "user_registered" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_activation_key" TEXT,
    "user_status" INTEGER NOT NULL DEFAULT 0,
    "display_name" TEXT,
    "roles" "UserRole" NOT NULL DEFAULT 'SUBSCRIBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_login_key" ON "Users"("user_login");

-- CreateIndex
CREATE UNIQUE INDEX "Users_user_email_key" ON "Users"("user_email");

-- CreateIndex
CREATE INDEX "Users_user_email_idx" ON "Users"("user_email");

-- CreateIndex
CREATE INDEX "Users_user_login_idx" ON "Users"("user_login");
