import type { ApiSpecT } from "@/types/Types";

export const groupMockData:ApiSpecT[] = [
    {
      "id": 1,
      "name": "User Service API",
      "description": "REST API zum Verwalten von Benutzerdaten und Rollen",
      "version": "1.0.0",
      "dataFormat": "JSON",
      "spec": "/specs/user-service.yaml"
    },
    {
      "id": 2,
      "name": "Auth API",
      "description": "OAuth2-basierte Authentifizierungs- und Autorisierungs-API",
      "version": "2.1.0",
      "dataFormat": "JSON",
      "spec": "/specs/auth-api.yaml"
    },
    {
      "id": 3,
      "name": "Payment API",
      "description": "API zur Zahlungsabwicklung mit verschiedenen Providern",
      "version": "1.4.3",
      "dataFormat": "XML",
      "spec": "/specs/payment-api.yaml"
    },
    {
      "id": 4,
      "name": "Notification API",
      "description": "API für Push-Benachrichtigungen und E-Mail-Versand",
      "version": "0.9.5",
      "dataFormat": "JSON",
      "spec": "/specs/notification-api.yaml"
    },
    {
      "id": 5,
      "name": "Analytics API",
      "description": "API für Metriken, Logs und Berichte",
      "version": "3.2.0",
      "dataFormat": "CSV",
      "spec": "/specs/analytics-api.yaml"
    }
  ]
  