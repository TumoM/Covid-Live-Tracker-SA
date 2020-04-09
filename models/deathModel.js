class DeathModel {
  province; // String
  sex; // Char
  age; // int

  constructor(province, sex, age) {
    this.province = province;
    this.sex = sex;
    this.age = age;
  }

  toString(){
    return `${this.province}, ${this.sex}, ${this.age}`;
  }
}
module.exports = DeathModel
// let x = new age("Swag")
// let y = new age("Swag 2", 1,0,100)
// console.log(y);
// console.log(y.province);
// console.log(y.recovered);
// y.recovered = 0;
// console.log(y.recovered);

  