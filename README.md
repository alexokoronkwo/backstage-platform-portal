# Backstage Platform Portal

A small internal developer portal built with [Backstage](https://backstage.io), with a software template that scaffolds a Python microservice, publishes it to GitHub, and registers it in the catalog.

## What it does

- **Software Catalog:** one place to see components, systems, owners, and APIs.
- **Python Microservice template:** a form asks for a service name, description, owner, and GitHub repo. The template then:
  1. generates a Flask service from a skeleton (`templates/python-microservice-template/skeleton`)
  2. creates a new GitHub repository and pushes the code (`publish:github`)
  3. registers the new service in the catalog (`catalog:register`)
- **Sample data:** example users, groups, a system, and a component under `examples/`.

## Tech

Backstage (new frontend system), Node.js 22, Yarn 4, GitHub integration via a personal access token.

## Run it locally

Requires Node.js 22 or 24, Yarn 4, and Git. Linux, macOS, or WSL.

```bash
git clone https://github.com/alexokoronkwo/backstage-platform-portal.git
cd backstage-platform-portal
yarn install
export GITHUB_TOKEN=<your personal access token with repo scope>
yarn start
```

Open http://localhost:3000/catalog and sign in as Guest.

The token is read from the environment (`${GITHUB_TOKEN}` in `app-config.yaml`). Never commit it.

## Project layout

| Path | Purpose |
|---|---|
| `app-config.yaml` | Portal settings: auth, catalog locations, GitHub integration |
| `packages/app` | Frontend |
| `packages/backend` | Backend: catalog, scaffolder, auth |
| `templates/` | Scaffolder templates |
| `examples/` | Sample catalog entities, including `platform.yaml` (team and system) |

## Problems I ran into and fixed

- **Blank app / `createRoot is not a function`:** `index.tsx` called `createRoot()` on a value that `App.tsx` had already created.
- **404 and empty sidebar:** installed plugins were not enabled. Fixed with `app.packages: all` in `app-config.yaml`.
- **401 on every catalog request:** the guest auth module was installed but not turned on. Fixed by enabling `auth.providers.guest`.
- **Empty catalog:** `file` locations resolve from `packages/backend`, so paths needed `../../`.
- **Entity rejected:** the `System` kind was missing from the location's `allow` rules.
- **Template failed to register:** `catalog:register` needs a real URL. Added a `publish:github` step first and registered from the new repo.
- **Invalid input to `publish:github`:** `allowedHosts` belongs on the repo picker in the form, not in the publish step.

## What I would add next

- TechDocs for each generated service
- Real authentication (GitHub OAuth) instead of Guest

## Terraform web app template

The **Terraform Web App (Kubernetes)** template connects this portal to [terraform-k8s-lab](https://github.com/alexokoronkwo/terraform-k8s-lab):

1. A developer enters an app name, namespace, and replica count.
2. The template generates an `<app-name>.tf` file that calls the reusable `web-app` module.
3. It opens a **pull request** against `terraform-k8s-lab` for review.
4. After the merge, `terraform apply` creates the namespace, deployment, and service on the Kubernetes cluster.

The target repository is set in `templates/terraform-web-app-template/template.yaml` (`repoUrl`). Change it to point at your own fork.
