## Required Design Patterns

The following design patterns are used in this project to structure the application logic and ensure scalability and maintainability.

### 1 Strategy Pattern — Rate Calculation Algorithms

**Where:**  
`src/services/rate-calculators/`

**Why:**  
Different carriers have different rate calculation logic.

**Interface:**  
`RateCalculationStrategy`

---

### 2 Factory Method Pattern — Carrier Instance Creation

**Where:**  
`src/factories/carrier-factory.ts`

**Why:**  
Create appropriate carrier service based on carrier name.

**Interface:**  
`CarrierFactory`

---

### 3 Decorator Pattern — Additional Services / Fees

**Where:**  
`src/services/fee-decorators/`

**Why:**  
Stack additional fees (insurance, signature, etc.) dynamically.

**Interface:**  
`RateDecorator`

---

### 4 Adapter Pattern — External API Integration

**Where:**  
`src/adapters/carrier-adapters/`

**Why:**  
Normalize different carrier API response formats.

**Interface:**  
`CarrierAdapter`

---

### 5 Singleton Pattern — Configuration Management

**Where:**  
`src/config/carrier-config.ts`

**Why:**  
Single source of truth for carrier credentials and settings.

**Class:**  
`CarrierConfigManager`

## Architecture Diagram

+--------------------------------------------------------------------+
|                             UI LAYER                               |
|--------------------------------------------------------------------|
|                                                                    |
|  React (Next.js App Router)                                        |
|  - Rate Calculator Page                                            |
|  - Input Form Components                                           |
|  - Results Display Components                                      |
|                                                                    |
|  Responsibilities:                                                 |
|  - Collect user input (package, addresses, options)                |
|  - Trigger rate calculation request                                |
|  - Render calculated shipping rates                                |
|  - Display validation and carrier errors                           |
|                                                                    |
+-------------------------------+------------------------------------+
                                |
                                | Form Input / User Actions
                                v
+--------------------------------------------------------------------+
|                        BUSINESS LOGIC LAYER                        |
|--------------------------------------------------------------------|
|                                                                    |
|  RateService (Strategy Context)                                    |
|                                                                    |
|  [ Strategy Pattern ]                                              |
|  RateCalculationStrategy                                           |
|  - StandardRateStrategy                                            |
|  - ZoneBasedRateStrategy                                           |
|  - VolumetricRateStrategy                                          |
|                                                                    |
|  [ Factory Method Pattern ]                                        |
|  CarrierFactory                                                    |
|  - Creates carrier-specific services                               |
|                                                                    |
|  [ Decorator Pattern ]                                             |
|  RateDecorator                                                     |
|  - InsuranceFeeDecorator                                           |
|  - SignatureFeeDecorator                                           |
|  - FragileHandlingDecorator                                        |
|  - SaturdayDeliveryDecorator                                       |
|                                                                    |
|  Responsibilities:                                                 |
|  - Select and execute pricing strategies                           |
|  - Instantiate carrier services                                    |
|  - Apply additional service fees dynamically                       |
|  - Aggregate rates and normalize business errors                   |
|                                                                    |
|  Error Handling Boundary:                                          |
|  - Carrier-level errors converted to domain errors                 |
|  - Business rule validation errors handled                         |
|                                                                    |
+-------------------------------+------------------------------------+
                                |
                                | Normalized Rate Requests
                                v
+--------------------------------------------------------------------+
|                             DATA LAYER                             |
|--------------------------------------------------------------------|
|                                                                    |
|  [ Adapter Pattern ]                                               |
|  CarrierAdapter                                                    |
|  - FedExAdapter                                                    |
|  - UPSAdapter                                                      |
|                                                                    |
|  [ Singleton Pattern ]                                             |
|  CarrierConfigManager                                              |
|  - API credentials                                                 |
|  - Environment-specific settings                                   |
|                                                                    |
|  External Carrier APIs                                             |
|  - FedEx API                                                       |
|  - UPS API                                                         |
|                                                                    |
|  Error Handling Boundary:                                          |
|  - External API errors                                             |
|  - Network / timeout errors                                        |
|                                                                    |
+--------------------------------------------------------------------+

Data Flow Summary:
1. User enters shipment data in the UI form.
2. UI sends request to Business Logic layer.
3. RateService evaluates pricing strategies.
4. CarrierFactory creates appropriate carrier services.
5. Adapters communicate with external carrier APIs.
6. Responses are normalized and decorated with fees.
7. Final rates (and errors) are returned to the UI.
