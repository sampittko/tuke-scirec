const firestoreCollections = {
  users: {
    ID: 'users',
    fields: {
      DEFAULT_DASHBOARD: 'defaultDashboard',
    }
  },
  dashboards: {
    ID: 'dashboards',
    fields: {
      USER: 'user',
      TITLE: 'title',
      theme: {
        ID: 'id',
        INVERTED: 'inverted',
      },
      ROUTE: 'route',
      CREATED: 'created',
      PROJECTS: 'projects',
    }
  },
  projects: {
    ID: 'projects',
    fields: {
      ROUTE: 'route',
      CREATED: 'created',
      MODIFIED: 'modified',
      TITLE: 'title',
      DASHBOARD: 'dashboard',
      STATE: 'state',
      DEADLINE: 'deadline',
      DESCRIPTION: 'description',
      RECIPIENT: 'recipient',
    }
  },
  projectVersions: {
    ID: 'projectVersions',
    fields: {
      VERSION_NUMBER: 'versionNum',
      PROJECT: 'project',
      NOTES: 'notes',
      STATE: 'state',
      CREATED: 'created',
      MODIFIED: 'modified',
    }
  },
};

export default firestoreCollections;