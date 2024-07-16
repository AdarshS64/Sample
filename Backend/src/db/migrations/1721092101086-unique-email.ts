import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueEmail1721092101086 implements MigrationInterface {
    name = 'UniqueEmail1721092101086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_817d1d427138772d47eca048855"`);
    }

}
