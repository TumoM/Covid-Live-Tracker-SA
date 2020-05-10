function DbSetup() {
  const knex = require('knex')({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'test_user',
      password: 'temp_pass',
      database: 'covid-tracker-sa2'
  ***REMOVED***
***REMOVED***);
  knex.schema.hasTable('provinceDays').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('provinceDays', (t) => {
        t.increments('id').primary().notNullable();
        t.string('provinceName').notNullable();
        t.date('provDate').notNullable();
        t.integer('caseCount').defaultTo(null);
        t.integer('deathCount').defaultTo(null);
        t.integer('recovered').defaultTo(null);
        t.integer('population').defaultTo(null);
        t.integer('testCount').defaultTo(null);
        t.unique(['provinceName', 'provDate']);
        console.log('ProvinceDays table CREATED');
    ***REMOVED***);
  ***REMOVED***

      console.log('ProvinceDays table exists');
***REMOVED***);

  knex.schema.hasTable('caseDates').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('caseDates', (t) => {
        t.increments('id').primary().notNullable();
        t.integer('provinceId').notNullable();
        t.date('caseDate').notNullable();
        t.integer('caseCount').defaultTo(0);
        t.unique(['provinceId', 'caseDate']);
        t.foreign('provinceId').references('id').inTable('provinceDays');
        console.log('caseDates table CREATED');
    ***REMOVED***);
  ***REMOVED***

      console.log('caseDates table exists');
***REMOVED***);

  knex.schema.hasTable('deathDates').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('deathDates', (t) => {
        t.increments('id').primary().notNullable();
        t.integer('provinceId').notNullable();
        t.date('deathDate').notNullable();
        t.integer('deathCount').defaultTo(0);
        t.integer('deathMenCount').defaultTo(0);
        t.integer('deathWomenCount').defaultTo(0);
        t.unique(['provinceId', 'deathDate']);
        t.foreign('provinceId').references('id').inTable('provinceDays');
        console.log('deathDates table CREATED');
    ***REMOVED***);
  ***REMOVED***

      console.log('deathDates table exists');
***REMOVED***);

  knex.schema.hasTable('deathPersons').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('deathPersons', (t) => {
        t.increments('id').primary().notNullable();
        t.integer('deathDateId').notNullable();
        t.string('provinceName');
        t.string('sex');
        t.date('deathDate').notNullable();
        t.integer('age').defaultTo(null);
        t.unique(['provinceName', 'deathDateId', 'deathDate', 'age', 'sex']);
        t.foreign('deathDateId').references('id').inTable('provinceDays');
        console.log('deathPersons table CREATED');
    ***REMOVED***);
  ***REMOVED***

      console.log('deathPersons table exists');
***REMOVED***);

  knex.schema.hasTable('dates').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('dates', (t) => {
        t.date('date').notNullable().primary().unique();
        t.integer('totalCases').defaultTo(null);
        t.integer('totalDeaths').defaultTo(null);
        t.integer('totalRecoveries').defaultTo(null);
        t.integer('totalTests').defaultTo(null);
        t.boolean('parsed').defaultTo(false);
        t.boolean('maybeValid').defaultTo(true);
        t.boolean('error').defaultTo(false);

        console.log('dates table CREATED');
    ***REMOVED***).then((value) => knex.raw(''`alter table dates\tadd activeCases numeric GENERATED ALWAYS AS (dates."totalCases" - (dates."totalRecoveries" + dates."totalDeaths")) STORED;```));
  ***REMOVED***

      console.log('dates table exists');
***REMOVED***);
  console.log('DB SETUP: COMPLETE');
***REMOVED***
// DbSetup();