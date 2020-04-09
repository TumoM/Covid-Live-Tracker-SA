let DbSetup = function DbSetup() {
  const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'test_user',
      password : 'temp_pass',
      database : 'covid-tracker-sa'
  ***REMOVED***
***REMOVED***);
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
        console.log("Provinces table CREATED")
    ***REMOVED***);
  ***REMOVED***
    else {
      console.log("Provinces table exists")
  ***REMOVED***
***REMOVED***);

  knex.schema.hasTable('sickDates').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('sickDates', t => {
        t.increments('id').primary().notNullable();
        t.integer('provinceId').notNullable();
        t.date('sickDate').notNullable();
        t.integer('sickCount').defaultTo(0);

        t.foreign('provinceId').references('id').inTable('provinces');
        console.log("sickDates table CREATED")
    ***REMOVED***);
  ***REMOVED***
    else {
      console.log("sickDates table exists")
  ***REMOVED***
***REMOVED***);

  knex.schema.hasTable('deathDates').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('deathDates', t => {
        t.increments('id').primary().notNullable();
        t.integer('provinceId').notNullable();
        t.date('deathDate').notNullable();
        t.integer('deathCount').defaultTo(0);
        t.integer('deathMenCount').defaultTo(0);
        t.integer('deathWomenCount').defaultTo(0);

        t.foreign('provinceId').references('id').inTable('provinces');
        console.log("deathDates table CREATED")
    ***REMOVED***);
  ***REMOVED***
    else {
      console.log("deathDates table exists")
  ***REMOVED***
***REMOVED***);

  knex.schema.hasTable('deathPersons').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('deathPersons', t => {
        t.increments('id').primary().notNullable();
        t.integer('deathDateId').notNullable();
        t.string("provinceName");
        t.string("sex");
        t.date('deathDate').notNullable();
        t.integer('age').defaultTo(null);

        t.foreign('deathDateId').references('id').inTable('provinces');
        console.log("deathPersons table CREATED")
    ***REMOVED***);
  ***REMOVED***
    else {
      console.log("deathPersons table exists")
  ***REMOVED***
***REMOVED***);
  console.log("DB SETUP: COMPLETE");
  
  return knex
***REMOVED***

module.exports = DbSetup
