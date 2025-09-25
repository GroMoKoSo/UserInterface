# Userinterface 
This repository contains the code for the user interface of [GroMoKoSo](https://git.thm.de/softwarearchitektur-wz-ss24/studentswa2025/enton/gromokoso)


## Deployment
There are several ways to deploy the application. All methods involve docker.
For now, the only dependency is a Keycloak server, which can be started using the `docker-compose.yml` file located in the root of the project.
With the `realm-export.json` file in the root of the project, the realm inside keycloak can be imported.

### Development deployment
1. Start the Keycloak server using the `docker-compose.yml` file in the root of the project.
2. Configure the `.env` file in the root of the project. You can use the `.env.example` file as a template. (`BASE_URL` can be set to `/`in most cases)
3. Run `npm install` to install the dependencies.
4. Run `npm run dev` to start the development server.


### GitLab CI/CD Deployment on Private THM Server
1. Execute the `.gitlab-ci.yml` pipeline to build and push the Docker image to the GitLab Container Registry.
2. Log in to the thm vpn (`vpn.thm.de`).
3. Access the container via `https://zdh-swa-muenker.zdh.thm.de/<container_name>`
>Environment variables are set in the `docker run` command.

### Docker Comopose Deployment
To be added soon.
