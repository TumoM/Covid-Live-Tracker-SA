class DayModel{
    provinces = {};
    tests = 0;
    totalSick = 0;
    date = "n/a";

    constructor(provinces = {}, tests=0, totalSick=0, date="n/a") {
      this.provinces = provinces;
      this.tests = tests;
      this.totalSick = totalSick;
      this.date = date;
    }
}

module.exports = DayModel