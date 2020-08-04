
//The User model keeps track of users information.

export class User {
    userId: number; // primary key
    username: string; // not null, unique
    password: string; // not null
    firstName: string; 
    lastName: string; 
    affiliation: string;
    placesVisited: number; //based on rows in locations/users joint table
    address: string;
    email: string; 
    role: string; //not null
    image?: string; //for database reference to path
  }