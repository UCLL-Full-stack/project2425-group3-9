-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Animal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Wage" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Wage_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id");
