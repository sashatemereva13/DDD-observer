import { v4 as uuidv4 } from "uuid";

/*
 **
 ** avoid any "weird" number as input
 */

/* 1.  factory function  */
/*  a factory function creates a new object  */

// create a primitive obsessed type

type Price = number & { readonly __brand: unique symbol };
type Currency = "EUR";
type Money = {
  readonly amount: Price;
  readonly currency: Currency;
};

type Email = string & { readonly __brand: unique symbol };

type ProjectId = string & { readonly __brand: unique symbol };

// smart constructors
function createEmail(value: string): Email {
  if (!value.includes("@")) {
    throw new Error("Invalid email");
  }
  return value as Email;
}

function createPrice(value: number): Price {
  if (value <= 0) {
    throw new Error("Price must be positive");
  }
  return value as Price;
}

function createMoney(amount: number, currency: Currency): Money {
  return {
    amount: createPrice(amount),
    currency,
  };
}

type Project = {
  id: ProjectId;
  clientName: string;
  clientEmail: Email;
  price: Money;
  immersive: boolean;
  status: "Draft" | "DesignApproved" | "Build" | "Deployed";
};

function createProject(
  name: string,
  email: string,
  price: number,
  immersive: boolean,
): Project {
  return {
    id: uuidv4() as ProjectId,
    clientName: name,
    clientEmail: createEmail(email),
    price: createMoney(price, "EUR"),
    immersive,
    status: "Draft",
  };
}

const project1 = createProject(
	"Yann",
	"yan@mail.com",
	1000,
	true
);

const project2 = createProject(
	"Ilias",
	"ilias@mail.com",
	2000,
	true
);

