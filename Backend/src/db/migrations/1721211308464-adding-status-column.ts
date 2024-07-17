import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingStatusColumn1721211308464 implements MigrationInterface {
    name = 'AddingStatusColumn1721211308464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "experience" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer`);
    }

}
