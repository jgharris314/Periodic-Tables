exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.timestamps(true, true);
    table.string("table_name").notNullable();
    table.integer("capacity").unsigned().notNullable();
    table.boolean("status").notNullable();
    table.integer("reservation_id").unsigned()
    table
      .foreign("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .onDelete("cascade");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tables");
};
