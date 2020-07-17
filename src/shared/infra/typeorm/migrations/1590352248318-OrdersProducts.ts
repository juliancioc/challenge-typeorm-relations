import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class OrdersProducts1590352248318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders_products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    const productsFK = new TableForeignKey({
      name: 'productsFK',
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products',
      onDelete: 'CASCADE',
    });

    const ordersFK = new TableForeignKey({
      name: 'ordersFK',
      columnNames: ['order_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'orders',
      onDelete: 'CASCADE',
    });

    await queryRunner.createForeignKeys('orders_products', [
      productsFK,
      ordersFK,
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders_products', 'productsFK');
    await queryRunner.dropForeignKey('orders_products', 'ordersFK');
    await queryRunner.dropTable('orders_products');
  }
}
