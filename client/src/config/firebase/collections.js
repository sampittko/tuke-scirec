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
      VERSIONS_COUNT: 'versionsCount',
      DELETED_VERSIONS_COUNT: 'deletedVersionsCount',
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
  projectVersionReviews: {
    ID: 'projectVersionReviews',
    fields: {
      PROJECT_VERSION: 'projectVersion',
      NOTES: 'notes',
      CREATED: 'created',
      MODIFIED: 'modified',
      REVIEWER: 'reviewer',
    }
  },
  files: {
    ID: 'files',
    fields: {
      BELONGS_TO: 'belongsTo',
      PATH: 'path',
      NAME: 'name',
      SIZE: 'size',
    },
  },
};

export default firestoreCollections;