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

  constructor(name, sick=0, dead=[], recovered=0) {
    this.name = name;
    this.sick = sick;
    this.dead = [];
    this.recovered = recovered;
    this.date = null;
    this.men = 0; // Dead
    this.women = 0; // Dead
    this.totalDead = 0; // Dead
    this.tests = 0;
  }


  // toString(){
  //   return `${name}, date${},total${},sick${},sick${},`
  // }
}
module.exports = Province

