
import { KEYCLOAK_CLIENT_ID, KEYCLOAK_REALM, KEYCLOAK_URL } from '@/types/constants.js';
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: KEYCLOAK_URL,  
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_CLIENT_ID,
});

export default keycloak;
