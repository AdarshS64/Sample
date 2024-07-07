import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployee1720085378841 implements MigrationInterface {
    name = 'CreateEmployee1720085378841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
    }

}
