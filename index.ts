import { v4 as uuidv4 } from "uuid";

/*
 **
 ** avoid any "weird" number as input
 */

/* 1.  factory function  */
/*  a factory function creates a new object  */

type Project = {
  clientName: string;
  clientEmail: string;
  price: number;
  immersive: boolean;
};

const project1: Project = {
  clientName: "Yann",
  clientEmail: "yan@mail.com",
  price: 1000,
  immersive: true,
};

const project2: Project = {
  clientName: "Ilias",
  clientEmail: "ilias@mail.com",
  price: 2000,
  immersive: true,
};

/* 2.  constructor function  */
// OOP
// a constructor function creates a new object and sets its properties

function calculateTotalRevenue(projects: Project[]): number {
  return projects.reduce((total, project) => total + project.price, 0);
}

// create a primitive obsessed type

// modify this code for testing !!
// this replicates user input
const project3: Project = {
  clientName: "Karan",
  clientEmail: "karan.,.fihei.com",
  price: 3000,
  immersive: false,
};

console.log(orderOne);
