// import type {
//   EurCents,
//   PerformanceBudgetMB,
//   ProjectId,
// } from "./brandedTypes.ts";
// import type { DomainEvent, Observer } from "./events.ts";
// import type { Client } from "./client.ts";
// import { assert } from "node:console";

// export type OfferType = "EssentialWebsite" | "ImmersiveWebsite";

// export type ProjectStatus =
//   | "Draft"
//   | "DiscoveryDone"
//   | "DesignApproved"
//   | "BuildInProgress"
//   | "ReadyToDeploy"
//   | "Deployed";

// function assertForwardTransition(from: ProjectStatus, to: ProjectStatus) {
//   const order: ProjectStatus[] = [
//     "Draft",
//     "DiscoveryDone",
//     "DesignApproved",
//     "BuildInProgress",
//     "ReadyToDeploy",
//     "Deployed",
//   ];
//   if (order.indexOf(to) <= order.indexOf(from)) {
//     throw new Error(`Invalid status transition: ${from} -> ${to}`);
//   }
// }

// export class Project {
//   private observers: Observer[] = [];
//   private events: DOmainEvent[] = [];

//   private status: ProjectStatus = "Draft";
//   private designApprovalDate: Date | null = null;

//   constructor(
//     public readonly id: ProjectId,
//     public readonly client: Client,
//     public readonly offerType: OfferType,
//     public readonly price: EurCents,
//     public readonly performanceBudgetMB: PerformanceBudgetMB,
//   ) {
//     // rule: immersive must have performance budger
//     if (offerType === "ImmersiveWebsite" && performanceBudgetMB <= 0) {
//       throw new Error("Immersive websites must have a performance budget");
//     }
//   }

//   subscribe(observer: Observer) {
//     this.observers.push(observer);
//   }

//   pullEvents(): DomainEvent[] {
//     const out = [...this.events];
//     this.events = [];
//     return out;
//   }

//   private emit(event: DomaainEvent) {
//     this.events.push(event);
//     for (const obs of this.observers) obs(event);
//   }

//   getStatus(): ProjectStatus {
//     return this.status;
//   }

//   completeDiscovery(at = new Date()) {
//     assertForwardTransition(this.status, "DiscoveryDone");
//     this.status = "DiscoveryDone";
//     this.emit({ type: "DiscoveryCompleted", projectId: this.id, at });
//   }

//   approveDesign(at = new Date()) {
//     assertForwardTransition(this.status, "DesignApproved");
//     this.status = "DesignApproved";
//     this.designApprovalDate = at;
//     this.emit({ type: "DesignApproved", projectId: this.id, at });
//   }

//   startBuild(at = new Date()) {
//     assertForwardTransition(this.status, "BuildInProgress");
//     this.status = "BuildInProgress";
//     this.emit({ type: "BuildStarted", projectId: this.id, at });
//   }

//   markReadyToDeploy(at = new Date()) {
//     assertForwardTransition(this.status, "ReadyToDeploy");
//     this.status = "ReadyToDeploy";
//     this.emit({ type: "ProjectReadyToDeploy", projectId: this.id, at });
//   }

//   deploy(url: string, at = new Date()) {
//     // rule: must be ready and approved design
//     if (this.status !== "ReadyToDeploy") {
//       throw new Error("Project must be ready to deploy");
//     }
//     if (!this.designApprovalDate) {
//       throw new Error("Design must be approved before deployment");
//     }

//     assertForwardTransition(this.status, "Deployed");
//     this.status = "Deployed";
//     this.emit({ type: "ProjectDeployed", projectId: this.id, at, url });
//   }

//   // dummy function to simulate an asset size check for immersive projects
//   checkPerformanceBudget(usedMB: number, at = new Date()) {
//     if (this.offerType !== "ImmersiveWebsite" || !this.performanceBudgetMB)
//       return;
//     const budget = this.performanceBudgetMB as unknown as number;

//     if (usedMB > budget) {
//       this.emit({
//         type: "PerformanceBudgetExceeded",
//         projectId: this.id,
//         at,
//         usedMB,
//         budgetMB: budget,
//       });
//     }
//   }
// }

type Project = {
  clientName: string;
  clientEmail: string;
  price: number;
  immersive: boolean;
};
