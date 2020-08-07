
//The User model keeps track of users information.

export class User {
    userId: number; // primary key
    username: string; // not null, unique
    password: string; // not null
    firstName: string; //not null
    lastName: string; 
    affiliation: string; //not null
    placesVisited: number; //based on rows in locations/users joint table
    address: string;
    email: string; //not null
    role: string; //not null
    image?: string; //for database reference to path
  }