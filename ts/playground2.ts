interface IUser {
  id: number;
  age: number;
  name: string;
}

interface IDept {
  id: number;
  age: string;
  dname: string;
  captain: string;
}

type Combine<T, U> = {[key in keyof (T & U)]: key extends (keyof T & keyof U) ? T[key] | U[key] : (T & U)[key] };

type ICombined = Combine<IUser, IDept>;

let combineX: ICombined = {
  id: 0,
  age: 33,
  name: 'aaa',
  dname: 'bbb',
  captain: 'ccc'
}
let combineY: ICombined = {
  id: 0,
  age: '33세',
  name: 'aaa',
  dname: 'bbb',
  captain: 'ccc'
}