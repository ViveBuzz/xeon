# Event sourcing with SST v3

### Apps and Packages

Package name in apps is followed the pattern
- `domain-name-type(app|service|webhooks)`

Examples:
- `customer-mgmt-service`
- `order-mgmt-service`
- `order-mgmt-app`

Name in package.json is followed the pattern
- `@xeon/domain-name-type`

Examples:
- `@xeon/order-mgmt-service`
- `@xeon/order-mgmt-app`

### Setup

- Make sure you have AWS credential
- Install bun https://bun.sh/

### Develop

Install all dependencies from root:

```sh
bun install
```

To develop:

```sh
bun dev
```

### Known issues:
- Eventbridge rule, it's not possible to set messageGroupId dynamically based on some properties received from EB event. So using lambda or sns to set messageGroupId

### TODO Application:

- [ ] Import `tsconfig.json` in each package from `packages/tsconfig/base.json`
- [ ] Create tsconfig for specific application
- [ ] Create sample react application
- [ ] Create sample nextJS application
- [ ] Create sample backend service using `stt`
- [ ] Publish sharing package to npm
- [ ] Setup e2e testing for backend
- [ ] Configure jest and react test

### TODO Platform (DevOpsSec)

- [ ] Configure submodules
- [ ] Setup workflows for submodule deployment
- [ ] Setup workflows for continue integration
- [ ] Show preview links in PR
- [ ] Seperated teardown workflow