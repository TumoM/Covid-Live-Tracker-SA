class Day{
    provinces = {};
    tests = 0;
    totalSick = 0;
    date = null;

    constructor(provinces = {}, tests=0, totalSick=0, date=null) {
      this.provinces = provinces;
      this.tests = tests;
      this.totalSick = totalSick;
      this.date = date;
    }
}

module.exports = Day