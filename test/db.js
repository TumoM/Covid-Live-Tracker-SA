function DbSetup() {
  const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'test_user',
      password : 'temp_pass',
      database : 'covid-tracker-sa'
    }
  });
  knex.schema.hasTable('provinces').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('provinces', t => {
        t.increments('id').primary().notNullable();
        t.string('provinceName').notNullable();
        t.date('date').notNullable();
        t.integer('sickCount').defaultTo(0);
        t.integer('deathCount').defaultTo(0);
        t.integer('recovered').defaultTo(0);
        t.integer('population').defaultTo(null);
        t.integer("testCount").defaultTo(null)
        t.unique(['provinceName','date'])
        console.log("Provinces table CREATED")
      });
    }
    else {
      console.log("Provinces table exists")
    }
  });

  knex.schema.hasTable('sickDates').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('sickDates', t => {
        t.increments('id').primary().notNullable();
        t.integer('provinceId').notNullable();
        t.date('sickDate').notNullable();
        t.integer('sickCount').defaultTo(0);
        t.unique(['provinceId','sickDate'])
        t.foreign('provinceId').references('id').inTable('provinces');
        console.log("sickDates table CREATED")
      });
    }
    else {
      console.log("sickDates table exists")
    }
  });

  knex.schema.hasTable('deathDates').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('deathDates', t => {
        t.increments('id').primary().notNullable();
        t.integer('provinceId').notNullable();
        t.date('deathDate').notNullable();
        t.integer('deathCount').defaultTo(0);
        t.integer('deathMenCount').defaultTo(0);
        t.integer('deathWomenCount').defaultTo(0);
        t.unique(['provinceId','deathDate'])
        t.foreign('provinceId').references('id').inTable('provinces');
        console.log("deathDates table CREATED")
      });
    }
    else {
      console.log("deathDates table exists")
    }
  });

  knex.schema.hasTable('deathPersons').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('deathPersons', t => {
        t.increments('id').primary().notNullable();
        t.integer('deathDateId').notNullable();
        t.string("provinceName");
        t.string("sex");
        t.date('deathDate').notNullable();
        t.integer('age').defaultTo(null);
        t.unique(['provinceName','deathDateId','deathDate','age','sex'])
        t.foreign('deathDateId').references('id').inTable('provinces');
        console.log("deathPersons table CREATED")
      });
    }
    else {
      console.log("deathPersons table exists")
    }
  });

  knex.schema.hasTable('dates').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('dates', t => {
        t.date('deathDate').notNullable().primary().unique();
        t.boolean('parsed').defaultTo(false);
        t.boolean('valid').defaultTo(true);

        console.log("dates table CREATED")
      });
    }
    else {
      console.log("dates table exists")
    }
  });
  console.log("DB SETUP: COMPLETE");
}
DbSetup();

