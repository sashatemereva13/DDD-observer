import { v4 as uuidv4 } from "uuid";

// =============================== //
//         TYPE DEFINITIONS       //
// ============================== //

type Price = number & { readonly __brand: unique symbol };
type Currency = "EUR";
type Money = {
  readonly amount: Price;
  readonly currency: Currency;
};

type Email = string & { readonly __brand: unique symbol };
type ProjectId = string & { readonly __brand: unique symbol };

// =============================== //
//        FACTORY FUNCTIONS       //
// ============================== //

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

function notify(project: Project, event: ProjectEvent) {
  project.observers.forEach((obs) => obs(event));
}

function subscribe(project: Project, observer: Observer): Project {
  return {
    ...project,
    observers: [...project.observers, observer],
  };
}

function unsubscribe(project: Project, observer: Observer): Project {
  return {
    ...project,
    observers: project.observers.filter((obs) => obs !== observer),
  };
}

function deployProject(project: Project): Project {
  if (project.status !== "Build") {
    throw new Error("Project must be built before deployment");
  }

  const updatedProject: Project = {
    ...project,
    status: "Deployed",
  };

  notify(updatedProject, {
    type: "ProjectDeployed",
    projectId: updatedProject.id,
  });

  return updatedProject;
}

// =============================== //
//        ENTITY DEFINITION       //
// ============================== //
type Project = {
  id: ProjectId;
  clientName: string;
  clientEmail: Email;
  price: Money;
  immersive: boolean;
  status: "Draft" | "DesignApproved" | "Build" | "Deployed";
  observers: Observer[];
};

function createProject(
  name: string,
  email: string,
  price: number,
  immersive: boolean,
): Project {
  const project: Project = {
    id: uuidv4() as ProjectId,
    clientName: name,
    clientEmail: createEmail(email),
    price: createMoney(price, "EUR"),
    immersive,
    status: "Draft",
    observers: [],
  };

  notify(project, {
    type: "ProjectCreated",
    projectId: project.id,
  });
  return project;
}

// =============================== //
//         EVENT TYPES            //
// ============================== //

type ProjectEvent =
  | { type: "ProjectCreated"; projectId: ProjectId }
  | { type: "DesignApproved"; projectId: ProjectId }
  | { type: "BuildStarted"; projectId: ProjectId }
  | { type: "ProjectReadyToDeploy"; projectId: ProjectId }
  | { type: "ProjectDeployed"; projectId: ProjectId }
  | { type: "DiscoveryCompleted"; projectId: ProjectId };

type Observer = (event: ProjectEvent) => void;

// =============================== //
//         OBSERVERS              //
// ============================== //

const loggerObserver: Observer = (event) => {
  console.log("Event occured:", event.type);
};

const emailObserver: Observer = (event) => {
  if (event.type === "ProjectDeployed") {
    console.log(
      `[Email] Sending email to client of project ${event.projectId} about deployment`,
    );
  }
};

const portfolioObserver: Observer = (event) => {
  if (event.type === "ProjectDeployed") {
    console.log("Adding project to portfolio index:", event.projectId);
  }
};

let project = createProject("Yann", "yan@mail.com", 1000, true);

project = subscribe(project, loggerObserver);
project = subscribe(project, emailObserver);
project = subscribe(project, portfolioObserver);

project = {
  ...project,
  status: "Build",
};

project = deployProject(project);

console.log("Final project status:", project.status);
