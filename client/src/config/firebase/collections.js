const firestoreCollections = {
  users: {
    ID: 'users',
    fields: {
      DEFAULT_DASHBOARD_ID: 'defaultDashboardId',
      DASHBOARDS_COUNT: 'dashboardsCount',
    }
  },
  dashboards: {
    ID: 'dashboards',
    fields: {
      META: 'meta',
      meta: {
        AUTHOR_ID: 'authorId',
        CREATED: 'created',
        PARENT_ID: 'parentId',
      },
      THEME: 'theme',
      theme: {
        ID: 'id',
        INVERTED: 'inverted',
      },
      TITLE: 'title',
    }
  },
  projects: {
    ID: 'projects',
    fields: {
      META: 'meta',
      meta: {
        AUTHOR_ID: 'authorId',
        CREATED: 'created',
        MODIFIED: 'modified',
        VERSIONS_COUNT: 'versionsCount',
        DELETED_VERSIONS_COUNT: 'deletedVersionsCount',
        PARENT_ID: 'parentId',
      },
      OVERVIEW: 'overview',
      overview: {
        STATE: 'state',
        DEADLINE: 'deadline',
        DEADLINE_VISIBLE: 'deadlineVisible',
        DESCRIPTION: 'description',
        RECIPIENT: 'recipient',
      },
      TITLE: 'title',
    }
  },
  projectVersions: {
    ID: 'projectVersions',
    fields: {
      META: 'meta',
      meta: {
        CREATED: 'created',
        MODIFIED: 'modified',
        AUTHOR_ID: 'authorId',
        PARENT_ID: 'parentId',
      },
      DETAIL: 'detail',
      detail: {
        NOTES: 'notes',
        STATE: 'state',
      },
      VERSION_NUMBER: 'versionNum',
    }
  },
  projectVersionReviews: {
    ID: 'projectVersionReviews',
    fields: {
      META: 'meta',
      meta: {
        AUTHOR_ID: 'authorId',
        CREATED: 'created',
        MODIFIED: 'modified',
        PARENT_ID: 'parentId',
      },
      NOTES: 'notes',
    }
  },
  files: {
    ID: 'files',
    fields: {
      META: 'meta',
      meta: {
        AUTHOR_ID: 'authorId',
        SIZE: 'size',
        UPLOADED: 'uploaded',
        PATH: 'path',
        PARENT: 'parent',
        parent: {
          ID: 'id',
          COLLECTION: 'collection',
        },
      },
      NAME: 'name',
    },
  },
};

export default firestoreCollections;