# Domain Example - Studio Project Delivery ( Sasha13Studio )

## Goal

Model a studio that delivers premium websites (sometimes immersive/3D).
The domain layer contains only business rules and emits domain events.
Technical actions (email, logging, indexing) are plugged in via observers.

## Core Concepts (Ubiquitous Language)

- **Client**: a customer buying a website project.
- **Project**: a delivery unit that becomes a deployed website.
- **OfferType**: `EssentialWebsite` or `Immersive Website`
- **ProjectStatus**: `Draft -> DiscoveryDone -> DesignApproved -> BuildInProgress -> ReadyToDeploy -> Deployed`
- **PerformanceBudgetMB**: maximum size (MB) for assets for immersive projects.

## Business Rules (Domain Logic)

1.  A project cannot be deployed unless:

- status is `ReadyToDeploy`
- design is approved (must have a `DesignApprovalDate`)

2.  Price must be > 0 (in EUR)
3.  Client email must be valid
4.  If OfferType is `ImmersiveWebsite`, PerformanceBudgetMB must be > 0
5.  Status changes must be forward-only

## State Changes (Commands / Methods)

- `Project.completeDiscovery()`
- `Project.approveDesign(date)`
- `Project.startBuild()`
- `Project.markReadyToDeploy()`
- `Project.deploy(data)`

## Domain Events (Observer Pattern)

- `DiscoveryCompleted`
- `DesginApproved`
- `BuildStarted`
- `ProjectReadyToDeploy`
- `ProjectDeployed`
- `PerformanceBudgetExceeded` (dummy simulation)

The domain emits events, but doesn't send emails or write logs.
Observers handle side-effects:

- Email observer: "Project deployed" -> send launch email
- Portfolio observer: "Projecr deployed" -> update portfolio index
- Logger observer: log all events

## Error Handling / Invalid Data

We intentionally feed wrong data (bad email, negavite price, invalid status transactions).
The app must not crash: all failures are caught with try/catch and logged.
