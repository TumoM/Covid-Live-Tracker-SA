class Province {
  name; // String
  sick; // int
  dead; // Dead
  totalDead; // Dead
  recovered; // Recovered
  date; // Date
  men; // int
  women; // int
  tests; int

  constructor(name, sick=0, dead=[],totalDead=0, recovered=0) {
    this.name = name;
    this.sick = parseInt(sick);
    this.dead = [];
    this.recovered = parseInt(recovered);
    this.date = null;
    this.men = 0; // Dead
    this.women = 0; // Dead
    this.totalDead = totalDead; // Dead
    this.tests = 0;
  }



  // toString(){
  //   return `${name}, date${},total${},sick${},sick${},`
  // }
}
module.exports = Province


